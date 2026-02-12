import { useForm } from "react-hook-form";
import ErrorMsg from "../components/ErrorMsg";
import type { ProfileForm, User } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import { themes } from "../data/themes";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle || "",
      description: data.description || "",
      theme: data.theme || themes[0],
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data,
        };
      });
      toast.success("Imagen actualizada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      uploadImageMutation.mutate(file);
    }
  };

  const handleUserProfile = (formData: ProfileForm) => {
    const user = queryClient.getQueryData<User>(["user"])!;
    
    // Buscar el tema completo basado en el ID seleccionado o usar el por defecto
    const selectedTheme = themes.find(t => t.id === formData.theme.id) || themes[0];

    // Crear una copia del usuario con los nuevos datos
    const updatedUser = {
      ...user,
      handle: formData.handle,
      description: formData.description,
      theme: selectedTheme
    };

    updateProfileMutation.mutate(updatedUser);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleUserProfile)}
          noValidate
        >
          <legend className="text-xl font-black text-slate-900 uppercase tracking-widest text-center mb-8">
            Editar Perfil
          </legend>

          <div className="space-y-2">
            <label
              htmlFor="handle"
              className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="handle"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 shadow-sm"
              placeholder="Tu nombre de usuario"
              {...register("handle", {
                required: "El handle es requerido",
              })}
            />
            {errors.handle && <ErrorMsg>{errors.handle.message}</ErrorMsg>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1"
            >
              Descripción
            </label>
            <textarea
              id="description"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 shadow-sm min-h-[100px] resize-none"
              placeholder="Cuéntanos algo sobre ti"
              {...register("description", {
                required: "La descripción es requerida",
              })}
            />
            {errors.description && (
              <ErrorMsg>{errors.description.message}</ErrorMsg>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1"
            >
              Imagen de Perfil
            </label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-300 rounded-xl shadow-sm">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleChangeImage}
              />
              <label
                htmlFor="image"
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-black text-slate-700 uppercase tracking-wider hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadImageMutation.isPending
                  ? "Subiendo..."
                  : "Seleccionar Archivo"}
              </label>
              <span className="text-xs font-bold text-slate-400 italic">
                PNG, JPG o GIF. Máx 2MB.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Tema del Perfil
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <div key={theme.id} className="relative">
                  <input
                    type="radio"
                    id={theme.id}
                    value={theme.id}
                    {...register("theme.id")}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={theme.id}
                    className={`
                      block w-full h-24 rounded-xl border-2 cursor-pointer transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]
                      ${theme.bg}
                      peer-checked:border-slate-900 peer-checked:ring-2 peer-checked:ring-slate-900 peer-checked:ring-offset-2
                      border-slate-200
                      flex flex-col justify-end p-2
                    `}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.text}`}>
                      {theme.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-900/20 mt-8 flex justify-center items-center h-[52px]"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? <Spinner /> : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </>
  );
}
