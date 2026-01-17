import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function SettingsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Settings</h1>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Account</h2>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input defaultValue={user.email} disabled />
                                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
