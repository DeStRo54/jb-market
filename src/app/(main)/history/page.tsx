import { getGamesOrders } from "@/api/handlers/games/orders";
import { I18nText } from "@/components/common/I18nText";
import { OrderCard } from "@/components/ui/OrderCard";
import { Typography } from "@/components/ui/Typography";

import { HistoryEmpty } from "../_components/shared/HistoryEmpty";

export default async function HistoryPage() {
  const getGamesOrdersResponse = await getGamesOrders();

  const orders = getGamesOrdersResponse.data.orders;

  return (
    <main className="mb-110 flex w-full flex-col gap-6 sm:mb-0 sm:pt-14">
      <Typography as="h1" variant="title-md">
        <I18nText path="page.history.title" />
      </Typography>
      {!orders.length && (
        <div className="max-w-162">
          <HistoryEmpty />
        </div>
      )}

      {!!orders.length && (
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {orders.map((order) => (
            <OrderCard key={order._id}></OrderCard>
          ))}
        </div>
      )}
    </main>
  );
}
