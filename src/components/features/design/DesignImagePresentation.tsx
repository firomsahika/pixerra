"use client"

import { useState } from "react"
import Image from "next/image"
import { Maximize2 } from "lucide-react"
import { ImageLightbox } from "./ImageLightbox"

interface DesignImagePresentationProps {
    imageUrl: string
    title: string
}

export function DesignImagePresentation({ imageUrl, title }: DesignImagePresentationProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    return (
        <>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
                <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="group relative w-full rounded-2xl overflow-hidden bg-gray-50/30 flex items-center justify-center min-h-[400px] border border-gray-100/50 cursor-zoom-in transition-all hover:shadow-xl hover:shadow-black/5"
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={1600}
                        height={1200}
                        className="w-full h-auto object-contain shadow-2xl shadow-black/5"
                        priority
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Maximize2 className="w-6 h-6 text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>

            <ImageLightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                imageUrl={imageUrl}
                title={title}
            />
        </>
    )
}
