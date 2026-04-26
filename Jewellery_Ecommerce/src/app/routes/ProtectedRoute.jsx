// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../auth/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    // TEMP: Bypass auth check until backend is integrated
    // const { isAuthenticated, loading } = useAuth();
    // const location = useLocation();

    // if (loading) {
    //     return <div className="min-h-screen flex items-center justify-center text-white bg-zinc-950">Loading...</div>;
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    return children;
};

export default ProtectedRoute;
