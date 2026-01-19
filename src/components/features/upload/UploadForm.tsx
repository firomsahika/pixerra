"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { uploadDesign } from "@/app/actions/design"

export function UploadForm() {
    const [files, setFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? Array.from(e.target.files) : []
        if (selected.length > 0) {
            setFiles(selected)
            const urls = selected.map(f => URL.createObjectURL(f))
            setPreviewUrls(urls)
        }
    }

    const removeFileAt = (index: number) => {
        const f = files[index]
        const url = previewUrls[index]
        if (url) URL.revokeObjectURL(url)
        const newFiles = files.slice()
        const newUrls = previewUrls.slice()
        newFiles.splice(index, 1)
        newUrls.splice(index, 1)
        setFiles(newFiles)
        setPreviewUrls(newUrls)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (files.length === 0 || !title) return

        setUploading(true)
        try {
            const formData = new FormData()
            // Append all files under the 'files' key
            files.forEach((f) => formData.append("files", f))
            formData.append("title", title)
            formData.append("description", description)
            formData.append("category", category)
            formData.append("tags", tags)

            await uploadDesign(formData)

            router.push('/profile')
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
                    className={`aspect-[3/4] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden bg-gray-50
               ${previewUrl ? "border-gray-200" : "border-gray-300 hover:border-gray-400"}
            `}
                >
                    {previewUrls.length > 0 ? (
                        <>
                            <Image src={previewUrls[0]} alt="Preview" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFileAt(0) }}
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
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                {/* Thumbnails of additional pages */}
                {previewUrls.length > 1 && (
                    <div className="mt-3 flex gap-3 overflow-auto">
                        {previewUrls.map((p, i) => (
                            <div key={i} className="w-20 h-20 rounded-xl overflow-hidden relative border border-gray-100">
                                <Image src={p} alt={`preview-${i}`} fill className="object-cover" />
                                <button onClick={() => removeFileAt(i)} className="absolute top-1 right-1 p-1 bg-black/40 text-white rounded-full">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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
                        className="text-slate-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="flex text-slate-500 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 min-h-[120px] resize-none"
                        placeholder="Tell everyone what your design is about"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        className="flex h-10 text-slate-500 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
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
                        className="text-slate-500"
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
