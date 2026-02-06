import { useLocation } from 'react-router-dom'
import AdminNavigation from './AdminNavigation'
import Logo from './Logo'

export default function Header() {

    const location = useLocation()

  return (
          <header className="sticky top-0 z-50 bg-transparent border-b backdrop-blur-xl border-slate-200 py-4 shadow-sm shadow-slate-100/50">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between px-5 lg:px-0">
              <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <Logo />
              </div>
              <div className="md:w-1/3 md:flex md:justify-end mt-4 md:mt-0">
                {location.pathname === '/' ? '' : <AdminNavigation />}
              </div>
            </div>
          </header>
  )
}
