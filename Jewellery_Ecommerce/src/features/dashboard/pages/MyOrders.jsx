import { useMemo } from 'react';
import OrdersTable from '../orders/components/OrdersTable';
import { getAllOrders } from '../orders/data/ordersRepository';

const MyOrders = () => {
  const sortedOrders = useMemo(
    () => [...getAllOrders()].sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt)),
    []
  );

  return (
    <section className="mx-auto w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
      <header className="border-b border-white/15 px-5 py-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Recent Orders</h2>
      </header>
      <div className="bg-white/5 p-2  sm:p-4">
        <OrdersTable orders={sortedOrders} />
      </div>
    </section>
  );
};

export default MyOrders;
