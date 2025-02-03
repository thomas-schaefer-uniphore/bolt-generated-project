import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const pathname = usePathname()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  }, [])

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className={`transition-transform duration-200 ${isMenuOpen ? 'translate-x-full' : ''}`}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobile ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
