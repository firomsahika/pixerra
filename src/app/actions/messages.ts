"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function sendMessage(receiverId: string, content: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    if (!content.trim()) return

    // 1. Insert message
    const { data: message, error } = await supabase
        .from("messages")
        .insert({
            sender_id: user.id,
            receiver_id: receiverId,
            content: content.trim()
        })
        .select()
        .single()

    if (error) throw error

    // 2. 🔔 Create a Notification for the receiver
    await supabase.from("notifications").insert({
        user_id: receiverId,
        actor_id: user.id,
        type: "message",
        content: content.substring(0, 50) // Preview
    })

    revalidatePath("/messages")
    revalidatePath(`/messages/${receiverId}`)
    revalidatePath("/notifications")
}
