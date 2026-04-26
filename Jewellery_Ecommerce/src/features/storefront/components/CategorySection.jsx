import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
  return (
    <section
      id="categories"
      className="relative w-full py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#d4af37]/12 blur-[80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-[#d4af37]/8 blur-[70px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="relative mb-14 md:mb-18 flex flex-col items-center text-center">
          {/* Pill badge */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/8 px-3.5 py-1">
            <svg
              viewBox="0 0 12 12"
              fill="currentColor"
              className="h-2 w-2 text-[#d4af37]/70"
            >
              <path d="M6 0 L12 6 L6 12 L0 6 Z" />
            </svg>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#f1e2b2]/70">
              Signature Collections
            </span>
            <svg
              viewBox="0 0 12 12"
              fill="currentColor"
              className="h-2 w-2 text-[#d4af37]/70"
            >
              <path d="M6 0 L12 6 L6 12 L0 6 Z" />
            </svg>
          </span>

          {/* Heading */}
          <h2
            className="text-[2.6rem] sm:text-5xl md:text-[3.4rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Shop by{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg, #f4e08a 0%, #d4af37 55%, #b8872a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Category
            </span>
          </h2>

          {/* Divider */}
          <div className="mt-4 mb-5 flex items-center gap-2.5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <svg
              viewBox="0 0 12 12"
              fill="currentColor"
              className="h-2 w-2 text-[#d4af37]/50"
            >
              <path d="M6 0 L12 6 L6 12 L0 6 Z" />
            </svg>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          {/* Subtext */}
          <p className="max-w-[38ch] text-[0.78rem] font-light leading-[1.75] tracking-[0.02em] text-white/45">
            Curated jewellery crafted with heritage techniques and modern luxury
            finishing.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
};

export default CategorySection;
