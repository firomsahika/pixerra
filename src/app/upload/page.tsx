import { UploadForm } from "@/components/features/upload/UploadForm"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function UploadPage() {
    const supabase = await createClient()

    // Verify auth
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="min-h-screen bg-white py-12 md:py-20 px-4">
            <div className="max-w-[2000px] mx-auto">
                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">Share your work</h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Showcase your creativity to thousands of designers. <br className="hidden md:block" />
                        High quality images and good descriptions work best.
                    </p>
                </div>
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-12 max-w-5xl mx-auto">
                    <UploadForm />
                </div>
            </div>
        </div>
    )
}
