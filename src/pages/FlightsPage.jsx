import React, { useState } from 'react';
import {
  Plane,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Clock,
  Compass,
  MapPin,
  Users,
  Grid,
  List,
  Trash2,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const FlightsPage = () => {
  const {
    flights,
    setSelectedFlight,
    setIsNewFlightModalOpen,
    updateFlightStatus,
    deleteFlight,
    searchQuery,
    setSearchQuery
  } = useSkyRoute();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const filteredFlights = flights.filter(f => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        f.flightNumber.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q) ||
        f.originCode.toLowerCase().includes(q) ||
        f.destination.toLowerCase().includes(q) ||
        f.destinationCode.toLowerCase().includes(q) ||
        f.captain.toLowerCase().includes(q) ||
        f.aircraft.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'ALL' && f.status.toUpperCase() !== statusFilter) {
      return false;
    }

    if (categoryFilter !== 'ALL' && f.category.toUpperCase() !== categoryFilter) {
      return false;
    }

    return true;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Flight Operations Control</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Manage scheduled departures, airborne routes, gate allocation, and passenger manifests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#FDF6E3] p-1 rounded-lg border border-[#EADBBE]">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-[#0C1D36] text-white' : 'text-[#8F8372] hover:text-[#0C1D36]'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-[#0C1D36] text-white' : 'text-[#8F8372] hover:text-[#0C1D36]'
              }`}
              title="Grid Card View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsNewFlightModalOpen(true)}
            className="sky-btn-primary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Flight</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sky-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8F8372] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flight, route, aircraft, pilot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-[#8F8372]">Category:</span>
            <div className="flex gap-1">
              {['ALL', 'DOMESTIC', 'INTERNATIONAL'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#0C1D36] text-white'
                      : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                  }`}
                >
                  {cat === 'ALL' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#EADBBE]/60">
          <span className="text-xs font-bold text-[#8F8372] mr-1">Status:</span>
          {['ALL', 'ON TIME', 'BOARDING', 'DELAYED', 'DEPARTED', 'LANDED', 'SCHEDULED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#1E63B3] text-white shadow-xs'
                  : 'bg-[#FDF6E3] hover:bg-[#FAF4E5] text-[#0C1D36] border border-[#EADBBE]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <div className="sky-card p-5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EADBBE] text-[#8F8372] uppercase font-mono tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Flight / Brand</th>
                  <th className="py-2.5 px-3">Route & Sector</th>
                  <th className="py-2.5 px-3">STD / STA</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Aircraft</th>
                  <th className="py-2.5 px-3">Gate & Terminal</th>
                  <th className="py-2.5 px-3">Commander</th>
                  <th className="py-2.5 px-3">Pax Load</th>
                  <th className="py-2.5 px-3 text-right">Quick Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBBE]/70">
                {filteredFlights.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-[#8F8372]">
                      No flights matching filter.
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
                          <span className="font-mono">{flight.originCode}</span>
                          <ArrowRight className="w-3 h-3 text-[#1E63B3]" />
                          <span className="font-mono">{flight.destinationCode}</span>
                        </div>
                        <div className="text-[10px] text-[#8F8372]">
                          {flight.origin} ➔ {flight.destination}
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono">
                        <div className="font-bold text-[#0C1D36]">{flight.departureTime}</div>
                        <div className="text-[10px] text-[#8F8372]">Arr: {flight.arrivalTime}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`badge-status ${getStatusBadge(flight.status)}`}>
                          {flight.status}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-[#1E63B3]">{flight.aircraft}</div>
                        <div className="text-[10px] text-[#8F8372]">{flight.aircraftModel}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0C1D36]">Gate {flight.gate}</div>
                        <div className="text-[10px] text-[#8F8372]">{flight.terminal}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-[#0C1D36]">{flight.captain}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-[#0C1D36]">
                          {flight.passengers} / {flight.capacity}
                        </div>
                        <div className="text-[10px] text-[#8F8372]">
                          {Math.round((flight.passengers / flight.capacity) * 100)}% load
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <select
                            value={flight.status}
                            onChange={(e) => updateFlightStatus(flight.id, e.target.value)}
                            className="bg-[#FDF6E3] border border-[#EADBBE] rounded px-2 py-1 text-xs font-semibold text-[#0C1D36] focus:outline-none"
                          >
                            <option value="On Time">On Time</option>
                            <option value="Boarding">Boarding</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Departed">Departed</option>
                            <option value="Landed">Landed</option>
                            <option value="Scheduled">Scheduled</option>
                          </select>

                          <button
                            onClick={() => deleteFlight(flight.id)}
                            className="p-1 text-[#8F8372] hover:text-red-600 transition-colors"
                            title="Delete flight"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              onClick={() => setSelectedFlight(flight)}
              className="sky-card p-5 cursor-pointer hover:border-[#1E63B3] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#EADBBE]">
                  <div>
                    <div className="text-lg font-black font-mono text-[#0C1D36]">
                      {flight.flightNumber}
                    </div>
                    <div className="text-xs text-[#8F8372]">{flight.airline}</div>
                  </div>
                  <span className={`badge-status ${getStatusBadge(flight.status)}`}>
                    {flight.status}
                  </span>
                </div>

                {/* Route */}
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black font-mono text-[#0C1D36]">
                      {flight.originCode}
                    </div>
                    <div className="text-xs text-[#8F8372]">{flight.origin}</div>
                    <div className="text-xs font-mono font-bold text-[#1E63B3] mt-1">
                      {flight.departureTime}
                    </div>
                  </div>

                  <div className="flex-1 px-4 flex flex-col items-center">
                    <span className="text-[10px] text-[#A9843F] font-mono">{flight.distanceKm} km</span>
                    <div className="w-full h-1 bg-[#EADBBE] rounded-full my-1 relative">
                      <div
                        className="h-full bg-[#1E63B3] rounded-full"
                        style={{ width: `${flight.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#8F8372]">{flight.eta}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-[#0C1D36]">
                      {flight.destinationCode}
                    </div>
                    <div className="text-xs text-[#8F8372]">{flight.destination}</div>
                    <div className="text-xs font-mono font-bold text-[#1E63B3] mt-1">
                      {flight.arrivalTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#FDF6E3] border border-[#EADBBE] text-xs">
                  <div>
                    <span className="text-[#8F8372]">Aircraft: </span>
                    <strong className="font-mono text-[#1E63B3]">{flight.aircraft}</strong>
                  </div>
                  <div>
                    <span className="text-[#8F8372]">Gate: </span>
                    <strong className="text-[#0C1D36]">{flight.gate} ({flight.terminal})</strong>
                  </div>
                  <div className="col-span-2 truncate">
                    <span className="text-[#8F8372]">Capt: </span>
                    <strong className="text-[#0C1D36]">{flight.captain}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EADBBE] flex items-center justify-between text-xs">
                <span className="text-[#8F8372]">
                  Load: <strong>{flight.passengers}/{flight.capacity}</strong>
                </span>
                <span className="text-[#1E63B3] font-bold flex items-center gap-1 hover:underline">
                  Telemetry <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightsPage;
