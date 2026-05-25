'use client'

import { signOut } from '@/app/actions/auth'
import { LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface PropertiesViewerShellProps {
  children: React.ReactNode
  user: { name: string; email: string }
}

export default function PropertiesViewerShell({
  children,
  user,
}: PropertiesViewerShellProps) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div
      className={`min-h-screen flex flex-col ${isLight ? 'bg-gray-50 text-gray-900' : 'bg-black text-white'}`}
    >
      <header
        className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
          isLight ? 'bg-white border-gray-200' : 'bg-zinc-900 border-zinc-800'
        }`}
      >
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Propiedades
          </h1>
          <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-zinc-800 text-zinc-400'
            }`}
            aria-label="Cambiar tema"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <form action={signOut}>
            <button
              type="submit"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-zinc-800 text-zinc-400'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 min-w-0 p-4 md:p-6">{children}</main>
    </div>
  )
}
