"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import { Sparkles, ArrowRight, Filter, Loader2 } from "lucide-react"
import { getDesigns } from "@/app/actions/design"

interface Design {
    id: string
    title: string
    category: string
    image_url: string
    user: {
        username: string
        avatar_url?: string
    }
    likes_count: number
    views_count: number
}

interface UserHomeProps {
    user: any
    initialDesigns: any[]
}

const CATEGORIES = ["All", "Web Design", "Graphics", "UI/UX", "Mobile", "3D"]

export function UserHome({ user, initialDesigns }: UserHomeProps) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [designs, setDesigns] = useState(initialDesigns)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (selectedCategory === "All" && initialDesigns.length > 0 && designs === initialDesigns) return

        const fetchFilteredDesigns = async () => {
            setIsLoading(true)
            try {
                const fetched = await getDesigns(selectedCategory)
                setDesigns(fetched)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchFilteredDesigns()
    }, [selectedCategory])

    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Creative'

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section for Logged-in User */}
            <section className="relative pt-20 pb-16 px-6 overflow-hidden" suppressHydrationWarning>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-50/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] -z-10" />

                <div className="max-w-[2000px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Personalized for you
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                                Welcome back, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                                    {firstName}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-500 max-w-xl font-medium leading-relaxed">
                                Ready to create something amazing today? Here's the latest inspiration from the creative world.
                            </p>
                        </div>

                        {/* Quick Stats or Actions could go here */}
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="rounded-full px-6 h-12 font-bold border-2 hover:bg-gray-50 transition-all">
                                View Your Feed
                            </Button>
                            <Button className="rounded-full px-6 h-12 font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 transition-all">
                                Post a Design
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24 px-6">
                <div className="max-w-[2000px] mx-auto">
                    {/* Category Filter Bar */}
                    <div className="sticky top-[72px] z-30 py-6 bg-white/80 backdrop-blur-xl border-b border-gray-100 mb-12" suppressHydrationWarning>
                        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-500 mr-2">
                                    <Filter className="w-5 h-5" />
                                </div>
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${selectedCategory === cat
                                            ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200 scale-105"
                                            : "bg-white border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-gray-400">
                                    Showing <span className="text-gray-900">{designs.length}</span> inspiration pieces
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feed Grid */}
                    <div className="relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[400px]">
                                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
                            </div>
                        )}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <MasonryGrid designs={designs} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {!isLoading && designs.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-12 h-12 text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No designs found</h3>
                            <p className="text-gray-500 max-w-sm font-medium">
                                We couldn't find any designs in the {selectedCategory} category. Try another one!
                            </p>
                        </div>
                    )}

                    {/* Load More */}
                    {!isLoading && designs.length > 0 && (
                        <div className="flex justify-center mt-20">
                            <Button variant="outline" size="lg" className="h-16 px-14 rounded-full border-2 border-gray-100 text-gray-900 font-bold hover:bg-gray-50 hover:border-red-200 transition-all shadow-sm">
                                View more inspiration <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
