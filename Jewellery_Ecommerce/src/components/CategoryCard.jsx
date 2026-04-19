import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  const fallbackTaglineByCategory = {
    gold: 'Pure 22K Gold Jewellery',
    silver: 'Refined Sterling Silver Craft',
    diamond: 'Brilliance Set in Perfection',
    panchadhatu: 'Sacred Five-Metal Heritage',
  }

  const tagline = fallbackTaglineByCategory[category.slug] ?? category.description

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative isolate overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_18px_34px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#d4af37]/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.52),0_0_28px_rgba(212,175,55,0.32)] xl:h-[31.5rem]"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#d4af37]/5 via-transparent to-black/20" />

      <div className="relative h-64 overflow-hidden sm:h-72 xl:h-[22rem]">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#070707]/90 via-[#070707]/45 to-[#070707]/15" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <div className="rounded-2xl border border-white/20 bg-black/30 p-4 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50 group-hover:bg-black/40 sm:p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#f1e3b4]">Category</p>
          <h3 className="mt-1 font-['Playfair_Display'] text-2xl text-white sm:text-[1.9rem]">{category.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/78">{tagline}</p>

          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/55 bg-[#d4af37]/18 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#f8e9bc] transition-all duration-500 group-hover:bg-[#d4af37] group-hover:text-[#211503]">
            Explore Collection
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1">
              <path fillRule="evenodd" d="M10.293 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
