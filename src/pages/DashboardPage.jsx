import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  Plus,
  Wrench,
  ChevronRight,
  ShieldAlert,
  Search,
  Sparkles
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';
import RadarScreen from '../components/RadarScreen';

const DashboardPage = () => {
  const {
    stats,
    flights,
    hourlyActivity,
    setSelectedFlight,
    setIsNewFlightModalOpen,
    setIsMaintenanceModalOpen,
    notifications,
    searchQuery
  } = useSkyRoute();

  const [flightFilter, setFlightFilter] = useState('ALL');

  const filteredFlights = flights.filter(f => {
    // Match search query if present
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchQuery =
        f.flightNumber.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q) ||
        f.destination.toLowerCase().includes(q) ||
        f.captain.toLowerCase().includes(q) ||
        f.aircraft.toLowerCase().includes(q);
      if (!matchQuery) return false;
    }

    if (flightFilter === 'ALL') return true;
    return f.status.toUpperCase() === flightFilter;
  });

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
    <div className="space-y-6">
      {/* SAVÉRA AeroSync Luxury Operations Portal Quick Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#070F1E] via-[#0C1A32] to-[#142646] border-2 border-[#C5A059] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ECC880] to-[#C5A059] flex items-center justify-center text-[#070F1E] shadow-lg shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif font-black tracking-widest text-[#FFF1CE] text-base">SAVÉRA</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C5A059]/20 text-[#ECC880] border border-[#C5A059]/40 font-mono">
                AeroSync OCC
              </span>
              <span className="text-xs text-emerald-400 font-semibold">• Live Admin Operations Dashboard</span>
            </div>
            <p className="text-xs text-[#D9C8A5] mt-1 m-0">
              Luxury dark navy & champagne gold airline operations dashboard with FlightRipple™ AI telemetry.
            </p>
          </div>
        </div>

        <Link
          to="/admin"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ECC880] via-[#C5A059] to-[#9E7832] hover:from-[#F5D48E] hover:to-[#B58E38] text-[#070F1E] font-extrabold text-xs tracking-wider uppercase shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2 border border-[#FFE4A0] shrink-0"
        >
          <span>Open SAVÉRA Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0C1D36] via-[#132D52] to-[#1B3E70] text-[#FDF6E3] shadow-lg border border-[#1B3E70]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 live-indicator" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
              Network Operations Control • MAA Central
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">SkyRoute Operations Command</h1>
          <p className="text-xs sm:text-sm text-[#D9C8A5] mt-0.5">
            Real-time telemetry, airspace coordination, fleet airworthiness, and crew dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsNewFlightModalOpen(true)}
            className="sky-btn-gold text-xs shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Dispatch Flight</span>
          </button>
          <button
            onClick={() => setIsMaintenanceModalOpen(true)}
            className="px-3 py-2 rounded-lg bg-[#1B3E70] hover:bg-[#234E8C] text-xs font-bold text-white transition-colors border border-[#307BD8]/50 flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Log AOG / Work Order</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Flights */}
        <div className="sky-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F8372]">Daily Flights</span>
            <div className="w-8 h-8 rounded-lg bg-[#E9F1FA] text-[#1E63B3] flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[#0C1D36]">{stats.totalFlights}</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12% today
            </span>
          </div>
          <div className="mt-2 text-xs text-[#8F8372] flex items-center justify-between">
            <span>On-Time Rate:</span>
            <span className="font-bold text-[#1E63B3] font-mono">{stats.onTimeRate}%</span>
          </div>
        </div>

        {/* Airborne Targets */}
        <div className="sky-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F8372]">Airborne Radar</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-cyan-700">{stats.airborneFlights}</span>
            <span className="text-xs text-cyan-600 font-mono font-semibold">In Enroute Cruise</span>
          </div>
          <div className="mt-2 text-xs text-[#8F8372] flex items-center justify-between">
            <span>Avg Ground Speed:</span>
            <span className="font-bold text-[#0C1D36] font-mono">{stats.avgAirSpeed} km/h</span>
          </div>
        </div>

        {/* Active Fleet */}
        <div className="sky-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F8372]">Fleet Available</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[#0C1D36]">{stats.activeAircraft}</span>
            <span className="text-xs text-[#8F8372] font-mono">/ {stats.totalFleet} Total</span>
          </div>
          <div className="mt-2 text-xs text-[#8F8372] flex items-center justify-between">
            <span>Utilization Rate:</span>
            <span className="font-bold text-emerald-700 font-mono">
              {Math.round((stats.activeAircraft / stats.totalFleet) * 100)}%
            </span>
          </div>
        </div>

        {/* Maintenance / AOG */}
        <div className="sky-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F8372]">Maintenance Bay</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-800">{stats.pendingMaintenance}</span>
            <span className="text-xs text-red-600 font-semibold font-mono">1 Critical (AOG)</span>
          </div>
          <div className="mt-2 text-xs text-[#8F8372] flex items-center justify-between">
            <span>Hangars Active:</span>
            <span className="font-bold text-[#0C1D36] font-mono">Hangar 1 & 2</span>
          </div>
        </div>
      </div>

      {/* Main Operations Radar & Hourly Traffic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Airborne Radar Section */}
        <div className="lg:col-span-2 sky-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#1E63B3]" />
              <div>
                <h3 className="text-base font-bold text-[#0C1D36]">Live Primary Airspace Radar</h3>
                <p className="text-xs text-[#8F8372]">Live transponder positions across South Asia & Middle East routes</p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-[#E9F1FA] text-[#1E63B3] rounded-lg border border-[#C6DCF3]">
              360° Sweep Active
            </span>
          </div>

          <RadarScreen height="440px" showControls={true} />
        </div>

        {/* Hourly Flights Activity & Alerts */}
        <div className="space-y-6">
          {/* Hourly Flight Volume Chart */}
          <div className="sky-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0C1D36]">Hourly Flight Volume</h3>
              <span className="text-[11px] font-mono text-[#8F8372]">2-hr intervals</span>
            </div>

            {/* Custom SVG / CSS Bar Chart */}
            <div className="space-y-2.5">
              {hourlyActivity.slice(0, 6).map((item) => {
                const maxFlights = 50;
                const pct = Math.round((item.flights / maxFlights) * 100);
                return (
                  <div key={item.hour} className="text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-semibold text-[#0C1D36]">{item.hour}</span>
                      <span className="font-mono text-[#8F8372]">
                        <strong className="text-[#1E63B3]">{item.flights} flights</strong> ({item.onTimePercent}% on-time)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#EADBBE]/50 rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#1E63B3] h-full rounded-l-full transition-all duration-300"
                        style={{ width: `${pct * 0.6}%` }}
                        title={`${item.departures} Departures`}
                      />
                      <div
                        className="bg-[#C5A059] h-full rounded-r-full transition-all duration-300"
                        style={{ width: `${pct * 0.4}%` }}
                        title={`${item.arrivals} Arrivals`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EADBBE] text-[11px] text-[#8F8372]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#1E63B3]" />
                <span>Departures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#C5A059]" />
                <span>Arrivals</span>
              </div>
              <span className="font-mono font-bold text-[#0C1D36]">Peak: 14:00 (48 Flts)</span>
            </div>
          </div>

          {/* Urgent NOC Advisories Card */}
          <div className="sky-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-[#0C1D36]">NOC Operations Stream</h3>
              </div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-100 px-2 py-0.5 rounded-full">
                Live Broadcast
              </span>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="p-2.5 rounded-lg bg-[#FDF6E3] border border-[#EADBBE] text-xs">
                  <div className="flex items-center justify-between font-bold text-[#0C1D36]">
                    <span className="truncate">{notif.title}</span>
                    <span className="text-[10px] font-mono text-[#A9843F] shrink-0 ml-1">{notif.timestamp}</span>
                  </div>
                  <p className="text-[#8F8372] mt-1 text-[11px] line-clamp-2">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Flights Live Dispatch Board */}
      <div className="sky-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
          <div>
            <h3 className="text-base font-bold text-[#0C1D36]">Real-Time Flight Dispatch Board</h3>
            <p className="text-xs text-[#8F8372]">Active sectors, assigned equipment, commander, and gate status</p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'ON TIME', 'BOARDING', 'DELAYED', 'DEPARTED', 'LANDED'].map((st) => (
              <button
                key={st}
                onClick={() => setFlightFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  flightFilter === st
                    ? 'bg-[#1E63B3] text-white shadow-xs'
                    : 'bg-[#FDF6E3] hover:bg-[#FAF4E5] text-[#0C1D36] border border-[#EADBBE]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Flight Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EADBBE] text-[#8F8372] uppercase font-mono tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Flight / Airline</th>
                <th className="py-2.5 px-3">Route Sector</th>
                <th className="py-2.5 px-3">STD / STA</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Aircraft / Gate</th>
                <th className="py-2.5 px-3">Commander</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBBE]/70">
              {filteredFlights.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8F8372]">
                    No flights match the current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredFlights.map((flight) => (
                  <tr
                    key={flight.id}
                    onClick={() => setSelectedFlight(flight)}
                    className="hover:bg-[#FAF4E5] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="font-extrabold font-mono text-[#0C1D36] text-sm">
                        {flight.flightNumber}
                      </div>
                      <div className="text-[11px] text-[#8F8372]">{flight.airline}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-bold text-[#0C1D36]">
                        <span>{flight.originCode}</span>
                        <ArrowRight className="w-3 h-3 text-[#1E63B3]" />
                        <span>{flight.destinationCode}</span>
                      </div>
                      <div className="text-[10px] text-[#8F8372]">
                        {flight.origin} to {flight.destination}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <div className="font-semibold text-[#0C1D36]">{flight.departureTime}</div>
                      <div className="text-[10px] text-[#8F8372]">Arr: {flight.arrivalTime}</div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`badge-status ${getStatusBadge(flight.status)}`}>
                        {flight.status}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#1E63B3]">{flight.aircraft}</div>
                      <div className="text-[10px] text-[#8F8372]">
                        Gate {flight.gate} • {flight.terminal}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-medium text-[#0C1D36]">{flight.captain}</div>
                      <div className="text-[10px] text-[#8F8372]">
                        {flight.passengers} / {flight.capacity} pax
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFlight(flight);
                        }}
                        className="p-1.5 rounded-lg bg-[#E9F1FA] text-[#1E63B3] hover:bg-[#1E63B3] hover:text-white transition-colors"
                        title="View Telemetry"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
