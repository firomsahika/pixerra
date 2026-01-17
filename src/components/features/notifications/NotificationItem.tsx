import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, UserPlus, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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
        }
    }
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const getIcon = () => {
        switch (notification.type) {
            case "like":
                return <Heart className="w-3 h-3 text-red-600 fill-red-600" />
            case "message":
                return <MessageCircle className="w-3 h-3 text-red-600 fill-red-600" />
            case "follow":
                return <UserPlus className="w-3 h-3 text-red-600" />
            default:
                return <Bell className="w-3 h-3 text-gray-400" />
        }
    }

    const getMessage = () => {
        switch (notification.type) {
            case "like":
                return (
                    <p className="text-[13px] leading-snug text-gray-500 font-medium">
                        <span className="font-bold text-gray-900">{notification.actor.full_name}</span> liked your design{" "}
                        <span className="font-bold text-gray-900">"{notification.design?.title}"</span>
                    </p>
                )
            case "message":
                return (
                    <p className="text-[13px] leading-snug text-gray-500 font-medium">
                        <span className="font-bold text-gray-900">{notification.actor.full_name}</span> sent you a new message.
                    </p>
                )
            case "follow":
                return (
                    <p className="text-[13px] leading-snug text-gray-500 font-medium">
                        <span className="font-bold text-gray-900">{notification.actor.full_name}</span> started following you.
                    </p>
                )
            default:
                return <p className="text-[13px] leading-snug text-gray-500 font-medium">New activity from <span className="font-bold text-gray-900">{notification.actor.full_name}</span></p>
        }
    }

    return (
        <div className={cn(
            "group flex items-center gap-4 p-4 transition-all duration-200 border-b border-gray-50 last:border-0",
            notification.is_read ? "bg-white hover:bg-gray-50/50" : "bg-red-50/10 hover:bg-red-50/20"
        )}>
            <div className="relative shrink-0">
                <Avatar className="h-10 w-10 border border-gray-100 shadow-sm">
                    <AvatarImage src={notification.actor.avatar_url} />
                    <AvatarFallback className="bg-gray-50 font-bold text-gray-400 text-xs text-center flex items-center justify-center">
                        {notification.actor.full_name[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-1 shadow-sm border border-gray-100 flex items-center justify-center">
                    {getIcon()}
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                    {getMessage()}
                    <span suppressHydrationWarning className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </span>
                </div>
            </div>

            {!notification.is_read && (
                <div className="h-2 w-2 bg-red-600 rounded-full shrink-0 shadow-sm" />
            )}
        </div>
    )
}
