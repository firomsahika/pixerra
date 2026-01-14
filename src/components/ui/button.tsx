import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "danger"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            default: "bg-black text-white hover:bg-gray-800 disabled:opacity-50",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50",
            outline: "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 disabled:opacity-50",
            ghost: "bg-transparent hover:bg-gray-100 text-gray-900 disabled:opacity-50",
            danger: "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-12 rounded-md px-8 text-lg",
            icon: "h-10 w-10 px-2",
        }

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
