"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProfile(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error(`Error fetching profile for userId: ${userId}`, error)
        return null
    }

    return data
}


export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const first_name = (formData.get("first_name") as string) || ""
    const last_name = (formData.get("last_name") as string) || ""
    const username = (formData.get("username") as string) || ""
    const bio = (formData.get("bio") as string) || ""
    const website = (formData.get("website") as string) || ""
    const avatar_url = (formData.get("avatar_url") as string) || ""
    const skillsString = (formData.get("skills") as string) || ""
    const skills = skillsString
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

    const { error } = await supabase
        .from('profiles')
        .update({
            first_name,
            last_name,
            username,
            bio,
            website,
            avatar_url,
            skills,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) throw error

    revalidatePath(`/profile/${user.id}`)
    revalidatePath("/creators")
}

export async function getProfileByUsername(username: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle()

    if (error) {
        console.error(`Error fetching profile for username: ${username}`, error)
        return null
    }

    return data
}
