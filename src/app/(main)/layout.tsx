import { ReactNode } from "react";

import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { MobileNav } from "./_components/MobileNav";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <MobileNav />
    </>
  );
}
