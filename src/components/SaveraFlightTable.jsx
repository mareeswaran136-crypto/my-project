import React, { useState } from 'react';
import {
  Plane,
  Search,
  ArrowRight,
  Clock,
  Eye
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraFlightTable = ({ limit = null, showFilterBar = true }) => {
  const { flights, setSelectedFlight, globalSearch } = useSavera();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [localSearch, setLocalSearch] = useState('');

  const query = (localSearch || globalSearch || '').trim().toLowerCase();

  const filteredFlights = flights.filter(f => {
    if (query) {
      const match =
        f.flightNumber.toLowerCase().includes(query) ||
        f.origin.toLowerCase().includes(query) ||
        f.destination.toLowerCase().includes(query) ||
        f.aircraft.toLowerCase().includes(query) ||
        (f.crew?.captain && f.crew.captain.toLowerCase().includes(query));
      if (!match) return false;
    }

    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'EN_ROUTE') return f.status === 'En Route' || f.status === 'In Flight';
    if (statusFilter === 'ON_TIME') return f.status === 'On Time' || f.status === 'Scheduled';
    if (statusFilter === 'DELAYED') return f.status === 'Delayed';
    if (statusFilter === 'BOARDING') return f.status === 'Boarding';

    return true;
  });

  const displayList = limit ? filteredFlights.slice(0, limit) : filteredFlights;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Flight':
      case 'En Route':
        return (
          <span className="badge-status badge-enroute">
            <span className="w-1.5 h-1.5 rounded-full bg-[#69C0FF] animate-pulse" />
            En Route
          </span>
        );
      case 'On Time':
      case 'Scheduled':
        return (
          <span className="badge-status badge-ontime">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82D197]" />
            On Time
          </span>
        );
      case 'Delayed':
        return (
          <span className="badge-status badge-delayed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87474]" />
            Delayed
          </span>
        );
      case 'Boarding':
        return (
          <span className="badge-status badge-boarding">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ECC168]" />
            Boarding
          </span>
        );
      case 'Landed':
        return (
          <span className="badge-status badge-ontime">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82D197]" />
            Landed
          </span>
        );
      default:
        return (
          <span className="badge-status badge-scheduled">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9EABBE]" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="savera-card overflow-hidden">
      {/* Top Filter and Search Bar */}
      {showFilterBar && (
        <div className="p-4 sm:p-5 border-b border-[#E8C77E]/18 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0D1426]/75">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#E8C77E]" />
            <h3 className="text-base font-bold text-[#F8F6F0] m-0">
              Live Flight Operations
            </h3>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#E8C77E]/18 text-[#F7E5B5] border border-[#E8C77E]/30">
              {displayList.length} flights showing
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Status Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-[#070B18] border border-[#E8C77E]/20 text-xs">
              {[
                { id: 'ALL', label: 'All Flights' },
                { id: 'EN_ROUTE', label: 'En Route' },
                { id: 'ON_TIME', label: 'On Time' },
                { id: 'DELAYED', label: 'Delayed' },
                { id: 'BOARDING', label: 'Boarding' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all text-xs cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-gradient-to-r from-[#F7E5B5] to-[#E8C77E] text-[#070B18] font-bold shadow-md'
                      : 'text-[#9EABBE] hover:text-[#F8F6F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* In-table search input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#9EABBE] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search table..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#070B18] border border-[#E8C77E]/20 rounded-xl text-xs text-[#F8F6F0] placeholder-[#9EABBE]/60 focus:outline-none focus:border-[#E8C77E]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8C77E]/18 bg-[#090E1C] text-[11px] font-bold uppercase tracking-wider text-[#9EABBE]">
              <th className="py-3.5 px-4 sm:px-6">Flight Number</th>
              <th className="py-3.5 px-4 sm:px-6">Route</th>
              <th className="py-3.5 px-4 sm:px-6">Status</th>
              <th className="py-3.5 px-4 sm:px-6">Crew</th>
              <th className="py-3.5 px-4 sm:px-6">ETA / Sched</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8C77E]/10 text-xs">
            {displayList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-[#9EABBE]">
                  No flight records match your query or filter criteria.
                </td>
              </tr>
            ) : (
              displayList.map((f) => {
                const captainName = f.crew?.captain || f.captain || 'Capt. Assigned';
                const foName = f.crew?.firstOfficer || f.firstOfficer || 'FO Assigned';
                const etaTime = f.arrivalTime || f.eta || '12:00 IST';
                const aircraftLabel = f.aircraft || 'Airbus A350';

                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFlight(f)}
                    className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  >
                    {/* Flight Number & Aircraft */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/12 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E] group-hover:border-[#E8C77E] transition-colors shadow-xs">
                          <Plane className="w-4 h-4 transform -rotate-45" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-sm text-[#F8F6F0] group-hover:text-[#F7E5B5] transition-colors">
                            {f.flightNumber}
                          </span>
                          <p className="text-[10px] text-[#9EABBE] m-0 font-mono">
                            {aircraftLabel} • {f.gate || 'Gate 14'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 font-bold text-[#F8F6F0]">
                        <span>{f.origin}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E8C77E]" />
                        <span>{f.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#9EABBE] font-mono mt-0.5 font-medium">
                        <span>Dep: {f.departureTime || f.scheduledDeparture}</span>
                        <span>•</span>
                        <span>{f.altitude || '36,000 ft'}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      {getStatusBadge(f.status)}
                    </td>

                    {/* Crew Assigned */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#15223E] border border-[#E8C77E]/30 flex items-center justify-center text-[10px] font-bold text-[#F7E5B5]">
                          CP
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#F8F6F0] truncate max-w-[140px] m-0">
                            {captainName}
                          </p>
                          <p className="text-[10px] text-[#9EABBE] truncate max-w-[140px] m-0">
                            FO: {foName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="font-mono font-bold text-[#F8F6F0] text-xs">
                        {etaTime}
                      </div>
                      <div className="text-[10px] text-[#82D197] font-mono font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>On Schedule</span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFlight(f);
                        }}
                        className="savera-btn-secondary py-1.5 px-3 text-xs rounded-lg group-hover:border-[#E8C77E] group-hover:text-[#F7E5B5] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-[#E8C77E]/15 bg-[#090E1C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9EABBE] gap-2">
        <span>
          Displaying {displayList.length} of {flights.length} active operational aircraft records
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#F7E5B5] font-semibold">
          <span>Airspace Radar Sync: ACTIVE</span>
          <span>•</span>
          <span>ICAO: SVR</span>
        </div>
      </div>
    </div>
  );
};

export default SaveraFlightTable;
