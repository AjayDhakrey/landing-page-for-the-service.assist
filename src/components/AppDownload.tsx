import React, { useState } from 'react';
import { Smartphone, QrCode, CheckCircle2, Apple, Play, Send } from 'lucide-react';

export const AppDownload: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                <Smartphone className="w-3 h-3" />
                <span>Service Assist Mobile App</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Home Services at Your Fingertips. <span className="text-emerald-400">Download the App</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Experience real-time live map tracking, emergency 15-minute dispatch, 4-digit OTP safety verification, and exclusive in-app cashback offers.
              </p>

              {/* SMS download link input */}
              <form onSubmit={handleSendLink} className="max-w-md pt-2">
                <label className="text-xs text-slate-400 block mb-1 font-medium">
                  Get app download link on your phone via SMS:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-11 pr-3 text-sm text-white placeholder-slate-500 focus:outline-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Link</span>
                  </button>
                </div>
                {sent && (
                  <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Link sent to +91 {phoneNumber}! Check your SMS.
                  </p>
                )}
              </form>

              {/* App store buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors cursor-pointer">
                  <Apple className="w-5 h-5 text-white" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 uppercase leading-none">Download on</p>
                    <p className="text-xs font-bold text-white leading-tight">App Store</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors cursor-pointer">
                  <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 uppercase leading-none">Get it on</p>
                    <p className="text-xs font-bold text-white leading-tight">Google Play</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: QR Code Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl max-w-[280px] w-full text-center border-4 border-slate-800">
                <div className="w-44 h-44 mx-auto bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-3 relative group">
                  {/* Decorative QR Pattern */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-900 rounded-xl">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-sm ${
                          i % 3 === 0 ? 'bg-emerald-400' : i % 2 === 0 ? 'bg-white' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500 font-bold">
                    SCAN TO INSTALL
                  </div>
                </div>

                <h4 className="mt-4 font-bold text-sm text-slate-900">
                  Scan to Download
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  iOS & Android Supported · 4.8★ (45k+ reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
