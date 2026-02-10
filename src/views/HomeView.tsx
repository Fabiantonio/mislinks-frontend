import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../config/axios";
import { getUser } from "../api/DevTreeAPI";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    // Esto "despierta" el backend si está en un hosting gratuito
    api.get("/health").catch(() => {});
  }, []);


  if (user) return <Navigate to="/admin" />;
  
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <main className="mx-auto max-w-5xl px-5 lg:px-0 pt-20 pb-32">
          <div className="flex flex-col items-center text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                simple y seguro
              </span>
            </div>

            {/* Hero Content */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight max-w-3xl">
              Todos tus enlaces en{" "}
              <span className="text-slate-500">un solo lugar.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-medium max-w-2xl">
              Crea tu página personalizada de enlaces en segundos. Comparte tu
              perfil con el mundo de forma elegante y profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/auth/register"
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/20"
              >
                Registrate
              </Link>
              <Link
                to="/auth/login"
                className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Iniciar Sesión
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                  Rápido
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Configura tu perfil en menos de 2 minutos sin complicaciones.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                  Seguro
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Tus datos y enlaces están protegidos con tecnología moderna.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                  Responsivo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Tu perfil se verá increíble en cualquier dispositivo móvil o
                  PC.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
