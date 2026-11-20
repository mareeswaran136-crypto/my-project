import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Plane,
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraFleetPage = () => {
  const { fleet, showToast } = useSavera();
  const [modelFilter, setModelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  const filteredFleet = fleet.filter(a => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        a.tailNumber.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        (a.assignedRoute && a.assignedRoute.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (modelFilter !== 'ALL' && !a.model.includes(modelFilter)) return false;
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Fleet Management & Aircraft Status
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Aircraft registration, airframe cycle hours, avionics health, seat configurations and maintenance readiness.
          </p>
        </div>

        {/* Fleet Utilization Metric */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#10182B] border border-[#E8C77E]/20 text-xs">
            <span className="text-[#AAB2C2]">Utilization: </span>
            <strong className="text-[#91C98A] font-mono">87.5% Active</strong>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#10182B] border border-[#E8C77E]/20 text-xs">
            <span className="text-[#AAB2C2]">Fleet Frames: </span>
            <strong className="text-[#E8C77E] font-mono">32 Aircraft</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
        <div className="flex flex-wrap items-center gap-2">
          {/* Model Filter */}
          <div className="flex items-center p-1 rounded-lg bg-[#080D1B] border border-[#E8C77E]/15 text-xs">
            {['ALL', 'A350', 'B787', 'A321'].map(m => (
              <button
                key={m}
                onClick={() => setModelFilter(m)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  modelFilter === m
                    ? 'bg-[#E8C77E] text-[#080D1B] font-bold'
                    : 'text-[#AAB2C2] hover:text-white'
                }`}
              >
                {m === 'ALL' ? 'All Models' : m}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center p-1 rounded-lg bg-[#080D1B] border border-[#E8C77E]/15 text-xs">
            {['ALL', 'Active', 'In Maintenance', 'Standby'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  statusFilter === s
                    ? 'bg-[#E8C77E] text-[#080D1B] font-bold'
                    : 'text-[#AAB2C2] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tail VT-..., model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#080D1B] border border-[#E8C77E]/20 rounded-xl text-xs text-white placeholder-[#AAB2C2]/60 focus:outline-none focus:border-[#E8C77E]"
          />
        </div>
      </div>

      {/* Fleet Table */}
      <div className="savera-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8C77E]/15 bg-[#0C1424] text-[11px] font-bold uppercase tracking-wider text-[#AAB2C2]">
                <th className="py-3.5 px-4 sm:px-6">Aircraft Registration</th>
                <th className="py-3.5 px-4 sm:px-6">Model & Engine</th>
                <th className="py-3.5 px-4 sm:px-6">Capacity (Suites / Bus / Econ)</th>
                <th className="py-3.5 px-4 sm:px-6">Availability Status</th>
                <th className="py-3.5 px-4 sm:px-6">Maintenance Status</th>
                <th className="py-3.5 px-4 sm:px-6">Assigned Sector</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8C77E]/10 text-xs">
              {filteredFleet.map((a) => (
                <tr
                  key={a.tailNumber}
                  onClick={() => setSelectedAircraft(a)}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  {/* Tail Number */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
                        <Plane className="w-4 h-4 transform -rotate-45" />
                      </div>
                      <div>
                        <span className="font-mono font-black text-sm text-white group-hover:text-[#E8C77E] transition-colors">
                          {a.tailNumber}
                        </span>
                        <p className="text-[10px] text-[#AAB2C2] m-0">
                          MSN: {a.msn || '4029'} • Del: 2024
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Model */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-bold text-white">{a.model}</div>
                    <div className="text-[10px] text-[#AAB2C2] font-mono">
                      Engines: {a.engines || 'Rolls-Royce Trent XWB'}
                    </div>
                  </td>

                  {/* Capacity */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="font-mono font-bold text-white">
                      {a.capacity || '310'} seats
                    </span>
                    <p className="text-[10px] text-[#E8C77E] m-0 font-mono">
                      {a.configuration || '12 First • 42 Biz • 256 Econ'}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    {a.status === 'Active' ? (
                      <span className="badge-status badge-ontime">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#91C98A]" />
                        Active In-Service
                      </span>
                    ) : a.status === 'In Maintenance' ? (
                      <span className="badge-status badge-delayed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E26D6D]" />
                        In Maintenance
                      </span>
                    ) : (
                      <span className="badge-status badge-boarding">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8B75F]" />
                        Standby Reserve
                      </span>
                    )}
                  </td>

                  {/* Maintenance Status */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="text-white font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#91C98A]" />
                      <span>{a.maintenanceStatus || 'A-Check Cleared'}</span>
                    </div>
                    <div className="text-[10px] text-[#AAB2C2] font-mono">
                      Next check: {a.nextCheck || '14 Days (DEL Hangar)'}
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-white">
                    {a.assignedRoute || 'DEL ➔ BOM (SV 302)'}
                  </td>

                  {/* Details Button */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAircraft(a);
                      }}
                      className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer group-hover:border-[#E8C77E]"
                    >
                      Specifications
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aircraft Details Modal */}
      {selectedAircraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8C77E]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8C77E]/10 border border-[#E8C77E]/30 flex items-center justify-center text-[#E8C77E]">
                  <Plane className="w-5 h-5 transform -rotate-45" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-mono text-white m-0">
                    {selectedAircraft.tailNumber}
                  </h3>
                  <p className="text-xs text-[#E8C77E] m-0 font-medium">
                    {selectedAircraft.model} • MSN {selectedAircraft.msn || '4029'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAircraft(null)}
                className="p-1.5 rounded-lg text-[#AAB2C2] hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
                <div>
                  <span className="text-[#AAB2C2]">Powerplant:</span>
                  <p className="font-semibold text-white mt-0.5 m-0">
                    {selectedAircraft.engines || 'Rolls-Royce Trent XWB-84'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Total Airframe Hours:</span>
                  <p className="font-mono font-bold text-[#E8C77E] mt-0.5 m-0">
                    {selectedAircraft.flightHours || '3,480 hrs / 820 cycles'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Cabin Configuration:</span>
                  <p className="font-semibold text-white mt-0.5 m-0">
                    {selectedAircraft.configuration || '12 Suites • 42 Biz • 256 Econ'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Avionics Standard:</span>
                  <p className="font-mono text-[#91C98A] mt-0.5 m-0">
                    ADS-B Out, CPDLC, FANS-1/A+
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[#AAB2C2]">Maintenance Status & Airworthiness:</span>
                <p className="text-white mt-0.5 m-0">
                  {selectedAircraft.maintenanceStatus || 'A-Check Passed. All Airworthiness Directives (ADs) complied with.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8C77E]/20 flex items-center justify-between">
              <button
                onClick={() => {
                  showToast(`Maintenance log requested for airframe ${selectedAircraft.tailNumber}`, 'gold');
                  setSelectedAircraft(null);
                }}
                className="savera-btn-gold py-1.5 px-3 text-xs cursor-pointer"
              >
                Request Hangar Telemetry
              </button>
              <button
                onClick={() => setSelectedAircraft(null)}
                className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveraFleetPage;
