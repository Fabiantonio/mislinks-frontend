import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function HandleLayout() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-lg mx-auto py-16 px-5">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
