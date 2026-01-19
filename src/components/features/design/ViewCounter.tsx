"use client"

import { useEffect, useRef } from "react"
import { incrementViewCount } from "@/app/actions/design"

interface ViewCounterProps {
    designId: string
}

export function ViewCounter({ designId }: ViewCounterProps) {
    const hasIncremented = useRef(false)

    useEffect(() => {
        if (!hasIncremented.current) {
            incrementViewCount(designId)
            hasIncremented.current = true
        }
    }, [designId])

    return null
}
