"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { DESIGN_CATEGORIES } from "@/data/mockDesigns"

const filters = [...DESIGN_CATEGORIES]


export function FilterBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeFilter = searchParams.get("category") || "All"

    const handleFilterClick = (filter: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (filter === "All") {
            params.delete("category")
        } else {
            params.set("category", filter)
        }
        router.push(`/explore?${params.toString()}`)
    }

    return (
        <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4 transition-all">
            <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0 mask-image-gradient">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === filter
                                ? "bg-red-600 text-white shadow-md transform scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Sort / Mobile Filter */}
                <div className="flex items-center gap-3 w-full md:w-auto ml-auto">
                    <Button variant="outline" className="gap-2 rounded-full border-gray-200 hover:bg-gray-50">
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </Button>
                    <Button variant="outline" className="gap-2 rounded-full border-gray-200 hover:bg-gray-50">
                        Recommended <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
