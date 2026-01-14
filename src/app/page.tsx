import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import {
  ArrowRight,
  Search,
  UploadCloud,
  Sparkles,
  Globe,
  Users,
  Briefcase,
  Mail,
  Zap,
  CheckCircle2
} from "lucide-react"

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

  // Guest View - Landing Page
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 bg-gradient-to-b from-white via-red-50/30 to-white">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold tracking-wide mb-4 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          DISCOVER THE NEW PIXERRA
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-5xl leading-[1.1]">
          Ethiopia's destination for <span className="text-red-600">design excellence</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Pixerra is the leading platform for creators to showcase their work, find inspiration, and connect with the global creative community.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <Link href="/explore">
            <Button size="sm" className="h-16 px-10 text-lg rounded-full font-bold shadow-xl shadow-red-200 hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-red-600">
              Explore Designs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" variant="outline" className="h-16 px-10 text-lg rounded-full border-2 font-bold hover:bg-gray-50 transition-all transform hover:-translate-y-1">
              Sign Up Free
            </Button>
          </Link>
        </div>

        {/* Floating visual elements (decor) */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />
      </section>

      {/* Featured Grid Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-end justify-between mb-12 px-4 md:px-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Creations</h2>
              <p className="text-gray-500 text-lg">Hand-picked designs from our top-tier creators.</p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 group">
              Explore all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <MasonryGrid designs={FEATURED_DESIGNS} />
          <div className="flex justify-center mt-16 px-4">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="h-14 px-12 rounded-full border-gray-200 text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all">
                View more design works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Showcase your creativity</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Get your work in front of the right people in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Build your Profile",
                desc: "Create a professional profile that reflects your unique style and skills.",
                icon: <Users className="w-8 h-8 text-red-600" />
              },
              {
                step: "02",
                title: "Upload & Organize",
                desc: "Share your best work with high-quality images and detailed descriptions.",
                icon: <UploadCloud className="w-8 h-8 text-red-600" />
              },
              {
                step: "03",
                title: "Get Discovered",
                desc: "Connect with thousands of designers and potential clients globally.",
                icon: <Globe className="w-8 h-8 text-red-600" />
              }
            ].map((item, i) => (
              <div key={i} className="relative group p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-red-50 hover:-translate-y-2">
                <div className="mb-8 p-4 bg-red-50 rounded-3xl w-fit group-hover:bg-red-600 group-hover:text-slate-300 transition-colors">
                  {item.icon}
                </div>
                <div className="absolute top-8 right-10 text-5xl font-black text-gray-100 group-hover:text-red-50 transition-colors">{item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-12">
                  <div className="bg-red-50 rounded-[40px] aspect-square flex items-center justify-center p-8 mb-4">
                    <Sparkles className="w-16 h-16 text-red-600" />
                  </div>
                  <div className="bg-gray-100 rounded-[40px] aspect-square" />
                </div>
                <div>
                  <div className="bg-gray-900 rounded-[40px] aspect-square flex items-center justify-center p-8 mb-4">
                    <Zap className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="bg-blue-50 rounded-[40px] aspect-square" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <div className="text-red-600 font-bold tracking-widest text-sm">WHT PIXERRA?</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Everything you need to grow as a designer</h2>
              <p className="text-xl text-gray-500 leading-relaxed">
                We've built a platform that combines the best parts of a social network, a portfolio site, and a job board.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Global Inspiration",
                  "Portfolio Management",
                  "Client Discovery",
                  "Asset Store",
                  "Community Workshops",
                  "Job Board Access"
                ].map((service) => (
                  <li key={service} className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-10 rounded-full font-bold bg-gray-900 text-white hover:bg-black transition-all">
                    Start creating today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Mock */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[50px] bg-red-600 p-12 md:p-24 text-center space-y-8 text-white">
            <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
              Ready to embark on your design journey?
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Join over 50,000+ designers and start sharing your work with the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 text-lg rounded-full font-bold bg-white text-red-600 hover:bg-gray-100 transition-all">
                  Join for Free
                </Button>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 font-bold hover:text-red-100 transition-colors">
                <Mail className="w-5 h-5" />
                Contact Sales
              </Link>
            </div>

            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
