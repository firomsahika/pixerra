"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, FolderPlus } from "lucide-react"
import { toggleLike } from "@/app/actions/design"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Design {
    id: string
    title: string
    image_url: string
    user: {
        username: string
        avatar_url?: string
    }
    likes_count: number
    views_count: number
    is_liked?: boolean
}

interface DesignCardProps {
    design: Design
}

export function DesignCard({ design }: DesignCardProps) {
    const [isLiked, setIsLiked] = useState(design.is_liked || false)
    const [likesCount, setLikesCount] = useState(design.likes_count)
    const [isLiking, setIsLiking] = useState(false)

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation
        if (isLiking) return

        // Optimistic update
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1)

        setIsLiking(true)
        try {
            await toggleLike(design.id)
        } catch (error) {
            // Revert on error
            setIsLiked(!newIsLiked)
            setLikesCount(prev => !newIsLiked ? prev + 1 : prev - 1)
            console.error("Failed to toggle like", error)
        } finally {
            setIsLiking(false)
        }
    }

    return (
        <div className="group relative break-inside-avoid mb-6 rounded-2xl overflow-hidden cursor-pointer" suppressHydrationWarning>
            <Link href={`/design/${design.id}`}>
                <div className="relative w-full">
                    <Image
                        src={design.image_url}
                        alt={design.title}
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                            <FolderPlus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                                {design.user.avatar_url && (
                                    <Image src={design.user.avatar_url} alt={design.user.username} width={24} height={24} />
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{design.user.username}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLike}
                                className={cn(
                                    "p-2 backdrop-blur-sm rounded-full transition flex items-center gap-1.5 px-3",
                                    isLiked ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/90 text-gray-900 hover:bg-white"
                                )}
                            >
                                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                                <span className="text-xs font-bold">{likesCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
