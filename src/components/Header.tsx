import { useLocation } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import AdminNavigation from './AdminNavigation'
import Logo from './Logo'
import { useTheme } from '../hooks/useTheme'

export default function Header() {

    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

  return (
          <header className="sticky top-0 z-50 bg-transparent dark:bg-slate-950/80 border-b backdrop-blur-xl border-slate-200 dark:border-slate-800 py-4 shadow-sm shadow-slate-100/50 dark:shadow-none">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between px-5 lg:px-0">
              <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <Logo />
              </div>
              <div className="md:w-1/3 flex items-center justify-center gap-4 md:justify-end mt-4 md:mt-0">
                {location.pathname !== '/' && <AdminNavigation />}
                <button
                  onClick={toggleTheme}
                  className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
                  title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                  aria-label="Cambiar tema"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </header>
  )
}
