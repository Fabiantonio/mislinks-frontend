import { BookmarkSquareIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Links", href: "/admin", icon: BookmarkSquareIcon },
  { name: "Mi Perfil", href: "/admin/profile", icon: UserIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationTabs() {
  const location = useLocation();

  return (
    <div className="mb-8">
      <div className="border-b border-slate-200 dark:border-slate-800">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? "border-slate-900 text-slate-900 dark:border-white dark:text-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-black uppercase tracking-wider transition-all",
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400",
                    "-ml-0.5 mr-2 h-5 w-5 transition-colors",
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
    </div>
  );
}
