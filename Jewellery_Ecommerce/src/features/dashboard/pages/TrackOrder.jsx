import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderTrackingDetails from '../orders/components/OrderTrackingDetails';
import { getAllOrders } from '../orders/data/ordersRepository';

const TrackOrder = () => {
  const { orderId } = useParams();
  const order = useMemo(() => getAllOrders().find((item) => item.id === orderId), [orderId]);

  if (!order) {
    return (
      <section className="mx-auto max-w-4xl rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white/80 shadow-lg">
        <p className="mb-4 text-lg font-medium">Order not found.</p>
        <Link to="/dashboard/orders" className="text-yellow-300 hover:text-yellow-200">
          Back to My Orders
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          to={`/dashboard/orders/${order.id}/manage`}
          className="text-sm font-medium text-yellow-300 hover:text-yellow-200"
        >
          Back to Order Details
        </Link>
      </div>
      <OrderTrackingDetails order={order} />
    </div>
  );
};

export default TrackOrder;
