import { useState, useEffect } from 'react'
import { useUser } from '@supabase/supabase-js'
import { ThemeSwitcher } from '../components/Theme/ThemeSwitcher'
import { SettingsModal } from '../components/Settings/SettingsModal'

export default function IndexPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Joined Date</label>
                <p className="text-gray-600">{new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Last login: {new Date(user?.last_login_at).toLocaleDateString()}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Account created: {new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                New Project
              </button>
              <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
