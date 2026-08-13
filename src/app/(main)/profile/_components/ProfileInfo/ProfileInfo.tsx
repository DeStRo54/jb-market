"use client";

import { useUser } from "@/app/_contexts/user/useUser";

export const ProfileInfo = () => {
  const user = useUser();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 lg:flex-row"></div>
    </section>
  );
};
