import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const ProductPage = () => {
  const { productId } = useParams()
  const { getProductById } = useAppContext()

  const product = getProductById(productId)

  if (!product) {
    return (
      <section className="mx-auto min-h-[60vh] w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-['Playfair_Display'] text-2xl text-white">Product Not Found</h1>
        <Link to="/" className="mt-6 inline-block text-[#f5d97c] underline">
          Back to Home
        </Link>
      </section>
    )
  }

  return <ProductDetails product={product} />
}

export default ProductPage
