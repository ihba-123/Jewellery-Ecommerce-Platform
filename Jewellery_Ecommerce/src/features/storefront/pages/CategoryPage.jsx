import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ScanLine } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import CategorySelect from "../components/CategorySelect";

/* --------------------------------------------------
   Extra Images
---------------------------------------------------*/
const extraImagesByCategory = {
  gold: [
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
  ],
  silver: [
    "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  ],
  diamond: [
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
  ],
  panchadhatu: [
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
  ],
};

/* --------------------------------------------------
   Product Card
---------------------------------------------------*/
const ProductCard = ({ product, onSelect, onQrClick }) => {
  return (
    <article
      onClick={() => onSelect(product)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/12"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
          {product.purity}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-h-[180px] flex-col p-5">
        <h3
          className="line-clamp-2 text-[18px] font-semibold leading-snug text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product.name}
        </h3>

        <div className="mt-3 flex gap-2 text-[12px] text-white/60">
          <span>{product.weight}g</span>
          <span>•</span>
          <span className="capitalize">{product.category}</span>
        </div>

        <div className="mt-auto pt-5 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
              Price
            </p>

            <p className="mt-1 text-[20px] font-semibold text-[#ffd86f]">
              ₹ {product.price.toLocaleString("en-IN")}
            </p>
          </div>

        </div>
      </div>
    </article>
  );
};

/* --------------------------------------------------
   Stat Tile
---------------------------------------------------*/
const StatTile = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-lg">
    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
      {label}
    </p>
    <p className="mt-1 text-[15px] font-semibold text-white">{value}</p>
  </div>
);

const Backdrop = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute inset-0 bg-[#090614]/75 backdrop-blur-md"
  />
);

/* --------------------------------------------------
   Main Page
---------------------------------------------------*/
const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const { categories, getProductsByCategory } = useAppContext();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedQrProduct, setSelectedQrProduct] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const closeRef = useRef(null);
  const qrCloseRef = useRef(null);

  const category = categories.find((c) => c.slug === categorySlug);
  const categoryProducts = getProductsByCategory(categorySlug);

  const openQuickView = (product) => {
    clearTimeout(closeRef.current);
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedImageIndex(0);
    requestAnimationFrame(() => setModalOpen(true));
  };

  const closeQuickView = () => {
    setModalOpen(false);
    closeRef.current = setTimeout(() => setSelectedProduct(null), 250);
  };

  const openQrPopup = (product) => {
    clearTimeout(qrCloseRef.current);
    setSelectedQrProduct(product);
    setQrScanned(false);
    requestAnimationFrame(() => setQrModalOpen(true));
  };

  const closeQrPopup = () => {
    setQrModalOpen(false);
    qrCloseRef.current = setTimeout(() => setSelectedQrProduct(null), 250);
  };

  useEffect(() => {
    if (!selectedProduct && !selectedQrProduct) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedProduct, selectedQrProduct]);

  if (!category) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white">Category Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-[#ffd86f]">
            Back Home
          </Link>
        </div>
      </section>
    );
  }

  const getWeights = (p) => {
    const sw = p.weight * 0.12;
    return {
      sw: sw.toFixed(2),
      nw: (p.weight - sw).toFixed(2),
    };
  };

  const galleryImages = selectedProduct
    ? [
        selectedProduct.image,
        ...(extraImagesByCategory[selectedProduct.category] || []),
      ]
    : [];

  const selectedImage =
    galleryImages[selectedImageIndex] ?? selectedProduct?.image;

  const weights = selectedProduct ? getWeights(selectedProduct) : {};

  return (
    <>
      <section
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 md:py-14">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/75">
                Category
              </span>

              <h1
                className="mt-4 text-5xl sm:text-6xl font-semibold text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {category.name}
              </h1>

              <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/75">
                {category.description}
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Back Home
            </Link>
          </div>

          {/* Products */}
          {categoryProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center text-white/70">
              No products found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={openQuickView}
                  onQrClick={openQrPopup}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Existing Modal Component */}
      <CategorySelect
        selectedQrProduct={selectedQrProduct}
        qrModalOpen={qrModalOpen}
        qrScanned={qrScanned}
        setQrScanned={setQrScanned}
        selectedProduct={selectedProduct}
        Backdrop={Backdrop}
        modalOpen={modalOpen}
        closeQuickView={closeQuickView}
        selectedImage={selectedImage}
        galleryImages={galleryImages}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        weights={weights}
        StatTile={StatTile}
        quantity={quantity}
        setQuantity={setQuantity}
        category={category}
        closeQrPopup={closeQrPopup}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
};

export default CategoryPage;