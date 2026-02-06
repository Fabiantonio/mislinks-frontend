import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import ErrorMsg from "../components/ErrorMsg";
import Spinner from "../components/Spinner";
import { toast } from "sonner";
import type { RegisterForm } from "../types";
import api from "../config/axios";
import { useState } from "react";

export default function RegisterView() {
  const [isRegistering, setIsRegistering] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (data: RegisterForm) => {
    setIsRegistering(true);
    try {
      const { data: res } = await api.post(`/auth/register`, data);
      reset();
      toast.success(res);
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
        Crear Cuenta
      </h1>
      <p className="text-slate-600 text-center mb-10 text-sm font-medium">
        Únete a nosotros y organiza tus enlaces
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1"
            htmlFor="name"
          >
            Nombre
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <input
              className="w-full border-b-2 border-slate-200 py-3 pl-10 outline-none focus:border-slate-900 transition-all placeholder:text-slate-400 font-bold text-slate-900 bg-transparent"
              type="text"
              id="name"
              placeholder="Tu nombre completo"
              {...register("name", { required: "El nombre es requerido" })}
            />
          </div>
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </div>

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
            htmlFor="handle"
          >
            Handle
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <input
              className="w-full border-b-2 border-slate-200 py-3 pl-10 outline-none focus:border-slate-900 transition-all placeholder:text-slate-400 font-bold text-slate-900 bg-transparent"
              type="text"
              id="handle"
              placeholder="nombre_usuario"
              {...register("handle", { required: "El handle es requerido" })}
            />
          </div>
          {errors.handle && <ErrorMsg>{errors.handle.message}</ErrorMsg>}
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
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
          </div>
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1"
            htmlFor="password_confirmation"
          >
            Repetir Password
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
              id="password_confirmation"
              placeholder="••••••••"
              {...register("password_confirmation", {
                required: "La confirmación es requerida",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
          </div>
          {errors.password_confirmation && (
            <ErrorMsg>{errors.password_confirmation.message}</ErrorMsg>
          )}
        </div>

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
        >
          {isRegistering ? <Spinner /> : "Crear Cuenta"}
        </button>
      </form>

      <nav className="mt-10 flex flex-col items-center space-y-4">
        <Link
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          to="/auth/login"
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
}
