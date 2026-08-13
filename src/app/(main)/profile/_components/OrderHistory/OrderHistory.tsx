import { HistoryEmpty } from "@/app/(main)/_components/shared/HistoryEmpty";
import { I18nText } from "@/components/common/I18nText";
import { OrderCard } from "@/components/ui/OrderCard";
import { Typography } from "@/components/ui/Typography";
import { GameOrder } from "@/generated/api";

export interface OrderHistoryProps {
  orders: GameOrder[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => (
  <section className="flex flex-col gap-4">
    <Typography as="p" className="block sm:hidden" variant="body-md">
      <I18nText path="page.history.title" />
    </Typography>
    {!orders.length && <HistoryEmpty />}

    {!!orders.length && (
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {orders.map((order) => (
          <OrderCard key={order._id}></OrderCard>
        ))}
      </div>
    )}
  </section>
);
