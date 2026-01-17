export const MOCK_CONVERSATIONS = [
    {
        userId: "c1",
        profile: {
            full_name: "Alex Rivera",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
            username: "arivera_design"
        },
        lastMessage: "The new design looks amazing! Can we discuss the color palette?",
        createdAt: "2024-01-20T12:00:00Z",
        isUnread: true
    },
    {
        userId: "c2",
        profile: {
            full_name: "Sarah Chen",
            avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
            username: "schen_ux"
        },
        lastMessage: "I've updated the Figma files with the latest changes.",
        createdAt: "2024-01-19T16:45:00Z",
        isUnread: false
    },
    {
        userId: "c3",
        profile: {
            full_name: "Marcus Thorne",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
            username: "mthorne_3d"
        },
        lastMessage: "Are you available for a quick meeting tomorrow?",
        createdAt: "2024-01-18T09:15:00Z",
        isUnread: false
    }
]

export const MOCK_MESSAGES = [
    { id: "m1", sender_id: "other", content: "Hey! I saw your latest minimalist workspace design. The way you handled the negative space is truly professional.", created_at: "2024-01-20T11:00:00Z" },
    { id: "m2", sender_id: "me", content: "Hi Alex! Thanks for reaching out. Glad you liked it! I was aiming for a high-contrast but breathable layout.", created_at: "2024-01-20T11:05:00Z" },
    { id: "m3", sender_id: "other", content: "The new design looks amazing! Can we discuss the color palette? I'm thinking of using this for a premium workspace brand.", created_at: "2024-01-20T12:00:00Z" },
]
