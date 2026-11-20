import React from 'react';
import {
  Sparkles,
  Plane,
  ArrowRight,
  Fuel,
  Clock,
  Activity
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraFlightRipple = () => {
  const { flightRipple, setIsFlightRippleModalOpen } = useSavera();

  return (
    <div className="savera-card p-6 bg-gradient-to-br from-[#121B32] via-[#10192F] to-[#0D1426] border border-[#E8C77E]/35 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Radar Grid Elements */}
      <div className="absolute right-0 top-0 bottom-0 w-80 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-96 h-96 rounded-full border border-[#E8C77E]/40 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="w-64 h-64 rounded-full border border-[#E8C77E]/30" />
        <div className="w-32 h-32 rounded-full border border-[#E8C77E]/40" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Branding & Core Concept */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7E5B5] to-[#B28A3C] flex items-center justify-center text-[#070B18] shadow-md shadow-[#E8C77E]/30">
              <Plane className="w-4 h-4 transform -rotate-45" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-black tracking-widest text-gold-gradient">
                FLIGHTRIPPLE™
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#E8C77E]/20 text-[#F7E5B5] border border-[#E8C77E]/40 tracking-wider font-mono">
                SIGNATURE ENGINE
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#F8F6F0] mt-2 tracking-tight">
            Real-Time Route Optimization & Airspace Synchronization
          </h2>
          <p className="text-xs sm:text-sm text-[#9EABBE] mt-1.5 leading-relaxed font-medium">
            Proprietary AI routing telemetry continuously predicts jetstream drifts, airway congestion, and airport slot conflicts to reduce fuel burn and avert cascading turn-around delays.
          </p>

          {/* Status Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#82D197]/15 border border-[#82D197]/35 text-[#82D197] font-bold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82D197] animate-pulse" />
              {flightRipple.syncStatus}
            </span>
            <span className="text-[11px] text-[#9EABBE] font-mono font-medium">
              Last synced: {flightRipple.lastCalculation}
            </span>
          </div>
        </div>

        {/* Center: Key Savings Metrics with Luxury Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Fuel Savings */}
          <div className="p-3.5 rounded-xl bg-[#070B18]/80 border border-[#E8C77E]/25 text-center min-w-[130px] shadow-inner">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#9EABBE] uppercase tracking-wider">
              <Fuel className="w-3.5 h-3.5 text-[#E8C77E]" />
              <span>Fuel Saved</span>
            </div>
            <div className="text-xl font-black font-serif text-[#F7E5B5] mt-1 text-gold-gradient">
              {flightRipple.costSavingsUSD}
            </div>
            <div className="text-[10px] text-[#82D197] font-mono mt-0.5 font-bold">
              +4.2% Fuel Cut
            </div>
          </div>

          {/* Time Savings */}
          <div className="p-3.5 rounded-xl bg-[#070B18]/80 border border-[#E8C77E]/25 text-center min-w-[130px] shadow-inner">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#9EABBE] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#69C0FF]" />
              <span>Time Saved</span>
            </div>
            <div className="text-xl font-black font-serif text-[#69C0FF] mt-1">
              {flightRipple.cascadingDelayPreventedMinutes} min
            </div>
            <div className="text-[10px] text-[#9EABBE] font-mono mt-0.5 font-medium">
              Delay Averted
            </div>
          </div>

          {/* Active Interventions */}
          <div className="p-3.5 rounded-xl bg-[#070B18]/80 border border-[#E8C77E]/25 text-center min-w-[130px] col-span-2 sm:col-span-1 shadow-inner">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#9EABBE] uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#82D197]" />
              <span>Optimized Routes</span>
            </div>
            <div className="text-xl font-black font-serif text-[#F8F6F0] mt-1">
              42 Flights
            </div>
            <div className="text-[10px] text-[#82D197] font-mono mt-0.5 font-bold">
              100% Monitored
            </div>
          </div>
        </div>

        {/* Right: Interactive View Insights Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setIsFlightRippleModalOpen(true)}
            className="savera-btn-gold w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 group cursor-pointer shadow-xl hover:shadow-[#E8C77E]/30"
          >
            <Sparkles className="w-4 h-4 text-[#070B18]" />
            <span>View Route Insights</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveraFlightRipple;
