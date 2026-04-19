import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const handleRequireAccount = (event) => {
    event.preventDefault()
    window.alert('Please login or create an account first.')
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-[0_18px_42px_rgba(0,0,0,0.42),0_0_24px_rgba(212,175,55,0.12)]">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover transition duration-500 hover:scale-105"
      />

      <div className="space-y-2 p-5 sm:p-6">
        <h3 className="font-['Playfair_Display'] text-xl text-white">{product.name}</h3>
        <p className="text-sm text-white/72">Purity: {product.purity}</p>
        <p className="text-sm text-white/72">Weight: {product.weight}g</p>
        <p className="text-lg font-semibold text-[#f5d97c]">Rs. {product.price.toLocaleString('en-IN')}</p>

        <Link
          to={`/products/${product.id}`}
          onClick={handleRequireAccount}
          className="mt-3 inline-block rounded-md bg-linear-to-r from-[#f8d77e] to-[#b8811f] px-4 py-2 text-sm font-semibold text-[#221607] transition hover:brightness-110"
        >
          Order Now
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
