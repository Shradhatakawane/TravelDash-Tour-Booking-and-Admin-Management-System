import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import BookTour from "./pages/BookTour";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddPackage from "./pages/AddPackage";
import AdminPackages from "./pages/AdminPackages";
import EditPackage from "./pages/EditPackage";
import Wishlist from "./pages/Wishlist";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/book/:id" element={<BookTour />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />

        {/* Customer Protected */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* Dashboard (logged in users) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/add-package"
          element={
            <AdminProtectedRoute>
              <AddPackage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-packages"
          element={
            <AdminProtectedRoute>
              <AdminPackages />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/edit-package/:id"
          element={
            <AdminProtectedRoute>
              <EditPackage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
