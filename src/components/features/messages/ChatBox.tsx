"use client"

import { useState, useRef, useEffect } from "react"
import { sendMessage } from "@/app/actions/messages"
import { Send, Image as ImageIcon, Smile, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface ChatBoxProps {
    currentUser: any
    otherUser: any
    initialMessages: any[]
}

export function ChatBox({ currentUser, otherUser, initialMessages }: ChatBoxProps) {
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")
    const [isSending, setIsSending] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isSending) return

        setIsSending(true)
        const newContent = input
        setInput("")

        try {
            await sendMessage(otherUser.id, newContent)
            // Optimistic update combined with revalidation would happen here
            // For simplicity, we assume action revalidates the page
        } catch (err) {
            console.error("Failed to send", err)
            setInput(newContent)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="flex flex-col h-full bg-transparent">
            {/* Elegant Header */}
            <div className="p-8 border-b border-gray-100/50 flex items-center justify-between bg-white/20 backdrop-blur-2xl px-10">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-xl ring-2 ring-blue-50">
                            <AvatarImage src={otherUser.avatar_url} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-50 to-blue-100 font-black">
                                {otherUser.full_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 leading-none tracking-tight">{otherUser.full_name}</h2>
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mt-2 block">
                            Active Project
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-white/60 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all border border-white/50 shadow-sm">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Area with custom scrollbar */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 bg-transparent custom-scrollbar"
            >
                {initialMessages.map((msg) => {
                    const isOwn = msg.sender_id === currentUser.id
                    return (
                        <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} items-end gap-3`}>
                            {!isOwn && (
                                <Avatar className="h-9 w-9 mb-1 shadow-sm border border-white">
                                    <AvatarImage src={otherUser.avatar_url} />
                                    <AvatarFallback>{otherUser.full_name[0]}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`flex flex-col max-w-[70%] gap-2 ${isOwn ? "items-end" : "items-start"}`}>
                                <div
                                    className={`px-6 py-4 rounded-[28px] text-[15px] font-medium leading-relaxed shadow-sm transition-all
                                        ${isOwn
                                            ? "bg-gray-900 text-white rounded-br-md shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)]"
                                            : "bg-white/80 backdrop-blur-md text-gray-800 rounded-bl-md border border-white"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                <span className={`text-[9px] uppercase font-black text-gray-400 tracking-widest px-2`}>
                                    {format(new Date(msg.created_at), "h:mm a")}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Premium Input Bar */}
            <div className="p-8 bg-white/30 backdrop-blur-2xl border-t border-gray-100/50">
                <form onSubmit={handleSend} className="relative flex items-center gap-4">
                    <div className="flex-1 relative group">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Type a message...`}
                            className="w-full pl-8 pr-16 py-5 bg-white/60 backdrop-blur-md border border-white rounded-[32px] focus:bg-white focus:ring-[12px] focus:ring-blue-100/30 transition-all outline-none font-bold text-[15px] shadow-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button type="button" className="p-2 text-gray-300 hover:text-blue-500 transition-colors">
                                <Smile className="w-6 h-6" />
                            </button>
                            <button type="button" className="p-2 text-gray-300 hover:text-blue-500 transition-colors">
                                <ImageIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isSending}
                        className="p-5 bg-blue-600 text-white rounded-full hover:bg-black transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-90 flex items-center justify-center group/btn"
                    >
                        <Send className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    )
}
