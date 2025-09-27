import { Navigate, useLocation } from "react-router-dom"
import ApiService from "./ApiService";

// Mobile detection function
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check for mobile user agents
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Also check screen width as backup
  const isMobileScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent) || isMobileScreen;
};

// Mobile message component
const MobileAdminMessage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Please use a laptop or PC for a better experience when viewing the admin dashboard.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export const CustomerRoute = ({element: Component}) => {
  const location = useLocation();
  return ApiService.isCustomer() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{from: location}}/>
  )
}

export const AdminRoute = ({element: Component}) => {
  const location = useLocation();
  
  // Check if user is admin first
  if (!ApiService.isAdmin()) {
    return <Navigate to="/login" replace state={{from: location}}/>;
  }
  
  // If admin, check if on mobile
  if (isMobileDevice()) {
    return <MobileAdminMessage />;
  }
  
  return Component;
}