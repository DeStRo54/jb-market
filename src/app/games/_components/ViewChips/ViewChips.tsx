"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { I18nText } from "@/components/common/I18nText";
import { ChipGroup, ChipGroupItem } from "@/components/ui/ChipGroup";
import { cn } from "@/lib/tailwind";

import { ALL_CATALOG_VIEWS, ALL_VIEW } from "../../-constants/view";

export const ViewChips = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const view = searchParams.get("view");

  const onViewChange = (newView: (typeof ALL_CATALOG_VIEWS)[number] | "") => {
    if (!newView) return;

    const params = new URLSearchParams(searchParams.toString());
    if (newView === "all") {
      params.delete("view");
    } else {
      params.set("view", newView);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ChipGroup
      type="single"
      value={!!view ? view : ALL_VIEW}
      onValueChange={onViewChange}
      className="max-w-full scrollbar-none justify-start overflow-x-auto"
    >
      {ALL_CATALOG_VIEWS.map((viewVariant) => (
        <ChipGroupItem
          key={viewVariant}
          value={viewVariant}
          icon={false}
          className={cn(
            "h-13 flex-none bg-secondary px-8 text-[20px]/7 font-bold tracking-wide text-foreground shadow-none",
            "data-[state=on]:bg-accent-secondary data-[state=on]:text-accent-secondary-fg data-[state=on]:shadow-none",
            viewVariant === "all" && "px-4.5",
          )}
        >
          <I18nText path={`page.catalog.views.${viewVariant}`} />
        </ChipGroupItem>
      ))}
    </ChipGroup>
  );
};
