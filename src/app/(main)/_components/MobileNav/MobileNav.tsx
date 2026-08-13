"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/tailwind";
import { ROUTES } from "@/utils/constants/routes";

import { navItems } from "./constants";

export const MobileNav = () => {
  const pathname = usePathname();

  const activeNavIndex = navItems.findIndex((item) =>
    item.to === ROUTES.GAMES
      ? pathname === ROUTES.GAMES
      : pathname === item.to || pathname.startsWith(`${item.to}/`),
  );

  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 sm:hidden">
      <div className="relative grid grid-cols-3 items-center gap-1 rounded-full bg-background p-1 shadow-elevated">
        {activeNavIndex >= 0 && (
          <div
            style={{
              transform: `translateX(calc(${activeNavIndex * 100}% + ${activeNavIndex * 0.25}rem))`,
            }}
            className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-1rem)/3)] rounded-full bg-violet-50 transition-transform duration-300 ease-out"
          />
        )}
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.to === ROUTES.GAMES
              ? pathname === ROUTES.GAMES
              : pathname === item.to || pathname.startsWith(`${item.to}/`);

          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "relative z-10 flex flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[12px]/4 tracking-wide transition-colors duration-300 ease-out",
                isActive
                  ? "font-bold text-accent-secondary"
                  : "font-medium text-muted-fg",
              )}
            >
              <Icon strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
