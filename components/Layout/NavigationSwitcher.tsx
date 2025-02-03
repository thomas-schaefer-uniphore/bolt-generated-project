import { useState } from 'react'
    import { useUser } from '@supabase/supabase-js'

    export default function NavigationSwitcher({
      children,
    }) {
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const { data: user } = useUser()

      return (
        <div className="flex items-center justify-center h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <Sun className="w-8 h-8" />
            ) : (
              <Moon className="w-8 h-8" />
            )}
          </button>
          {children}
        </div>
      )
    }
