import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <main className="mx-auto max-w-5xl px-5 lg:px-0 text-center animate-fade-in">
            {/* 404 Text/Graphic */}
            <div className="relative mb-8">
                <h1 className="text-[10rem] md:text-[14rem] leading-none font-black text-slate-100 select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl shadow-sm rotate-12">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Página no encontrada
            </h2>
          
            <p className="text-lg text-slate-600 mb-12 font-medium max-w-lg mx-auto leading-relaxed">
                Lo sentimos, no pudimos encontrar la página que buscas. Verifica la URL o regresa al inicio.
            </p>

            <Link
              to="/"
              className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/20"
            >
              Volver al inicio
            </Link>
        </main>
      </div>
    </>
  );
}
