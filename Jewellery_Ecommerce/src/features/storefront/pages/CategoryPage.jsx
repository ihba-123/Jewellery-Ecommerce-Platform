import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useAppContext } from '../context/AppContext'

const extraImagesByCategory = {
  gold: [
    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
  ],
  silver: [
    'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
  ],
  diamond: [
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
  ],
  panchadhatu: [
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
  ],
}

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const { categories, getProductsByCategory } = useAppContext()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedQrProduct, setSelectedQrProduct] = useState(null)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [qrScanned, setQrScanned] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const closeTimerRef = useRef(null)
  const qrCloseTimerRef = useRef(null)
  const navigate = useNavigate()

  const openQuickView = (product) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    setSelectedProduct(product)
    setQuantity(1)
    setSelectedImageIndex(0)

    window.requestAnimationFrame(() => {
      setModalOpen(true)
    })
  }

  const closeQuickView = () => {
    setModalOpen(false)

    closeTimerRef.current = window.setTimeout(() => {
      setSelectedProduct(null)
      closeTimerRef.current = null
    }, 220)
  }

  const openQrPopup = (product) => {
    if (qrCloseTimerRef.current) {
      window.clearTimeout(qrCloseTimerRef.current)
      qrCloseTimerRef.current = null
    }

    setSelectedQrProduct(product)
    setQrScanned(false)

    window.requestAnimationFrame(() => {
      setQrModalOpen(true)
    })
  }

  const closeQrPopup = () => {
    setQrModalOpen(false)

    qrCloseTimerRef.current = window.setTimeout(() => {
      setSelectedQrProduct(null)
      qrCloseTimerRef.current = null
    }, 220)
  }

  useEffect(() => {
    if (!selectedProduct && !selectedQrProduct) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeQuickView()
        closeQrPopup()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProduct, selectedQrProduct])

  useEffect(() => () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
    }

    if (qrCloseTimerRef.current) {
      window.clearTimeout(qrCloseTimerRef.current)
    }
  }, [])

  const category = categories.find((item) => item.slug === categorySlug)

  if (!category) {
    return (
      <section className="mx-auto min-h-[60vh] w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-['Playfair_Display'] text-4xl text-white">Category Not Found</h1>
        <Link to="/" className="mt-6 inline-block text-[#f5d97c] underline">
          Back to Home
        </Link>
      </section>
    )
  }

  const categoryProducts = getProductsByCategory(categorySlug)

  const stoneWeight = selectedProduct ? (selectedProduct.weight * 0.12).toFixed(2) : null
  const netWeight = selectedProduct ? (selectedProduct.weight - selectedProduct.weight * 0.12).toFixed(2) : null
  const galleryImages = selectedProduct
    ? [selectedProduct.image, ...(extraImagesByCategory[selectedProduct.category] ?? [])]
    : []
  const selectedImage = galleryImages[selectedImageIndex] ?? selectedProduct?.image

  const getWeightDetails = (product) => {
    if (!product) {
      return { stoneWeight: 0, netWeight: 0 }
    }

    const calculatedStoneWeight = product.weight * 0.12

    return {
      stoneWeight: calculatedStoneWeight.toFixed(2),
      netWeight: (product.weight - calculatedStoneWeight).toFixed(2),
    }
  }

  const handleOrderNow = () => {
    if (!selectedProduct) {
      return
    }

    closeQuickView()
    navigate(`/products/${selectedProduct.id}`)
  }

  const handleAddToCart = () => {
    if (!selectedProduct) {
      return
    }

    window.alert(`${selectedProduct.name} added to cart. Quantity: ${quantity}`)
    closeQuickView()
  }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-md pb-xl pt-lg sm:px-lg lg:px-xl">
        <div className="mb-lg flex flex-col gap-md rounded-3xl border border-white/10 bg-white/5 p-md shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-lg">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#f5d97c]">Category</p>
            <h1 className="mt-sm font-['Playfair_Display'] text-h1 text-white">{category.name}</h1>
            <p className="mt-sm max-w-[65ch] text-body text-white/84">{category.description}</p>
          </div>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d4af37]/35 px-md py-sm text-button text-[#f5d97c] transition hover:bg-white/8"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={openQuickView}
              onQrClick={openQrPopup}
            />
          ))}
        </div>
      </section>

      {selectedQrProduct ? (
        <div
          className={`fixed inset-0 z-80 transition-opacity duration-300 ${
            qrModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#120f24]/64 backdrop-blur-md"
            onClick={closeQrPopup}
            aria-label="Close QR details popup"
          />

          <div className="relative flex min-h-full items-center justify-center px-4 py-6 sm:px-6">
            <article
              className={`relative w-full max-w-[min(100vw-2rem,28rem)] rounded-3xl border border-white/18 bg-linear-to-br from-[#2f2f5b]/96 via-[#2a315f]/95 to-[#3a2f5f]/96 p-5 shadow-[0_34px_70px_rgba(10,8,18,0.68)] transition-all duration-300 sm:p-6 ${
                qrModalOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
              }`}
            >
              <button
                type="button"
                onClick={closeQrPopup}
                className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/20 p-2 text-white/85 transition hover:bg-white/12"
                aria-label="Close QR popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f1e3b4]">
                Item QR Access
              </p>
              <h3 className="mt-2 pr-8 font-['Playfair_Display'] text-2xl text-white">
                {selectedQrProduct.name}
              </h3>

              <div className="mt-4 rounded-2xl border border-white/12 bg-white/7 p-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
                    JSON.stringify({
                      id: selectedQrProduct.id,
                      name: selectedQrProduct.name,
                      category: selectedQrProduct.category,
                      price: selectedQrProduct.price,
                      purity: selectedQrProduct.purity,
                    }),
                  )}`}
                  alt={`QR code for ${selectedQrProduct.name}`}
                  className="mx-auto aspect-square w-full max-w-[16rem] rounded-xl border border-white/12 bg-white p-2"
                />
                <p className="mt-3 text-center text-xs text-white/70">
                  Scan this QR to access item details quickly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQrScanned(true)}
                className="mt-4 w-full rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/15 px-4 py-2.5 text-sm font-semibold text-[#f5d97c] transition hover:bg-[#d4af37]/24"
              >
                I Have Scanned
              </button>

              {qrScanned ? (
                <div className="mt-4 space-y-2 rounded-xl border border-white/12 bg-white/6 p-3.5 text-sm text-white/82">
                  <p><span className="text-white/60">Category:</span> {category.name}</p>
                  <p><span className="text-white/60">Purity:</span> {selectedQrProduct.purity}</p>
                  <p><span className="text-white/60">Net Weight:</span> {getWeightDetails(selectedQrProduct).netWeight} g</p>
                  <p><span className="text-white/60">Stone Weight:</span> {getWeightDetails(selectedQrProduct).stoneWeight} g</p>
                  <p><span className="text-white/60">Total Weight:</span> {selectedQrProduct.weight} g</p>
                  <p><span className="text-white/60">Price:</span> Rs. {selectedQrProduct.price.toLocaleString('en-IN')}</p>
                  <p className="pt-1 text-white/76">{selectedQrProduct.description}</p>
                </div>
              ) : null}
            </article>
          </div>
        </div>
      ) : null}

      {selectedProduct ? (
        <div
          className={`fixed inset-0 z-80 transition-opacity duration-300 ${
            modalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#120f24]/62 backdrop-blur-md"
            onClick={closeQuickView}
            aria-label="Close product quick view"
          />

          <div className="relative flex min-h-full items-center justify-center px-4 py-6 sm:px-6">
            <article
              className={`relative w-full max-w-[min(100vw-2rem,64rem)] overflow-y-auto rounded-3xl border border-white/18 shadow-[0_34px_70px_rgba(10,8,18,0.68)] transition-all duration-300 ${
                modalOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
              }`}
              style={{ maxHeight: '100dvh', backgroundImage: 'linear-gradient(135deg, rgba(47,47,91,0.96), rgba(42,49,95,0.95), rgba(58,47,95,0.96))' }}
            >
              <button
                type="button"
                onClick={closeQuickView}
                className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/20 p-2 text-white/85 transition hover:bg-white/12"
                aria-label="Close quick view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-3 p-3 sm:p-4">
                  <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={selectedImage}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {galleryImages.map((image, index) => (
                      <button
                        type="button"
                        key={`${selectedProduct.id}-${index}`}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                          selectedImageIndex === index
                            ? 'border-[#f8d77e] ring-1 ring-[#f8d77e]/55'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        aria-label={`Preview image ${index + 1}`}
                      >
                        <img src={image} alt={`${selectedProduct.name} ${index + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6 lg:p-7">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f1e3b4]">
                      Product Quick View
                    </p>
                    <h3 className="mt-2 font-['Playfair_Display'] text-3xl text-white sm:text-[2.1rem]">
                      {selectedProduct.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/82">{selectedProduct.description}</p>
                    <p className="mt-3 rounded-xl border border-white/12 bg-white/6 p-3 text-sm leading-relaxed text-white/78">
                      Crafted with premium {selectedProduct.materialDetails.toLowerCase()} and finished with meticulous hand-polishing for a lasting shine and comfortable daily wear.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm sm:gap-4">
                    <div className="rounded-xl border border-white/14 bg-white/6 p-3">
                      <p className="text-xs text-white/60">Net Weight</p>
                      <p className="mt-1 font-semibold text-white">{netWeight} g</p>
                    </div>
                    <div className="rounded-xl border border-white/14 bg-white/6 p-3">
                      <p className="text-xs text-white/60">Stone Weight</p>
                      <p className="mt-1 font-semibold text-white">{stoneWeight} g</p>
                    </div>
                    <div className="rounded-xl border border-white/14 bg-white/6 p-3">
                      <p className="text-xs text-white/60">Total Weight</p>
                      <p className="mt-1 font-semibold text-white">{selectedProduct.weight} g</p>
                    </div>
                    <div className="rounded-xl border border-white/14 bg-white/6 p-3">
                      <p className="text-xs text-white/60">Purity</p>
                      <p className="mt-1 font-semibold text-white">{selectedProduct.purity}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d4af37]/32 bg-[#d4af37]/10 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-[#f6e7b4]/82">Price</p>
                      <p className="font-semibold text-[#f6e3a8]">
                        Rs. {selectedProduct.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="inline-flex items-center rounded-full border border-white/20 bg-black/18 p-1">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full text-lg text-white transition hover:bg-white/12"
                        onClick={() => setQuantity((previous) => Math.max(1, previous - 1))}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold text-white">{quantity}</span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full text-lg text-white transition hover:bg-white/12"
                        onClick={() => setQuantity((previous) => previous + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/12 bg-white/6 p-3.5 text-sm text-white/78">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#f6e7b4]/82">
                      Product Notes
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-2 text-[0.92rem] sm:grid-cols-2">
                      <p>Material: {selectedProduct.materialDetails}</p>
                      <p>Category: {category.name}</p>
                      <p>Design Style: Contemporary Heritage</p>
                      <p>Occasion: Festive and Celebrations</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleOrderNow}
                      className="rounded-xl bg-linear-to-r from-[#f8d77e] to-[#b8811f] px-4 py-3 text-sm font-semibold text-[#221607] transition hover:brightness-110"
                    >
                      Order Now
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/18"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CategoryPage
