import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import { FilterBar } from "@/components/features/explore/FilterBar"
import { Button } from "@/components/ui/button"
import { getDesignsByCategory } from "@/data/mockDesigns"

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const params = await searchParams
    const category = params.category

    // Get designs filtered by category from mock data
    const displayDesigns = getDesignsByCategory(category)

    return (
        <div className="min-h-screen bg-white pb-20">
            <FilterBar />

            <div className="max-w-[2000px] mx-auto pt-8 px-4">
                {displayDesigns.length > 0 ? (
                    <MasonryGrid designs={displayDesigns} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No designs found for this category.</p>
                    </div>
                )}

                <div className="flex justify-center mt-16 mb-8">
                    <Button variant="secondary" size="lg" className="h-14 px-10 rounded-full text-base font-medium shadow-sm hover:shadow-md transition-all">
                        Load More Designs
                    </Button>
                </div>
            </div>
        </div>
    )
}
