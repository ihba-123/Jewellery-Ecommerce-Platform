import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../../features/storefront/components/Navbar";
import CategoryPage from "../../features/storefront/pages/CategoryPage";
import Home from "../../features/storefront/pages/Home";
import Login from "../../features/storefront/pages/Login";
import ProductPage from "../../features/storefront/pages/ProductPage";
import SignupBusiness from "../../features/storefront/pages/SignupBusiness";
import SignupCustomer from "../../features/storefront/pages/SignupCustomer";

// Auth & Protected Routes
import { AuthProvider } from "../../features/auth/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import Dashboard from "../../features/dashboard/pages/Dashboard";
import RequestLoan from "../../features/dashboard/pages/RequestLoan";
import MyProfile from "../../features/dashboard/pages/MyProfile";
import AddressBook from "../../features/dashboard/pages/AddressBook";
import MyOrders from "../../features/dashboard/pages/MyOrders";
import ManageOrder from "../../features/dashboard/pages/ManageOrder";
import TrackOrder from "../../features/dashboard/pages/TrackOrder";
import MyReturns from "../../features/dashboard/pages/MyReturns";
import MyCancellations from "../../features/dashboard/pages/MyCancellations";
import RequestOrder from "../../features/dashboard/pages/RequestOrder";
import MyGoldItems from "../../features/dashboard/pages/MyGoldItems";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes (Global Layout with Navbar) */}
        <Route
          path="/"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <Home />
              </main>
            </div>
          }
        />
        <Route
          path="/categories/:categorySlug"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <CategoryPage />
              </main>
            </div>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <ProductPage />
              </main>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <Login />
              </main>
            </div>
          }
        />
        <Route
          path="/signup/customer"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <SignupCustomer />
              </main>
            </div>
          }
        />
        <Route
          path="/signup/business"
          element={
            <div className="min-h-[100dvh] overflow-x-clip text-white">
              <Navbar />
              <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
                <SignupBusiness />
              </main>
            </div>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/returns" element={<MyReturns />} />
          <Route path="orders/cancellations" element={<MyCancellations />} />
          <Route path="orders/:orderId/manage" element={<ManageOrder />} />
          <Route path="orders/:orderId/tracking" element={<TrackOrder />} />
          <Route path="request-order" element={<RequestOrder />} />
          <Route path="request-loan" element={<RequestLoan />} />
          <Route path="gold-items" element={<MyGoldItems />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
