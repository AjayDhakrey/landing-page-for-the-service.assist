import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Percent } from 'lucide-react';
import { OFFERS } from '../data/servicesData';

interface OffersBannerProps {
  onApplyCoupon: (code: string) => void;
}

export const OffersBanner: React.FC<OffersBannerProps> = ({ onApplyCoupon }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="offers" className="py-8 sm:py-10 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-1.5 border border-emerald-400/30">
            <Sparkles className="w-3 h-3" />
            <span>Limited Time Vouchers</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-display">
            Exclusive Deals & Instant Savings
          </h2>
          <p className="mt-1 text-xs text-emerald-100/80">
            Tap to copy and auto-apply voucher codes directly at checkout.
          </p>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.code}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 border border-white/15 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-300/30">
                      <Percent className="w-3.5 h-3.5" />
                      SPECIAL PROMO
                    </span>
                    <span className="text-[11px] text-emerald-200 font-mono">
                      Min. ₹{offer.minOrder}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    {offer.desc}
                  </p>
                </div>

                {/* Bottom Coupon Code Button */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="font-mono text-sm font-extrabold tracking-wider bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/15 text-emerald-300">
                    {offer.code}
                  </div>

                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
