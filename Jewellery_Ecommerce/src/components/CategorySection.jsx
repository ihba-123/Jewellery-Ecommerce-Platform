import CategoryCard from './CategoryCard'

const CategorySection = ({ categories }) => {
  return (
    <section
      id="categories"
      className="relative mx-auto flex min-h-screen w-full max-w-360 flex-col justify-center px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-20 top-12 h-48 w-48 rounded-full bg-[#d4af37]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 left-1/3 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative mb-6 text-center sm:mb-8 lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#f1e2b2] sm:text-sm">
          Signature Collections
        </p>
        <h2 className="mt-3 font-['Playfair_Display'] text-4xl text-white sm:text-5xl">
          Shop by Category
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
          Curated jewellery crafted with heritage techniques and modern luxury finishing.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
