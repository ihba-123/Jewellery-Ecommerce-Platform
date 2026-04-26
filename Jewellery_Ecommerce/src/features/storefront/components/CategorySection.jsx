import CategoryCard from './CategoryCard'

const CategorySection = ({ categories }) => {
  return (
    <section
      id="categories"
      className="container relative flex min-h-dvh flex-col justify-center py-xl"
    >
      <div className="pointer-events-none absolute -left-20 top-12 h-48 w-48 rounded-full bg-[#d4af37]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 left-1/3 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative mb-lg text-center">
        <p className="text-small font-semibold uppercase tracking-[0.34em] text-[#f1e2b2]">
          Signature Collections
        </p>
        <h2 className="mt-xs font-['Playfair_Display'] text-h2 text-white">
          Shop by Category
        </h2>
        <p className="readable-copy mx-auto mt-xs text-body text-white/75">
          Curated jewellery crafted with heritage techniques and modern luxury finishing.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md lg:gap-lg">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
