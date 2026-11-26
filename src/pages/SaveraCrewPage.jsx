import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Award,
  ChevronRight,
  Plane,
  X,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import SaveraNewCrewModal from '../components/SaveraNewCrewModal';

const SaveraCrewPage = () => {
  const { crew, flights, showToast, updateCrewDuty } = useSavera();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [dutyFilter, setDutyFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedCrewMember, setSelectedCrewMember] = useState(null);
  const [isNewCrewModalOpen, setIsNewCrewModalOpen] = useState(false);

  const activeOnDutyCount = crew.filter(c => c.dutyStatus === 'On Duty').length;
  const standbyCount = crew.filter(c => c.dutyStatus === 'Standby').length;

  const filteredCrew = crew.filter(c => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.role && c.role.toLowerCase().includes(q)) ||
        (c.assignedFlight && c.assignedFlight.toLowerCase().includes(q)) ||
        (c.aircraftType && c.aircraftType.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (roleFilter !== 'ALL' && c.role !== roleFilter) return false;
    if (dutyFilter !== 'ALL' && c.dutyStatus !== dutyFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Crew Management & Rosters
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Pilots, First Officers, Lead Cabin Attendants directory, duty-time limitations, and assigned flight pairings.
          </p>
        </div>

        {/* Quick Duty Summary Stats & Action */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#10182B] border border-[#E8C77E]/20 text-xs">
            <span className="text-[#AAB2C2]">Active On Duty: </span>
            <strong className="text-[#91C98A] font-mono">{activeOnDutyCount} Officers</strong>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#10182B] border border-[#E8C77E]/20 text-xs">
            <span className="text-[#AAB2C2]">Standby Reserves: </span>
            <strong className="text-[#E8C77E] font-mono">{standbyCount} Ready</strong>
          </div>
          <button
            onClick={() => setIsNewCrewModalOpen(true)}
            className="savera-btn-gold py-1.5 px-3.5 text-xs cursor-pointer flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Crew</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center p-1 rounded-lg bg-[#080D1B] border border-[#E8C77E]/15 text-xs">
            {['ALL', 'Captain', 'First Officer', 'Cabin Senior', 'Cabin Crew'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  roleFilter === r
                    ? 'bg-[#E8C77E] text-[#080D1B] font-bold'
                    : 'text-[#AAB2C2] hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Duty Filter */}
          <div className="flex items-center p-1 rounded-lg bg-[#080D1B] border border-[#E8C77E]/15 text-xs">
            {['ALL', 'On Duty', 'Standby', 'Rest'].map(d => (
              <button
                key={d}
                onClick={() => setDutyFilter(d)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  dutyFilter === d
                    ? 'bg-[#E8C77E] text-[#080D1B] font-bold'
                    : 'text-[#AAB2C2] hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crew name, ID, flight..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#080D1B] border border-[#E8C77E]/20 rounded-xl text-xs text-white placeholder-[#AAB2C2]/60 focus:outline-none focus:border-[#E8C77E]"
          />
        </div>
      </div>

      {/* Crew Table */}
      <div className="savera-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8C77E]/15 bg-[#0C1424] text-[11px] font-bold uppercase tracking-wider text-[#AAB2C2]">
                <th className="py-3.5 px-4 sm:px-6">Crew Member</th>
                <th className="py-3.5 px-4 sm:px-6">Crew ID</th>
                <th className="py-3.5 px-4 sm:px-6">Role / Aircraft Type</th>
                <th className="py-3.5 px-4 sm:px-6">Assigned Flight</th>
                <th className="py-3.5 px-4 sm:px-6">Duty Status</th>
                <th className="py-3.5 px-4 sm:px-6">Availability</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8C77E]/10 text-xs">
              {filteredCrew.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCrewMember(c)}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  {/* Name & Photo */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-xl object-cover border border-[#E8C77E]/25 group-hover:border-[#E8C77E] transition-colors"
                      />
                      <div>
                        <span className="font-bold text-sm text-white group-hover:text-[#E8C77E] transition-colors">
                          {c.name}
                        </span>
                        <p className="text-[10px] text-[#AAB2C2] m-0">
                          {c.base || 'DEL Base'} • {c.nationality || 'Indian'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-[#E8C77E]">
                    {c.id}
                  </td>

                  {/* Role / Aircraft Type */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-semibold text-white">{c.role}</div>
                    <div className="text-[10px] text-[#AAB2C2] font-mono">
                      Rating: {c.aircraftType || 'Airbus A350 / A321'}
                    </div>
                  </td>

                  {/* Assigned Flight */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    {c.assignedFlight ? (
                      <div className="flex items-center gap-1.5 font-mono font-bold text-white">
                        <Plane className="w-3.5 h-3.5 text-[#E8C77E] transform -rotate-45" />
                        <span>{c.assignedFlight}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#AAB2C2] italic">Unassigned (Reserve)</span>
                    )}
                  </td>

                  {/* Duty Status */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    {c.dutyStatus === 'On Duty' ? (
                      <span className="badge-status badge-ontime">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#91C98A]" />
                        On Duty
                      </span>
                    ) : c.dutyStatus === 'Standby' ? (
                      <span className="badge-status badge-boarding">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8B75F]" />
                        Standby
                      </span>
                    ) : (
                      <span className="badge-status badge-scheduled">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AAB2C2]" />
                        Rest Period
                      </span>
                    )}
                  </td>

                  {/* Availability */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {c.availability || 'Available'}
                    </div>
                    <div className="text-[10px] text-[#91C98A] font-mono">
                      Duty Left: {c.flightHoursRemaining || '6h 40m'}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCrewMember(c);
                      }}
                      className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer group-hover:border-[#E8C77E]"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crew Detail Modal */}
      {selectedCrewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8C77E]/20">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCrewMember.avatar}
                  alt={selectedCrewMember.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E8C77E]"
                />
                <div>
                  <h3 className="text-base font-bold text-white m-0">
                    {selectedCrewMember.name}
                  </h3>
                  <p className="text-xs text-[#E8C77E] font-mono m-0">
                    {selectedCrewMember.id} • {selectedCrewMember.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCrewMember(null)}
                className="p-1.5 rounded-lg text-[#AAB2C2] hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
                <div>
                  <span className="text-[#AAB2C2]">Rating & Fleet:</span>
                  <p className="font-semibold text-white mt-0.5 m-0">
                    {selectedCrewMember.aircraftType || 'Airbus A350-900'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Total Flight Hours:</span>
                  <p className="font-mono font-bold text-[#E8C77E] mt-0.5 m-0">
                    {selectedCrewMember.totalFlightHours || '8,420 hrs'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Assigned Flight:</span>
                  <p className="font-mono font-semibold text-[#72C4FF] mt-0.5 m-0">
                    {selectedCrewMember.assignedFlight || 'Standby Hot-Reserve'}
                  </p>
                </div>
                <div>
                  <span className="text-[#AAB2C2]">Duty Compliance:</span>
                  <p className="font-semibold text-[#91C98A] mt-0.5 m-0">
                    DGCA FDTL Verified
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[#AAB2C2] block mb-1.5 font-bold uppercase text-[10px]">
                  Roster Duty Status Override
                </span>
                <div className="flex gap-2">
                  {['On Duty', 'Standby', 'Rest Period'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateCrewDuty(selectedCrewMember.id, st);
                        setSelectedCrewMember((prev) => (prev ? { ...prev, dutyStatus: st, availabilityStatus: st } : null));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        selectedCrewMember.dutyStatus === st
                          ? 'bg-[#E8C77E] text-[#080D1B] font-bold shadow'
                          : 'bg-[#080D1B] text-[#AAB2C2] border border-[#E8C77E]/20 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#AAB2C2]">Contact Telemetry:</span>
                <p className="font-mono text-white mt-0.5 m-0">
                  {selectedCrewMember.email || `${selectedCrewMember.id.toLowerCase()}@savera.aero`} • Ext: +91 (011) 2567-8840
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8C77E]/20 flex items-center justify-between">
              <button
                onClick={() => {
                  showToast(`Roster reminder dispatched to ${selectedCrewMember.name}`, 'gold');
                  setSelectedCrewMember(null);
                }}
                className="savera-btn-gold py-1.5 px-3 text-xs cursor-pointer"
              >
                Dispatch Roster Alert
              </button>
              <button
                onClick={() => setSelectedCrewMember(null)}
                className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Crew Registration Modal */}
      <SaveraNewCrewModal
        isOpen={isNewCrewModalOpen}
        onClose={() => setIsNewCrewModalOpen(false)}
      />
    </div>
  );
};

export default SaveraCrewPage;
