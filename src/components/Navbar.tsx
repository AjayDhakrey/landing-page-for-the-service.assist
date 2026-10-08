import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  User, 
  Menu, 
  X, 
  Briefcase,
  Wrench,
  HelpCircle
} from 'lucide-react';
import { CITIES } from '../data/servicesData';
import { CartItem } from '../types';

interface NavbarProps {
  currentCity: string;
  onCityChange: (city: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAuth?: () => void;
  onOpenBooking: () => void;
  onOpenPartnerModal?: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onCityChange,
  cartItems,
  onOpenCart,
  onOpenAuth,
  onOpenBooking,
  onOpenPartnerModal,
  onSearchClick,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCityDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070b14]/90 backdrop-blur-xl border-b border-white/[0.08] text-white transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-15 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo + Location Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                Service Assist
              </span>
            </a>

            {/* City Selector Pill */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-200 bg-white/[0.08] hover:bg-white/[0.12] active:bg-white/[0.16] rounded-full border border-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Select City"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[65px] xs:max-w-[85px] sm:max-w-none">{currentCity}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* City Dropdown Menu */}
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select City
                  </div>
                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-800/80">
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onCityChange(city.name);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                          currentCity === city.name
                            ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className={`w-3.5 h-3.5 ${currentCity === city.name ? 'text-emerald-400' : 'text-slate-500'}`} />
                          {city.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">~{city.eta}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Desktop Navigation Links in Modern Pill Dock */}
          <nav className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-slate-300 shrink-0">
            <a 
              href="#services" 
              className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all whitespace-nowrap"
            >
              Services
            </a>

            <a 
              href="#how-it-works" 
              className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all whitespace-nowrap"
            >
              How It Works
            </a>

            <a 
              href="#why-us" 
              className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all whitespace-nowrap"
            >
              Why Us
            </a>

            {onOpenPartnerModal && (
              <button
                onClick={onOpenPartnerModal}
                className="px-3 py-1 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all whitespace-nowrap cursor-pointer"
              >
                Become a Partner
              </button>
            )}
          </nav>

          {/* Right Action Zone: Search, Cart, Login, Book Service, Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer shrink-0"
              title="Search services"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Trigger with Counter Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="View bookings cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-2 ring-[#070b14]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Login Trigger */}
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition-colors cursor-pointer shrink-0"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </button>
            )}

            {/* Primary Action Button: Book Service */}
            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-black text-slate-950 bg-[#00dfa2] hover:bg-[#00c992] active:bg-[#00b583] rounded-full shadow-md shadow-[#00dfa2]/20 transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              Book Service
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer shrink-0 ml-0.5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#070b14]/98 backdrop-blur-2xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="grid grid-cols-1 gap-1">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
            >
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Services</span>
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>How It Works</span>
            </a>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
            {onOpenAuth && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-xl border border-white/[0.08] transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </button>
            )}

            {onOpenPartnerModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/15 rounded-xl border border-emerald-500/20 transition-colors cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Partner Pro</span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
