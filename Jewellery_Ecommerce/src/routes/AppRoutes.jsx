import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CategoryPage from '../pages/CategoryPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductPage from '../pages/ProductPage'
import SignupBusiness from '../pages/SignupBusiness'
import SignupCustomer from '../pages/SignupCustomer'

const AppRoutes = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categorySlug" element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/customer" element={<SignupCustomer />} />
          <Route path="/signup/business" element={<SignupBusiness />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AppRoutes
