import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{user.user_metadata.full_name || "User"}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                    <div className="ml-auto">
                        <Link href="/profile/edit">
                            <Button variant="outline">Edit Profile</Button>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">My Collections</h2>
                    <div className="p-12 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-center">
                        <p className="text-gray-500 mb-2">You haven't created any collections yet.</p>
                        <Button variant="ghost">Create a collection</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
