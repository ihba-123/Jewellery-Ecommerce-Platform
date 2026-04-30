const formatDateTime = (isoDate) =>
  new Date(isoDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

const CancellationsList = ({ cancellations }) => {
  if (cancellations.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-white/30 bg-white/5 p-8 text-center text-white/60">
        No cancellation records found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cancellations.map((entry) => (
        <article
          key={`${entry.orderId}-${entry.itemName}`}
          className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-lg"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/15 pb-3">
            <div>
              <p className="text-sm font-medium text-white/60">Order # {entry.orderId}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{entry.itemName}</h3>
            </div>
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-200 border border-red-400/30">
              Cancelled
            </span>
          </div>

          <p className="mt-3 text-sm text-white/80">{entry.description}</p>

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-white/60">Price</p>
              <p className="mt-1 font-semibold text-white">Rs. {entry.price}</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-white/60">Cancelled On</p>
              <p className="mt-1 font-semibold text-white">{formatDateTime(entry.cancelledOn)}</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-white/60">Refund Status</p>
              <p className="mt-1 font-semibold text-white">{entry.refundStatus}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/80">
            <span className="font-medium text-white">Reason:</span> {entry.cancellationReason}
          </p>
        </article>
      ))}
    </div>
  );
};

export default CancellationsList;
