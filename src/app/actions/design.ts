"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadDesign(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const tagsString = formData.get("tags") as string
    const file = formData.get("file") as File

    if (!file || !title) {
        throw new Error("Missing required fields")
    }

    // 1. Upload image to Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
        .from('designs')
        .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
        .from('designs')
        .getPublicUrl(fileName)

    // 2. Ensure Profile exists (to avoid foreign key violation)
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

    if (!profile) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Creative Pro",
                avatar_url: user.user_metadata?.avatar_url,
                username: user.user_metadata?.username || (user.email?.split('@')[0] || "user") + Math.floor(Math.random() * 1000)
            })

        if (profileError) {
            console.error("Error creating missing profile:", profileError)
            // If it's a conflict (username), we might need to handle it, but let's stick to basics
        }
    }

    // 3. Insert record into Database
    const { data: design, error: insertError } = await supabase
        .from('designs')
        .insert({
            title,
            description,
            category,
            image_url: publicUrl,
            user_id: user.id,
            tags: tagsString.split(',').map(t => t.trim()).filter(Boolean)
        })
        .select()
        .single()

    if (insertError) throw insertError

    revalidatePath("/")
    revalidatePath("/explore")
    revalidatePath(`/profile/${user.id}`)

    return design
}

export async function getDesigns(category?: string) {
    const supabase = await createClient()

    let query = supabase
        .from('designs')
        .select(`
            *,
            user:profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false })

    if (category && category !== "All") {
        query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error fetching designs:", error)
        return []
    }

    return data
}

export async function getUserDesigns(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('designs')
        .select(`
            *,
            user:profiles(username, avatar_url)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching user designs:", error)
        return []
    }

    return data
}

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
        .maybeSingle()

    if (existingLike) {
        // Unlike
        await supabase
            .from("likes")
            .delete()
            .eq("user_id", user.id)
            .eq("design_id", designId)

        // RPC call to decrement likes_count on design
        // Note: Assumes you have an increment_likes/decrement_likes RPC
        // If not using RPC, you can just fetch and update designs table directly
        // await supabase.rpc('decrement_likes', { design_id: designId })
    } else {
        // Like
        await supabase
            .from("likes")
            .insert({
                user_id: user.id,
                design_id: designId
            })

        // 🔔 Create a Notification
        const { data: design } = await supabase
            .from("designs")
            .select("user_id")
            .eq("id", designId)
            .single()

        if (design && design.user_id !== user.id) {
            await supabase.from("notifications").insert({
                user_id: design.user_id,
                actor_id: user.id,
                type: "like",
                design_id: designId
            })
        }
    }

    revalidatePath("/explore")
    revalidatePath("/")
    revalidatePath(`/design/${designId}`)
    revalidatePath("/notifications")
}
