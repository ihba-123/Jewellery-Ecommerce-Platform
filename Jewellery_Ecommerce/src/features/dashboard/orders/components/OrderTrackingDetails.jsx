const STAGES = ['Processing', 'Packed', 'Shipped', 'Delivered'];

const STATUS_TO_STAGE = {
  Processing: 'Processing',
  Packed: 'Packed',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Completed: 'Delivered',
  Cancelled: 'Processing'
};

const getCurrentStageIndex = (order) => {
  const currentStage = order.tracking?.currentStage || STATUS_TO_STAGE[order.status] || 'Processing';
  const index = STAGES.indexOf(currentStage);
  return index >= 0 ? index : 0;
};

const StageIcon = ({ completed }) => {
  if (completed) {
    return (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.2 4.2L19 7" />
      </svg>
    );
  }

  return <span className="h-2 w-2 rounded-full bg-white/40" />;
};

const OrderTrackingDetails = ({ order }) => {
  const currentStageIndex = getCurrentStageIndex(order);
  const trackingEvents = order.tracking?.events || [];

  return (
    <section className="mx-auto w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-white">Tracking Details</h2>
      </div>

      <div className="rounded-lg border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-1 gap-4 border-b border-white/15 p-5 md:grid-cols-[90px_1.5fr_1fr]">
          <div className="flex h-16 w-16 items-center justify-center rounded-md border border-white/20 bg-white/10">
            <svg className="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="7" width="13" height="10" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10h3l2 2v3h-5" />
              <circle cx="8" cy="18" r="1.5" />
              <circle cx="18" cy="18" r="1.5" />
            </svg>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Courier Info</p>
            <p className="mt-1 text-white/80">Delivery Partner: {order.tracking?.deliveryPartner || 'NP-DEX'}</p>
            <p className="text-white/80">Courier {order.tracking?.courierName || 'BLJ-Suman Angbo'}</p>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Tracking Number</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-medium text-yellow-300 md:text-lg">{order.trackingCode}</p>
              <button
                type="button"
                onClick={() => navigator?.clipboard?.writeText(order.trackingCode)}
                className="rounded border border-yellow-400/30 bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-200 hover:bg-yellow-500/30"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-170 items-start px-2">
              {STAGES.map((stage, index) => {
                const completed = index <= currentStageIndex;
                const isLast = index === STAGES.length - 1;

                return (
                  <div key={stage} className="flex flex-1 items-start">
                    <div className="flex w-28 shrink-0 flex-col items-center">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${completed ? 'bg-yellow-500' : 'bg-white/20'}`}>
                        <StageIcon completed={completed} />
                      </div>
                      <p className={`mt-2 text-base ${completed ? 'font-medium text-white' : 'text-white/60'}`}>
                        {stage}
                      </p>
                    </div>

                    {!isLast && (
                      <div
                        className={`mt-7 h-0 flex-1 border-t-2 border-dashed ${
                          index < currentStageIndex ? 'border-yellow-500' : 'border-white/20'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            {trackingEvents.map((event, index) => {
              const completed = Boolean(event.completed);

              return (
                <div key={`${event.time}-${event.title}`} className="grid grid-cols-[100px_24px_1fr] items-start gap-3 text-base">
                  <p className={`pt-0.5 ${completed ? 'font-medium text-white' : 'text-white/60'}`}>{event.time}</p>

                  <div className="relative flex justify-center">
                    <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${completed ? 'bg-yellow-500' : 'bg-white/20'}`}>
                      {completed ? (
                        <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.2 4.2L19 7" />
                        </svg>
                      ) : null}
                    </div>
                    {index !== trackingEvents.length - 1 && <span className="absolute top-6 h-10 w-0.5 bg-white/20" />}
                  </div>

                  <div>
                    <p className={`text-xl md:text-base ${completed ? 'font-medium text-white' : 'text-white/60'}`}>{event.title}</p>
                    <p className={`${completed ? 'text-white/80' : 'text-white/40'}`}>
                      {event.description} {event.location ? <span className="font-medium">[{event.location}]</span> : null}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingDetails;
