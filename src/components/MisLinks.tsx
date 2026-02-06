import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { toast, Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { SocialLinks, SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import MisLinksList from "./MisLinksList";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type MisLinksProps = {
  user: User;
};

export default function MisLinks({ user }: MisLinksProps) {
  const [activeLinks, setActiveLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((link: SocialLinks) => link.enabled),
  );

  useEffect(() => {
    setActiveLinks(
      JSON.parse(user.links).filter((link: SocialLinks) => link.enabled),
    );
  }, [user]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    const prevIndex = activeLinks.findIndex((link) => link.id === e.active.id);
    const newIndex = activeLinks.findIndex((link) => link.id === e.over?.id);
    const order = arrayMove(activeLinks, prevIndex, newIndex);
    setActiveLinks(order);
    const inactiveLinks: SocialNetwork[] = JSON.parse(user.links).filter(
      (link: SocialLinks) => !link.enabled,
    );
    const links = [...order, ...inactiveLinks];
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(links),
      };
    });
  };

  return (
    <>
      <Header />

      <div className="bg-white min-h-screen py-10">
        <main className="mx-auto max-w-5xl px-5 lg:px-0">
          <NavigationTabs />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                Tu link:
              </span>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-full px-4 py-1.5 transition-all hover:border-slate-400 group">
                <span className="text-slate-900 font-bold text-sm">
                  {user.handle}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/${user.handle}`,
                    );
                    toast.success("Enlace copiado");
                  }}
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  title="Copiar"
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
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Link
              className="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2 group"
              to={`/${user.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>Ver Perfil</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-12 mt-12">
            <div className="flex-1 order-2 md:order-1">
              <Outlet />
            </div>

            <aside className="w-full md:w-80 order-1 md:order-2">
              <div className="sticky top-24 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
                <div className="relative flex flex-col items-center text-center">
                  {user.image ? (
                    <div className="mb-6">
                      <img
                        src={user.image}
                        className="w-32 h-32 rounded-full object-cover border border-slate-200 p-1.5 bg-white shadow-sm"
                        alt={user.handle}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 mb-6">
                      <span className="text-4xl text-slate-400 font-bold uppercase">
                        {user.handle[0]}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1 mb-6">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {user.name}
                    </h2>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      @{user.handle}
                    </p>
                  </div>

                  <div className="w-12 h-1 bg-slate-200 rounded-full mb-6"></div>

                  <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                    {user.description ||
                      "Personaliza tu perfil añadiendo una descripción."}
                  </p>

                  <div className="w-full space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={activeLinks}
                        strategy={verticalListSortingStrategy}
                      >
                        {activeLinks.length > 0 ? (
                          activeLinks.map((link) => (
                            <MisLinksList key={link.name} link={link} />
                          ))
                        ) : (
                          <div className="py-8 border-2 border-dashed border-slate-200 rounded-2xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Sin enlaces activos
                            </p>
                          </div>
                        )}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
