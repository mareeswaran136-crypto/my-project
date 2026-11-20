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
  ArrowRight
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const FlightDetailModal = () => {
  const { selectedFlight, setSelectedFlight, updateFlightStatus } = useSkyRoute();

  if (!selectedFlight) return null;

  const f = selectedFlight;
  const loadFactor = Math.round((f.passengers / f.capacity) * 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Time':
        return 'badge-on-time';
      case 'Boarding':
        return 'badge-boarding';
      case 'Delayed':
        return 'badge-delayed';
      case 'Departed':
        return 'badge-departed';
      case 'Landed':
        return 'badge-landed';
      default:
        return 'badge-scheduled';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFBF0] border border-[#EADBBE] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C1D36] text-[#FDF6E3] p-5 flex items-center justify-between border-b border-[#1B3E70]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E63B3] flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-mono tracking-wider">{f.flightNumber}</span>
                <span className="text-xs text-[#C5A059] font-medium tracking-wide">({f.airline})</span>
                <span className={`badge-status text-[10px] ml-2 ${getStatusBadge(f.status)}`}>
                  {f.status}
                </span>
              </div>
              <p className="text-xs text-[#8F8372]">
                Flight ID: {f.id} • {f.category} Route
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedFlight(null)}
            className="p-1.5 rounded-lg text-[#8F8372] hover:text-white hover:bg-[#132D52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Route Visualizer */}
          <div className="p-4 rounded-xl bg-[#FDF6E3] border border-[#EADBBE] flex items-center justify-between">
            <div className="text-left">
              <div className="text-2xl font-black font-mono text-[#0C1D36]">{f.originCode}</div>
              <div className="text-xs font-semibold text-[#8F8372]">{f.origin}</div>
              <div className="text-xs font-mono text-[#1E63B3] mt-1">Dep: {f.departureTime}</div>
            </div>

            <div className="flex-1 px-6 flex flex-col items-center">
              <span className="text-[11px] font-mono font-bold text-[#A9843F] mb-1">
                {f.distanceKm} km • {f.eta}
              </span>
              <div className="w-full relative flex items-center">
                <div className="w-full h-1.5 bg-[#EADBBE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1E63B3] rounded-full transition-all duration-500"
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
                <Plane
                  className="w-4 h-4 text-[#1E63B3] absolute"
                  style={{ left: `calc(${f.progress}% - 8px)` }}
                />
              </div>
              <span className="text-[10px] text-[#8F8372] mt-1">Flight Progress: {f.progress}%</span>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black font-mono text-[#0C1D36]">{f.destinationCode}</div>
              <div className="text-xs font-semibold text-[#8F8372]">{f.destination}</div>
              <div className="text-xs font-mono text-[#1E63B3] mt-1">Arr: {f.arrivalTime}</div>
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FFFBF0] border border-[#EADBBE] rounded-lg">
              <div className="text-[10px] text-[#8F8372] font-semibold uppercase tracking-wider">Altitude</div>
              <div className="text-sm font-bold font-mono text-[#0C1D36] mt-0.5">{f.altitude}</div>
            </div>
            <div className="p-3 bg-[#FFFBF0] border border-[#EADBBE] rounded-lg">
              <div className="text-[10px] text-[#8F8372] font-semibold uppercase tracking-wider">Ground Speed</div>
              <div className="text-sm font-bold font-mono text-[#0C1D36] mt-0.5">{f.speed}</div>
            </div>
            <div className="p-3 bg-[#FFFBF0] border border-[#EADBBE] rounded-lg">
              <div className="text-[10px] text-[#8F8372] font-semibold uppercase tracking-wider">Gate / Terminal</div>
              <div className="text-sm font-bold font-mono text-[#0C1D36] mt-0.5">
                {f.gate} ({f.terminal})
              </div>
            </div>
            <div className="p-3 bg-[#FFFBF0] border border-[#EADBBE] rounded-lg">
              <div className="text-[10px] text-[#8F8372] font-semibold uppercase tracking-wider">Aircraft Tail</div>
              <div className="text-sm font-bold font-mono text-[#1E63B3] mt-0.5">{f.aircraft}</div>
            </div>
          </div>

          {/* Details Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FDF6E3] border border-[#EADBBE] rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A9843F]">Crew & Aircraft</div>
              <div className="text-xs flex justify-between py-1 border-b border-[#EADBBE]">
                <span className="text-[#8F8372]">Commander:</span>
                <span className="font-semibold text-[#0C1D36]">{f.captain}</span>
              </div>
              <div className="text-xs flex justify-between py-1 border-b border-[#EADBBE]">
                <span className="text-[#8F8372]">Aircraft Type:</span>
                <span className="font-semibold text-[#0C1D36]">{f.aircraftModel}</span>
              </div>
              <div className="text-xs flex justify-between py-1">
                <span className="text-[#8F8372]">Service Type:</span>
                <span className="font-semibold text-[#0C1D36]">{f.category} Passenger</span>
              </div>
            </div>

            <div className="p-4 bg-[#FDF6E3] border border-[#EADBBE] rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A9843F]">Passenger Load</div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#EADBBE]">
                <span className="text-[#8F8372]">Booked / Capacity:</span>
                <span className="font-bold font-mono text-[#0C1D36]">
                  {f.passengers} / {f.capacity} seats
                </span>
              </div>
              <div className="py-1">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#8F8372]">Load Factor</span>
                  <span className="font-bold text-[#1E63B3]">{loadFactor}%</span>
                </div>
                <div className="w-full h-2 bg-[#EADBBE] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${loadFactor > 90 ? 'bg-emerald-500' : 'bg-[#1E63B3]'}`}
                    style={{ width: `${loadFactor}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Status Changers */}
          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#EADBBE]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0C1D36] mb-3">
              Operations Control: Override Flight Status
            </div>
            <div className="flex flex-wrap gap-2">
              {['Boarding', 'Departed', 'On Time', 'Delayed', 'Landed'].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    updateFlightStatus(f.id, st);
                    setSelectedFlight({ ...f, status: st });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    f.status === st
                      ? 'bg-[#0C1D36] text-[#FDF6E3] border-[#0C1D36] shadow-sm'
                      : 'bg-[#FDF6E3] hover:bg-[#EADBBE] text-[#0C1D36] border-[#EADBBE]'
                  }`}
                >
                  Mark {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FDF6E3] border-t border-[#EADBBE] flex justify-end">
          <button
            onClick={() => setSelectedFlight(null)}
            className="px-4 py-2 bg-[#0C1D36] hover:bg-[#132D52] text-white rounded-lg text-xs font-bold transition-colors"
          >
            Close Telemetry View
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailModal;
