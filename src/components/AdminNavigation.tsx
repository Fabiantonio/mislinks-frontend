import { useQueryClient } from "@tanstack/react-query";

export default function AdminNavigation() {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <button
      className="text-slate-500 hover:text-slate-900 text-xs font-black uppercase tracking-[0.15em] transition-colors"
      onClick={logout}
    >
      Cerrar Sesión
    </button>
  );
}
