import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  Briefcase, 
  MapPin, 
  CheckCircle,
  Award,
  Compass
} from 'lucide-react';
import { TOP_PROS } from '../data/servicesData';
import { TopPro } from '../types';
import { Tilt3DCard } from './Tilt3DCard';

interface TopProsProps {
  onBookWithPro: (pro: TopPro) => void;
}

export const TopPros: React.FC<TopProsProps> = ({ onBookWithPro }) => {
  return (
    <section id="top-pros" className="py-8 sm:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Real Certified Experts
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Meet Top-Rated Professionals
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Ranked in the top 1% by homeowners with verified 4.8+ ratings and hundreds of successful jobs.
            </p>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Average pro experience: <strong className="text-slate-900">7.5+ years</strong></span>
          </div>
        </div>

        {/* 4 Pro Profile Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {TOP_PROS.map((pro) => (
            <Tilt3DCard
              key={pro.id}
              maxTilt={12}
              perspective={900}
              glare={true}
              className="h-full"
            >
              <div
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-200 p-4 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Header with Avatar & Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-emerald-600/20">
                        {pro.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white" title="Verified Background">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {pro.badge}
                    </span>
                  </div>

                  {/* Name & Specialty */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {pro.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {pro.specialty}
                  </p>

                  {/* Metrics: Rating, Experience, Jobs */}
                  <div className="my-3 py-2 px-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{pro.rating}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="text-slate-600">
                      <strong>{pro.jobsCompleted.toLocaleString()}</strong> jobs
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="text-slate-600">
                      {pro.experienceYears}y exp
                    </div>
                  </div>

                  {/* Personal Quote */}
                  <p className="text-xs text-slate-600 italic bg-slate-50/60 p-2.5 rounded-lg border border-slate-100 mb-3 leading-relaxed">
                    &ldquo;{pro.quote}&rdquo;
                  </p>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pro.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onBookWithPro(pro)}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  Request {pro.name.split(' ')[0]}
                </button>
              </div>
            </Tilt3DCard>
          ))}
        </div>

      </div>
    </section>
  );
};
