import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Bell, Search, Filter, CheckCircle2 } from "lucide-react"
import { NotificationItem } from "@/components/features/notifications/NotificationItem"

const MOCK_NOTIFICATIONS = [
    {
        id: "1",
        type: "like",
        created_at: "2024-01-20T10:00:00Z",
        is_read: false,
        actor: {
            first_name: "Alex",
            last_name: "Rivera",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
            username: "arivera"
        },
        design: {
            id: "d1",
            title: "Minimalist Branding"
        }
    },
    {
        id: "2",
        type: "follow",
        created_at: "2024-01-19T14:30:00Z",
        is_read: true,
        actor: {
            first_name: "Sarah",
            last_name: "Chen",
            avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
            username: "schen"
        }
    },
    {
        id: "3",
        type: "message",
        created_at: "2024-01-18T09:15:00Z",
        is_read: false,
        actor: {
            first_name: "Marcus",
            last_name: "Thorne",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
            username: "mthorne"
        }
    }
]

export default async function NotificationsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 overflow-x-hidden" suppressHydrationWarning>
            <div className="max-w-3xl mx-auto px-6 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            Activity
                            <div className="h-1.5 w-1.5 bg-red-600 rounded-full animate-pulse" />
                        </h1>
                        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">Your notifications & updates</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group flex-1 md:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 h-3.5 w-3.5" />
                            <input
                                placeholder="Search activity..."
                                className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-50 focus:border-red-200 outline-none text-[12px] font-medium transition-all w-full md:w-56"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50/10 transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Notifications List Wrapper */}
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-gray-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">All Recent Activity</span>
                        </div>
                        <button className="flex items-center gap-1.5 text-[10px] font-black text-red-600 uppercase tracking-widest hover:text-black transition-colors group">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark all read</span>
                        </button>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {MOCK_NOTIFICATIONS.length > 0 ? (
                            MOCK_NOTIFICATIONS.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))
                        ) : (
                            <div className="py-24 flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                    <Bell className="w-8 h-8 text-gray-200" />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-900 font-black text-sm">All caught up!</p>
                                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mt-1">No new notifications for you</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Integration/Newsletter Section - Standardized design */}
                <div className="p-8 bg-gray-900 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between border border-gray-800">
                    <div className="flex items-center gap-6 z-10">
                        <div className="p-4 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-900/30">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-white tracking-tight leading-tight">Creator Updates</h3>
                            <p className="text-[12px] text-gray-400 font-medium italic">Get curated design trends once a week.</p>
                        </div>
                    </div>
                    <button className="z-10 bg-white hover:bg-red-600 hover:text-white text-gray-900 text-[11px] font-black uppercase tracking-widest py-3 px-8 rounded-full transition-all active:scale-95">
                        Stay Updated
                    </button>
                    <div className="absolute right-0 top-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    )
}
