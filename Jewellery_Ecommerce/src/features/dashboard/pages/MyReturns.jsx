import ReturnsTable from '../orders/components/ReturnsTable';
import { returnsData } from '../orders/data/returnsData';

const MyReturns = () => {
  return (
    <section className="mx-auto w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
      <header className="border-b border-white/15 px-5 py-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Returned Goods</h2>
        <p className="mt-1 text-sm text-white/70">Products you already returned with request status.</p>
      </header>
      <div className="bg-white/5 p-2 sm:p-4">
        <ReturnsTable returns={returnsData} />
      </div>
    </section>
  );
};

export default MyReturns;
