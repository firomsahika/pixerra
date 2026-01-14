import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

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
            <div className="flex items-center justify-between mb-8 px-4">
              <h1 className="text-2xl font-bold text-gray-900">For You</h1>
            </div>
            <MasonryGrid designs={FEATURED_DESIGNS} />
            <div className="flex justify-center mt-12 pb-12">
              {/* Pagination or load more could go here */}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Guest View - Landing Page
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl leading-tight">
          Discover the Ethiopian's top <span className="text-red-600">designers</span> & creatives
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Pixerra is the leading destination to find & showcase creative work and get inspired by the best professionals in the industry.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link href="/explore">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">Explore Designs</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 font-medium">Sign Up Free</Button>
          </Link>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-16 px-4 flex-1">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-2xl font-bold text-gray-900">Featured Designs</h2>
            <Link href="/explore" className="text-sm font-medium text-red-600 hover:text-red-700">View all</Link>
          </div>
          <MasonryGrid designs={FEATURED_DESIGNS} />
          <div className="flex justify-center mt-12 pb-12">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-gray-300 hover:bg-gray-50">See more designs</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
