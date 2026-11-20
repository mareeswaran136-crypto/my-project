import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Plane,
  Fuel,
  Clock,
  Activity,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Wind,
  ShieldAlert,
  Compass,
  Cpu,
  RefreshCw,
  BarChart2
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const FlightRippleModal = () => {
  const {
    isFlightRippleModalOpen,
    setIsFlightRippleModalOpen,
    flightRipple,
    showToast
  } = useSavera();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'routes' | 'telemetry'
  const [selectedRoute, setSelectedRoute] = useState('DEL-BOM');
  const [isRecalculating, setIsRecalculating] = useState(false);

  if (!isFlightRippleModalOpen) return null;

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      showToast('FlightRipple routes synchronized with JetStream vector models!', 'gold');
    }, 1200);
  };

  const sampleOptimizedRoutes = [
    {
      id: 'DEL-BOM',
      flight: 'SV 302',
      corridor: 'Airway W22 Alternative Route',
      fuelSavedKg: '420 kg',
      fuelSavedPct: '4.8%',
      timeSavedMin: '11 min',
      costSaved: '$1,850',
      altitudeProfile: 'FL380 (+2,000 ft climb to catch 45kt tailwind)',
      weatherRisk: 'Zero convective activity detected',
      efficiencyScore: '98.4%'
    },
    {
      id: 'DEL-DXB',
      flight: 'SV 501',
      corridor: 'Arabian Gulf Vector Direct',
      fuelSavedKg: '680 kg',
      fuelSavedPct: '5.2%',
      timeSavedMin: '16 min',
      costSaved: '$2,940',
      altitudeProfile: 'Step Climb FL360 -> FL400',
      weatherRisk: 'Clear air turbulence avoided south of Muscat',
      efficiencyScore: '99.1%'
    },
    {
      id: 'BOM-LHR',
      flight: 'SV 101',
      corridor: 'Central Continental Airspace Bypass',
      fuelSavedKg: '1,450 kg',
      fuelSavedPct: '6.1%',
      timeSavedMin: '28 min',
      costSaved: '$6,800',
      altitudeProfile: 'FL340 -> FL380 -> FL410 Super-Optimal',
      weatherRisk: 'Bypassed Black Sea congestion knot',
      efficiencyScore: '99.6%'
    },
    {
      id: 'DEL-BLR',
      flight: 'SV 410',
      corridor: 'Peninsular Direct RNAV-1',
      fuelSavedKg: '310 kg',
      fuelSavedPct: '3.9%',
      timeSavedMin: '8 min',
      costSaved: '$1,320',
      altitudeProfile: 'FL370 steady cruise',
      weatherRisk: 'Nominal en-route conditions',
      efficiencyScore: '97.2%'
    }
  ];

  const currentRouteData = sampleOptimizedRoutes.find(r => r.id === selectedRoute) || sampleOptimizedRoutes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#10182B] p-5 sm:p-6 border-b border-[#E8C77E]/20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E8C77E] to-[#B28A3C] p-[1.5px] shadow-lg shadow-[#E8C77E]/20">
              <div className="w-full h-full bg-[#10182B] rounded-[10px] flex items-center justify-center text-[#E8C77E]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-white tracking-wide m-0">
                  FLIGHTRIPPLE™ Insights
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#91C98A]/15 text-[#91C98A] border border-[#91C98A]/30">
                  REAL-TIME SYNC
                </span>
              </div>
              <p className="text-xs text-[#AAB2C2] mt-0.5 m-0">
                AI Airway Optimization • JetStream Tail-Vectoring • Delay Cascade Mitigation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E8C77E]/10 hover:bg-[#E8C77E]/20 text-[#E8C77E] border border-[#E8C77E]/30 text-xs font-semibold transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>{isRecalculating ? 'Recalculating...' : 'Recalculate Mesh'}</span>
            </button>
            <button
              onClick={() => setIsFlightRippleModalOpen(false)}
              className="p-2 rounded-xl text-[#AAB2C2] hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#0C1424] border-b border-[#E8C77E]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[
              { id: 'overview', label: 'Optimization Overview' },
              { id: 'routes', label: 'Active Route Interventions' },
              { id: 'telemetry', label: 'Airspace Ripple Telemetry' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#E8C77E] text-[#080D1B]'
                    : 'text-[#AAB2C2] hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline-block text-[11px] text-[#AAB2C2] font-mono">
            Mesh Status: <strong className="text-[#91C98A]">100% Operational</strong>
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Top Banner Overview Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
                  <div className="flex items-center gap-2 text-xs text-[#AAB2C2] uppercase font-bold">
                    <Fuel className="w-4 h-4 text-[#E8C77E]" />
                    <span>Cost Savings</span>
                  </div>
                  <div className="text-2xl font-black font-serif text-[#E8C77E] mt-2">
                    {flightRipple.costSavingsUSD}
                  </div>
                  <span className="text-[11px] text-[#91C98A] font-mono">
                    Today across 42 sectors
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
                  <div className="flex items-center gap-2 text-xs text-[#AAB2C2] uppercase font-bold">
                    <Clock className="w-4 h-4 text-[#72C4FF]" />
                    <span>Delays Prevented</span>
                  </div>
                  <div className="text-2xl font-black font-serif text-[#72C4FF] mt-2">
                    {flightRipple.cascadingDelayPreventedMinutes} min
                  </div>
                  <span className="text-[11px] text-[#AAB2C2] font-mono">
                    Turnaround cascade saved
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
                  <div className="flex items-center gap-2 text-xs text-[#AAB2C2] uppercase font-bold">
                    <Wind className="w-4 h-4 text-[#91C98A]" />
                    <span>Tailwind Harness</span>
                  </div>
                  <div className="text-2xl font-black font-serif text-[#91C98A] mt-2">
                    +42 kt avg
                  </div>
                  <span className="text-[11px] text-[#91C98A] font-mono">
                    Jetstream layer lock
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
                  <div className="flex items-center gap-2 text-xs text-[#AAB2C2] uppercase font-bold">
                    <Cpu className="w-4 h-4 text-[#E8B75F]" />
                    <span>AI Latency</span>
                  </div>
                  <div className="text-2xl font-black font-serif text-[#E8B75F] mt-2">
                    124 ms
                  </div>
                  <span className="text-[11px] text-[#AAB2C2] font-mono">
                    Continuous re-route cycle
                  </span>
                </div>
              </div>

              {/* Dynamic Route Comparison Box */}
              <div className="p-5 rounded-2xl bg-[#080D1B] border border-[#E8C77E]/25">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8C77E]/15 gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white m-0">
                      Live Route Optimization Showcase
                    </h3>
                    <p className="text-xs text-[#AAB2C2] m-0">
                      Select a major SAVÉRA city-pair corridor to view real-time flight path re-vectoring.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {sampleOptimizedRoutes.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRoute(r.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedRoute === r.id
                            ? 'bg-[#E8C77E] text-[#080D1B]'
                            : 'bg-[#111A2D] text-[#AAB2C2] border border-[#E8C77E]/20 hover:text-white'
                        }`}
                      >
                        {r.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Corridor Specs */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 rounded-xl bg-[#111A2D] border border-[#E8C77E]/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E8C77E] font-mono">
                        {currentRouteData.flight} • {currentRouteData.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#91C98A]/15 text-[#91C98A]">
                        Score: {currentRouteData.efficiencyScore}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-white">Recommended Corridor:</div>
                      <div className="text-sm font-medium text-[#72C4FF] mt-0.5">
                        {currentRouteData.corridor}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-white">Vertical Profile Plan:</div>
                      <div className="text-xs text-[#AAB2C2] mt-0.5">
                        {currentRouteData.altitudeProfile}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8C77E]/10 flex items-center justify-between text-xs">
                      <span className="text-[#AAB2C2]">Weather & Airway Risk:</span>
                      <span className="text-[#91C98A] font-medium">{currentRouteData.weatherRisk}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111A2D] border border-[#E8C77E]/15 flex flex-col justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#AAB2C2]">
                      Predicted Mission Savings
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-4 text-center">
                      <div className="p-2.5 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
                        <div className="text-xs text-[#AAB2C2]">Fuel Cut</div>
                        <div className="text-lg font-black font-serif text-[#E8C77E] mt-1">
                          {currentRouteData.fuelSavedKg}
                        </div>
                        <div className="text-[10px] text-[#91C98A] font-mono font-bold">
                          {currentRouteData.fuelSavedPct}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
                        <div className="text-xs text-[#AAB2C2]">Air Time</div>
                        <div className="text-lg font-black font-serif text-[#72C4FF] mt-1">
                          -{currentRouteData.timeSavedMin}
                        </div>
                        <div className="text-[10px] text-[#72C4FF] font-mono">
                          Direct Entry
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
                        <div className="text-xs text-[#AAB2C2]">Net Cost</div>
                        <div className="text-lg font-black font-serif text-[#91C98A] mt-1">
                          {currentRouteData.costSaved}
                        </div>
                        <div className="text-[10px] text-[#AAB2C2] font-mono">
                          Per Flight
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Flight plan for ${currentRouteData.flight} auto-dispatched to ATC!`, 'success')}
                      className="savera-btn-gold py-2 text-xs w-full cursor-pointer"
                    >
                      Authorize Dispatch Telemetry
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-3">
              <p className="text-xs text-[#AAB2C2] m-0">
                All flights actively supervised under FlightRipple real-time route adjustment algorithms:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleOptimizedRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20 hover:border-[#E8C77E]/50 transition-all"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8C77E]/10">
                      <span className="font-mono font-bold text-white text-sm">
                        {route.flight} ({route.id})
                      </span>
                      <span className="text-xs font-bold text-[#91C98A] bg-[#91C98A]/10 px-2 py-0.5 rounded">
                        Saved: {route.costSaved}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-[#AAB2C2] space-y-1">
                      <div>
                        Corridor: <span className="text-white font-medium">{route.corridor}</span>
                      </div>
                      <div>
                        Altitude: <span className="text-[#72C4FF] font-mono">{route.altitudeProfile}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
                        <span className="text-[#E8C77E]">Fuel: -{route.fuelSavedKg}</span>
                        <span className="text-[#72C4FF]">Time: -{route.timeSavedMin}</span>
                        <span className="text-[#91C98A]">Eff: {route.efficiencyScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#080D1B] border border-[#E8C77E]/20">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    24-Hour Network Telemetry & Ripple Score
                  </span>
                  <span className="text-xs font-mono text-[#E8C77E]">
                    Real-Time Stream: 42 Aircraft
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
                  {flightRipple.timelineData.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#111A2D] border border-[#E8C77E]/15 text-center"
                    >
                      <div className="text-[11px] font-mono text-[#AAB2C2]">{t.time}</div>
                      <div className="text-base font-bold font-serif text-[#E8C77E] mt-1">
                        {t.rippleScore}
                      </div>
                      <div className="text-[9px] text-[#91C98A] font-mono">
                        +{t.delaysPrevented} averted
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8C77E]/20 bg-[#10182B] flex items-center justify-between text-xs text-[#AAB2C2]">
          <span>Proprietary SAVÉRA Aviation AI Engine • Patent Pending SVR-2026-RPL</span>
          <button
            onClick={() => setIsFlightRippleModalOpen(false)}
            className="savera-btn-secondary py-1.5 px-4 text-xs cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightRippleModal;
