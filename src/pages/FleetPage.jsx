import React, { useState } from 'react';
import {
  Layers,
  Fuel,
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Compass,
  Plane
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const FleetPage = () => {
  const { fleet, updateFleetStatus, setIsMaintenanceModalOpen } = useSkyRoute();
  const [manufacturerFilter, setManufacturerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredFleet = fleet.filter(ac => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        ac.tailNumber.toLowerCase().includes(q) ||
        ac.model.toLowerCase().includes(q) ||
        ac.baseHub.toLowerCase().includes(q) ||
        ac.assignedFlight.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (manufacturerFilter !== 'ALL' && ac.manufacturer.toUpperCase() !== manufacturerFilter) {
      return false;
    }

    if (statusFilter !== 'ALL' && ac.status.toUpperCase() !== statusFilter) {
      return false;
    }

    return true;
  });

  const availableCount = fleet.filter(a => a.status === 'Available').length;
  const maintenanceCount = fleet.filter(a => a.status === 'Maintenance').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Aircraft Fleet Airworthiness</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Commercial airframes, engine cycles, fuel states, scheduled C-checks, and hub allocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F1FA] border border-[#C6DCF3] text-xs font-mono">
            <span className="font-bold text-[#1E63B3]">{availableCount} Available</span>
            <span className="text-[#8F8372]">|</span>
            <span className="font-bold text-amber-700">{maintenanceCount} In Hangar</span>
          </div>

          <button
            onClick={() => setIsMaintenanceModalOpen(true)}
            className="sky-btn-primary text-xs"
          >
            <Wrench className="w-4 h-4" />
            <span>Create Work Order</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sky-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8F8372] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tail (VT-ABC), model, base hub..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#8F8372]">OEM:</span>
            {['ALL', 'AIRBUS', 'BOEING', 'ATR'].map((m) => (
              <button
                key={m}
                onClick={() => setManufacturerFilter(m)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  manufacturerFilter === m
                    ? 'bg-[#0C1D36] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {m === 'ALL' ? 'All OEMs' : m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8F8372]">Status:</span>
            {['ALL', 'AVAILABLE', 'MAINTENANCE'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-[#1E63B3] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {st === 'ALL' ? 'All' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFleet.map((ac) => {
          const fuelInt = parseInt(ac.currentFuel) || 80;
          const isMaint = ac.status === 'Maintenance';

          return (
            <div
              key={ac.id}
              className={`sky-card p-5 flex flex-col justify-between border-2 transition-all ${
                isMaint ? 'border-amber-300 bg-[#FFFDF8]' : 'border-[#EADBBE]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#EADBBE]">
                  <div>
                    <span className="text-lg font-black font-mono text-[#0C1D36]">
                      {ac.tailNumber}
                    </span>
                    <span className="ml-2 text-xs font-medium text-[#8F8372]">
                      ({ac.manufacturer})
                    </span>
                    <div className="text-xs font-bold text-[#1E63B3]">{ac.model}</div>
                  </div>

                  <span
                    className={`badge-status ${
                      isMaint ? 'badge-delayed' : 'badge-on-time'
                    }`}
                  >
                    {isMaint ? 'In Hangar' : 'Airworthy'}
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Active Assignment:</span>
                    <strong className="font-mono text-[#0C1D36]">{ac.assignedFlight}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Home Hub Station:</span>
                    <strong className="text-[#0C1D36]">{ac.baseHub}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Hours / Flight Cycles:</span>
                    <span className="font-mono text-[#0C1D36]">
                      {ac.flightHours} • {ac.cycles} cycles
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Cabin Seating:</span>
                    <span className="text-[#0C1D36] text-[11px] truncate">{ac.seatConfig}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8F8372]">Next Inspection:</span>
                    <span className={`font-semibold ${isMaint ? 'text-red-700' : 'text-[#A9843F]'}`}>
                      {ac.nextInspection}
                    </span>
                  </div>
                </div>

                {/* Fuel State Indicator */}
                <div className="p-3 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-[#8F8372]">
                      <Fuel className="w-3.5 h-3.5 text-[#1E63B3]" />
                      Kerosene Tank State
                    </span>
                    <span className="font-mono font-bold text-[#0C1D36]">{ac.currentFuel}</span>
                  </div>
                  <div className="w-full h-2 bg-[#EADBBE] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        fuelInt > 50 ? 'bg-emerald-500' : fuelInt > 25 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${fuelInt}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8F8372] mt-1 font-mono">
                    <span>Capacity: {ac.fuelCapacity}</span>
                    <span>Delivered: {ac.yearOfDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Status Action Button */}
              <div className="pt-3 border-t border-[#EADBBE] flex items-center justify-between">
                <button
                  onClick={() =>
                    updateFleetStatus(ac.tailNumber, isMaint ? 'Available' : 'Maintenance')
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isMaint
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {isMaint ? 'Release to Flight Line' : 'Send to Hangar Check'}
                </button>

                <button
                  onClick={() => setIsMaintenanceModalOpen(true)}
                  className="text-xs font-bold text-[#1E63B3] hover:underline flex items-center gap-1"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Log Work Order</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FleetPage;
