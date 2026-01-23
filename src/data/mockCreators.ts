export interface MockCreator {
    id: string
    username: string
    first_name?: string
    last_name?: string
    avatar_url: string
    bio: string
    skills: string[]
    design_count: number
    total_likes: number
    top_designs: { id: string, image_url: string }[]
}

export const MOCK_CREATORS: MockCreator[] = [
    {
        id: "c1",
        username: "arivera_design",
        first_name: "Alex",
        last_name: "Rivera",
        avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        bio: "Senior Brand Designer specializing in minimalist visual identities and typography-led design systems.",
        skills: ["Brand Identity", "Typography", "Art Direction"],
        design_count: 42,
        total_likes: 1240,
        top_designs: [
            { id: "d1", image_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" },
            { id: "d2", image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" },
            { id: "d3", image_url: "https://images.unsplash.com/photo-1550059378-c07a97637841?q=80&w=1974&auto=format&fit=crop" }
        ]
    },
    {
        id: "c2",
        username: "schen_ux",
        first_name: "Sarah",
        last_name: "Chen",
        avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        bio: "UI/UX Architect focus on building scalable design systems and intuitive user journeys for fintech platforms.",
        skills: ["Product Design", "UX Strategy", "Figma"],
        design_count: 28,
        total_likes: 3150,
        top_designs: [
            { id: "d4", image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" },
            { id: "d5", image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1974&auto=format&fit=crop" },
            { id: "d6", image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop" }
        ]
    },
    {
        id: "c3",
        username: "mthorne_3d",
        first_name: "Marcus",
        last_name: "Thorne",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        bio: "Motion Designer and 3D Artist. Creating immersive spatial experiences through Blender and After Effects.",
        skills: ["Blender", "3D Animation", "Motion Graphics"],
        design_count: 35,
        total_likes: 2800,
        top_designs: [
            { id: "d7", image_url: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop" },
            { id: "d8", image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" },
            { id: "d9", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" }
        ]
    },
    {
        id: "c4",
        username: "elena_v",
        first_name: "Elena",
        last_name: "Vance",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        bio: "Architectural Photographer and Minimalist Enthusiast. Finding rhythm in structure and shadows.",
        skills: ["Photography", "Composition", "Retouching"],
        design_count: 56,
        total_likes: 4200,
        top_designs: [
            { id: "d10", image_url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" },
            { id: "d11", image_url: "https://images.unsplash.com/photo-1449156001935-d25a4b25310b?q=80&w=2070&auto=format&fit=crop" },
            { id: "d12", image_url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop" }
        ]
    }
]
