import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Search, Info, Settings, Plus, Phone, Video, Info as InfoIcon, Paperclip } from "lucide-react"
import { ChatBox } from "@/components/features/messages/ChatBox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/data/mockMessages"

export default async function ConversationPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const otherUser = MOCK_CONVERSATIONS.find(c => c.userId === id)?.profile || MOCK_CONVERSATIONS[0].profile

    const messages = MOCK_MESSAGES.map(msg => ({
        ...msg,
        sender_id: msg.sender_id === "me" ? user.id : id
    }))

    return (
        <div className="h-screen w-full overflow-hidden bg-white pt-20" suppressHydrationWarning>
            <div className="h-full flex max-w-[1600px] mx-auto border-x border-gray-100 bg-white shadow-sm overflow-hidden">

                {/* Column 1: Threads */}
                <div className="hidden md:flex flex-col w-[320px] lg:w-[380px] border-r border-gray-100 bg-[#f9f9f9]/30">
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
                        {MOCK_CONVERSATIONS.map((chat) => (
                            <Link
                                key={chat.userId}
                                href={`/messages/${chat.userId}`}
                                className={cn(
                                    "flex items-center gap-3 p-4 border-b border-gray-50 transition-all group relative",
                                    chat.userId === id ? "bg-white shadow-sm z-10" : "hover:bg-white/60"
                                )}
                            >
                                <div className="relative shrink-0">
                                    <Avatar className="h-10 w-10 border border-white shadow-sm">
                                        <AvatarImage src={chat.profile.avatar_url} />
                                        <AvatarFallback className="bg-gray-100 text-gray-400 font-bold text-xs">{(chat.profile.first_name || chat.profile.username)[0]}</AvatarFallback>
                                    </Avatar>
                                    {chat.isUnread && (
                                        <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-white" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <h3 className={cn("text-[13px] truncate", chat.userId === id ? "font-bold text-red-600" : "font-bold text-gray-900")}>
                                            {`${chat.profile.first_name || ''} ${chat.profile.last_name || ''}`.trim() || chat.profile.username}
                                        </h3>
                                        <span suppressHydrationWarning className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                                            {formatDistanceToNow(new Date(chat.createdAt), { addSuffix: false })}
                                        </span>
                                    </div>
                                    <p className={cn("text-[11px] truncate leading-tight", chat.isUnread ? "text-gray-900 font-bold" : "text-gray-500 font-medium")}>
                                        {chat.lastMessage}
                                    </p>
                                </div>

                                {chat.userId === id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 2: Chat */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    <ChatBox
                        currentUser={user}
                        otherUser={otherUser}
                        initialMessages={messages}
                    />
                </main>

                {/* Column 3: Details */}
                <aside className="hidden xl:flex flex-col w-[300px] border-l border-gray-100 bg-[#f9f9f9]/30 overflow-y-auto">
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                                <Avatar className="h-20 w-20 mx-auto border-4 border-white shadow-lg">
                                <AvatarImage src={otherUser.avatar_url} />
                                <AvatarFallback className="text-xl font-bold bg-gray-100 text-gray-400">
                                    {(otherUser.first_name || otherUser.username)[0]}
                                </AvatarFallback>
                            </Avatar>
                                <div>
                                <h3 className="text-md font-black text-gray-900 tracking-tight">{`${otherUser.first_name || ''} ${otherUser.last_name || ''}`.trim() || otherUser.username}</h3>
                                <p className="text-[10px] text-red-600 font-black uppercase tracking-widest mt-0.5">@{otherUser.username}</p>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button className="p-2 border border-gray-100 rounded-lg hover:bg-white transition-all text-gray-400 hover:text-red-500">
                                    <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-2 border border-gray-100 rounded-lg hover:bg-white transition-all text-gray-400 hover:text-red-500">
                                    <Video className="w-4 h-4" />
                                </button>
                                <button className="p-2 border border-gray-100 rounded-lg hover:bg-white transition-all text-gray-400 hover:text-red-500">
                                    <InfoIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">About Creator</span>
                                <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">
                                    Professional brand designer focused on clean, modern aesthetics and structured layouts.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Shared Files</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square rounded-lg bg-white border border-gray-100 flex items-center justify-center cursor-pointer hover:border-red-200 transition-colors">
                                            <Paperclip className="w-4 h-4 text-gray-200" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 rounded-xl text-white space-y-2">
                                <div className="flex items-center gap-2 text-red-500">
                                    <Info className="w-3.5 h-3.5" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Privacy</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                                    Messages are encrypted. Do not share sensitive payment info.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
