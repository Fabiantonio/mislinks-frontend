import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group select-none cursor-pointer">
      <div className="relative flex items-center justify-center w-8 h-8 bg-slate-900 rounded-lg transition-transform group-hover:scale-105">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-5 h-5 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-400 rounded-full border-2 border-white"></div>
      </div>
      <span className="text-xl font-black text-slate-900 tracking-tighter">
        Mis<span className="text-slate-500">Links</span>
      </span>
    </Link>
  )
}
