import React from 'react';
import { MapPin, ChevronRight, Clock } from 'lucide-react';
import { CITIES } from '../data/servicesData';
import { Tilt3DCard } from './Tilt3DCard';

interface ServingCitiesProps {
  currentCity: string;
  onSelectCity: (cityName: string) => void;
}

const ALL_CITIES = [
  { name: 'Mumbai', eta: '12 min', badge: 'Fastest' },
  { name: 'Navi Mumbai', eta: '15 min' },
  { name: 'Thane', eta: '14 min' },
  { name: 'Pune', eta: '15 min' },
  { name: 'Bengaluru', eta: '10 min', badge: 'High Demand' },
  { name: 'Hyderabad', eta: '15 min' },
  { name: 'Gurugram', eta: '12 min', badge: 'Fastest' },
  { name: 'Delhi', eta: '10 min', badge: 'Popular' },
  { name: 'Noida', eta: '14 min' },
];

export const ServingCities: React.FC<ServingCitiesProps> = ({
  currentCity,
  onSelectCity,
}) => {
  return (
    <section className="py-8 sm:py-10 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Nationwide Doorstep Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Serving Homes <span className="text-emerald-600">Across India</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Certified background-verified technicians on duty in every major metropolitan hub.
          </p>
        </div>

        {/* 9-Card City Grid (3x3 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 max-w-5xl mx-auto">
          {ALL_CITIES.map((c) => {
            const isSelected = currentCity.toLowerCase().includes(c.name.toLowerCase()) || 
              (currentCity === 'Delhi NCR' && (c.name === 'Delhi' || c.name === 'Noida' || c.name === 'Gurugram'));

            return (
              <Tilt3DCard key={c.name} maxTilt={8} perspective={800} glare={true}>
                <div
                  onClick={() => onSelectCity(c.name)}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between text-left group ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {c.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>Avg. arrival ~{c.eta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.badge && (
                      <span className="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-emerald-600' : 'text-slate-400'
                    }`} />
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
