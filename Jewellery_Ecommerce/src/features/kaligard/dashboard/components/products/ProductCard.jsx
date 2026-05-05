import { Edit3, Eye, Trash2, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({
  product,
  onEdit,
  onView,
  onDelete,
  onList,
  onUnlist,
  getStatusBadgeColor,
  isListedLocal = false,
  imageOnly = false,
}) => {
  const [showHotDealPopup, setShowHotDealPopup] = useState(false);
  const isListed = product.isListed || isListedLocal;

  const getStatusTag = () => {
    if (isListedLocal || product.isSelling) return "Selling";
    if (product.status === "Out of Stock") return "Out of Stock";
    return "In Stock";
  };

  const getStatusColor = () => {
    const status = getStatusTag();
    switch (status) {
      case "Selling":
        return "from-green-500 to-emerald-600";
      case "In Stock":
        return "from-blue-500 to-cyan-600";
      case "Out of Stock":
        return "from-red-500 to-red-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <div
      className={`group overflow-hidden ${imageOnly ? "rounded-xl shadow-2xl" : "rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/12 shadow-lg hover:shadow-xl hover:border-white/30"} transition-all duration-300`}
    >
      {/* Product Image Container */}
      <div
        className={`${imageOnly ? "relative h-64" : "relative h-48 bg-linear-to-br from-white/10 to-white/5"} overflow-hidden`}
      >
        {product.imageUrl ? (
          <div
            role="img"
            aria-label={product.name}
            style={{ backgroundImage: `url(${product.imageUrl})` }}
            className="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#6f6bdb]/30 via-[#7b67ca]/20 to-[#8a5eae]/30" />
        )}

        {!imageOnly && (
          <>
            {/* Status Badge - only show for In Stock and Selling */}
            {getStatusTag() !== "Out of Stock" && (
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-linear-to-r ${getStatusColor()} shadow-lg`}
                >
                  {getStatusTag()}
                </span>
              </div>
            )}

            {/* Star icon for Hot Deal on hover */}
            {product.isHotDeal && (
              <div
                className="absolute left-3 top-14 flex items-center px-2 py-1 rounded-full bg-yellow-400/80 backdrop-blur-sm border border-yellow-300 cursor-pointer group-hover:opacity-100 transition-all duration-300"
                onMouseEnter={() => setShowHotDealPopup(true)}
                onMouseLeave={() => setShowHotDealPopup(false)}
                title="Hot Deal"
              >
                <Star className="w-4 h-4 fill-yellow-600 text-yellow-600" />
                {showHotDealPopup && (
                  <span className="ml-1 text-xs font-bold text-yellow-900">
                    Hot Deal
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {/* Action Icons on Hover */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-200"
            title="Edit"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onView(product)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-200"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-red-100 backdrop-blur-md border border-red-400/30 hover:border-red-400/50 transition-all duration-200"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      {!imageOnly ? (
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-amber-300 transition-colors">
              {product.name}
            </h3>
            <p className="text-white/60 text-sm mt-1">{product.category}</p>
          </div>

          {/* Price and Quantity */}
          <div className="space-y-2 border-t border-white/10 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Price</span>
              <span
                className={`${product.isListed ? "text-emerald-400 font-extrabold text-lg" : "text-yellow-300 font-bold"}`}
              >
                {product.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Stock</span>
              <span className="text-white font-semibold">
                {product.quantity} units
              </span>
            </div>
          </div>

          {/* Quick Action */}
          <div className="pt-2 border-t border-white/10">
            {product.isListed && !isListedLocal ? (
              <button
                onClick={() => onUnlist && onUnlist(product.id)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 font-medium text-sm transition-all duration-200"
              >
                Unlist Product
              </button>
            ) : isListedLocal || product.isSelling ? (
              <div className="w-full px-3 py-2 rounded-lg bg-emerald-500 text-white font-bold text-sm text-center">
                ✓ Listed successfully
              </div>
            ) : (
              <button
                onClick={() => onList(product.id)}
                className="w-full px-3 py-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 text-[#3d2510] hover:from-amber-300 hover:to-orange-400 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Sell +
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute left-0 right-0 bottom-3 px-3">
          <div className="bg-linear-to-t from-black/50 via-black/20 to-transparent rounded-md p-2 backdrop-blur-sm flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold text-sm line-clamp-1">
                {product.name}
              </h4>
              <p className="text-white/60 text-xs">{product.category}</p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              {product.isListed ? (
                <button
                  onClick={() => onUnlist && onUnlist(product.id)}
                  className="px-3 py-1 rounded bg-white/20 text-white text-xs"
                >
                  Unlist
                </button>
              ) : (
                <button
                  onClick={() => onList(product.id)}
                  className="px-3 py-1 rounded bg-amber-400 text-[#3d2510] font-semibold text-xs flex items-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" /> Sell
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
