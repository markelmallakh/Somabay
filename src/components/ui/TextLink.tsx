import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** Extra context for screen readers when the visible label is generic ("Read more"). */
  srContext?: string;
};

export function TextLink({ href, children, className, external, srContext }: TextLinkProps) {
  return (
    <SmartLink
      href={href}
      external={external}
      className={cn(
        "group/link inline-flex items-center gap-2 text-body-xs font-semibold tracking-label uppercase",
        className,
      )}
    >
      <span className="link-underline pb-0.5">{children}</span>
      {srContext ? <span className="sr-only">: {srContext}</span> : null}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-700 ease-out-expo group-hover/link:translate-x-1"
      />
    </SmartLink>
  );
}
