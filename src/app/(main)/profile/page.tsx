import { getGamesOrders } from "@/api/handlers/games/orders";
import { I18nText } from "@/components/common/I18nText";
import { Typography } from "@/components/ui/Typography";

import { OrderHistory } from "./_components/OrderHistory";
import { ProfileInfo } from "./_components/ProfileInfo";

export default async function ProfilePage() {
  const getGamesOrdersResponse = await getGamesOrders();

  return (
    <main className="flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(0,1fr)] lg:gap-16">
      <div className="py-3 sm:hidden sm:py-0">
        <Typography as="h1" variant="title-md">
          <I18nText path="page.profile.title" />
        </Typography>
      </div>
      <ProfileInfo />
      <OrderHistory orders={getGamesOrdersResponse.data.orders} />
    </main>
  );
}
