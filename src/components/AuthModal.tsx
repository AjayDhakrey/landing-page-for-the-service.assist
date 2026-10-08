import React, { useState } from 'react';
import { X, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 500);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(phone);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            {step === 'phone' ? 'Welcome to Service Assist' : 'Verify Mobile OTP'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'phone'
              ? 'Enter your phone number to sign in or view past bookings'
              : `Enter the 4-digit verification code sent to +91 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">+91</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  maxLength={10}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-11 pr-3 text-sm text-slate-800 focus:outline-emerald-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Sending OTP...' : 'Continue with OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                4-Digit Security Code
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="• • • •"
                maxLength={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-center text-xl font-mono font-bold tracking-widest text-slate-800 focus:outline-emerald-500"
              />
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Demo code: enter any 4 digits (e.g. 1234)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Verifying...' : 'Verify & Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-xs text-slate-500 hover:text-slate-800 text-center block pt-1"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
