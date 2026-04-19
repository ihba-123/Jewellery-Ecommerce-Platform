import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useAppContext } from '../context/AppContext'

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const { categories, getProductsByCategory } = useAppContext()

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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#f5d97c]">Category</p>
          <h1 className="mt-2 font-['Playfair_Display'] text-4xl text-white">{category.name}</h1>
          <p className="mt-2 max-w-xl text-white/84">{category.description}</p>
        </div>
        <Link
          to="/"
          className="rounded-md border border-[#d4af37]/35 px-4 py-2 text-sm text-[#f5d97c] transition hover:bg-white/8"
        >
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default CategoryPage
