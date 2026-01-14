"use client"

import { DesignCard } from "./DesignCard"

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
}

interface MasonryGridProps {
    designs: Design[]
}

export function MasonryGrid({ designs }: MasonryGridProps) {
    return (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 p-4 mx-auto max-w-[2000px]">
            {designs.map((design) => (
                <DesignCard key={design.id} design={design} />
            ))}
        </div>
    )
}
