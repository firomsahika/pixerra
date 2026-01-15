import { createClient } from "@/utils/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Info } from "lucide-react"
import { ChatBox } from "@/components/features/messages/ChatBox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function ConversationPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // 1. Fetch the other user's profile
    const { data: otherUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()

    if (!otherUser) {
        notFound()
    }

    // 2. Fetch messages
    const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${user.id})`)
        .order("created_at", { ascending: true })

    // 3. Mark as read
    await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("sender_id", id)
        .eq("receiver_id", user.id)
        .eq("is_read", false)

    return (
        <div className="min-h-screen relative overflow-hidden bg-white pt-24 pb-20 px-4">
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] -z-10 animate-blob" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50/20 rounded-full blur-[100px] -z-10 animate-blob animation-delay-4000" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 h-[800px] relative">
                {/* Compact Nav Sidebar */}
                <div className="hidden md:flex flex-col w-20 bg-white/40 backdrop-blur-xl rounded-[32px] border border-white shadow-2xl shadow-gray-100/30 p-4 items-center gap-8">
                    <Link
                        href="/messages"
                        className="p-4 bg-gray-900 rounded-2xl text-white hover:bg-black transition-all shadow-lg active:scale-90"
                        title="Back to inbox"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div className="w-full h-px bg-gray-100/50" />
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="font-black text-gray-400">U</AvatarFallback>
                    </Avatar>
                </div>

                {/* Main Chat Interface */}
                <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[48px] border border-white shadow-2xl shadow-gray-100/50 overflow-hidden flex flex-col relative group">
                    <ChatBox
                        currentUser={user}
                        otherUser={otherUser}
                        initialMessages={messages || []}
                    />
                </div>

                {/* Profile Info Sidebar */}
                <div className="hidden lg:flex flex-col w-80 bg-white/40 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl shadow-gray-100/30 p-10">
                    <div className="text-center space-y-6">
                        <div className="relative inline-block mx-auto">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                <AvatarImage src={otherUser.avatar_url} />
                                <AvatarFallback className="text-3xl font-black bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                                    {otherUser.full_name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-white rounded-full" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">{otherUser.full_name}</h3>
                            <p className="text-sm text-blue-600 font-black tracking-widest uppercase mt-1">@{otherUser.username}</p>
                        </div>

                        <p className="text-sm text-gray-500 font-medium leading-relaxed italic px-2">
                            {otherUser.bio || "Crafting digital experiences and pixel-perfect designs."}
                        </p>
                    </div>

                    <div className="mt-12 space-y-8 flex-1">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">Conversation Info</span>
                            <div className="p-5 bg-white/60 rounded-3xl border border-white shadow-sm space-y-3">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-gray-400">Joined</span>
                                    <span className="text-gray-900">Jan 2024</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-gray-400">Total Designs</span>
                                    <span className="text-gray-900">24</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-3 relative overflow-hidden">
                            <div className="flex items-center gap-3 text-blue-400 relative z-10">
                                <Info className="w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest">Privacy Info</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed relative z-10">
                                Your conversation is private. Messages are stored securely for both participants.
                            </p>
                            {/* Accent decor */}
                            <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
