import type { SocialLinks } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type MisLinksListProps = {
  link: SocialLinks;
};

export default function MisLinksList({ link }: MisLinksListProps) {
  // Los links no tienen `id`: el nombre de la red es único y estable
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.name });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      
      rel="noopener noreferrer"
      className={`flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl group shadow-sm cursor-grab select-none ${isDragging ? "cursor-grabbing shadow-lg" : ""}`}
    >
      <div
        className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner flex-shrink-0"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)`, backgroundSize: "24px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      ></div>

      <a className="flex-1 min-w-0 text-left" href={link.url}
      target="_blank" draggable={false}>
        <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {link.name}
        </h3>
        <p className="text-xs font-black text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white truncate transition-colors">
          {link.url.replace(/^https?:\/\/(www\.)?/, "")}
        </p>
      </a>

      <a href={link.url} target="_blank" draggable={false} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </a>
    </div>
  );
}
