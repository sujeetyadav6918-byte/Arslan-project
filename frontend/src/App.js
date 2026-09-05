import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRouter";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import Login from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/gallery" element={<Gallery />} />

            <Route path="/videos" element={<Videos />} />

            <Route path="/login" element={<Login />} />


            {/* 🔐 PROTECTED ADMIN ROUTE */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />


            {/* 404 PAGE */}

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <WhatsAppButton/>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;