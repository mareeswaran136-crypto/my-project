import React, { useState } from 'react';
import {
  Plane,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Grid,
  List,
  ChevronRight,
  Calendar,
  Sparkles,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import SaveraFlightTable from '../components/SaveraFlightTable';

const SaveraFlightsPage = () => {
  const { flights, setSelectedFlight, setIsNewFlightModalOpen } = useSavera();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = flights.filter(f => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        f.flightNumber.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q) ||
        f.destination.toLowerCase().includes(q) ||
        f.aircraft.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab === 'ALL') return true;
    if (activeTab === 'IN_FLIGHT') return f.status === 'In Flight' || f.status === 'En Route';
    if (activeTab === 'SCHEDULED') return f.status === 'On Time' || f.status === 'Scheduled';
    if (activeTab === 'DELAYED') return f.status === 'Delayed';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Plane className="w-4 h-4 transform -rotate-45" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Flight Operations Schedule
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Real-time flight schedule management, airport slots, aircraft dispatch and passenger load tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-[#E8C77E] text-[#080D1B]' : 'text-[#AAB2C2] hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-[#E8C77E] text-[#080D1B]' : 'text-[#AAB2C2] hover:text-white'
              }`}
              title="Card Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsNewFlightModalOpen(true)}
            className="savera-btn-gold py-2 px-4 text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Flight</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/15">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Flights', count: flights.length },
            { id: 'IN_FLIGHT', label: 'In Flight / En Route', count: flights.filter(f => f.status === 'In Flight' || f.status === 'En Route').length },
            { id: 'SCHEDULED', label: 'On Time / Scheduled', count: flights.filter(f => f.status === 'On Time' || f.status === 'Scheduled').length },
            { id: 'DELAYED', label: 'Delayed Holds', count: flights.filter(f => f.status === 'Delayed').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-[#E8C77E] text-[#080D1B] font-bold shadow-sm'
                  : 'bg-[#111A2D] text-[#AAB2C2] hover:text-white border border-[#E8C77E]/15'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter flights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#080D1B] border border-[#E8C77E]/20 rounded-xl text-xs text-white placeholder-[#AAB2C2]/60 focus:outline-none focus:border-[#E8C77E]"
          />
        </div>
      </div>

      {/* View Output */}
      {viewMode === 'table' ? (
        <SaveraFlightTable limit={null} showFilterBar={false} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(f => (
            <div
              key={f.id}
              onClick={() => setSelectedFlight(f)}
              className="savera-card p-5 cursor-pointer group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
                    <Plane className="w-4 h-4 transform -rotate-45" />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-sm text-white group-hover:text-[#E8C77E] transition-colors">
                      {f.flightNumber}
                    </span>
                    <p className="text-[10px] text-[#AAB2C2] m-0 font-mono">
                      {f.aircraft}
                    </p>
                  </div>
                </div>
                <span className="badge-status badge-ontime text-[10px]">
                  {f.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-lg font-black font-serif text-white">
                    {f.originCode || f.origin.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="text-[11px] text-[#AAB2C2] truncate max-w-[100px]">
                    {f.origin}
                  </div>
                  <div className="text-[10px] font-mono text-[#E8C77E] mt-0.5">
                    {f.departureTime || f.scheduledDeparture}
                  </div>
                </div>

                <div className="flex flex-col items-center px-4 flex-1">
                  <ArrowRight className="w-4 h-4 text-[#E8C77E]" />
                  <span className="text-[9px] text-[#AAB2C2] font-mono mt-1">
                    {f.altitude || '36,000 ft'}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black font-serif text-white">
                    {f.destinationCode || f.destination.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="text-[11px] text-[#AAB2C2] truncate max-w-[100px]">
                    {f.destination}
                  </div>
                  <div className="text-[10px] font-mono text-[#E8C77E] mt-0.5">
                    {f.arrivalTime || f.scheduledArrival}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8C77E]/10 flex items-center justify-between text-xs text-[#AAB2C2]">
                <span>Captain: {f.crew?.captain || f.captain || 'Assigned'}</span>
                <span className="text-[#E8C77E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveraFlightsPage;
