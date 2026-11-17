"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type ShareButtonsProps = {
  /** Site-relative path of the page being shared. */
  path: string;
  title: string;
  className?: string;
};

export function ShareButtons({ path, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const networks: { label: string; icon: IconName; href: string }[] = [
    {
      label: "Share on LinkedIn",
      icon: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on X",
      icon: "x",
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on Facebook",
      icon: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];
  const button =
    "-m-2 grid size-10 place-items-center rounded-md text-ink transition-colors duration-300 hover:text-turquoise focus-visible:text-turquoise";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-body-xs text-slate">Share</span>
      <div className="flex items-center gap-4">
        <button type="button" onClick={copy} className={button} aria-label="Copy link">
          <Icon name={copied ? "check" : "link"} className="size-5" />
        </button>
        {networks.map((network) => (
          <a
            key={network.icon}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            className={button}
            aria-label={network.label}
          >
            <Icon name={network.icon} className="size-5" />
          </a>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
