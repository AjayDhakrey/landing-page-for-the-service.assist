import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesGrid } from './components/CategoriesGrid';
import { AiDiagnosticWidget } from './components/AiDiagnosticWidget';
import { PopularServices } from './components/PopularServices';
import { HowItWorks } from './components/HowItWorks';
import { TrustGuarantees } from './components/TrustGuarantees';
import { Testimonials } from './components/Testimonials';
import { PreFooterCta } from './components/PreFooterCta';
import { ProPartnerCta } from './components/ProPartnerCta';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { CartItem, ServiceItem } from './types';
import { SERVICES, CITIES } from './data/servicesData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentCity, setCurrentCity] = useState(CITIES[0].name);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { service: SERVICES[0], quantity: 1 }
  ]);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeBookingService, setActiveBookingService] = useState<ServiceItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (service: ServiceItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.service.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
    showToast(`Added "${service.title}" to cart`);
  };

  const handleUpdateQuantity = (serviceId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.service.id === serviceId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (serviceId: string) => {
    setCartItems((prev) => prev.filter((item) => item.service.id !== serviceId));
    showToast('Service removed from cart');
  };

  const handleInstantBook = (service?: ServiceItem) => {
    if (service) {
      setActiveBookingService(service);
    } else if (cartItems.length > 0) {
      setActiveBookingService(cartItems[0].service);
    } else {
      setActiveBookingService(SERVICES[0]);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Global Navigation matching mockup */}
      <Navbar
        currentCity={currentCity}
        onCityChange={(city) => {
          setCurrentCity(city);
          showToast(`Location updated to ${city}`);
        }}
        cartItems={cartItems}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenBooking={() => handleInstantBook()}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onSearchClick={() => setSearchModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Technician with floating badges & search */}
        <Hero
          currentCity={currentCity}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onInstantBook={() => handleInstantBook(SERVICES[0])}
          onOpenAiDiagnostic={() => {
            const el = document.getElementById('ai-diagnostic');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Popular Services (8 Pastel Category Cards) */}
        <CategoriesGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
          }}
        />

        {/* 4. AI Home Diagnostic Problem Solver (Mint BG & 3D Robot) */}
        <AiDiagnosticWidget
          onBookService={(service) => {
            handleInstantBook(service);
          }}
        />

        {/* 5. Most Booked Home Services (8 Cards with Photos & Badges) */}
        <PopularServices
          selectedCategory={selectedCategory}
          onCategoryChange={(catId) => setSelectedCategory(catId)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onInstantBook={handleInstantBook}
          searchQuery={searchQuery}
        />

        {/* 6. How Service Assist Works (3 Simple Steps + Customer Image) */}
        <HowItWorks onBookService={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 7. Why Thousands of Families Trust Us (4 Trust Cards) */}
        <TrustGuarantees />

        {/* 8. What Our Customers Say (Testimonials Cards) */}
        <Testimonials />

        {/* 9. Your Home, Our Priority (Living Room Pre-Footer CTA) */}
        <PreFooterCta onInstantBook={() => handleInstantBook(SERVICES[0])} />

        {/* Pro Partner Modal */}
        <ProPartnerCta
          isOpen={partnerModalOpen}
          onOpen={() => setPartnerModalOpen(true)}
          onClose={() => setPartnerModalOpen(false)}
          showBanner={false}
        />
      </main>

      {/* 10. Global Footer matching mockup */}
      <Footer
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onCityChange={(city) => {
          setCurrentCity(city);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setActiveBookingService(null);
        }}
        cartItems={cartItems}
        currentCity={currentCity}
        onClearCart={() => setCartItems([])}
        initialService={activeBookingService}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setCartDrawerOpen(false);
          setBookingModalOpen(true);
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(phone) => {
          showToast(`Welcome! Logged in with +91 ${phone}`);
        }}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={(service) => {
          handleInstantBook(service);
        }}
      />

    </div>
  );
}
