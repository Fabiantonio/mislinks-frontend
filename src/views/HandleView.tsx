import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserByHandle } from "../api/DevTreeAPI";
import type { SocialNetwork, User } from "../types";
import Skeleton from "../components/Skeleton";
import Footer from "../components/Footer";
import { themes } from "../data/themes";

const themeCacheKey = (handle: string) => `HANDLE_THEME_${handle}`;

function getCachedThemeId(handle: string) {
  try {
    return localStorage.getItem(themeCacheKey(handle));
  } catch {
    return null;
  }
}

export default function HandleView() {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", handle],
    queryFn: () => getUserByHandle(handle!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Recordar el tema de este perfil para pintar el fondo correcto mientras carga en la próxima visita
  useEffect(() => {
    if (!data?.theme?.id) return;
    try {
      localStorage.setItem(themeCacheKey(data.handle), data.theme.id);
    } catch {
      // Sin acceso a localStorage (modo privado, bloqueado, etc.)
    }
  }, [data]);

  if (isError) return <Navigate to="/404" />;

  const themeId = data ? data.theme?.id : getCachedThemeId(handle!);
  const theme = themes.find((t) => t.id === themeId) || themes[0];

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} py-16 px-5 transition-colors duration-500`}
    >
      {isLoading || !data ? (
        <Skeleton />
      ) : (
        <HandleContent data={data} theme={theme} />
      )}
    </div>
  );
}

type HandleContentProps = {
  data: User;
  theme: (typeof themes)[number];
};

function HandleContent({ data, theme }: HandleContentProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${data.handle}`);
    toast.success("Enlace copiado");
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col min-h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleShare}
          title="Copiar enlace"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest active:scale-[0.98] ${theme.button}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Compartir
        </button>
      </div>

      <header className="flex flex-col items-center text-center gap-6 mt-6">
        <div className="rounded-full p-1.5 border-2 border-current">
          {data.image ? (
            <img
              src={data.image}
              alt={data.handle}
              className="w-28 h-28 rounded-full object-cover shadow-xl"
            />
          ) : (
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-current opacity-10" />
              <span className="relative text-4xl font-black uppercase">
                {data.handle[0]}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {data.name && (
            <h1 className="text-2xl font-black tracking-tight">{data.name}</h1>
          )}
          <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70">
            @{data.handle}
          </p>
        </div>

        {data.description && (
          <>
            <div className="w-12 h-1 rounded-full bg-current opacity-20" />
            <p className="opacity-80 font-medium max-w-sm leading-relaxed">
              {data.description}
            </p>
          </>
        )}
      </header>

      <main className="flex flex-col gap-4 mt-12">
        {links.length > 0 ? (
          links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className={`group relative flex items-center gap-4 p-3 pr-5 rounded-2xl active:scale-[0.98] ${theme.button}`}
            >
              <span className="w-11 h-11 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
                <img
                  src={`/social/icon_${link.name}.svg`}
                  className="w-10 h-10"
                  alt=""
                />
              </span>
              <span className="flex-1 text-center font-bold capitalize text-sm">
                Visita mi {link.name}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          ))
        ) : (
          <div className="py-10 border-2 border-dashed border-current rounded-2xl opacity-40 text-center">
            <p className="text-[11px] font-black uppercase tracking-widest">
              No hay enlaces para mostrar
            </p>
          </div>
        )}
      </main>

      <div className="mt-auto pt-16 flex flex-col items-center gap-2">
        <Footer className="py-2 text-xs font-medium opacity-50" />
      </div>
    </div>
  );
}
