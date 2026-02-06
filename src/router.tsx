import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import HandleLayout from "./layouts/HandleLayout";
import MisLinksView from "./views/MisLinksView";
import Profileview from "./views/Profileview";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticacion */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<MisLinksView />} />
          <Route path="profile" element={<Profileview />} />
        </Route>

        <Route path="/:handle" element={<HandleLayout />}>
          <Route index={true} element={<HandleView />} />
        </Route>

        <Route path="/" element={<HomeView />} />

        <Route path="/404" element={<NotFoundView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
