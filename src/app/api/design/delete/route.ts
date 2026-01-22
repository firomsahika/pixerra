import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
    try {
        const { designId } = await req.json()

        if (!designId) {
            return NextResponse.json({ error: 'Missing designId' }, { status: 400 })
        }

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch design and validate ownership
        const { data: design, error: fetchError } = await supabase
            .from('designs')
            .select('id, user_id, image_urls')
            .eq('id', designId)
            .maybeSingle()

        if (fetchError) {
            console.error('Error fetching design for deletion:', fetchError)
            return NextResponse.json({ error: 'Failed to fetch design' }, { status: 500 })
        }

        if (!design) {
            return NextResponse.json({ error: 'Design not found' }, { status: 404 })
        }

        if (design.user_id !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Attempt to remove stored images (if any)
        try {
            const urls = design.image_urls || []
            const pathsToRemove: string[] = []

            for (const url of urls) {
                if (!url || typeof url !== 'string') continue
                const idx = url.indexOf('/designs/')
                if (idx !== -1) {
                    const filePath = url.slice(idx + '/designs/'.length)
                    pathsToRemove.push(filePath)
                }
            }

            if (pathsToRemove.length > 0) {
                await supabase.storage.from('designs').remove(pathsToRemove)
            }
        } catch (err) {
            // non-fatal: log and continue to delete DB rows
            console.error('Error removing files from storage:', err)
        }

        // Remove related rows (likes, views, notifications)
        await supabase.from('likes').delete().eq('design_id', designId)
        await supabase.from('views').delete().eq('design_id', designId)
        await supabase.from('notifications').delete().eq('design_id', designId)

        // Delete the design itself
        const { error: delError } = await supabase.from('designs').delete().eq('id', designId)

        if (delError) {
            console.error('Error deleting design record:', delError)
            return NextResponse.json({ error: 'Failed to delete design' }, { status: 500 })
        }

        // Revalidate relevant pages
        revalidatePath('/')
        revalidatePath('/explore')
        revalidatePath(`/profile/${user.id}`)

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Unexpected error in delete route:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
