import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getProfile } from "@/app/actions/profile"
import { getUserDesigns } from "@/app/actions/design"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    const profile = await getProfile(user.id)
    const designs = await getUserDesigns(user.id)

    const totalLikes = designs.reduce((acc, d: any) => acc + (d.likes_count || 0), 0)

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-[2000px] mx-auto">
                <div className="max-w-4xl mx-auto flex items-center gap-6 mb-16">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                        <AvatarImage src={profile?.avatar_url || user.user_metadata.avatar_url} />
                        <AvatarFallback className="text-3xl bg-red-50 text-red-600 font-bold">
                            {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-0">
                                {`${profile?.first_name || user.user_metadata.first_name || ''} ${profile?.last_name || user.user_metadata.last_name || ''}`.trim() || user.user_metadata.full_name || "Creative Pro"}
                            </h1>
                            <p className="text-sm text-gray-500">@{profile?.username || user.user_metadata.username}</p>
                        </div>

                        <p className="text-gray-500 font-medium">{profile?.bio || "Digital Designer & Creator"}</p>
                        <div className="mt-3 flex items-center gap-3">
                            {(profile?.skills || []).map((s: string) => (
                                <span key={s} className="px-3 py-1 rounded-full bg-gray-100 text-sm font-bold text-gray-600">{s}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">{designs.length}</span> <span className="text-gray-500">Designs</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">{totalLikes}</span> <span className="text-gray-500">Total Likes</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">0</span> <span className="text-gray-500">Following</span>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Link href="/profile/edit">
                            <Button variant="outline" className="rounded-full px-8 border-2 font-bold hover:bg-gray-50">
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black text-gray-900 italic tracking-tight">Work Showcase</h2>
                        <div className="flex gap-6">
                            <button className="text-sm font-bold text-gray-900 border-b-2 border-red-600 pb-4 -mb-4">Uploaded</button>
                            <button className="text-sm font-bold text-gray-400 hover:text-gray-900 pb-4 -mb-4 transition-colors">Liked</button>
                            <button className="text-sm font-bold text-gray-400 hover:text-gray-900 pb-4 -mb-4 transition-colors">Collections</button>
                        </div>
                    </div>

                    {designs.length > 0 ? (
                        <MasonryGrid designs={designs} />
                    ) : (
                        <div className="py-32 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center bg-gray-50/50">
                            <p className="text-xl font-bold text-gray-900 mb-2">No designs yet</p>
                            <p className="text-gray-500 mb-8 max-w-sm">Post your first design to start building your professional portfolio.</p>
                            <Link href="/upload">
                                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-red-100">
                                    Upload Now
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
