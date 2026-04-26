import CancellationsList from '../orders/components/CancellationsList';
import { cancellationsData } from '../orders/data/cancellationsData';

const MyCancellations = () => {
  return (
    <section className="mx-auto w-full space-y-4">
      <header className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-800">Cancelled Goods</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Orders that were cancelled, with reason, amount, and refund state.
        </p>
      </header>
      <CancellationsList cancellations={cancellationsData} />
    </section>
  );
};

export default MyCancellations;
