import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { GuestLanding } from "@/components/features/home/GuestLanding"

// Mock data for initial display to ensure visual richness immediately
const FEATURED_DESIGNS = [
  {
    id: "1",
    title: "Minimalist Workspace",
    image_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    user: {
      username: "design_daily",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 120,
    views_count: 450
  },
  {
    id: "2",
    title: "Abstract Gradient",
    image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    user: {
      username: "color_master",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 85,
    views_count: 320
  },
  {
    id: "3",
    title: "Neon City",
    image_url: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop",
    user: {
      username: "night_owl",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 210,
    views_count: 890
  },
  {
    id: "4",
    title: "Geometric Pattern",
    image_url: "https://images.unsplash.com/photo-1550059378-c07a97637841?q=80&w=1974&auto=format&fit=crop",
    user: {
      username: "geo_shapes",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 145,
    views_count: 600
  },
  {
    id: "5",
    title: "Mountain View",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    user: {
      username: "nature_lover",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 320,
    views_count: 1200
  },
  {
    id: "6",
    title: "Modern Architecture",
    image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1974&auto=format&fit=crop",
    user: {
      username: "arch_digest",
      avatar_url: "https://github.com/shadcn.png"
    },
    likes_count: 190,
    views_count: 750
  }
]

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // Authenticated View - Feed
    return (
      <div className="flex flex-col min-h-screen bg-white pt-4">
        <section className="py-8 px-4 flex-1">
          <div className="max-w-[2000px] mx-auto">
            {/* Personalized Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-4 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, <span className="text-red-600">{user.user_metadata?.full_name?.split(' ')[0] || 'Creative'}</span>
                </h1>
                <p className="text-gray-500 mt-1">Here's some fresh inspiration for your next project.</p>
              </div>

              {/* Category Filters (Mock) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {["All", "Web Design", "Graphics", "UI/UX", "Mobile", "3D"].map((cat, i) => (
                  <button
                    key={cat}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${i === 0 ? "bg-red-600 text-white shadow-md shadow-red-100" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <MasonryGrid designs={FEATURED_DESIGNS} />

            <div className="flex justify-center mt-12 pb-12">
              <Button variant="outline" className="rounded-full px-8 h-12 font-semibold">Load more inspiration</Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Guest View - Delegated to the stylish GuestLanding client component
  return <GuestLanding featuredDesigns={FEATURED_DESIGNS} />
}
