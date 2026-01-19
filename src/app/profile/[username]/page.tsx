import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getProfileByUsername } from "@/app/actions/profile"
import { getUserDesigns } from "@/app/actions/design"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params

    const profile = await getProfileByUsername(username)

    if (!profile) {
        return (
            <div className="flex bg-white min-h-[60vh] items-center justify-center flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
                <p className="text-gray-500">This user may not exist or has been removed.</p>
                <Link href="/">
                    <Button className="rounded-full px-8">Back to Home</Button>
                </Link>
            </div>
        )
    }

    const designs = await getUserDesigns(profile.id)

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-[2000px] mx-auto">
                <div className="max-w-4xl mx-auto flex items-center gap-6 mb-16">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="text-3xl bg-red-50 text-red-600 font-bold">
                            {profile.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2">{profile.full_name || profile.username}</h1>
                        <p className="text-gray-500 font-medium">{profile.bio || "Digital Designer & Creator"}</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">{designs.length}</span> <span className="text-gray-500">Designs</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-gray-900">0</span> <span className="text-gray-500">Following</span>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Button variant="outline" className="rounded-full px-8 border-2 font-bold hover:bg-gray-50">Follow</Button>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black text-gray-900 italic tracking-tight">Work Showcase</h2>
                    </div>

                    {designs.length > 0 ? (
                        <MasonryGrid designs={designs} />
                    ) : (
                        <div className="py-32 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center bg-gray-50/50">
                            <p className="text-xl font-bold text-gray-900 mb-2">No designs yet</p>
                            <p className="text-gray-500 mb-8 max-w-sm">This user hasn't posted any designs yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
