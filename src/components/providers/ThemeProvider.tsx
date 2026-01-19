"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme | null>(null)

  useEffect(() => {
    // Initialize theme from localStorage or system.
    try {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored === "light" || stored === "dark") {
        setThemeState(stored)
        applyHtmlClass(stored)
        return
      }
    } catch (e) {
      // ignore
    }

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = prefersDark ? "dark" : "light"
    setThemeState(initial)
    applyHtmlClass(initial)
  }, [])

  const applyHtmlClass = (t: Theme) => {
    const html = document.documentElement
    if (t === "dark") {
      html.classList.add("dark")
      html.classList.remove("light")
    } else {
      html.classList.add("light")
      html.classList.remove("dark")
    }
  }

  const setTheme = (t: Theme) => {
    try {
      localStorage.setItem("theme", t)
    } catch {}
    setThemeState(t)
    applyHtmlClass(t)
  }

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  // Don't render children until theme is initialized to avoid mismatch
  if (!theme) return null

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
