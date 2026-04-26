const ProductDetails = ({ product }) => {
  if (!product) {
    return null
  }

  const handleRequireAccount = () => {
    window.alert('Please login or create an account first.')
  }

  const categoryLabel = product.category
    ? `${product.category.charAt(0).toUpperCase()}${product.category.slice(1)}`
    : 'Jewellery'

  const detailItems = [
    { label: 'Purity', value: product.purity },
    { label: 'Weight', value: `${product.weight} g` },
    { label: 'Material', value: product.materialDetails },
    { label: 'Price', value: `Rs. ${product.price.toLocaleString('en-IN')}` },
  ]

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-[#667eea]/24 via-white/10 to-[#764ba2]/22 p-4 shadow-[0_28px_65px_rgba(70,63,150,0.32)] backdrop-blur-xl sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -left-16 top-12 h-44 w-44 rounded-full bg-white/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-[#d4af37]/10 blur-3xl" />

        <div className="relative grid gap-7 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/8">
              <img
                src={product.image}
                alt={product.name}
                className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((thumb) => (
                <div
                  key={thumb}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-white/8"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} preview ${thumb + 1}`}
                    className="h-20 w-full object-cover opacity-85 transition duration-500 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-md sm:p-7">
            <span className="inline-flex rounded-full border border-[#d4af37]/60 bg-[#d4af37]/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f2e2b1]">
              {categoryLabel}
            </span>

            <h1 className="mt-4 font-['Playfair_Display'] text-3xl text-white sm:text-4xl">{product.name}</h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/72 sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/12 bg-white/8 p-4 transition duration-300 hover:border-[#d4af37]/45 hover:bg-white/12"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#c7c7c7]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRequireAccount}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#d4af37] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#1a1204] transition duration-300 hover:scale-[1.01] hover:brightness-105"
              >
                Order Now
              </button>
              <button
                type="button"
                onClick={handleRequireAccount}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition duration-300 hover:border-[#d4af37]/60 hover:bg-white/15"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
