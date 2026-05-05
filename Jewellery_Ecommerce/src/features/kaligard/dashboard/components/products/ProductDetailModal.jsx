import { ShoppingCart } from "lucide-react";

const ProductDetailModal = ({ product, onEdit, onList, onClose }) => {
  if (!product) return null;

  const getStatusTag = () => {
    if (product.status === "Selling") return "Selling";
    if (product.status === "Out of Stock") return "Out of Stock";
    return "In Stock";
  };

  const getStatusColor = () => {
    const status = getStatusTag();
    switch (status) {
      case "Selling":
        return "text-green-400";
      case "In Stock":
        return "text-blue-400";
      case "Out of Stock":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 rounded-2xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/15 bg-white/5">
          <h2 className="text-2xl font-bold text-white">Product Details</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          {product.imageUrl && (
            <div className="rounded-xl overflow-hidden h-64 bg-linear-to-br from-white/10 to-white/5">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-sm">Product Name</p>
              <p className="text-white font-bold text-lg">{product.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 text-sm">Category</p>
                <p className="text-white font-semibold">{product.category}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Price</p>
                <p className="text-yellow-300 font-bold">{product.price}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 text-sm">Quantity</p>
                <p className="text-white font-semibold">
                  {product.quantity} units
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Status</p>
                <p className={`font-semibold ${getStatusColor()}`}>
                  {getStatusTag()}
                </p>
              </div>
            </div>

            {/* Weight and Purity */}
            {(product.weight || product.purity) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.weight && (
                  <div>
                    <p className="text-white/60 text-sm">Weight</p>
                    <p className="text-white font-semibold">
                      {product.weight} gm
                    </p>
                  </div>
                )}
                {product.purity && (
                  <div>
                    <p className="text-white/60 text-sm">Purity</p>
                    <p className="text-white font-semibold">
                      {product.purity}%
                    </p>
                  </div>
                )}
              </div>
            )}
            {product.isHotDeal && (
              <div className="p-3 rounded-lg bg-yellow-400/15 border border-yellow-400/30">
                <p className="text-yellow-300 font-semibold flex items-center gap-2">
                  ⭐ Hot Deal
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/15">
            <button
              onClick={() => {
                onEdit(product);
                onClose();
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 font-semibold transition-all"
            >
              Edit
            </button>
            {!product.isListed && (
              <button
                onClick={() => onList(product.id)}
                className="flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 text-[#3d2510] font-semibold transition-all hover:from-amber-300 hover:to-orange-400 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Sell +
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
