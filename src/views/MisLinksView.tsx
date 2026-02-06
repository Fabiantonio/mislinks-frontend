import { useEffect, useState } from "react";
import { social } from "../data/social";
import MisLinksInput from "../components/MisLinksInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import type { SocialLinks, User } from "../types";
import Spinner from "../components/Spinner";

export default function MisLinksView() {
  const [socialLinks, setSocialLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Links actualizados");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const updatedData = socialLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialLinks) => link.name === item.name,
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }

      return item;
    });
    setSocialLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setSocialLinks(updatedLinks);
    queryClient.setQueryData(["user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedLinks) };
    });
  };

  const handleEnableLink = (name: string) => {
    const updatedLinks = socialLinks.map((link) => {
      if (link.name === name) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Url no válida");
        }
      }
      return link;
    });
    setSocialLinks(updatedLinks);
    queryClient.setQueryData(["user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedLinks) };
    });
  };

  return (
    <div>
      {socialLinks.map((item) => (
        <MisLinksInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
        onClick={() => mutate(user)}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner />
        ) : (
          "Guardar Cambios"
        )}
      </button>
    </div>
  );
}
