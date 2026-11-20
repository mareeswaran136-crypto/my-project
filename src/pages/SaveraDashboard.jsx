import React from 'react';
import SaveraKpiCards from '../components/SaveraKpiCards';
import SaveraFlightRipple from '../components/SaveraFlightRipple';
import SaveraFlightTable from '../components/SaveraFlightTable';
import {
  Compass,
  Radio,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plane,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import { useNavigate } from 'react-router-dom';

const SaveraDashboard = () => {
  const { stats, brand, flightRipple, setIsFlightRippleModalOpen } = useSavera();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome / Status Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#10182B] via-[#111A2D] to-[#15233E] border border-[#E8C77E]/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8C77E] to-[#B28A3C] p-[1.5px] shadow-lg shadow-[#E8C77E]/20 shrink-0">
            <div className="w-full h-full bg-[#10182B] rounded-[10px] flex items-center justify-center text-[#E8C77E]">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif tracking-widest text-white text-lg font-black">
                SAVÉRA OPERATIONS DISPATCH
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8C77E]/15 text-[#E8C77E] border border-[#E8C77E]/30 font-mono">
                INTERNATIONAL AIRWAYS
              </span>
              <span className="text-xs text-[#91C98A] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#91C98A] animate-pulse" />
                Airspace Fleet Status: Nominal
              </span>
            </div>
            <p className="text-xs text-[#AAB2C2] mt-1 m-0">
              Coordinating Delhi (DEL) & Mumbai (BOM) international corridors with automated FlightRipple™ AI telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/flights')}
            className="savera-btn-secondary py-2 px-3.5 text-xs cursor-pointer"
          >
            Schedule Board
          </button>
          <button
            onClick={() => navigate('/operations')}
            className="savera-btn-gold py-2 px-4 text-xs cursor-pointer shadow-md"
          >
            Live Radar & Alerts
          </button>
        </div>
      </div>

      {/* 1. Four Main KPI Cards */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#AAB2C2] m-0">
            Key Operational Performance Indicators
          </h2>
          <span className="text-[11px] text-[#E8C77E] font-mono">
            Sample Live Operational Telemetry
          </span>
        </div>
        <SaveraKpiCards />
      </section>

      {/* 2. Signature Feature: FlightRipple Route Optimization */}
      <section>
        <SaveraFlightRipple />
      </section>

      {/* 3. Live Flight Operations Table */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#AAB2C2] m-0">
              Active Network Flights
            </h2>
            <p className="text-[11px] text-[#AAB2C2]/70 m-0">
              Real-time gate departures, en-route airway vectoring, and landing sequencing.
            </p>
          </div>
          <button
            onClick={() => navigate('/flights')}
            className="text-xs font-semibold text-[#E8C77E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Flight Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <SaveraFlightTable limit={8} showFilterBar={true} />
      </section>

      {/* 4. Operations Overview Mini Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* On-Time Performance Summary */}
        <div className="savera-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AAB2C2]">
              On-Time Performance Index
            </span>
            <span className="text-xs font-mono font-bold text-[#91C98A]">94.8% OTP</span>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">Domestic Corridors</span>
                <span className="font-mono text-[#E8C77E]">96.2%</span>
              </div>
              <div className="w-full h-1.5 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8C77E] rounded-full" style={{ width: '96.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">International Long-Haul</span>
                <span className="font-mono text-[#72C4FF]">93.4%</span>
              </div>
              <div className="w-full h-1.5 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#72C4FF] rounded-full" style={{ width: '93.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">Turnaround Dispatch Efficiency</span>
                <span className="font-mono text-[#91C98A]">94.8%</span>
              </div>
              <div className="w-full h-1.5 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#91C98A] rounded-full" style={{ width: '94.8%' }} />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E8C77E]/10 flex items-center justify-between text-[11px] text-[#AAB2C2]">
            <span>Target Benchmark: &gt;92.0%</span>
            <span className="text-[#91C98A] font-semibold">+2.8% Delta</span>
          </div>
        </div>

        {/* Fleet Readiness */}
        <div className="savera-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AAB2C2]">
              Fleet Readiness Summary
            </span>
            <span className="text-xs font-mono font-bold text-[#E8C77E]">28/32 Active</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Airbus A350</div>
              <div className="text-lg font-bold font-serif text-[#E8C77E] mt-1">10 / 10</div>
              <div className="text-[9px] text-[#91C98A]">100% In Service</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Boeing 787-9</div>
              <div className="text-lg font-bold font-serif text-white mt-1">8 / 8</div>
              <div className="text-[9px] text-[#91C98A]">100% In Service</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Airbus A321neo</div>
              <div className="text-lg font-bold font-serif text-white mt-1">10 / 12</div>
              <div className="text-[9px] text-[#E8B75F]">2 in Hangar</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Standby Reserves</div>
              <div className="text-lg font-bold font-serif text-[#72C4FF] mt-1">1 Aircraft</div>
              <div className="text-[9px] text-[#72C4FF]">Hot Standby DEL</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E8C77E]/10 flex items-center justify-between text-[11px] text-[#AAB2C2]">
            <span>Maintenance Schedule</span>
            <button
              onClick={() => navigate('/maintenance')}
              className="text-[#E8C77E] font-semibold hover:underline"
            >
              View Logs
            </button>
          </div>
        </div>

        {/* Crew On-Duty Quick Telemetry */}
        <div className="savera-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AAB2C2]">
              Crew Rosters & Rest Periods
            </span>
            <span className="text-xs font-mono font-bold text-[#72C4FF]">184 On Duty</span>
          </div>
          <div className="mt-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
              <span className="text-white">Captains Assigned</span>
              <span className="font-mono font-bold text-[#E8C77E]">42 Active</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
              <span className="text-white">First Officers Assigned</span>
              <span className="font-mono font-bold text-white">46 Active</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
              <span className="text-white">Cabin Crew Active Rosters</span>
              <span className="font-mono font-bold text-white">96 Active</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#080D1B] border border-[#E8C77E]/10">
              <span className="text-white">Airport Standby Crew</span>
              <span className="font-mono font-bold text-[#91C98A]">16 Ready</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E8C77E]/10 flex items-center justify-between text-[11px] text-[#AAB2C2]">
            <span>DGCA / FAA Rest Compliance</span>
            <span className="text-[#91C98A] font-semibold">100% Compliant</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaveraDashboard;
