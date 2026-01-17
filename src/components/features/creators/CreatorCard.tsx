import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Image as ImageIcon, Briefcase } from "lucide-react"

interface CreatorCardProps {
    creator: {
        id: string
        username: string
        full_name: string
        avatar_url: string
        bio: string
        skills?: string[]
        design_count: number
        total_likes: number
        top_designs: { id: string, image_url: string }[]
    }
}

export function CreatorCard({ creator }: CreatorCardProps) {
    return (
        <div className="group relative bg-white/40 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl shadow-gray-100/30 p-8 transition-all hover:shadow-red-100/30 hover:-translate-y-1 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50/50 rounded-full blur-3xl group-hover:bg-red-100/50 transition-colors" />

            <div className="relative flex flex-col items-center text-center">
                <Link href={`/user/${creator.id}`} className="block relative group/avatar">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl transition-transform group-hover/avatar:scale-105">
                        <AvatarImage src={creator.avatar_url} />
                        <AvatarFallback className="text-2xl font-black bg-gradient-to-br from-gray-100 to-gray-200">
                            {creator.full_name?.[0] || creator.username?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                </Link>

                <div className="mt-6 space-y-2">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-red-600 transition-colors">
                        {creator.full_name || creator.username}
                    </h3>
                    <p className="text-xs font-black text-red-500 uppercase tracking-widest">@{creator.username}</p>
                </div>

                <p className="mt-4 text-[13px] text-gray-500 font-medium leading-relaxed max-w-[240px] line-clamp-2">
                    {creator.bio || "Exploring the boundaries of digital art and pixel-perfect design."}
                </p>

                {/* Skills Badges */}
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {(creator.skills || ["Design", "Creative", "Digital"]).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/60 border border-white rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="mt-8 flex items-center justify-center gap-6 w-full py-4 bg-white/60 rounded-3xl border border-white shadow-sm">
                    <div className="text-center">
                        <div className="flex items-center gap-1 text-gray-900 font-black text-sm">
                            <ImageIcon className="w-3.5 h-3.5 text-red-500" />
                            {creator.design_count}
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5 block">Designs</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="text-center">
                        <div className="flex items-center gap-1 text-gray-900 font-black text-sm">
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                            {creator.total_likes}
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5 block">Likes</span>
                    </div>
                </div>

                {/* Work Preview */}
                <div className="mt-8 grid grid-cols-3 gap-2 w-full">
                    {creator.top_designs.slice(0, 3).map((design) => (
                        <div key={design.id} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group/work">
                            <img
                                src={design.image_url}
                                alt="Work"
                                className="h-full w-full object-cover transition-transform group-hover/work:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover/work:bg-transparent transition-colors" />
                        </div>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - creator.top_designs.length) }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-2xl bg-gray-50/50 border-2 border-dashed border-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-200" />
                        </div>
                    ))}
                </div>

                <Link href={`/user/${creator.id}`} className="mt-8 w-full">
                    <Button className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-100 transition-all active:scale-[0.98]">
                        <Briefcase className="w-3.5 h-3.5 mr-2" />
                        View Portfolio
                    </Button>
                </Link>
            </div>
        </div>
    )
}
