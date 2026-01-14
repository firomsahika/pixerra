"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleLike(designId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    // Check if already liked
    const { data: existingLike } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("design_id", designId)
        .single()

    if (existingLike) {
        // Unlike
        await supabase
            .from("likes")
            .delete()
            .eq("user_id", user.id)
            .eq("design_id", designId)

        // Decrement likes count
        await supabase.rpc('decrement_likes', { design_id: designId })
    } else {
        // Like
        await supabase
            .from("likes")
            .insert({
                user_id: user.id,
                design_id: designId
            })

        // Increment likes count
        await supabase.rpc('increment_likes', { design_id: designId })
    }

    revalidatePath("/explore")
    revalidatePath(`/design/${designId}`)
}
