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
    // Support multiple files uploaded under 'files' or single 'file' for backward compatibility
    const files = (formData.getAll("files") as File[]).filter(Boolean)
    const singleFile = formData.get("file") as File | null

    const uploadFiles = files.length > 0 ? files : (singleFile ? [singleFile] : [])

    if (uploadFiles.length === 0 || !title) {
        throw new Error("Missing required fields")
    }

    // 1. Upload each image to Storage and collect public URLs
    const publicUrls: string[] = []

    for (const f of uploadFiles) {
        const fileExt = f.name.split('.').pop()
        const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('designs')
            .upload(fileName, f)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('designs')
            .getPublicUrl(fileName)

        publicUrls.push(publicUrl)
    }

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
            image_url: publicUrls[0],
            image_urls: publicUrls,
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
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
        .from('designs')
        .select(`
            *,
            user:profiles(username, avatar_url),
            likes_count:likes(count),
            views_count:views(count)
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

    let likedDesignIds = new Set<string>()
    if (user && data.length > 0) {
        const { data: userLikes } = await supabase
            .from('likes')
            .select('design_id')
            .eq('user_id', user.id)
            .in('design_id', data.map((d: any) => d.id))
        
        if (userLikes) {
            userLikes.forEach((l: any) => likedDesignIds.add(l.design_id))
        }
    }

    return data.map((design: any) => ({
        ...design,
        likes_count: design.likes_count?.[0]?.count || 0,
        views_count: design.views_count?.[0]?.count || 0,
        is_liked: likedDesignIds.has(design.id)
    }))
}

export async function getUserDesigns(userId: string) {
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('designs')
        .select(`
            *,
            user:profiles(username, avatar_url),
            likes_count:likes(count),
            views_count:views(count)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching user designs:", error)
        return []
    }

    let likedDesignIds = new Set<string>()
    if (currentUser && data.length > 0) {
        const { data: userLikes } = await supabase
            .from('likes')
            .select('design_id')
            .eq('user_id', currentUser.id)
            .in('design_id', data.map((d: any) => d.id))
        
        if (userLikes) {
            userLikes.forEach((l: any) => likedDesignIds.add(l.design_id))
        }
    }

    return data.map((design: any) => ({
        ...design,
        likes_count: design.likes_count?.[0]?.count || 0,
        views_count: design.views_count?.[0]?.count || 0,
        is_liked: likedDesignIds.has(design.id)
    }))
}

export async function getDesignById(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('designs')
        .select(`
            *,
            user:profiles(*),
            likes_count:likes(count),
            views_count:views(count)
        `)
        .eq('id', id)
        .single()

    if (error) {
        console.error("Error fetching design by id:", error)
        return null
    }

    const likesCount = data.likes_count?.[0]?.count || 0
    const viewsCount = data.views_count?.[0]?.count || 0

    let is_liked = false
    if (user) {
        const { count } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('design_id', id)
            .eq('user_id', user.id)
        is_liked = count! > 0
    }

    return {
        ...data,
        likes_count: likesCount,
        views_count: viewsCount,
        is_liked
    }
}

export async function deleteDesign(designId: string) {      
    const supabase =  await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    // delete design
    await supabase.from('designs').delete({
        design_id: designId,
        user_id: user.id
    })

    router.refresh()
}
export async function incrementViewCount(designId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Insert into views table
    await supabase.from('views').insert({
        design_id: designId,
        user_id: user?.id || null
    })

    revalidatePath(`/design/${designId}`)
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
