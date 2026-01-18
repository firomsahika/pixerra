import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { GuestLanding } from "@/components/features/home/GuestLanding"
import { UserHome } from "@/components/features/home/UserHome"
import { getDesigns } from "@/app/actions/design"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const designs = await getDesigns()

  if (user) {
    return <UserHome user={user} initialDesigns={designs} />
  }

  // Guest View - Delegated to the stylish GuestLanding client component
  return <GuestLanding featuredDesigns={designs} />
}
