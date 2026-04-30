import CancellationsList from '../orders/components/CancellationsList';
import { cancellationsData } from '../orders/data/cancellationsData';

const MyCancellations = () => {
  return (
    <section className="mx-auto w-full space-y-4">
      <header className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Cancelled Goods</h2>
        <p className="mt-1 text-sm text-white/70">
          Orders that were cancelled, with reason, amount, and refund state.
        </p>
      </header>
      <CancellationsList cancellations={cancellationsData} />
    </section>
  );
};

export default MyCancellations;
