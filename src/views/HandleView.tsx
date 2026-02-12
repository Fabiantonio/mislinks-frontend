
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { getUserByHandle } from "../api/DevTreeAPI";
import type { SocialNetwork } from "../types";
import Skeleton from "../components/Skeleton";
import Footer from "../components/Footer";
import { themes } from "../data/themes";

export default function HandleView() {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", handle],
    queryFn: () => getUserByHandle(handle!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="mt-10">
        <Skeleton />
      </div>
    );

  if (isError) return <Navigate to="/404" />;

  if (data) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter(
      (link: SocialNetwork) => link.enabled,
    );
    const theme = themes.find(t => t.id === data.theme?.id) || themes[0];

    return (
      <>
        <div className={`min-h-screen ${theme.bg} py-20 px-5 transition-colors duration-500`}>
          <div className="max-w-lg mx-auto space-y-12">
            <div className="flex flex-col items-center gap-4">
              {data.image && (
                <img
                  src={data.image}
                  alt={data.handle}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl shadow-slate-200/50 object-cover"
                />
              )}
              <div className="text-center space-y-2">
                <h1 className={`text-2xl font-black ${theme.text}`}>
                  @{data.handle}
                </h1>
                <p className={`${theme.text} opacity-80 font-medium max-w-sm mx-auto leading-relaxed`}>
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {links.length > 0 ? (
                links.map((link: SocialNetwork) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                        group flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98]
                        ${theme.button}
                    `}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <img
                        src={`/social/icon_${link.name}.svg`}
                        className="w-6 h-6"
                        alt={link.name}
                      />
                    </div>
                    <span className="font-bold capitalize text-sm">
                      Visita mi {link.name}
                    </span>
                  </a>
                ))
              ) : (
                <p className="text-center text-slate-400 text-sm font-medium">
                  No hay enlaces para mostrar
                </p>
              )}
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return null;
}
