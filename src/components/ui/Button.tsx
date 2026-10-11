import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

export type ButtonVariant = "outline" | "solid" | "outline-light" | "solid-light" | "glass";
export type ButtonSize = "md" | "sm";

const base =
  "group/button relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden whitespace-nowrap px-8 text-[0.75rem] font-semibold uppercase tracking-label transition-colors duration-500 ease-out-quart disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  outline: "border border-ink/80 text-ink hover:border-ink hover:bg-ink hover:text-sand-50",
  solid: "border border-ink bg-ink text-sand-50 hover:border-lagoon hover:bg-lagoon",
  "outline-light":
    "border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink",
  "solid-light": "border border-white bg-white text-ink hover:border-sand-200 hover:bg-sand-200",
  glass: "glass border border-white/30 text-white hover:bg-white hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  md: "",
  sm: "min-h-10 px-5 text-[0.6875rem]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Content({ icon, iconPosition = "end", children }: CommonProps) {
  const glyph = icon ? (
    <Icon
      name={icon}
      className="size-4 transition-transform duration-500 ease-out-quart group-hover/button:translate-x-0.5"
    />
  ) : null;
  return (
    <>
      {iconPosition === "start" ? glyph : null}
      <span>{children}</span>
      {iconPosition === "end" ? glyph : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "outline", size = "md", className, icon, iconPosition, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <Content icon={icon} iconPosition={iconPosition}>
      {children}
    </Content>
  );

  if (props.href !== undefined) {
    const {
      href,
      external,
      variant: _v,
      size: _s,
      icon: _i,
      iconPosition: _ip,
      className: _c,
      children: _ch,
      ...anchorProps
    } = props;
    return (
      <SmartLink href={href} external={external} className={classes} {...anchorProps}>
        {content}
      </SmartLink>
    );
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    iconPosition: _ip,
    className: _c,
    children: _ch,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
