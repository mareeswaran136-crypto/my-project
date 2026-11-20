import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Clock,
  Phone,
  Plane,
  Award,
  AlertCircle
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const CrewPage = () => {
  const { crew, assignCrew, setIsCrewModalOpen, flights } = useSkyRoute();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredCrew = crew.filter(c => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.flightNumber.toLowerCase().includes(q) ||
        c.baseCity.toLowerCase().includes(q) ||
        c.licenseNumber.toLowerCase().includes(q) ||
        c.aircraftType.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (roleFilter !== 'ALL' && c.role.toUpperCase() !== roleFilter) {
      return false;
    }

    if (statusFilter !== 'ALL' && c.status.toUpperCase() !== statusFilter) {
      return false;
    }

    return true;
  });

  const pilotCount = crew.filter(c => c.role === 'Pilot').length;
  const cabinCrewCount = crew.filter(c => c.role === 'Cabin Crew').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Crew & Flight Operations Roster</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            DGCA flight duty time limitations (FDTL), cockpit commanders, purser rosters, and standby reserves.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F1FA] border border-[#C6DCF3] text-xs font-mono">
            <span className="font-bold text-[#1E63B3]">{pilotCount} Pilots</span>
            <span className="text-[#8F8372]">|</span>
            <span className="font-bold text-[#A9843F]">{cabinCrewCount} Cabin Crew</span>
          </div>

          <button
            onClick={() => setIsCrewModalOpen(true)}
            className="sky-btn-primary text-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Crew Member</span>
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
              placeholder="Search name, license (ATPL-...), flight, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8F8372]">Department:</span>
            {['ALL', 'PILOT', 'CABIN CREW'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  roleFilter === r
                    ? 'bg-[#0C1D36] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {r === 'ALL' ? 'All Crew' : r === 'PILOT' ? 'Flight Deck' : 'Cabin Services'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8F8372]">Roster Status:</span>
            {['ALL', 'ASSIGNED', 'STANDBY'].map((st) => (
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

      {/* Crew Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrew.map((c) => {
          const isAssigned = c.status === 'Assigned';
          const isPilot = c.role === 'Pilot';

          return (
            <div
              key={c.id}
              className="sky-card p-5 flex flex-col justify-between hover:border-[#1E63B3] transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-[#EADBBE]">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#EADBBE] shadow-xs"
                    />
                    <div>
                      <h4 className="font-extrabold text-[#0C1D36] text-sm">{c.name}</h4>
                      <p className="text-xs text-[#1E63B3] font-semibold">{c.designation}</p>
                      <span className="text-[10px] text-[#8F8372] font-mono">{c.licenseNumber}</span>
                    </div>
                  </div>

                  <span
                    className={`badge-status ${
                      isAssigned ? 'badge-on-time' : 'badge-scheduled'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Details */}
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Assigned Flight:</span>
                    <strong className="font-mono text-[#0C1D36] text-xs">
                      {c.flightNumber !== 'Unassigned' ? c.flightNumber : 'On Standby / Rest'}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Type Rating:</span>
                    <strong className="text-[#0C1D36]">{c.aircraftType}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Logged Flight Hours:</span>
                    <span className="font-mono font-bold text-[#1E63B3]">{c.flightHours}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EADBBE]/50">
                    <span className="text-[#8F8372]">Station Hub Base:</span>
                    <span className="text-[#0C1D36] font-semibold">{c.baseCity}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8F8372]">Direct Contact:</span>
                    <span className="font-mono text-[#0C1D36] text-[11px] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#1E63B3]" />
                      {c.phone}
                    </span>
                  </div>
                </div>

                {/* Duty Tracker Box */}
                <div className="p-3 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-1 font-semibold text-[#8F8372]">
                      <Clock className="w-3.5 h-3.5 text-[#A9843F]" />
                      FDTL Duty Period:
                    </span>
                    <span className="font-mono font-bold text-[#0C1D36]">{c.dutyPeriod}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EADBBE] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        c.dutyPeriod.includes('Rest')
                          ? 'bg-gray-400'
                          : c.dutyPeriod.includes('5h')
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{
                        width: c.dutyPeriod.includes('Rest')
                          ? '10%'
                          : c.dutyPeriod.includes('4h')
                          ? '50%'
                          : c.dutyPeriod.includes('5h')
                          ? '65%'
                          : '30%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Flight Assignment Selector */}
              <div className="pt-3 border-t border-[#EADBBE] flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#8F8372] font-semibold">Assign Sector:</span>
                <select
                  value={c.flightNumber}
                  onChange={(e) => assignCrew(c.id, e.target.value)}
                  className="bg-[#FDF6E3] border border-[#EADBBE] rounded px-2 py-1 text-xs font-mono font-bold text-[#0C1D36] focus:outline-none"
                >
                  <option value="Unassigned">Standby (Reserve)</option>
                  {flights.map((f) => (
                    <option key={f.id} value={f.flightNumber}>
                      {f.flightNumber} ({f.originCode}➔{f.destinationCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrewPage;
