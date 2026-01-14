import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, BarChart3 } from "lucide-react"

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    const { data: designs } = await supabase
        .from('designs')
        .select(`
        *,
        user:user_id (username, avatar_url)
     `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-[2000px] mx-auto">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your designs and view your analytics.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 rounded-full h-10 px-5">
                            <BarChart3 className="w-4 h-4" />
                            View Analytics
                        </Button>
                        <Link href="/upload">
                            <Button className="gap-2 rounded-full h-10 px-5 shadow-md shadow-black/20">
                                <Plus className="w-4 h-4" />
                                New Design
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    {['Total Views', 'Total Likes', 'Followers'].map((label, i) => (
                        <div key={label} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">{label}</h3>
                            <p className="text-4xl font-bold text-gray-900">{['12.5k', '843', '128'][i]}</p>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-3 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                                <span>+12%</span>
                                <span>this week</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Uploads</h2>
                        <button className="text-sm font-medium text-gray-500 hover:text-black">Manage all</button>
                    </div>

                    {designs && designs.length > 0 ? (
                        <MasonryGrid designs={designs} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Create your first design</h3>
                            <p className="text-gray-500 mb-6 max-w-sm text-center">Share your creative work with the world and start building your portfolio.</p>
                            <Link href="/upload">
                                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-black/10">Upload Design</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
