"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
    profile: any
    user: any
}

export default function ProfileEditForm({ profile, user }: Props) {
    const router = useRouter()
    const [firstName, setFirstName] = useState(profile?.first_name || user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(' ')[0] || "")
    const [lastName, setLastName] = useState(profile?.last_name || user?.user_metadata?.last_name || user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "")
    const [username, setUsername] = useState(profile?.username || user?.user_metadata?.username || "")
    const [bio, setBio] = useState(profile?.bio || "")
    const [website, setWebsite] = useState(profile?.website || user?.user_metadata?.website || "")
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || user?.user_metadata?.avatar_url || "")
    const [skills, setSkills] = useState((profile?.skills || []).join(', '))
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()
        setIsSaving(true)
        setError(null)

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    bio,
                    website,
                    avatar_url: avatarUrl,
                    skills
                })
            })

            if (!res.ok) {
                const json = await res.json().catch(() => ({}))
                throw new Error(json?.error || 'Failed to save profile')
            }

            router.push('/profile')
        } catch (err: any) {
            setError(err?.message || 'Failed to save')
            setIsSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Basic Information</h2>

                <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">First name</label>
                            <Input name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Last name</label>
                            <Input name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Username</label>
                        <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Bio</label>
                        <Input name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Website</label>
                        <Input name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Avatar URL</label>
                        <Input name="avatar_url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Skills (comma separated)</label>
                        <Input name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Web Design, UI/UX" />
                    </div>
                </div>
            </section>

            {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium border border-red-100">{error}</div>}

            <div className="pt-4">
                <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
            </div>
        </form>
    )
}
