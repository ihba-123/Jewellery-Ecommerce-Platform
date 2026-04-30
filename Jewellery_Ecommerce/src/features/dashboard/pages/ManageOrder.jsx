import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllOrders } from '../orders/data/ordersRepository';

const ManageOrder = () => {
  const { orderId } = useParams();
  const order = useMemo(() => getAllOrders().find((item) => item.id === orderId), [orderId]);

  if (!order) {
    return (
      <section className="mx-auto max-w-4xl rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-4 text-white/80 shadow-lg sm:p-6">
        <p className="mb-4 text-base font-medium sm:text-lg">Order not found.</p>
        <Link to="/dashboard/orders" className="text-yellow-300 hover:text-yellow-200">
          Back to My Orders
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-h3 font-semibold text-white">Order Details</h2>
        <Link to="/dashboard/orders" className="text-sm font-medium text-yellow-300 hover:text-yellow-200">
          Back to My Orders
        </Link>
      </div>

      <div className="rounded-lg border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <svg className="h-4 w-4 text-white/80 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h5" />
            </svg>
            <p className="text-base font-semibold text-white sm:text-lg">{order.storeName}</p>
            <button className="text-sm font-medium text-yellow-300 hover:text-yellow-200 sm:text-base">Chat with Seller</button>
          </div>
          <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-sm font-medium text-white sm:px-4 sm:py-1.5 sm:text-base">{order.status}</span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="rounded-lg bg-white/10 border border-white/15 p-4 sm:p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-white">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="border-l-2 border-white/40 pl-3 text-sm sm:text-base">{order.deliveryType}</span>
                <span className="text-lg font-medium sm:text-2xl">{order.trackingCode}</span>
                <span className="text-lg sm:text-xl">Rs. {order.total}</span>
              </div>
              <Link
                to={`/dashboard/orders/${order.id}/tracking`}
                className="rounded-md bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-4 py-2 text-sm font-medium text-black hover:opacity-90 md:text-base"
              >
                Track Package
              </Link>
            </div>
            <p className="text-sm text-white/80 sm:text-base">{order.packageStatusLabel}</p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 border-b border-white/10 pb-5 md:grid-cols-[88px_2fr_0.9fr_0.7fr_1fr] md:items-start">
            <div className="flex h-16 w-16 items-center justify-center rounded border border-white/20 bg-white/10 sm:h-20 sm:w-20">
              <svg className="h-8 w-8 text-yellow-300 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.2 3h9.6l4 6.2L12 21 3.2 9.2 7.2 3zm.9 1.8L5.5 8.8h4.9l2.2-4H8.1zm7.8 0h-4.5l2.2 4h4.9l-2.6-4h0zM12 18l6.1-7.4h-3.8L12 18zm0 0l-2.3-7.4H5.9L12 18z" />
              </svg>
            </div>

            <div>
              <p className="text-base leading-snug text-white sm:text-lg">{order.items[0].name}</p>
              <p className="mt-1 text-sm text-white/60">Color family: {order.items[0].colorFamily}</p>
            </div>

            <p className="text-base text-white">Rs. {order.items[0].price}</p>
            <p className="text-base text-white/80">Qty: {order.items[0].quantity}</p>
            <div className="text-left md:text-right">
              <button className="text-sm text-white/60 hover:text-white/80 md:text-base">Cancel</button>
              <div>
                <button className="mt-2 text-sm font-medium text-yellow-300 hover:text-yellow-200 md:text-base">WRITE A REVIEW</button>
              </div>
            </div>
          </div>

          <div className="mt-5 text-sm text-white/80 md:text-base">
            <p className="text-base font-medium text-white sm:text-lg">Order {order.id}</p>
            <p>Placed on {order.timeline.placedOn}</p>
            <p>Paid on {order.timeline.paidOn}</p>
            <p>Delivered on {order.timeline.deliveredOn}</p>
            <p>Completed on {order.timeline.completedOn}</p>
            <p className="mt-2 font-medium text-white">{order.paymentMethod}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/15 bg-white/10 backdrop-blur-md p-4 shadow-lg sm:p-5">
          <p className="text-lg font-semibold text-white sm:text-xl">{order.shippingContact.fullName}</p>
          <div className="mt-2 flex items-center gap-2 text-white/80">
            <span className="rounded-full bg-yellow-500/30 px-2 py-0.5 text-[10px] font-semibold leading-none text-yellow-200 border border-yellow-400/30">{order.shippingContact.label}</span>
            <span className="text-sm sm:text-base">{order.shippingContact.line}</span>
          </div>
          <p className="mt-3 text-sm text-white sm:text-base">{order.shippingContact.phone}</p>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/10 backdrop-blur-md p-4 shadow-lg sm:p-5">
          <p className="text-lg font-semibold text-white sm:text-xl">Total Summary</p>
          <div className="mt-4 space-y-2 text-sm text-white/80 md:text-base">
            <div className="flex items-center justify-between">
              <p>Subtotal ({order.items.length} Item)</p>
              <p>Rs. {order.summary.subtotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Shipping Fee</p>
              <p>Rs. {order.summary.shippingFee}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>COD Handling Fee</p>
              <p>Rs. {order.summary.codHandlingFee}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Discount</p>
              <p>Rs. {order.summary.discount}</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white sm:text-lg">
              <p>Total</p>
              <p>Rs. {order.summary.total}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageOrder;
