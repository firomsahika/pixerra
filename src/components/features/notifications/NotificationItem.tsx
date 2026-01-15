import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, UserPlus, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NotificationItemProps {
    notification: {
        id: string
        type: string
        created_at: string
        is_read: boolean
        actor: {
            full_name: string
            avatar_url: string
            username: string
        }
        design?: {
            id: string
            title: string
            image_url: string
        }
    }
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const getIcon = () => {
        switch (notification.type) {
            case "like":
                return <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            case "message":
                return <MessageCircle className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            default:
                return <Bell className="w-3.5 h-3.5 text-gray-600" />
        }
    }

    const getMessage = () => {
        switch (notification.type) {
            case "like":
                return (
                    <p className="text-[15px] leading-snug text-gray-600 font-medium">
                        <span className="font-black text-gray-900">{notification.actor.full_name}</span> liked your design{" "}
                        <span className="font-black text-gray-900">"{notification.design?.title}"</span>
                    </p>
                )
            case "message":
                return (
                    <p className="text-[15px] leading-snug text-gray-600 font-medium">
                        <span className="font-black text-gray-900">{notification.actor.full_name}</span> sent you a new message.
                    </p>
                )
            default:
                return <p className="text-[15px] leading-snug text-gray-600 font-medium font-black">New activity from {notification.actor.full_name}</p>
        }
    }

    return (
        <div className={`group flex items-start gap-5 p-5 rounded-[32px] transition-all duration-300 border ${notification.is_read
            ? "bg-white/40 border-gray-100/50 hover:bg-white/80"
            : "bg-white border-red-100/50 shadow-xl shadow-red-100/20 ring-1 ring-red-50"
            }`}>
            <div className="relative shrink-0">
                <Avatar className="h-14 w-14 border-2 border-white shadow-md transition-transform group-hover:scale-105">
                    <AvatarImage src={notification.actor.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 font-black text-gray-400">
                        {notification.actor.full_name[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md border border-gray-50 flex items-center justify-center">
                    {getIcon()}
                </div>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        {getMessage()}
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>

                {notification.type === "like" && notification.design && (
                    <Link href={`/design/${notification.design.id}`} className="block">
                        <div className="relative h-20 w-28 rounded-2xl overflow-hidden border border-gray-100/50 shadow-sm group/thumb transform transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95">
                            <img
                                src={notification.design.image_url}
                                alt={notification.design.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover/thumb:bg-transparent transition-colors" />
                        </div>
                    </Link>
                )}
            </div>

            {!notification.is_read && (
                <div className="h-2.5 w-2.5 bg-red-600 rounded-full mt-2.5 shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.4)] animate-pulse" />
            )}
        </div>
    )
}
