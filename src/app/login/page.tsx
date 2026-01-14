"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!email || !password) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/")
            router.refresh()
        }
    }

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) {
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-[400px] bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">P</div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Enter your credentials to access your account
                    </p>
                </div>

                <div className="space-y-4">


                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="bg-white px-4 text-gray-400 font-medium">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-red-600 hover:underline font-medium">Forgot?</a>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 rounded-xl"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium border border-red-100">{error}</div>
                        )}

                        <Button type="submit" className="w-full h-12 text-base rounded-xl font-semibold shadow-sm hover:shadow-md transition-all mt-2" isLoading={loading}>
                            Log in
                        </Button>


                         <Button
                            variant="outline"
                            className="w-full h-12 flex items-center justify-center gap-3 text-base font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            onClick={handleGoogleLogin}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                            Continue with Google
                        </Button>

                        <div className="text-center text-sm pt-4">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link href="/register" className="text-gray-900 font-semibold hover:underline">
                                Sign up
                            </Link>
                        </div>

                       
                    </form>
                </div>
            </div>
        </div>
    )
}
