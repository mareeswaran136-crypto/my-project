import React from 'react';
import {
  X,
  Plane,
  Clock,
  Compass,
  MapPin,
  Users,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Sparkles
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraFlightDetailModal = () => {
  const { selectedFlight, setSelectedFlight, updateFlightStatus, showToast } = useSavera();

  if (!selectedFlight) return null;

  const f = selectedFlight;
  const captainName = f.crew?.captain || f.captain || 'Capt. Rajesh Varma';
  const foName = f.crew?.firstOfficer || f.firstOfficer || 'FO Priya Sen';
  const loadFactor = f.capacity ? Math.round((f.passengers / f.capacity) * 100) : 92;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Flight':
      case 'En Route':
        return 'badge-enroute';
      case 'On Time':
      case 'Scheduled':
        return 'badge-ontime';
      case 'Delayed':
        return 'badge-delayed';
      case 'Boarding':
        return 'badge-boarding';
      default:
        return 'badge-scheduled';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#10182B] p-5 sm:p-6 border-b border-[#E8C77E]/20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8C77E] to-[#B28A3C] flex items-center justify-center text-[#080D1B] shadow-md">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-mono font-black text-white m-0">
                  {f.flightNumber}
                </h2>
                <span className={`badge-status text-[10px] ${getStatusBadge(f.status)}`}>
                  {f.status}
                </span>
              </div>
              <p className="text-xs text-[#AAB2C2] mt-0.5 m-0 font-mono">
                {f.aircraft || 'Airbus A350-900'} • ICAO: SVR
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFlight(null)}
            className="p-2 rounded-xl text-[#AAB2C2] hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Route Visualizer */}
          <div className="p-4 rounded-xl bg-[#080D1B] border border-[#E8C77E]/20 flex items-center justify-between">
            <div className="text-left">
              <div className="text-2xl font-black font-serif text-white">
                {f.originCode || f.origin.slice(0, 3).toUpperCase()}
              </div>
              <div className="text-xs font-semibold text-[#AAB2C2]">{f.origin}</div>
              <div className="text-xs font-mono text-[#E8C77E] mt-1">
                Dep: {f.departureTime || f.scheduledDeparture}
              </div>
            </div>

            <div className="flex-1 px-6 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-[#E8C77E] mb-1">
                ETA: {f.arrivalTime || f.eta || 'On Schedule'}
              </span>
              <div className="w-full relative flex items-center">
                <div className="w-full h-1.5 bg-[#16223B] rounded-full overflow-hidden border border-[#E8C77E]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#E8C77E] to-[#D8B66F] rounded-full transition-all duration-500"
                    style={{ width: `${f.progress || 65}%` }}
                  />
                </div>
                <Plane
                  className="w-4 h-4 text-[#E8C77E] absolute transform -rotate-45"
                  style={{ left: `calc(${f.progress || 65}% - 8px)` }}
                />
              </div>
              <span className="text-[10px] text-[#AAB2C2] mt-1 font-mono">
                Progress: {f.progress || 65}%
              </span>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black font-serif text-white">
                {f.destinationCode || f.destination.slice(0, 3).toUpperCase()}
              </div>
              <div className="text-xs font-semibold text-[#AAB2C2]">{f.destination}</div>
              <div className="text-xs font-mono text-[#E8C77E] mt-1">
                Arr: {f.arrivalTime || f.scheduledArrival || '10:45'}
              </div>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Altitude</div>
              <div className="text-base font-mono font-bold text-[#72C4FF] mt-1">
                {f.altitude || '36,000 ft'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Ground Speed</div>
              <div className="text-base font-mono font-bold text-white mt-1">
                {f.speed || '875 km/h'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Gate / Terminal</div>
              <div className="text-base font-mono font-bold text-[#E8C77E] mt-1">
                {f.gate || '18A'} / {f.terminal || 'T3'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
              <div className="text-[10px] text-[#AAB2C2] uppercase font-bold">Load Factor</div>
              <div className="text-base font-mono font-bold text-[#91C98A] mt-1">
                {loadFactor}%
              </div>
            </div>
          </div>

          {/* Assigned Crew Details */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
            <div className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-[#E8C77E]/10 flex items-center justify-between">
              <span>Cockpit & Cabin Crew Roster</span>
              <span className="text-[10px] font-mono text-[#91C98A]">Fit For Duty Verified</span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#AAB2C2]">Commander (Captain):</span>
                <p className="font-semibold text-white m-0">{captainName}</p>
              </div>
              <div>
                <span className="text-[#AAB2C2]">First Officer:</span>
                <p className="font-semibold text-white m-0">{foName}</p>
              </div>
              <div>
                <span className="text-[#AAB2C2]">Lead Cabin Attendant:</span>
                <p className="font-semibold text-white m-0">Ananya Roy</p>
              </div>
              <div>
                <span className="text-[#AAB2C2]">Total Cabin Attendants:</span>
                <p className="font-semibold text-white m-0">{f.crew?.crewCount || 8} Officers</p>
              </div>
            </div>
          </div>

          {/* Quick Status Override Actions */}
          <div className="p-4 rounded-xl bg-[#080D1B] border border-[#E8C77E]/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AAB2C2] block mb-2">
              OCC Dispatch Quick State Override
            </span>
            <div className="flex flex-wrap gap-2">
              {['En Route', 'On Time', 'Delayed', 'Boarding', 'Landed'].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    updateFlightStatus(f.id, st);
                    setSelectedFlight((prev) => (prev ? { ...prev, status: st } : null));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    f.status === st
                      ? 'bg-[#E8C77E] text-[#080D1B] font-bold shadow'
                      : 'bg-[#111A2D] text-[#AAB2C2] hover:text-white border border-[#E8C77E]/20 hover:border-[#E8C77E]'
                  }`}
                >
                  Set {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8C77E]/20 bg-[#10182B] flex items-center justify-between text-xs text-[#AAB2C2]">
          <span>SAVÉRA Operational Registry: SVR-OPS-CERT-2026</span>
          <button
            onClick={() => setSelectedFlight(null)}
            className="savera-btn-secondary py-1.5 px-4 text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveraFlightDetailModal;
