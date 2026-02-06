import { Link } from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <div className="flex items-center justify-center space-x-4">
    <Link
      className="text-slate-500 hover:text-slate-900 text-xs font-black uppercase tracking-[0.15em] transition-colors cursor-pointer"
      to="/auth/login"
    >
       Iniciar Sesión
    </Link>
    <span className="text-slate-500 text-xs font-black uppercase tracking-[0.15em]">o</span>
    <Link
      className="text-slate-500 hover:text-slate-900 text-xs font-black uppercase tracking-[0.15em] transition-colors cursor-pointer"
      to="/auth/register"
    >
       Registrarse
    </Link>
    </div>
  );
}
