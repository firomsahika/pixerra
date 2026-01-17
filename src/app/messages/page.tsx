import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { MessageCircle, Search, Settings, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { MOCK_CONVERSATIONS } from "@/data/mockMessages"

export default async function MessagesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const conversations = MOCK_CONVERSATIONS

    return (
        <div className="h-screen w-full overflow-hidden bg-white pt-20" suppressHydrationWarning>
            <div className="h-full flex max-w-[1600px] mx-auto border-x border-gray-100 bg-white shadow-sm">

                {/* Threads Sidebar */}
                <div className="w-full md:w-[320px] lg:w-[380px] border-r border-gray-100 flex flex-col bg-[#f9f9f9]/30">
                    <div className="p-6 border-b border-gray-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-black text-gray-900 tracking-tight">Recent Messages</h1>
                            <div className="flex gap-1">
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 h-3.5 w-3.5" />
                            <input
                                placeholder="Search messages"
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-gray-200 outline-none text-[12px] font-medium transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {conversations.map((chat) => (
                            <Link
                                key={chat.userId}
                                href={`/messages/${chat.userId}`}
                                className="flex items-center gap-3 p-4 border-b border-gray-50 hover:bg-white transition-all group relative"
                            >
                                <div className="relative shrink-0">
                                    <Avatar className="h-10 w-10 border border-white shadow-sm">
                                        <AvatarImage src={chat.profile.avatar_url} />
                                        <AvatarFallback className="bg-gray-100 text-gray-400 font-bold text-xs">{chat.profile.full_name[0]}</AvatarFallback>
                                    </Avatar>
                                    {chat.isUnread && (
                                        <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-white" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <h3 className="text-[13px] font-bold text-gray-900 truncate">{chat.profile.full_name}</h3>
                                        <span suppressHydrationWarning className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                                            {formatDistanceToNow(new Date(chat.createdAt), { addSuffix: false })}
                                        </span>
                                    </div>
                                    <p className={cn("text-[11px] truncate leading-tight", chat.isUnread ? "text-gray-900 font-bold" : "text-gray-500 font-medium")}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                <main className="hidden md:flex flex-1 flex-col items-center justify-center p-12 text-center bg-gray-50/10">
                    <div className="max-w-xs space-y-6">
                        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <MessageCircle className="w-8 h-8 text-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-black text-gray-900 tracking-tight">Your Inbox</h2>
                            <p className="text-[12px] text-gray-500 leading-relaxed font-semibold px-4">
                                Select a thread to start collaborating with pixel-perfect designers.
                            </p>
                        </div>
                        <Link href="/creators" className="inline-block px-8 py-3 bg-red-600 text-white font-black rounded-full hover:bg-black transition-all shadow-lg shadow-red-100 active:scale-95 text-[10px] uppercase tracking-widest">
                            New Conversation
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}
