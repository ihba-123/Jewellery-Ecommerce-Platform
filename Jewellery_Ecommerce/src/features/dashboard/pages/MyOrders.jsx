import { useMemo } from 'react';
import OrdersTable from '../orders/components/OrdersTable';
import { getAllOrders } from '../orders/data/ordersRepository';

const MyOrders = () => {
  const sortedOrders = useMemo(
    () => [...getAllOrders()].sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt)),
    []
  );

  return (
    <section className="mx-auto w-full rounded-xl border border-zinc-200 bg-white shadow-sm mr" >
      <header className="border-b border-zinc-200 px-5 py-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-zinc-800">Recent Orders</h2>
      </header>
      <div className="bg-zinc-50/60 p-2  sm:p-4">
        <OrdersTable orders={sortedOrders} />
      </div>
    </section>
  );
};

export default MyOrders;
