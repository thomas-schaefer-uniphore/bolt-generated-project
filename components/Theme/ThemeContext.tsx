import React, { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext<{
  theme: string
  isThemeLoading: boolean
  setTheme: (theme: string) => void
} | null>(null)

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')
  const [isThemeLoading, setIsThemeLoading] = useState(true)

  useEffect(() => {
    // Load theme from localStorage or Superbase
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    setIsThemeLoading(false)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isThemeLoading,
        setTheme: (newTheme) => {
          setTheme(newTheme)
          localStorage.setItem('theme', newTheme)
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
