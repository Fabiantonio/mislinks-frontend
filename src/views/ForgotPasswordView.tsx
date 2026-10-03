import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import api from "../config/axios";
import ErrorMsg from "../components/ErrorMsg";
import Spinner from "../components/Spinner";

type ForgotPasswordForm = { email: string };

export default function ForgotPasswordView() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ defaultValues: { email: "" } });

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    setIsSending(true);
    try {
      await api.post<string>("/auth/forgot-password", data);
      setSent(true);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("No se pudo conectar con el servidor");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        Recuperar contraseña
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-10 text-sm font-medium">
        Te enviaremos un enlace para restablecerla
      </p>

      {sent ? (
        <p className="text-center text-sm font-medium text-slate-700 dark:text-slate-300">
          Si el correo está registrado, recibirás instrucciones para
          restablecer tu contraseña. Revisa también la carpeta de spam.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-1.5">
            <label
              className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border-b-2 border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-slate-900 dark:focus:border-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-slate-900 dark:text-white bg-transparent"
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
            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
          >
            {isSending ? <Spinner /> : "Enviar enlace"}
          </button>
        </form>
      )}

      <nav className="mt-10 flex flex-col items-center space-y-4">
        <Link
          className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors"
          to="/auth/login"
        >
          Volver a iniciar sesión
        </Link>
      </nav>
    </>
  );
}
