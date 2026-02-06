import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import { Navigate } from "react-router-dom";
import MisLinks from "../components/MisLinks";
import { Toaster } from "sonner";
export default function AppLayout() {
  const {
    data: user,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (user)
    return (
      <>
        <MisLinks user={user} />
        <Toaster position="top-right" richColors closeButton />
      </>
    );
}
