"use client";

import Image from "next/image";

export const HomeLogo = () => (
  <div className="flex items-center gap-1">
    <Image
      loading="eager"
      src="/svg/logo.svg"
      width={24}
      height={19}
      alt="Главная"
    />
    <p className="text-base text-[16px] leading-6 font-extrabold tracking-normal uppercase">
      Games
    </p>
  </div>
);
