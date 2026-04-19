import CategorySection from '../components/CategorySection'
import Hero from '../components/Hero'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const { categories } = useAppContext()

  return (
    <>
      <Hero />
      <CategorySection categories={categories} />
    </>
  )
}

export default Home
