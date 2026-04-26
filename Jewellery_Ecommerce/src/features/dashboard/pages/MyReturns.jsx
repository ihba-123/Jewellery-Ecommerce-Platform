import ReturnsTable from '../orders/components/ReturnsTable';
import { returnsData } from '../orders/data/returnsData';

const MyReturns = () => {
  return (
    <section className="mx-auto w-full rounded-xl border border-zinc-200 bg-white shadow-sm">
      <header className="border-b border-zinc-200 px-5 py-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-zinc-800">Returned Goods</h2>
        <p className="mt-1 text-sm text-zinc-500">Products you already returned with request status.</p>
      </header>
      <div className="bg-zinc-50/60 p-2 sm:p-4">
        <ReturnsTable returns={returnsData} />
      </div>
    </section>
  );
};

export default MyReturns;
