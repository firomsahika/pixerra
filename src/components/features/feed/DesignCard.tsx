"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from 'react'
import { Heart, Eye, FolderPlus, Trash } from "lucide-react"
import { toggleLike } from "@/app/actions/design"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

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
    user_id?: string
}

interface DesignCardProps {
    design: Design
}

export function DesignCard({ design }: DesignCardProps) {
    const [isLiked, setIsLiked] = useState(design.is_liked || false)
    const [likesCount, setLikesCount] = useState(design.likes_count ?? 0)
    const [isLiking, setIsLiking] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Determine ownership on client-side using browser supabase session
        const supabase = createClient()
        supabase.auth.getUser().then(({ data }) => {
            if (data.user && design.user_id) {
                setIsOwner(data.user.id === design.user_id)
            }
        }).catch(() => { })
    }, [design.user_id])

    // Sync state with props when they change (e.g. after server-side revalidation)
    useEffect(() => {
        if (design.is_liked !== undefined) setIsLiked(design.is_liked)
        if (design.likes_count !== undefined) setLikesCount(design.likes_count)
    }, [design.id, design.is_liked, design.likes_count])

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

    // handle delete 
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        const ok = confirm('Delete this design? This action cannot be undone.')
        if (!ok) return
        setIsDeleting(true)
        try {
            const res = await fetch('/api/design/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ designId: design.id })
            })

            if (!res.ok) throw new Error('Delete failed')
            router.refresh()
        } catch (err) {
            console.error('Failed to delete design', err)
            alert('Failed to delete design')
        } finally {
            setIsDeleting(false)
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
                        {isOwner ? (
                            <button
                                onClick={handleDelete}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                disabled={isDeleting}
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        ) : (
                            <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                                <FolderPlus className="w-5 h-5" />
                            </button>
                        )}
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
