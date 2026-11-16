import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

/**
 * Figma "CTA" component: Green / Black / Border Black / White types (plus a light outline and
 * glass for imagery). `solid`, `outline` and `solid-light` are the legacy names for Black,
 * Border Black and White.
 */
export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "light"
  | "outline-light"
  | "glass"
  | "solid"
  | "solid-light"
  | "orange";
export type ButtonSize = "lg" | "md" | "sm";

const base =
  "group/button wave inline-flex items-center justify-center gap-2.5 rounded-md border whitespace-nowrap font-sans font-medium uppercase transition-[color,border-color,scale] duration-500 ease-out-quart delay-75 active:scale-[0.97] active:delay-0 active:duration-150 disabled:pointer-events-none disabled:opacity-50";

/**
 * Each type pairs its resting look with the colour of the wave that rises through it on hover or
 * keyboard focus (Green → Turquoise 160, Border Black → Turquoise, Black/White → Black).
 */
const variants: Record<ButtonVariant, { idle: string; fill: string }> = {
  primary: {
    idle: "border-turquoise bg-turquoise text-white hover:border-lagoon",
    fill: "[--wave:var(--color-lagoon)]",
  },
  dark: { idle: "border-navy bg-navy text-white hover:border-black", fill: "[--wave:#000]" },
  outline: {
    idle: "border-navy text-ink hover:border-turquoise hover:text-white focus-visible:border-turquoise focus-visible:text-white",
    fill: "[--wave:var(--color-turquoise)]",
  },
  light: {
    idle: "border-white bg-white text-ink hover:border-black hover:text-white focus-visible:text-white",
    fill: "[--wave:#000]",
  },
  "outline-light": {
    idle: "border-white text-white hover:text-ink focus-visible:text-ink",
    fill: "[--wave:#fff]",
  },
  glass: {
    idle: "glass border-white/30 text-white hover:border-white hover:text-ink focus-visible:text-ink",
    fill: "[--wave:#fff]",
  },
  // The legacy filled button now uses the primary turquoise everywhere (forms, error pages).
  solid: {
    idle: "border-turquoise bg-turquoise text-white hover:border-lagoon",
    fill: "[--wave:var(--color-lagoon)]",
  },
  "solid-light": {
    idle: "border-white bg-white text-ink hover:border-black hover:text-white focus-visible:text-white",
    fill: "[--wave:#000]",
  },
  // Brand orange, for accents on deep-teal surfaces.
  orange: {
    idle: "border-deep-orange bg-deep-orange text-white hover:border-[#d9681a]",
    fill: "[--wave:#d9681a]",
  },
};

const sizes: Record<ButtonSize, string> = {
  lg: "min-h-14 px-8 text-cta-lg",
  md: "min-h-[2.625rem] px-8 text-cta-md",
  sm: "min-h-[2.375rem] px-6 text-cta-md",
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

/** The diagonal arrow turns to point right; other icons nudge along their direction. */
const iconMotion = (icon: IconName, position: "start" | "end") =>
  icon === "arrow-up-right"
    ? "group-hover/button:rotate-45 group-focus-visible/button:rotate-45"
    : position === "start"
      ? "group-hover/button:-translate-x-1 group-focus-visible/button:-translate-x-1"
      : "group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1";

function Content({ icon, iconPosition = "end", children }: CommonProps) {
  const glyph = icon ? (
    <Icon
      name={icon}
      className={cn(
        "size-4 transition-transform duration-700 ease-out-expo",
        iconMotion(icon, iconPosition),
      )}
    />
  ) : null;
  return (
    <>
      {iconPosition === "start" ? glyph : null}
      {/* Masked text roll on hover: the label slides up out of a clipped line as a copy rolls in
          from below. */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover/button:-translate-y-full group-focus-visible/button:-translate-y-full motion-reduce:transition-none">
          {children}
          <span aria-hidden className="absolute top-full left-0 block w-full">
            {children}
          </span>
        </span>
      </span>
      {iconPosition === "end" ? glyph : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "outline", size = "md", className, icon, iconPosition, children } = props;
  const classes = cn(base, variants[variant].idle, variants[variant].fill, sizes[size], className);
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
