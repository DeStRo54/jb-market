"use client";

import { History, Loader2Icon, LogIn, User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { HomeLogo } from "@/components/common/HomeLogo";
import { I18nText } from "@/components/common/I18nText/I18nText";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ROUTES } from "@/utils/constants/routes";

const ThemeButton = dynamic(
  () => import("./component/ThemeButton").then((module) => module.ThemeButton),
  {
    ssr: false,
    loading: () => (
      <IconButton variant="ghost" size="sm" rounded>
        <Loader2Icon className="animate-spin" />
      </IconButton>
    ),
  },
);

export const Header = () => {
  return (
    <header className="w-full">
      <div className="hidden sm:flex h-10 items-center justify-between sm:h-16 px-3">
        <Link href={ROUTES.GAMES}>
          <HomeLogo />
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <IconButton variant="secondary" size="sm" rounded asChild>
              <Link href={ROUTES.HISTORY}>
                <History />
              </Link>
            </IconButton>
            <IconButton variant="secondary" size="sm" rounded asChild>
              <Link href={ROUTES.PROFILE}>
                <User />
              </Link>
            </IconButton>
            <ThemeButton />
          </div>
          <Button asChild>
            <Link href={ROUTES.LOGIN}>
              <I18nText path="button.login" />
              <LogIn />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
