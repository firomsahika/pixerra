"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, MessageCircle, LogOut, User as UserIcon } from "lucide-react"
import { User } from "@supabase/supabase-js"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface NavbarProps {
    user: User | null
}

export function Navbar({ user }: NavbarProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100">
            <div className="flex items-center justify-between h-20 px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">P</div>
                    <span className="text-red-600 text-xl font-bold tracking-tight">Pixerra</span>
                </Link>

                <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        placeholder="Search for inspiration..."
                        className="pl-10 bg-gray-100 border-transparent focus:bg-white focus:border-gray-200"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/explore" className="hidden md:block font-medium text-gray-600 hover:text-black">Explore</Link>
                    <Link href="/upload" className="hidden md:block font-medium text-gray-600 hover:text-black">Create</Link>

                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <Button variant="ghost" size="icon" className="hidden md:flex">
                                    <Bell className="h-6 w-6 text-gray-600" />
                                </Button>
                                <Button variant="ghost" size="icon" className="hidden md:flex">
                                    <MessageCircle className="h-6 w-6 text-gray-600" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || ""} />
                                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 text-gray-600 " align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || "User"}</p>
                                                <p className="text-xs leading-none text-slate-800">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings">Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                            Log out <LogOut className="w-4 text-red-600 h-4 ml-2" />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button>Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="secondary">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
