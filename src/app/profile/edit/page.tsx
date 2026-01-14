import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function EditProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Edit Profile</h1>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Basic Information</h2>

                        <div className="flex items-center gap-6 mb-8">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user.user_metadata.avatar_url} />
                                <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Avatar</Button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Display Name
                                </label>
                                <Input defaultValue={user.user_metadata.full_name || ""} />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Bio
                                </label>
                                <Input placeholder="Tell us about yourself" />
                            </div>
                        </div>
                    </section>

                    <div className="pt-4">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
