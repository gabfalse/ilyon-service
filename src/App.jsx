import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import AdminPage from "./Pages/AdminPage";
import AffiliateProducts from "./Pages/AffiliateProducts";
import DigitalProducts from "./Pages/DigitalProducts";
import FreelanceGeneral from "./Pages/FreelanceGeneral";
import FreelanceWeb from "./Pages/FreelanceWeb";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import DigitalProductPage from "./Pages/cms/DigitalProductPage";
import AffiliateProductPage from "./Pages/cms/AffiliateProductPage";
import FreelanceITPage from "./Pages/cms/FreelanceItPage";
import FreelanceGeneralPage from "./Pages/cms/FreelanceGeneralPage";
import PortfolioPage from "./Pages/PortfolioPage";
import TestimoniPage from "./Pages/TestimoniPage";

export default function App() {
  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms/digital"
          element={
            <ProtectedRoute>
              <DigitalProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms/affiliate"
          element={
            <ProtectedRoute>
              <AffiliateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms/freelance-it"
          element={
            <ProtectedRoute>
              <FreelanceITPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms/freelance-umum"
          element={
            <ProtectedRoute>
              <FreelanceGeneralPage />
            </ProtectedRoute>
          }
        />
        {/* GENERAL */}
        <Route path="/digital-product" element={<DigitalProducts />} />
        <Route path="/affiliate" element={<AffiliateProducts />} />
        <Route path="/freelance-it" element={<FreelanceWeb />} />
        <Route path="/freelance-umum" element={<FreelanceGeneral />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/testimoni" element={<TestimoniPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
