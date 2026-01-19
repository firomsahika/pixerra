"use client"

import { useState, useMemo } from "react"
import { CreatorCard } from "@/components/features/creators/CreatorCard"
import { Users, Star, TrendingUp, Briefcase } from "lucide-react"
import { MOCK_CREATORS } from "@/data/mockCreators"

type FilterType = "popular" | "staff" | "recent"

export default function CreatorsPage() {
    const [filter, setFilter] = useState<FilterType>("popular")
    const [images, setImages] = useState<string[]>([])

    const filteredCreators = useMemo(() => {
        const creators = [...MOCK_CREATORS]
        switch (filter) {
            case "popular":
                return creators.sort((a, b) => b.total_likes - a.total_likes)
            case "staff":
                // Simulate staff picks by picking specific IDs or just a subset
                return creators.filter(c => ["c1", "c4"].includes(c.id))
            case "recent":
                // Simulate recently active by sorting by design count or reversing
                return creators.sort((a, b) => b.design_count - a.design_count)
            default:
                return creators
        }
    }, [filter])

    // Functionality for multi-upload of images
    const handleMultiUpload = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const uploadedImages = Array.from(files).map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...uploadedImages])
        // Logic to handle the uploaded images
        // Set the first image as thumbnail
        const thumbnail = uploadedImages[0];
        // Update state or perform actions with images
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-white pt-24 pb-20 px-4">
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50/40 rounded-full blur-[120px] -z-10 animate-blob" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

            <div className="max-w-7xl mx-auto relative">
                {/* Premium Header */}
                <div className="text-center space-y-6 mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black tracking-[0.2em] uppercase">
                        Creatives Guild
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none">
                        Discover the <span className="text-red-600">Creators.</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                        Connect with the world's most talented designers. From minimalist architects to digital visionaries, find the perfect talent for your next project.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <button
                        onClick={() => setFilter("popular")}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === "popular"
                                ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                : "bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Popular
                    </button>
                    <button
                        onClick={() => setFilter("staff")}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === "staff"
                                ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                : "bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <Star className="w-4 h-4" />
                        Staff Picks
                    </button>
                    <button
                        onClick={() => setFilter("recent")}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === "recent"
                                ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                : "bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        Recently Active
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCreators.length > 0 ? (
                        filteredCreators.map((creator) => (
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
                                <button className="px-10 py-4 bg-red-600 hover:bg-white hover:text-gray-900 text-white font-black rounded-full transition-all shadow-xl shadow-red-900/20 active:scale-95">
                                    Post a Project
                                </button>
                                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-black rounded-full transition-all active:scale-95">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full md:w-1/3 aspect-square hidden md:block">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow" />
                            <div className="grid grid-cols-2 gap-4">
                                {MOCK_CREATORS.slice(0, 4).map((c, i) => (
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
                    <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px]" />
                </div>

                {/* File upload input for creators */}
                <div className="mt-16">
                    <input
                        type="file"
                        multiple
                        onChange={(e) => handleMultiUpload(e.target.files)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all"
                    />
                </div>

                {/* Display uploaded images below the thumbnail */}
                <div className="uploaded-images grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {images.map((image, index) => (
                        <div key={index} className="uploaded-image-wrapper relative rounded-[32px] overflow-hidden group">
                            <img src={image} alt={`Uploaded design ${index + 1}`} className="uploaded-image h-full w-full object-cover rounded-[32px] transition-transform duration-300 ease-in-out group-hover:scale-105" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

