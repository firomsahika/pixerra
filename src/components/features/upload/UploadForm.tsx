"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const url = URL.createObjectURL(selectedFile)
            setPreviewUrl(url)
        }
    }

    const removeFile = () => {
        setFile(null)
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file || !title) return

        setUploading(true)
        try {
            const user = (await supabase.auth.getUser()).data.user
            if (!user) throw new Error("Not authenticated")

            // 1. Upload image
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}/${Math.random()}.${fileExt}`

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('designs')
                .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('designs')
                .getPublicUrl(fileName)

            // 2. Insert record
            const { error: insertError } = await supabase
                .from('designs')
                .insert({
                    title,
                    description,
                    category,
                    image_url: publicUrl,
                    user_id: user.id,
                    tags: tags.split(',').map(t => t.trim()).filter(Boolean)
                })

            if (insertError) throw insertError

            router.push('/dashboard')
            router.refresh()

        } catch (error: any) {
            console.error(error)
            alert(error.message || "Error uploading design")
        } finally {
            setUploading(false)
        }
    }

    return (
        <form onSubmit={handleUpload} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Upload Area */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Design Preview</label>
                <div
                    onClick={() => !previewUrl && fileInputRef.current?.click()}
                    className={`
               aspect-[3/4] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden bg-gray-50
               ${previewUrl ? "border-gray-200" : "border-gray-300 hover:border-gray-400"}
            `}
                >
                    {previewUrl ? (
                        <>
                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFile() }}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <div className="text-center p-8 space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Click to upload</p>
                                <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            </div>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            {/* Right: Form Details */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <Input
                        placeholder="Give your design a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="flex w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 min-h-[120px] resize-none"
                        placeholder="Tell everyone what your design is about"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        className="flex h-10 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="ui/ux">UI/UX Design</option>
                        <option value="branding">Branding</option>
                        <option value="illustration">Illustration</option>
                        <option value="typography">Typography</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <Input
                        placeholder="Add tags separated by comma (e.g. minimal, mobile, dark)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" isLoading={uploading} disabled={!file || !title}>Publish Design</Button>
                </div>
            </div>
        </form>
    )
}
