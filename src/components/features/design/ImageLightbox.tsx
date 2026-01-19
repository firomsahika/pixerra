"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"

interface ImageLightboxProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    title: string
}

export function ImageLightbox({ isOpen, onClose, imageUrl, title }: ImageLightboxProps) {
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const constraintsRef = useRef<HTMLDivElement>(null)

    // Reset state on close
    useEffect(() => {
        if (!isOpen) {
            setScale(1)
            setPosition({ x: 0, y: 0 })
        }
    }, [isOpen])

    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4))
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1))

    const handleWheel = (e: React.WheelEvent) => {
        if (e.deltaY < 0) {
            handleZoomIn()
        } else {
            handleZoomOut()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onWheel={handleWheel}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose()
                    }}
                >
                    {/* Controls */}
                    <div className="absolute top-6 right-6 flex items-center gap-4 z-[110]">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <button onClick={handleZoomOut} className="p-1 hover:text-red-500 transition-colors text-white">
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <span className="text-white text-sm font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
                            <button onClick={handleZoomIn} className="p-1 hover:text-red-500 transition-colors text-white">
                                <ZoomIn className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all transform hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute top-6 left-6 text-white/70 text-sm font-medium z-[110]">
                        {title}
                    </div>

                    {/* Image Container */}
                    <motion.div
                        ref={constraintsRef}
                        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                    >
                        <motion.div
                            drag={scale > 1}
                            dragConstraints={constraintsRef}
                            style={{ scale, x: position.x, y: position.y }}
                            animate={{ scale }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-[90vw] h-[90vh]"
                        >
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-contain pointer-events-none select-none"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* Footer Info */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs z-[110]">
                        Scroll to zoom • Drag to pan
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
