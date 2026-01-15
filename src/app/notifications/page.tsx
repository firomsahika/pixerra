import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { NotificationItem } from "@/components/features/notifications/NotificationItem"
import { Bell, Settings } from "lucide-react"

export default async function NotificationsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // Fetch notifications with actor profile and design info
    const { data: notifications } = await supabase
        .from("notifications")
        .select(`
            id,
            type,
            created_at,
            is_read,
            actor:actor_id (
                full_name,
                avatar_url,
                username
            ),
            design:design_id (
                id,
                title,
                image_url
            )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="min-h-screen relative overflow-hidden bg-white pt-24 pb-20 px-4">
            {/* Soft decorative background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] -z-10" />

            <div className="max-w-2xl mx-auto relative">
                {/* Premium Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black tracking-[0.2em] uppercase">
                        Activity Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Your Notifications
                    </h1>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">
                        Stay connected with the community and see who's interacting with your creative work.
                    </p>
                </div>

                <div className="space-y-4">
                    {notifications && notifications.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between px-2 mb-2">
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Activity</span>
                                <button className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">Mark all as read</button>
                            </div>
                            {notifications.map((notif: any) => (
                                <NotificationItem key={notif.id} notification={notif} />
                            ))}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-[48px] border border-white shadow-2xl shadow-gray-100/50">
                            <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full mb-8 animate-float">
                                <Bell className="w-10 h-10 text-gray-300" />
                                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-100 rounded-full animate-ping" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Clean slate!</h2>
                            <p className="text-gray-500 font-medium max-w-xs mx-auto">
                                No notifications yet. Share your designs to start getting noticed!
                            </p>
                            <Link href="/upload" className="mt-8 inline-block px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-black transition-all shadow-xl shadow-red-100">
                                Share a Design
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="mt-20 p-10 bg-gray-900 rounded-[48px] text-white overflow-hidden relative group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Developer Insights</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                            Wondering how we handle and display these notifications in real-time? Check out the technical documentation.
                        </p>
                        <Link
                            href="/notifications/explanation.md"
                            className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-bold transition-all group/link"
                        >
                            Read technical.md
                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    {/* Abstract decor */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-colors" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    )
}
