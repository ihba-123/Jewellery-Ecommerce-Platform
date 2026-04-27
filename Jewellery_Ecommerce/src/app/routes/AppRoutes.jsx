import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../../features/storefront/components/Navbar";
import CategoryPage from "../../features/storefront/pages/CategoryPage";
import Home from "../../features/storefront/pages/Home";
import Login from "../../features/storefront/pages/Login";
import ProductPage from "../../features/storefront/pages/ProductPage";
import SignupBusiness from "../../features/storefront/pages/SignupBusiness";
import SignupCustomer from "../../features/storefront/pages/SignupCustomer";

import { AuthProvider } from "../../features/auth/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import MyProfile from "../../features/dashboard/pages/MyProfile";
import AddressBook from "../../features/dashboard/pages/AddressBook";
import MyOrders from "../../features/dashboard/pages/MyOrders";
import ManageOrder from "../../features/dashboard/pages/ManageOrder";
import TrackOrder from "../../features/dashboard/pages/TrackOrder";
import MyReturns from "../../features/dashboard/pages/MyReturns";
import MyCancellations from "../../features/dashboard/pages/MyCancellations";
import RequestOrder from "../../features/dashboard/pages/RequestOrder";

/* Shared storefront wrapper — avoids repeating the same div 6 times */
const StorefrontLayout = ({ children }) => (
  <div className="min-h-[100dvh] overflow-x-clip text-white">
    <Navbar />
    <main className="pt-[calc(var(--dashboard-topbar-height)+var(--space-sm))]">
      {children}
    </main>
  </div>
);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Public / Storefront ─────────────────────── */}
        <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
        <Route path="/categories/:categorySlug" element={<StorefrontLayout><CategoryPage /></StorefrontLayout>} />
        <Route path="/products/:productId" element={<StorefrontLayout><ProductPage /></StorefrontLayout>} />
        <Route path="/login" element={<StorefrontLayout><Login /></StorefrontLayout>} />
        <Route path="/signup/customer" element={<StorefrontLayout><SignupCustomer /></StorefrontLayout>} />
        <Route path="/signup/business" element={<StorefrontLayout><SignupBusiness /></StorefrontLayout>} />

        {/* ── Protected Dashboard ─────────────────────── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default: redirect /dashboard → /dashboard/profile */}
          <Route index element={<Navigate to="profile" replace />} />

          <Route path="profile" element={<MyProfile />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/returns" element={<MyReturns />} />
          <Route path="orders/cancellations" element={<MyCancellations />} />
          <Route path="orders/:orderId/manage" element={<ManageOrder />} />
          <Route path="orders/:orderId/tracking" element={<TrackOrder />} />
          <Route path="request-order" element={<RequestOrder />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;