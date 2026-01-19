import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, FolderPlus, Share2, MessageCircle, MoreHorizontal, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDesignById, getUserDesigns } from "@/app/actions/design"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ViewCounter } from "@/components/features/design/ViewCounter"
import { DesignImagePresentation } from "@/components/features/design/DesignImagePresentation"


export default async function DesignDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const design = await getDesignById(id)

    if (!design) {
        return (
            <div className="flex bg-white min-h-[60vh] items-center justify-center flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Design not found</h2>
                <p className="text-gray-500">This design may have been removed or made private.</p>
                <Link href="/">
                    <Button className="rounded-full px-8">Back to Home</Button>
                </Link>
            </div>
        )
    }

    // Fetch more from author
    const authorDesigns = await getUserDesigns(design.user_id)
    const otherDesigns = authorDesigns.filter(d => d.id !== design.id).slice(0, 4)

    return (
        <div className="min-h-screen bg-white pb-20 pt-10" suppressHydrationWarning>
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Subtle Breadcrumbs */}
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Gallery
                </Link>

                {/* Main Design Card */}
                <div className="bg-white rounded-[32px] border border-gray-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden" suppressHydrationWarning>

                    {/* Header: Author & Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 space-y-4 sm:space-y-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full ring-2 ring-gray-50 shadow-sm overflow-hidden flex-shrink-0">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src={design.user.avatar_url} />
                                    <AvatarFallback className="bg-red-50 text-red-600 font-bold">{design.user.username[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">{design.title}</h1>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-semibold text-gray-900 hover:underline cursor-pointer">{design.user.username}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-red-500 font-medium hover:underline cursor-pointer">Follow</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="flex-1 sm:flex-none gap-2 rounded-full font-medium h-11 px-6 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                <FolderPlus className="w-4 h-4" />
                                Save
                            </Button>
                            <Button className="flex-1 sm:flex-none gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium h-11 px-8 shadow-md shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                <Heart className={cn("w-4 h-4", design.is_liked && "fill-current")} />
                                {design.is_liked ? 'Liked' : 'Like'}
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image Presentation */}
                    <DesignImagePresentation imageUrl={design.image_url} title={design.title} />

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row border-t border-gray-100">
                        {/* Description & Social */}
                        <div className="w-full lg:w-2/3 p-8 lg:p-12 space-y-8">
                            <div className="prose prose-gray max-w-none">
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    {design.description || "No description provided."}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button variant="ghost" size="sm" className="rounded-full text-gray-500 gap-2 px-4">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </Button>
                                <Button variant="ghost" size="sm" className="rounded-full text-gray-500 gap-2 px-4">
                                    <MessageCircle className="w-4 h-4" />
                                    0 Comments
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full text-gray-500 ml-auto">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar: Details & Tags */}
                        <div className="w-full lg:w-1/3 p-8 lg:p-12 bg-gray-50/30 border-l border-gray-100 space-y-10">
                            {/* Detailed Metrics */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Views</p>
                                    <p className="text-2xl font-bold text-gray-900">{(design.views_count ?? 0).toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Likes</p>
                                    <p className="text-2xl font-bold text-gray-900">{(design.likes_count ?? 0).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {design.tags && design.tags.length > 0 ? (
                                        design.tags.map((tag: string) => (
                                            <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-600 border border-gray-100 hover:border-red-200 hover:text-red-600 transition-colors cursor-pointer">
                                                #{tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400">No tags</span>
                                    )}
                                </div>
                            </div>

                            {/* More Info */}
                            <div className="pt-6 border-t border-gray-200/60">
                                <p className="text-xs text-gray-400 font-medium" suppressHydrationWarning>Published on {format(new Date(design.created_at), 'MMM dd, yyyy')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More from Author Section (Simplified Mock) */}
                <div className="mt-20 space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h3 className="text-xl font-bold text-gray-900">More by {design.user.username}</h3>
                        <Link href={`/profile/${design.user.username}`} className="text-red-600 font-semibold hover:underline text-sm">View Profile</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {otherDesigns.length > 0 ? (
                            otherDesigns.map((d) => (
                                <Link key={d.id} href={`/design/${d.id}`} className="group aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
                                    <Image
                                        src={d.image_url}
                                        alt={d.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                </Link>
                            ))
                        ) : (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                                    <div className="w-8 h-8 rounded-full bg-gray-100" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <ViewCounter designId={id} />
        </div>
    )
}
