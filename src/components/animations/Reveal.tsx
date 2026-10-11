"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "./easing";

const tags = {
  div: m.div,
  li: m.li,
  article: m.article,
  header: m.header,
  span: m.span,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
};

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  distance = 32,
  amount = 0.25,
}: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: easeOutExpo, delay }}
    >
      {children}
    </Component>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOutExpo } },
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  amount?: number;
};

const groupTags = { div: m.div, ul: m.ul, ol: m.ol } as const;

/** Staggers the entrance of its `RevealItem` children. */
export function RevealGroup({ children, className, as = "div", amount = 0.2 }: RevealGroupProps) {
  const Component = groupTags[as];
  return (
    <Component
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof tags;
}) {
  const Component = tags[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
