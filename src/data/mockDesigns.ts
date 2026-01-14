export interface Design {
    id: string
    title: string
    image_url: string
    category: string
    user: {
        id: string
        username: string
        avatar_url: string
    }
    likes_count: number
    views_count: number
    description?: string
    tags?: string[]
    is_liked?: boolean
}

export const DESIGN_CATEGORIES = [
    "All",
    "UI/UX",
    "Illustration",
    "Photography",
    "3D Art",
    "Branding",
    "Typography",
    "Architecture",
    "Web Design"
] as const

export const MOCK_DESIGNS: Design[] = [
    // UI/UX Designs
    {
        id: "101",
        title: "Mobile Banking App Interface",
        image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2070&auto=format&fit=crop",
        category: "UI/UX",
        user: {
            id: "u101",
            username: "uxmaster",
            avatar_url: "https://i.pravatar.cc/150?img=1"
        },
        likes_count: 342,
        views_count: 1520,
        description: "Clean and modern mobile banking interface with intuitive navigation",
        tags: ["mobile", "fintech", "ui"]
    },
    {
        id: "102",
        title: "Dashboard Analytics Design",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        category: "UI/UX",
        user: {
            id: "u102",
            username: "designpro",
            avatar_url: "https://i.pravatar.cc/150?img=2"
        },
        likes_count: 287,
        views_count: 1340,
        description: "Data visualization dashboard with clean metrics",
        tags: ["dashboard", "analytics", "data"]
    },

    // Illustration
    {
        id: "201",
        title: "Abstract Fluid Art",
        image_url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
        category: "Illustration",
        user: {
            id: "u103",
            username: "artflow",
            avatar_url: "https://i.pravatar.cc/150?img=3"
        },
        likes_count: 456,
        views_count: 2100,
        description: "Vibrant fluid art with flowing colors and organic shapes",
        tags: ["abstract", "fluid", "colorful"]
    },
    {
        id: "202",
        title: "Digital Character Design",
        image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
        category: "Illustration",
        user: {
            id: "u104",
            username: "pixelartist",
            avatar_url: "https://i.pravatar.cc/150?img=4"
        },
        likes_count: 523,
        views_count: 2890,
        description: "Detailed character illustration with vibrant colors",
        tags: ["character", "digital", "art"]
    },
    {
        id: "203",
        title: "Watercolor Landscape",
        image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
        category: "Illustration",
        user: {
            id: "u105",
            username: "watercolor_dreams",
            avatar_url: "https://i.pravatar.cc/150?img=5"
        },
        likes_count: 389,
        views_count: 1750,
        description: "Soft watercolor illustration of natural landscapes",
        tags: ["watercolor", "nature", "painting"]
    },

    // Photography
    {
        id: "301",
        title: "Minimalist Architecture",
        image_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        category: "Photography",
        user: {
            id: "u106",
            username: "shuttercraft",
            avatar_url: "https://i.pravatar.cc/150?img=6"
        },
        likes_count: 612,
        views_count: 3200,
        description: "Clean architectural photography with symmetrical composition",
        tags: ["architecture", "minimal", "composition"]
    },
    {
        id: "302",
        title: "Urban Night Photography",
        image_url: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop",
        category: "Photography",
        user: {
            id: "u107",
            username: "nightcrawler",
            avatar_url: "https://i.pravatar.cc/150?img=7"
        },
        likes_count: 745,
        views_count: 4100,
        description: "Neon-lit cityscape captured at night",
        tags: ["urban", "neon", "night"]
    },
    {
        id: "303",
        title: "Nature Macro Photography",
        image_url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop",
        category: "Photography",
        user: {
            id: "u108",
            username: "nature_lens",
            avatar_url: "https://i.pravatar.cc/150?img=8"
        },
        likes_count: 534,
        views_count: 2650,
        description: "Detailed macro shot of natural elements",
        tags: ["macro", "nature", "closeup"]
    },

    // 3D Art
    {
        id: "401",
        title: "Abstract 3D Sculpture",
        image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        category: "3D Art",
        user: {
            id: "u109",
            username: "3d_studio",
            avatar_url: "https://i.pravatar.cc/150?img=9"
        },
        likes_count: 478,
        views_count: 2340,
        description: "Colorful abstract 3D render with gradient materials",
        tags: ["3d", "abstract", "render"]
    },
    {
        id: "402",
        title: "Futuristic Product Render",
        image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2071&auto=format&fit=crop",
        category: "3D Art",
        user: {
            id: "u110",
            username: "render_master",
            avatar_url: "https://i.pravatar.cc/150?img=10"
        },
        likes_count: 621,
        views_count: 3450,
        description: "High-quality product visualization with realistic materials",
        tags: ["product", "render", "cgi"]
    },

    // Branding
    {
        id: "501",
        title: "Modern Logo Collection",
        image_url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=2071&auto=format&fit=crop",
        category: "Branding",
        user: {
            id: "u111",
            username: "brandsmith",
            avatar_url: "https://i.pravatar.cc/150?img=11"
        },
        likes_count: 392,
        views_count: 1890,
        description: "Minimalist logo designs for tech startups",
        tags: ["logo", "branding", "minimal"]
    },
    {
        id: "502",
        title: "Brand Identity System",
        image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2039&auto=format&fit=crop",
        category: "Branding",
        user: {
            id: "u112",
            username: "identity_lab",
            avatar_url: "https://i.pravatar.cc/150?img=12"
        },
        likes_count: 567,
        views_count: 2980,
        description: "Complete brand identity with color palette and typography",
        tags: ["identity", "system", "brand"]
    },

    // Typography
    {
        id: "601",
        title: "Experimental Type Design",
        image_url: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?q=80&w=2070&auto=format&fit=crop",
        category: "Typography",
        user: {
            id: "u113",
            username: "typeface_studio",
            avatar_url: "https://i.pravatar.cc/150?img=13"
        },
        likes_count: 423,
        views_count: 2120,
        description: "Bold experimental typography with unique letterforms",
        tags: ["typography", "experimental", "type"]
    },
    {
        id: "602",
        title: "Vintage Lettering Art",
        image_url: "https://images.unsplash.com/photo-1493932484895-752d1cae5ad1?q=80&w=2006&auto=format&fit=crop",
        category: "Typography",
        user: {
            id: "u114",
            username: "letter_artist",
            avatar_url: "https://i.pravatar.cc/150?img=14"
        },
        likes_count: 356,
        views_count: 1670,
        description: "Hand-crafted vintage lettering with intricate details",
        tags: ["lettering", "vintage", "handmade"]
    },

    // Architecture
    {
        id: "701",
        title: "Modern Glass Building",
        image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1974&auto=format&fit=crop",
        category: "Architecture",
        user: {
            id: "u115",
            username: "arch_vision",
            avatar_url: "https://i.pravatar.cc/150?img=15"
        },
        likes_count: 689,
        views_count: 3780,
        description: "Contemporary architectural design with glass facade",
        tags: ["architecture", "modern", "glass"]
    },
    {
        id: "702",
        title: "Geometric Pattern Study",
        image_url: "https://images.unsplash.com/photo-1550059378-c07a97637841?q=80&w=1974&auto=format&fit=crop",
        category: "Architecture",
        user: {
            id: "u116",
            username: "pattern_architect",
            avatar_url: "https://i.pravatar.cc/150?img=16"
        },
        likes_count: 512,
        views_count: 2560,
        description: "Architectural patterns with geometric precision",
        tags: ["pattern", "geometry", "architectural"]
    },

    // Web Design
    {
        id: "801",
        title: "E-commerce Landing Page",
        image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
        category: "Web Design",
        user: {
            id: "u117",
            username: "web_crafter",
            avatar_url: "https://i.pravatar.cc/150?img=17"
        },
        likes_count: 445,
        views_count: 2230,
        description: "Modern e-commerce design with clean product showcase",
        tags: ["ecommerce", "landing", "web"]
    },
    {
        id: "802",
        title: "SaaS Platform Interface",
        image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
        category: "Web Design",
        user: {
            id: "u118",
            username: "saas_designer",
            avatar_url: "https://i.pravatar.cc/150?img=18"
        },
        likes_count: 578,
        views_count: 3120,
        description: "Professional SaaS platform with intuitive navigation",
        tags: ["saas", "platform", "interface"]
    },

    // Additional varied designs
    {
        id: "803",
        title: "Mountain Landscape",
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        category: "Photography",
        user: {
            id: "u119",
            username: "mountain_explorer",
            avatar_url: "https://i.pravatar.cc/150?img=19"
        },
        likes_count: 892,
        views_count: 4560,
        description: "Breathtaking mountain vista at golden hour",
        tags: ["landscape", "mountain", "nature"]
    },
    {
        id: "804",
        title: "Coffee Shop Branding",
        image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
        category: "Branding",
        user: {
            id: "u120",
            username: "cafe_brands",
            avatar_url: "https://i.pravatar.cc/150?img=20"
        },
        likes_count: 423,
        views_count: 2150,
        description: "Warm and inviting coffee shop brand identity",
        tags: ["cafe", "branding", "lifestyle"]
    },
    {
        id: "805",
        title: "Neon Abstract Composition",
        image_url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop",
        category: "Illustration",
        user: {
            id: "u121",
            username: "neon_artist",
            avatar_url: "https://i.pravatar.cc/150?img=21"
        },
        likes_count: 634,
        views_count: 3210,
        description: "Electric neon colors in abstract composition",
        tags: ["neon", "abstract", "digital"]
    },
    {
        id: "806",
        title: "Workspace Desk Setup",
        image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
        category: "Photography",
        user: {
            id: "u122",
            username: "workspace_pro",
            avatar_url: "https://i.pravatar.cc/150?img=22"
        },
        likes_count: 512,
        views_count: 2780,
        description: "Minimal and organized workspace photography",
        tags: ["workspace", "minimal", "productivity"]
    }
]

// Helper function to get designs by category
export function getDesignsByCategory(category?: string): Design[] {
    if (!category || category === "All") {
        return MOCK_DESIGNS
    }
    return MOCK_DESIGNS.filter(design => design.category === category)
}

// Helper function to get random designs
export function getRandomDesigns(count: number): Design[] {
    const shuffled = [...MOCK_DESIGNS].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}
