import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { MessageCircle, Search, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

export default async function MessagesPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // Fetch conversations
    // We get all messages where user is sender or receiver
    const { data: messages } = await supabase
        .from("messages")
        .select(`
            id,
            content,
            created_at,
            sender_id,
            receiver_id,
            sender:sender_id (full_name, avatar_url, username),
            receiver:receiver_id (full_name, avatar_url, username)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false })

    // Process messages to get unique conversations (latest message per person)
    const conversationsMap = new Map()

    messages?.forEach((msg: any) => {
        const otherUser = msg.sender_id === user.id ? msg.receiver : msg.sender
        const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id

        if (!conversationsMap.has(otherUserId)) {
            conversationsMap.set(otherUserId, {
                userId: otherUserId,
                profile: otherUser,
                lastMessage: msg.content,
                createdAt: msg.created_at,
                isUnread: msg.receiver_id === user.id && !msg.is_read
            })
        }
    })

    const conversations = Array.from(conversationsMap.values())

    return (
        <div className="min-h-screen relative overflow-hidden bg-white pt-24 pb-20 px-4">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -z-10 animate-blob" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

            <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row gap-8 h-full md:h-[700px]">
                {/* Sidebar / List */}
                <div className="w-full md:w-[400px] flex flex-col gap-6 h-full">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase">
                            Secure Chat
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight px-1">Messages</h1>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
                            <input
                                placeholder="Search conversations..."
                                className="w-full pl-11 pr-4 py-4 bg-white/60 backdrop-blur-md border border-gray-100 rounded-[24px] focus:bg-white focus:ring-4 focus:ring-blue-100/50 transition-all outline-none font-bold text-sm shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                        {conversations.length > 0 ? (
                            conversations.map((chat) => (
                                <Link
                                    key={chat.userId}
                                    href={`/messages/${chat.userId}`}
                                    className="flex items-center gap-5 p-5 rounded-[32px] bg-white/40 backdrop-blur-md border border-gray-100/50 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-100/20 transition-all group relative overflow-hidden active:scale-[0.98]"
                                >
                                    <Avatar className="h-16 w-16 border-2 border-white shadow-md transition-transform group-hover:rotate-3">
                                        <AvatarImage src={chat.profile.avatar_url} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-400 font-black">
                                            {chat.profile.full_name[0]}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h3 className="font-black text-gray-900 truncate text-[15px]">{chat.profile.full_name}</h3>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                                {formatDistanceToNow(new Date(chat.createdAt), { addSuffix: false })}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate leading-snug ${chat.isUnread ? "text-blue-600 font-black" : "text-gray-500 font-medium"}`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>

                                    {chat.isUnread && (
                                        <div className="h-2.5 w-2.5 bg-blue-600 rounded-full shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.4)] animate-pulse ml-2" />
                                    )}

                                    {/* Hover indicator */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-[48px] border border-gray-100 shadow-sm">
                                <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full mb-8 animate-float">
                                    <Mail className="w-10 h-10 text-gray-300" />
                                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-100 rounded-full animate-ping" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Inbox is empty</h2>
                                <p className="text-gray-500 font-medium max-w-xs mx-auto mb-8">
                                    Don't be shy! Start a conversation with designers you find inspiring.
                                </p>
                                <Link href="/explore">
                                    <button className="px-10 py-4 bg-gray-900 text-white font-black rounded-full hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95">
                                        Discover Creators
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Empty State Detail */}
                <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-white/40 backdrop-blur-3xl rounded-[56px] border border-white shadow-2xl shadow-gray-100/50 p-12 text-center relative overflow-hidden group">
                    <div className="relative z-10 max-w-sm space-y-8">
                        <div className="relative mx-auto w-40 h-40 flex items-center justify-center bg-blue-50/50 rounded-full animate-float">
                            <MessageCircle className="w-20 h-20 text-blue-600 fill-blue-500/10" />
                            {/* Decorative dots */}
                            <div className="absolute top-4 right-4 w-4 h-4 bg-blue-400/20 rounded-full blur-[2px]" />
                            <div className="absolute bottom-6 left-2 w-3 h-3 bg-red-400/20 rounded-full blur-[1px]" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Focus on Connection</h2>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Collaborative design starts with a single message. Select a designer to begin your next big thing.
                            </p>
                        </div>
                    </div>

                    {/* Background decor */}
                    <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[80px]" />
                    <div className="absolute -left-10 -top-10 w-[200px] h-[200px] bg-red-100/10 rounded-full blur-[40px]" />
                </div>
            </div>
        </div>
    )
}
