"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/features/feed/MasonryGrid"
import Link from "next/link"
import {
    ArrowRight,
    UploadCloud,
    Sparkles,
    Globe,
    Users,
    Mail,
    Zap,
    CheckCircle2
} from "lucide-react"

interface GuestLandingProps {
    featuredDesigns: any[]
}

export function GuestLanding({ featuredDesigns }: GuestLandingProps) {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
            {/* Stylish Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center space-y-8 mesh-gradient min-h-[90vh]">
                {/* Animated Background Blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/40 rounded-full blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50/20 rounded-full blur-[140px] animate-blob animation-delay-4000" />

                <motion.div
                    {...fadeIn}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-red-100 text-red-600 text-sm font-bold tracking-widest shadow-sm mb-4"
                >
                    <Sparkles className="w-4 h-4" />
                    DISCOVER THE NEW PIXERRA
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-7xl font-black tracking-tight text-gray-900 max-w-5xl leading-[0.95] z-10"
                >
                    Ethiopia's destination for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">design excellence</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed z-10 font-medium"
                >
                    Pixerra is the leading platform for creators to showcase their work, find inspiration, and connect with the global creative community.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-6 pt-10 z-10"
                >
                    <Link href="/explore">
                        <Button size="lg" className="h-13 px-12 text-xl rounded-full font-bold shadow-2xl shadow-red-200 hover:shadow-red-300 transition-all transform hover:-translate-y-1 bg-red-600 border-none active:scale-95">
                            Explore Designs
                            <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="lg" variant="outline" className="h-13 px-12 text-xl rounded-full border-2 border-gray-200 font-bold hover:bg-white hover:border-red-600 hover:text-red-600 transition-all transform hover:-translate-y-1 active:scale-95">
                            Sign Up Free
                        </Button>
                    </Link>
                </motion.div>

                {/* Decorative Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
                >
                    <span className="text-xs font-bold tracking-widest uppercase">Scroll to discover</span>
                    <div className="w-1 h-12 bg-gradient-to-b from-red-600 to-transparent rounded-full animate-float" />
                </motion.div>
            </section>

            {/* Featured Grid Section */}
            <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="py-32 px-4 bg-white"
            >
                <div className="max-w-[2000px] mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 px-4 md:px-8 gap-6">
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Featured Creations</h2>
                            <p className="text-gray-500 text-xl font-medium">Hand-picked designs from our top-tier creators.</p>
                        </div>
                        <Link href="/explore" className="flex items-center gap-3 text-lg font-bold text-red-600 hover:text-red-700 transition-colors group">
                            Explore all <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="rounded-[40px] overflow-hidden p-2">
                        <MasonryGrid designs={featuredDesigns} />
                    </div>

                    <div className="flex justify-center mt-20 px-4">
                        <Link href="/explore">
                            <Button variant="outline" size="lg" className="h-16 px-14 rounded-full border-2 border-gray-100 text-gray-900 font-bold hover:bg-gray-50 hover:border-red-200 transition-all shadow-sm">
                                View more design works
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* How it Works Section */}
            <section className="py-32 px-4 bg-gray-50/50 border-y border-gray-100 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center space-y-6 mb-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Showcase your creativity</h2>
                        <p className="text-gray-500 text-2xl max-w-2xl mx-auto font-medium">Get your work in front of the right people in three simple steps.</p>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {[
                            {
                                step: "01",
                                title: "Build your Profile",
                                desc: "Create a professional profile that reflects your unique style and skills.",
                                icon: <Users className="w-10 h-10 text-red-600" />
                            },
                            {
                                step: "02",
                                title: "Upload & Organize",
                                desc: "Share your best work with high-quality images and detailed descriptions.",
                                icon: <UploadCloud className="w-10 h-10 text-red-600" />
                            },
                            {
                                step: "03",
                                title: "Get Discovered",
                                desc: "Connect with thousands of designers and potential clients globally.",
                                icon: <Globe className="w-10 h-10 text-red-600" />
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="relative group p-12 bg-white rounded-[50px] border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-red-100/50 hover:-translate-y-4"
                            >
                                <div className="mb-10 p-5 bg-red-50 rounded-3xl hover:text-slate-800 w-fit group-hover:bg-red-600 group-hover:text-slate-800 transition-all transform group-hover:rotate-6">
                                    {item.icon}
                                </div>
                                <div className="absolute top-10 right-12 text-7xl font-black text-slate-300 group-hover:text-red-50/50 transition-colors pointer-events-none">{item.step}</div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-lg font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-40 px-4 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div className="pt-16">
                                    <div className="bg-red-50 rounded-[60px] aspect-square flex items-center justify-center p-10 mb-6 shadow-xl shadow-red-100 animate-float">
                                        <Sparkles className="w-24 h-24 text-red-600" />
                                    </div>
                                    <div className="bg-gray-100 rounded-[60px] aspect-square" />
                                </div>
                                <div>
                                    <div className="bg-gray-900 rounded-[60px] aspect-square flex items-center justify-center p-10 mb-6 shadow-2xl shadow-black/20 animate-float animation-delay-2000">
                                        <Zap className="w-24 h-24 text-red-500" />
                                    </div>
                                    <div className="bg-blue-50 rounded-[60px] aspect-square rotate-12" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 space-y-10"
                        >
                            <div className="text-red-600 font-black tracking-[0.3em] text-sm bg-red-50 px-6 py-2 rounded-full w-fit">WHY PIXERRA?</div>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1]">Everything you need to grow as a designer</h2>
                            <p className="text-2xl text-gray-500 leading-relaxed font-medium">
                                We've built a platform that combines the best parts of a social network, a portfolio site, and a job board.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    "Global Inspiration",
                                    "Portfolio Management",
                                    "Client Discovery",
                                    "Asset Store",
                                    "Community Workshops",
                                    "Job Board Access"
                                ].map((service) => (
                                    <li key={service} className="flex items-center gap-4 text-xl font-bold text-gray-700 group cursor-default">
                                        <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                        {service}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 text-center sm:text-left">
                                <Link href="/register">
                                    <Button size="lg" className="h-18 px-14 rounded-full font-black bg-gray-900 text-white hover:bg-black transition-all text-xl shadow-xl hover:shadow-gray-300">
                                        Start creating today
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-32 px-4"
            >
                <div className="max-w-[1200px] mx-auto">
                    <div className="relative overflow-hidden rounded-[80px] bg-red-600 p-16 md:p-20 text-center space-y-10 text-white shadow-2xl shadow-red-200">
                        <h2 className="text-5xl md:text-6xl font-black max-w-4xl mx-auto leading-[0.95]">
                            Ready to embark on your design journey?
                        </h2>
                        <p className="text-2xl text-red-100 max-w-3xl mx-auto font-medium">
                            Join over 50,000+ designers and start sharing your work with the world.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 z-20 relative">
                            <Link href="/register">
                                <Button size="lg" className="h-15 px-14 text-2xl rounded-full font-black bg-white text-red-600 hover:bg-gray-100 transition-all shadow-2xl active:scale-95">
                                    Join for Free
                                </Button>
                            </Link>
                            <Link href="/contact" className="inline-flex items-center gap-3 text-xl font-black hover:text-red-100 transition-all group">
                                <Mail className="w-7 h-7 group-hover:scale-110 transition-transform" />
                                Contact Sales
                            </Link>
                        </div>

                        {/* Animated Decor */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] animate-blob" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] animate-blob animation-delay-4000" />
                    </div>
                </div>
            </motion.section>
        </div>
    )
}
