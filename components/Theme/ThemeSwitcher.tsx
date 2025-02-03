import { useTheme } from './ThemeContext'
import Moon, Sun from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-100"
    >
      {theme === 'dark' ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  )
}
</boltArtifact>

      Finally, let's create the settings modal:

      <boltArtifact id="settings-modal" title="Settings Modal Component">
        <boltAction type="file" filePath="components/Settings/SettingsModal.tsx">import { useState } from 'react'
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
