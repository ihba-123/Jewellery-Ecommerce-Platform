const ProductCard = ({ product, onSelect, onQrClick }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-[0_18px_42px_rgba(0,0,0,0.42),0_0_24px_rgba(212,175,55,0.12)]"
      aria-label={`Open ${product.name} quick view`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover transition duration-500 hover:scale-105"
      />

      <div className="space-y-2 p-5 sm:p-6">
        <h3 className="font-['Playfair_Display'] text-xl text-white">{product.name}</h3>
        <p className="text-sm text-white/72">Purity: {product.purity}</p>
        <p className="text-sm text-white/72">Weight: {product.weight}g</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-lg font-semibold text-[#f5d97c]">Rs. {product.price.toLocaleString('en-IN')}</p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onQrClick(product)
            }}
            className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/45 bg-[#151428]/92 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#f5d97c] shadow-[0_10px_20px_rgba(0,0,0,0.36)] transition hover:scale-105 hover:border-[#f5d97c]/65 hover:bg-[#1b1933]"
            aria-label={`Show QR code for ${product.name}`}
          >
            QR
          </button>
        </div>
      </div>
    </button>
  )
}

export default ProductCard
