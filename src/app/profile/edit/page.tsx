import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import ProfileEditForm from "@/components/features/profile/ProfileEditForm"

export default async function EditProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Edit Profile</h1>

                <ProfileEditForm profile={profile} user={user} />
            </div>
        </div>
    )
}
