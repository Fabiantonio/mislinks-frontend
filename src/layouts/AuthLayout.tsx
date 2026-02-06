import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Toaster } from 'sonner'
import Footer from "../components/Footer";

export default function AuthLayout() {
  return (
    <>

      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Left Side - Information */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-50 m-6 rounded-3xl flex-col justify-center items-center relative overflow-hidden">
          <div className="max-w-md text-left z-10 p-12">
            <h1 className="text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Maneja tus enlaces de <span className="text-slate-500">forma sencilla</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
              Tus enlaces se guardan de forma segura y puedes acceder a ellos
              desde cualquier dispositivo.
            </p>
            {/* Minimalist Card */}
            <div className="relative w-full h-72 mt-4">
              <div className="relative h-full bg-white border border-slate-300 shadow-xl shadow-slate-200/50 rounded-2xl p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Preview</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                    {/* Minimal Item 1 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                <img src="/social/icon_facebook.svg" className="w-6 h-6 grayscale opacity-60" alt="FB" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-2 w-24 bg-slate-300 rounded-full"></div>
                                <div className="h-1.5 w-16 bg-slate-200 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-8 h-4 bg-slate-900/20 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-slate-900 rounded-full"></div>
                        </div>
                    </div>

                    {/* Minimal Item 2 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                <img src="/social/icon_instagram.svg" className="w-6 h-6 grayscale opacity-60" alt="IG" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-2 w-28 bg-slate-300 rounded-full"></div>
                                <div className="h-1.5 w-20 bg-slate-200 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-12 scale-125">
              <Logo />
            </div>
            <div className="bg-white">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Toaster 
        position="top-right"
        richColors
        closeButton
      />
    </>
  );
}
