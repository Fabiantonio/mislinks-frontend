import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type LoginForm } from "../types";
import ErrorMsg from "../components/ErrorMsg";
import { isAxiosError } from "axios";
import api from "../config/axios";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "../components/Spinner";

export default function LoginView() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: initialValues });

  const handleLogin = async (data: LoginForm) => {
    setIsLoggingIn(true);
    try {
      const { data: res } = await api.post<string>(`/auth/login`, data);
      localStorage.setItem("AUTH_TOKEN", res);
      //redireccionar a la página principal
      // await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
        Iniciar Sesión
      </h1>
      <p className="text-slate-600 text-center mb-10 text-sm font-medium">
        Ingresa tus credenciales para acceder
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <input
              className="w-full border-b-2 border-slate-200 py-3 pl-10 outline-none focus:border-slate-900 transition-all placeholder:text-slate-400 font-bold text-slate-900 bg-transparent"
              type="email"
              id="email"
              placeholder="email@ejemplo.com"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
          </div>
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
              className="w-full border-b-2 border-slate-200 py-3 pl-10 outline-none focus:border-slate-900 transition-all placeholder:text-slate-400 font-bold text-slate-900 bg-transparent"
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
          </div>
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
        >
          {isLoggingIn ? <Spinner /> : "Iniciar Sesión"}
        </button>
      </form>

      <nav className="mt-10 flex flex-col items-center space-y-4">
        <Link
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          to="/auth/register"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
}
