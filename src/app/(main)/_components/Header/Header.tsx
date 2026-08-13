"use client";

import { HistoryIcon, Loader2Icon, LogInIcon, UserIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useUser } from "@/app/_contexts/user/useUser";
import { HomeLogo } from "@/components/common/HomeLogo";
import { I18nText } from "@/components/common/I18nText/I18nText";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ROUTES } from "@/utils/constants/routes";

import { SignoutButton } from "../shared/SignoutButton";

const ThemeButton = dynamic(
  () => import("../shared/ThemeButton").then((module) => module.ThemeButton),
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
  const user = useUser();

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
                <HistoryIcon />
              </Link>
            </IconButton>
            <IconButton variant="secondary" size="sm" rounded asChild>
              <Link href={ROUTES.PROFILE}>
                <UserIcon />
              </Link>
            </IconButton>
            <ThemeButton />
          </div>
          {!user.value && (
            <Button asChild>
              <Link href={ROUTES.LOGIN}>
                <I18nText path="button.login" />
                <LogInIcon />
              </Link>
            </Button>
          )}
          {user.value && <SignoutButton />}
        </div>
      </div>
    </header>
  );
};
