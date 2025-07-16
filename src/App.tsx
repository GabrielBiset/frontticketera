import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componentes y datos
import { CategoryPills } from "./components/CategoryPills";
import { VideoGridItem } from "./components/VideoGridItem";
import { categories, videos } from "./data/home";
import { TopNavBar } from "./layouts/TopNavBar";
import { SidebarProvider } from "./contexts/SidebarContext";
import TicketPage from "./pages/TicketPage";
import TicketsPage from "./pages/Tickets";
import BillboardPage from "./pages/Billboard";
import EventsPage from "./pages/Events";
import ProducerPage from "./pages/Producer";
import ContactPage from "./pages/Contact";
import FaqPage from "./pages/Faq";
import LoginPage from "./pages/Login";
import CreateEventPage from "./pages/CreateEvent";
import EventDetailPage from "./pages/EventDetail";
import PreCompraPage from "./pages/PreCompraPage";
import Footer from "./layouts/Footer";

// Banners
import bannerbco from "./assets/Banners/bannerbco.png";
import banner13 from "./assets/Banners/banner13.jpg";
import banner14 from "./assets/Banners/banner14.jpg";
import banner15 from "./assets/Banners/banner15.jpg";
import banner16 from "./assets/Banners/banner16.jpg";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();
  const banners = [bannerbco, banner13, banner14, banner15, banner16];

  return (
    <div className="bg-black text-black px-4 py-2">
      <div className="sticky top-0 bg-black z-10 pb-4">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {banners.map((banner, index) => (
        <div key={index} className="w-full h-35 mb-4 rounded-lg overflow-hidden">
          <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* <div className="flex justify-center my-8">
        <button
          onClick={() => navigate("/compra/precompra/oasis/123")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          Simular Compra de Entrada
        </button>
      </div> */}

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-4">
        {videos
          .filter(video => selectedCategory === "All" || video.category === selectedCategory)
          .map((video) => (
            <VideoGridItem key={video.id} {...video} />
          ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-black">
        <TopNavBar />

        <div className="flex-grow px-8 pb-4 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ticket-test" element={<TicketPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/cartelera" element={<BillboardPage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/productores" element={<ProducerPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/preguntas" element={<FaqPage />} />
            <Route path="/crearevento" element={<CreateEventPage />} />
            <Route path="/evento/:id" element={<EventDetailPage />} />
            <Route path="/compra/precompra/:slug/:id" element={<PreCompraPage />} />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Footer />
      </div>
    </SidebarProvider>

    //hola lea
  );
}
