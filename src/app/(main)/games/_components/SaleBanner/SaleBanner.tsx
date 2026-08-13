import { I18nText } from "@/components/common/I18nText";
import { MascotWaveLargeIcon } from "@/components/icons/MascotWaveLargeIcon";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/tailwind";

interface SaleBannerProps {
  className?: string;
}

export const SaleBanner = ({ className }: SaleBannerProps) => (
  <div
    className={cn(
      "relative h-53.5 w-full overflow-hidden rounded-24 bg-[#7c3aed14] px-6 py-4",
      className,
    )}
  >
    <Typography as="p" variant="title-md">
      <I18nText path="page.catalog.saleBanner.title" />
    </Typography>
    <Typography as="p" variant="caption">
      <I18nText path="page.catalog.saleBanner.subtitle" />
    </Typography>

    <div className="mt-7 inline-flex min-h-6 items-center justify-center rounded-full bg-accent-secondary px-4.5 py-3 text-[20px]/7 font-bold tracking-wide text-accent-secondary-fg">
      <I18nText path="page.catalog.saleBanner.discount" />
    </div>

    <MascotWaveLargeIcon className="absolute top-15 right-2" />
  </div>
);
