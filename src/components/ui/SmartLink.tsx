import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  external?: boolean;
};

/** Internal routes use `next/link`; external URLs open in a new tab with safe rel attributes. */
export function SmartLink({ href, external, children, ...props }: SmartLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const opensTab = href.startsWith("http");
    return (
      <a
        href={href}
        {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
        {opensTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
