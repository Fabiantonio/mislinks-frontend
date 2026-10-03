import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import api from "../config/axios";
import ErrorMsg from "../components/ErrorMsg";
import Spinner from "../components/Spinner";

type ResetPasswordForm = {
  password: string;
  password_confirmation: string;
};

export default function ResetPasswordView() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    defaultValues: { password: "", password_confirmation: "" },
  });

  const password = watch("password");

  const handleResetPassword = async (data: ResetPasswordForm) => {
    setIsSaving(true);
    try {
      const { data: res } = await api.post<string>(
        `/auth/reset-password/${token}`,
        { password: data.password },
      );
      toast.success(res);
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("No se pudo conectar con el servidor");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        Nueva contraseña
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-10 text-sm font-medium">
        Elige una contraseña de al menos 8 caracteres
      </p>

      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border-b-2 border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-slate-900 dark:focus:border-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-slate-900 dark:text-white bg-transparent"
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
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1"
            htmlFor="password_confirmation"
          >
            Repetir password
          </label>
          <input
            className="w-full border-b-2 border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-slate-900 dark:focus:border-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-slate-900 dark:text-white bg-transparent"
            type="password"
            id="password_confirmation"
            placeholder="••••••••"
            {...register("password_confirmation", {
              required: "Repite la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMsg>{errors.password_confirmation.message}</ErrorMsg>
          )}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
        >
          {isSaving ? <Spinner /> : "Guardar contraseña"}
        </button>
      </form>

      <nav className="mt-10 flex flex-col items-center space-y-4">
        <Link
          className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors"
          to="/auth/forgot-password"
        >
          Solicitar un nuevo enlace
        </Link>
      </nav>
    </>
  );
}
