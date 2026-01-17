import { createClient } from "@/utils/supabase/server"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import { Button } from "@/components/ui/button"
import { MOCK_CREATORS } from "@/data/mockCreators"
import { Globe, MoreHorizontal, MapPin, Mail, MessageSquare, Heart, ShieldCheck, Share2, Briefcase } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()

    // 1. Try to find in MOCK_CREATORS first (for demo purposes)
    const mockCreator = MOCK_CREATORS.find(c => c.id === id)

    let profile: any = null
    let designs: any[] = []

    if (mockCreator) {
        profile = {
            id: mockCreator.id,
            username: mockCreator.username,
            full_name: mockCreator.full_name,
            avatar_url: mockCreator.avatar_url,
            bio: mockCreator.bio,
            website: "https://portfolio.design",
            skills: mockCreator.skills
        }
        // Transform mock designs to match the expected format
        designs = mockCreator.top_designs.map(d => ({
            id: d.id,
            title: "Project Publication",
            image_url: d.image_url,
            user: {
                username: mockCreator.username,
                avatar_url: mockCreator.avatar_url
            },
            likes_count: Math.floor(Math.random() * 500) + 100,
            views_count: Math.floor(Math.random() * 2000) + 500
        }))
    } else {
        // 2. Fallback to real Supabase data
        const { data: realProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single()

        if (realProfile) {
            profile = realProfile
            const { data: realDesigns } = await supabase
                .from('designs')
                .select(`
                    *,
                    user:user_id (username, avatar_url)
                `)
                .eq('user_id', id)
                .order('created_at', { ascending: false })

            designs = (realDesigns || []).map(d => ({
                ...d,
                likes_count: (d as any).likes_count || 0,
                views_count: (d as any).views_count || 0
            }))
        }
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white pt-32">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">User not found</h2>
                <p className="text-gray-500 font-medium text-center max-w-xs">
                    This designer might have changed their username or made their profile private.
                </p>
                <Link href="/">
                    <Button className="mt-8 rounded-full px-8 h-12 font-black uppercase tracking-widest text-[10px]" variant="outline">
                        Return Home
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Professional Immersive Header */}
            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[140px] -z-10 animate-blob" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-red-50/20 rounded-full blur-[140px] -z-10 animate-blob animation-delay-4000" />

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-16 text-center md:text-left">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-100/50 to-red-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <Avatar className="h-44 w-44 md:h-60 md:w-60 border-[12px] border-white shadow-2xl relative transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-2">
                                <AvatarImage src={profile.avatar_url} />
                                <AvatarFallback className="text-6xl font-black bg-white text-gray-200">
                                    {(profile.full_name || profile.username || "?")[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 right-8 md:right-12 bg-white p-1.5 rounded-full shadow-xl">
                                <div className="bg-green-500 text-white p-2 rounded-full border-2 border-white">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-10 pt-4">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                        Verified Designer
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        <MapPin className="w-3.5 h-3.5" />
                                        Remote / Global
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                                    {profile.full_name || profile.username}
                                </h1>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <p className="text-blue-600 font-black text-xl">@{profile.username}</p>
                                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                    <Link href="#" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">
                                        <Globe className="w-4 h-4" />
                                        portfolio.design
                                    </Link>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                                {profile.bio || "Pushing the digital frontier. Specializing in high-end visual systems and immersive user interfaces for the next generation of web apps."}
                            </p>

                            {/* Skills Tag Cloud */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                                {(profile.skills || ["UI Design", "Visual Arts", "Strategy", "Creative Direction"]).map((skill: string) => (
                                    <span key={skill} className="px-5 py-2.5 bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl text-[11px] font-black text-gray-500 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all cursor-default shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                                <Button size="lg" className="rounded-full px-12 h-16 text-xs font-black uppercase tracking-widest bg-gray-900 hover:bg-blue-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 group/btn">
                                    <MessageSquare className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
                                    Send Message
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-xs font-black uppercase tracking-widest border-2 border-gray-100 bg-white/40 backdrop-blur-md hover:bg-white hover:border-blue-600 transition-all active:scale-95">
                                    Follow
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full border-2 border-gray-100 bg-white/40 backdrop-blur-md hover:bg-white text-gray-400 hover:text-gray-900 transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full border-2 border-gray-100 bg-white/40 backdrop-blur-md hover:bg-white text-gray-400 hover:text-gray-900 transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content / Feed */}
            <div className="max-w-[1800px] mx-auto pb-32 px-4 md:px-12">
                {/* Tabs / Filter Bar */}
                <div className="flex items-center justify-center mb-20 border-b border-gray-100">
                    <div className="flex items-center gap-16">
                        <button className="relative pb-8 text-xs font-black uppercase tracking-[0.3em] text-gray-900 border-b-4 border-red-600 transition-all">
                            Portfolio
                            <span className="absolute -top-1 -right-6 text-[10px] text-gray-300 font-black">{designs.length}</span>
                        </button>
                        <button className="pb-8 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all">
                            Collections
                        </button>
                        <button className="pb-8 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all">
                            About
                        </button>
                    </div>
                </div>

                {/* Portfolio Grid */}
                {designs.length > 0 ? (
                    <div className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <MasonryGrid designs={designs} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-48 bg-gray-50/30 rounded-[64px] border-4 border-dashed border-gray-100 max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-8">
                            <Briefcase className="w-10 h-10 text-gray-200" />
                        </div>
                        <div className="text-center space-y-3">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Portfolio is silent</h3>
                            <p className="text-gray-400 font-medium text-lg">This creator is currently working on something amazing.</p>
                        </div>
                        <Button className="mt-10 rounded-full px-10 h-14 font-black uppercase tracking-widest text-[10px] bg-white border-2 border-gray-100 hover:border-gray-900 transition-all" variant="outline">
                            Follow for Updates
                        </Button>
                    </div>
                )}
            </div>

            {/* CTA Footer */}
            <div className="py-32 px-4 border-t border-gray-50 bg-gray-900 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] -z-0" />
                <div className="relative z-10 space-y-10">
                    <h4 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        Like what you see? <br />
                        <span className="text-gray-400">Work directly with {profile.full_name?.split(' ')[0] || profile.username}.</span>
                    </h4>
                    <Button size="lg" className="rounded-full px-16 h-20 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-white hover:text-gray-900 transition-all shadow-2xl shadow-blue-900/40">
                        Start a Project Today
                    </Button>
                </div>
            </div>
        </div>
    )
}
