import type { SocialLinks } from "../types";
import { Switch } from "@headlessui/react";

export type MisLinksInputProps = {
  item: SocialLinks;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (name: string) => void;
};

export default function MisLinksInput({ item, handleUrlChange, handleEnableLink }: MisLinksInputProps) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 mb-3">
      <div
        className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner flex-shrink-0"
        style={{ backgroundImage: `url(/social/icon_${item.name}.svg)`, backgroundSize: "24px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      ></div>

      <div className="flex-1">
        <input
          type="text"
          className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder={`https://${item.name}.com/tu_usuario`}
          value={item.url}
          onChange={handleUrlChange}
          name={item.name}
        />
      </div>

      <Switch
        checked={item.enabled}
        onChange={() => handleEnableLink(item.name)}
        className={`${
          item.enabled ? "bg-slate-900 dark:bg-slate-200" : "bg-slate-200 dark:bg-slate-700"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex-shrink-0`}
      >
        <span
          className={`${
            item.enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-900 transition-transform shadow-sm`}
        />
      </Switch>
    </div>
  );
}
