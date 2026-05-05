import { Plus } from "lucide-react";

const EmptyState = ({ onAdd }) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-12 text-center">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-2xl font-bold text-white mb-2">No Products Yet</h3>
      <p className="text-white/60 mb-6">
        Create your first product to get started with your inventory!
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-[#3d2510] font-bold hover:scale-105 transition-transform"
      >
        <Plus className="w-5 h-5" />
        Create Your First Product
      </button>
    </div>
  );
};

export default EmptyState;
