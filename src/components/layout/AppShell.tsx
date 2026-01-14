"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { User } from "@supabase/supabase-js"

interface AppShellProps {
    children: React.ReactNode
    user: User | null
}

export function AppShell({ children, user }: AppShellProps) {
    const pathname = usePathname()
    // Routes where Navbar and Footer should be hidden
    const isAuthPage = pathname === "/login" || pathname === "/register"

    if (isAuthPage) {
        return <main>{children}</main>
    }

    return (
        <>
            <Navbar user={user} />
            <main className="pt-20 min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
