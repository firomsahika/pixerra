"use client"

import { useState, useRef, useEffect } from "react"
import { sendMessage } from "@/app/actions/messages"
import { Send, Image as ImageIcon, Smile, MoreHorizontal, User, Paperclip, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ChatBoxProps {
    currentUser: any
    otherUser: any[] | any
    initialMessages: any[]
}

export function ChatBox({ currentUser, otherUser, initialMessages }: ChatBoxProps) {
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")
    const [isSending, setIsSending] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const targetUser = Array.isArray(otherUser) ? otherUser[0] : otherUser

    const targetUserName = (() => {
        const name = `${targetUser?.first_name || ''}${targetUser?.last_name ? ' ' + targetUser.last_name : ''}`.trim()
        return name || targetUser?.username || 'User'
    })()

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isSending) return

        const tempId = Math.random().toString()
        const newMessage = {
            id: tempId,
            sender_id: currentUser.id,
            content: input.trim(),
            created_at: new Date().toISOString()
        }

        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsSending(true)

        try {
            await sendMessage(targetUser.id, newMessage.content)
        } catch (err) {
            console.error("Failed to send", err)
            setMessages(prev => prev.filter(m => m.id !== tempId))
            setInput(newMessage.content)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden shadow-inner">
            {/* Header */}
            <div className="flex items-center justify-between py-4 px-6 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border border-gray-50 shadow-sm">
                            <AvatarImage src={targetUser.avatar_url} />
                                <AvatarFallback className="bg-gray-100 font-bold text-gray-500 text-sm">
                                {targetUser?.first_name?.[0] || <User className="w-4 h-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 leading-tight">
                            {targetUserName}
                        </h2>
                        <span className="text-[11px] text-gray-400 font-medium">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f9f9f9]/50 custom-scrollbar"
            >
                {messages.map((msg, index) => {
                    const isOwn = msg.sender_id === currentUser.id
                    const showAvatar = !isOwn && (index === 0 || messages[index - 1].sender_id !== msg.sender_id)

                    return (
                        <div key={msg.id} className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
                            <div className={cn("flex max-w-[85%] gap-2", isOwn ? "flex-row-reverse" : "flex-row")}>
                                {!isOwn && (
                                    <div className="w-8 shrink-0">
                                        {showAvatar && (
                                            <Avatar className="h-8 w-8 border border-gray-50 shadow-sm">
                                                <AvatarImage src={targetUser.avatar_url} />
                                                <AvatarFallback className="text-[10px]">{targetUser.first_name?.[0] || targetUser.username?.[0]}</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div
                                        className={cn(
                                            "px-4 py-2.5 text-[13px] leading-relaxed shadow-sm",
                                            isOwn
                                                ? "bg-red-600 text-white rounded-2xl rounded-tr-none font-medium"
                                                : "bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-200 font-medium"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                    <span
                                        suppressHydrationWarning
                                        className={cn(
                                            "text-[10px] text-gray-400 font-medium px-1",
                                            isOwn ? "text-right" : "text-left"
                                        )}
                                    >
                                        {format(new Date(msg.created_at), "h:mm a")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSend} className="space-y-3">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={`Reply to ${targetUser.first_name || targetUser.username || 'User'}...`}
                            rows={2}
                            className="w-full p-4 pr-12 text-[13px] text-gray-800 bg-white border border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-100 outline-none transition-all resize-none shadow-sm placeholder:text-gray-400"
                        />
                        <div className="absolute right-3 top-3 flex flex-col gap-2">
                            <button type="button" className="text-gray-300 hover:text-gray-600 transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-4">
                            <button type="button" className="group flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest">
                                <Paperclip className="w-4 h-4" />
                                <span className="hidden sm:inline">Attach</span>
                            </button>
                            <button type="button" className="group flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest">
                                <ImageIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Image</span>
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={!input.trim() || isSending}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-lg shadow-red-100 disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
                        >
                            <span>Send</span>
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
