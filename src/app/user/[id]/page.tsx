import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import { Globe, MoreHorizontal, MapPin } from "lucide-react"

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    const { data: designs } = await supabase
        .from('designs')
        .select(`
        *,
        user:user_id (username, avatar_url)
     `)
        .eq('user_id', id)
        .order('created_at', { ascending: false })

    if (profileError || !profile) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
                <p className="text-gray-500">The user profile you are looking for isn't available.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Profile Header */}
            <div className="relative pt-20 md:pt-28 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white p-1.5 shadow-md ring-1 ring-gray-100">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                            {profile.avatar_url ? (
                                <Image src={profile.avatar_url} alt={profile.username} fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-5xl text-gray-300 font-bold uppercase select-none">
                                    {profile.username?.[0] || "?"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{profile.full_name || profile.username}</h1>
                            <p className="text-gray-500 font-medium text-lg mt-1">@{profile.username}</p>
                        </div>

                        {profile.bio && (
                            <p className="text-xl text-gray-600 font-normal leading-relaxed">{profile.bio}</p>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-600 font-medium pt-2">
                            {profile.website && (
                                <div className="flex items-center gap-2 hover:text-black transition-colors">
                                    <Globe className="w-4 h-4" />
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{profile.website}</a>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all">Follow</Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium border-gray-300 hover:bg-gray-50">Message</Button>
                        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 text-gray-500 hover:text-black hover:bg-gray-100">
                            <MoreHorizontal className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats & Tabs */}
            <div className="max-w-[2000px] mx-auto py-12 px-4">
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
                        <button className="px-6 py-2 bg-white rounded-full shadow-sm text-sm font-semibold text-gray-900 transition-all">Created</button>
                        <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900 transition-all">Saved</button>
                        <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900 transition-all">Liked</button>
                    </div>
                </div>

                {designs && designs.length > 0 ? (
                    <MasonryGrid designs={designs} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                        <div className="text-center space-y-2">
                            <p className="text-xl font-semibold text-gray-900">No designs yet</p>
                            <p className="text-gray-500">This user hasn't uploaded any designs.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
