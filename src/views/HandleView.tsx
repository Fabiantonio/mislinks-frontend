
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { getUserByHandle } from "../api/DevTreeAPI";
import type { SocialNetwork } from "../types";
import Skeleton from "../components/Skeleton";

export default function HandleView() {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", handle],
    queryFn: () => getUserByHandle(handle!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

if (isLoading) return (
    <div className="mt-10">
      <Skeleton />
    </div>
  );  
  
  if (isError) return <Navigate to="/404" />;

  if (data) {
    const links : SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);

    return (
      <>
        

        <div className="space-y-12">
        <div className="flex flex-col items-center gap-4">
          {data.image && (
            <img
              src={data.image}
              alt={data.handle}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl shadow-slate-200/50 object-cover"
            />
          )}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-slate-900">@{data.handle}</h1>
            <p className="text-slate-600 font-medium max-w-sm mx-auto leading-relaxed">
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
                className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-slate-200 transition-colors">
                  <img
                    src={`/social/icon_${link.name}.svg`}
                    className="w-6 h-6"
                    alt={link.name}
                  />
                </div>
                <span className="text-slate-800 font-bold capitalize text-sm">
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
      </div>
      </>
    );
  }

  return null;
}
