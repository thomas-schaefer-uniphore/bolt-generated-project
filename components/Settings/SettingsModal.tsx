import { useState } from 'react'
import { useUser } from '@supabase/supabase-js'
import { saveToSuperbase } from './utils'

interface Settings {
  theme: string
  navigationAlignment: 'left' | 'right'
}

export function SettingsModal() {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    navigationAlignment: 'right',
  })
  const { data: user } = useUser()

  const saveSettings = async () => {
    await saveToSuperbase('settings', {
      ...settings,
      user_id: user?.id,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Navigation Alignment</label>
            <select
              value={settings.navigationAlignment}
              onChange={(e) => setSettings({ ...settings, navigationAlignment: e.target.value as 'left' | 'right' })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="right">Right (Desktop)</option>
              <option value="left">Left (Mobile)</option>
            </select>
          </div>
          <button
            onClick={saveSettings}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
</boltArtifact>

      Now let's create the main page with the dynamic navigation:

      <boltArtifact id="main-page" title="Main Page">
        <boltAction type="file" filePath="pages/index.tsx">import { useState, useEffect } from 'react'
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
