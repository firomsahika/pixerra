import { createClient } from "@/utils/supabase/server"
import { CreatorCard } from "@/components/features/creators/CreatorCard"
import { Users, Star, TrendingUp } from "lucide-react"
import { MOCK_CREATORS } from "@/data/mockCreators"

interface DesignData {
    id: string
    image_url: string
    likes_count: number
    created_at: string
}

interface CreatorData {
    id: string
    username: string
    full_name: string
    avatar_url: string
    bio: string
    designs: DesignData[]
}

export default async function CreatorsPage() {
    // Note: To use real Supabase data, uncomment the following block and comment out the MOCK_CREATORS usage below.
    /*
    const supabase = await createClient()
    const { data: rawCreators } = await supabase
        .from('profiles')
        .select(`
            id,
            username,
            full_name,
            avatar_url,
            bio,
            designs (
                id,
                image_url,
                likes_count,
                created_at
            )
        `) as { data: CreatorData[] | null }

    const creators = (rawCreators || []).map(p => {
        const totalLikes = (p.designs || []).reduce((sum, d) => sum + (d.likes_count || 0), 0)
        const sortedDesigns = [...(p.designs || [])].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        return {
            ...p,
            design_count: (p.designs || []).length,
            total_likes: totalLikes,
            top_designs: sortedDesigns.slice(0, 3).map(d => ({ id: d.id, image_url: d.image_url }))
        }
    })
    .sort((a, b) => b.total_likes - a.total_likes)
    */

    // Using dummy data for a professional look and feel
    const creators = MOCK_CREATORS

    return (
        <div className="min-h-screen relative overflow-hidden bg-white pt-24 pb-20 px-4">
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -z-10 animate-blob" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

            <div className="max-w-7xl mx-auto relative">
                {/* Premium Header */}
                <div className="text-center space-y-6 mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase">
                        Creatives Guild
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none">
                        Discover the <span className="text-blue-600">Creators.</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                        Connect with the world's most talented designers. From minimalist architects to digital visionaries, find the perfect talent for your next project.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <button className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 transition-all">
                        <TrendingUp className="w-4 h-4" />
                        Popular
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        <Star className="w-4 h-4" />
                        Staff Picks
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        <Users className="w-4 h-4" />
                        Recently Active
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {creators.length > 0 ? (
                        creators.map((creator) => (
                            <CreatorCard key={creator.id} creator={creator} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24 bg-white/40 backdrop-blur-xl rounded-[48px] border border-white shadow-2xl">
                            <Users className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Finding talented minds...</h2>
                            <p className="text-gray-500 font-medium">Join the community to be featured here!</p>
                        </div>
                    )}
                </div>

                {/* Hire Banner */}
                <div className="mt-32 p-16 bg-gray-900 rounded-[64px] text-white overflow-hidden relative group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 max-w-xl text-center md:text-left">
                            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Looking to hire <br /> premium talent?
                            </h3>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                Our creators are vetted professionals ready to bring your vision to life. Browse portfolios and start a direct conversation in seconds.
                            </p>
                            <div className="flex flex-wrap items-center gap-6 pt-4 justify-center md:justify-start">
                                <button className="px-10 py-4 bg-blue-600 hover:bg-white hover:text-gray-900 text-white font-black rounded-full transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                                    Post a Project
                                </button>
                                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-black rounded-full transition-all active:scale-95">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full md:w-1/3 aspect-square hidden md:block">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow" />
                            <div className="grid grid-cols-2 gap-4">
                                {creators.slice(0, 4).map((c, i) => (
                                    <div key={i} className={`h-full w-full aspect-square rounded-[32px] overflow-hidden border-2 border-white/10 ${i % 2 === 0 ? 'translate-y-4' : '-translate-y-4'} bg-gray-800 flex items-center justify-center`}>
                                        {c.avatar_url ? (
                                            <img src={c.avatar_url} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={c.username} />
                                        ) : (
                                            <Users className="w-8 h-8 text-gray-700" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Background abstract decor */}
                    <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px]" />
                </div>
            </div>
        </div>
    )
}
