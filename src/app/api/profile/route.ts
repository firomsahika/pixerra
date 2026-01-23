import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const first_name = body.first_name || ''
        const last_name = body.last_name || ''
        const username = body.username || ''
        const bio = body.bio || ''
        const website = body.website || ''
        const avatar_url = body.avatar_url || ''
        const skillsString = body.skills || ''
        const skills = Array.isArray(body.skills)
            ? body.skills
            : typeof skillsString === 'string'
                ? skillsString.split(',').map((s: string) => s.trim()).filter(Boolean)
                : []

        const { error } = await supabase
            .from('profiles')
            .update({
                first_name,
                last_name,
                username,
                bio,
                website,
                avatar_url,
                skills,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })

        return NextResponse.json({ ok: true })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
    }
}
