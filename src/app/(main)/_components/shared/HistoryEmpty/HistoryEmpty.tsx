import { InboxIcon } from "lucide-react";
import Link from "next/link";

import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { ROUTES } from "@/utils/constants/routes";

export const HistoryEmpty = () => (
  <section className="flex h-63 w-full flex-col items-center gap-4 rounded-24 bg-secondary p-6">
    <InboxIcon className="size-10 shrink-0" strokeWidth={2} />

    <div className="flex w-full max-w-70 flex-col items-start text-center">
      <Typography as="h2" className="w-full" variant="body-lg">
        <I18nText path="page.history.empty.title" />
      </Typography>
      <Typography as="p" className="w-full" variant="body-sm">
        <I18nText path="page.history.empty.description" />
      </Typography>
    </div>

    <Button asChild className="w-full" size="lg">
      <Link href={ROUTES.GAMES}>
        <I18nText path="button.backToGamesCatalog" />
      </Link>
    </Button>
  </section>
);
