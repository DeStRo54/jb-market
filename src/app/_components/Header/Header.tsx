import Image from "next/image";
import Link from "next/link";

import { TestButton } from "./component/TestButton";

export const Header = () => {
  return (
    <header className="mt-3 w-full sm:mt-6">
      <div className="flex h-10 items-center justify-between sm:h-16">
        <Link
          className="font-pixelify-sans text-[32px]/10 font-bold tracking-wide"
          href="/games"
        >
          <Image
            loading="eager"
            src="/svg/logo.svg"
            width={86}
            height={24}
            alt="Главная"
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 sm:flex">
            <TestButton />
          </div>
        </div>
      </div>
    </header>
  );
};
