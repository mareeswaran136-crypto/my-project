import React, { useState } from 'react';
import {
  Activity,
  Radio,
  Compass,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Wind,
  CheckCircle2,
  RefreshCw,
  Search,
  Plane,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraOperationsPage = () => {
  const { flights, stats, notifications, showToast, setSelectedFlight } = useSavera();
  const [activeTab, setActiveTab] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Airspace radar feeds & FIR sectors synchronized!', 'gold');
    }, 1000);
  };

  const delayList = [
    {
      flight: 'SV 410',
      route: 'DEL ➔ BLR',
      scheduled: '14:30 IST',
      delayMinutes: '25 min',
      reason: 'Air Traffic Control Flow Hold at BLR Runway 09L',
      mitigation: 'FlightRipple assigned alternative cruising level FL350; saving 7 min.',
      severity: 'moderate'
    },
    {
      flight: 'SV 208',
      route: 'BOM ➔ DXB',
      scheduled: '16:00 IST',
      delayMinutes: '18 min',
      reason: 'Late arrival of inbound turnaround aircraft due to headwinds',
      mitigation: 'Turnaround crew pre-positioned at Bay 32 for rapid boarding.',
      severity: 'low'
    },
    {
      flight: 'SV 512',
      route: 'DEL ➔ HYD',
      scheduled: '17:15 IST',
      delayMinutes: '12 min',
      reason: 'Baggage reconciliation verification at Terminal 3',
      mitigation: 'Ground operations expedited ramp transfer.',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Activity className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Live Operations & Airspace Radar
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Real-time flight status monitoring, FIR sector airspace telemetry, operational alerts, and delay mitigations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="savera-btn-secondary py-2 px-3 text-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync ADS-B Radar</span>
          </button>
        </div>
      </div>

      {/* Radar Visualizer & Sector Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Graphic Screen */}
        <div className="lg:col-span-2 savera-card p-6 bg-[#080D1B] border border-[#E8C77E]/25 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] rounded-full border border-[#E8C77E]/20" />
            <div className="w-[220px] h-[220px] rounded-full border border-[#E8C77E]/25" />
            <div className="w-[120px] h-[120px] rounded-full border border-[#E8C77E]/30" />
            <div className="w-[20px] h-[20px] rounded-full bg-[#E8C77E]/40" />
            {/* Axis lines */}
            <div className="absolute w-full h-[1px] bg-[#E8C77E]/15" />
            <div className="absolute h-full w-[1px] bg-[#E8C77E]/15" />
            {/* Rotating Sweep */}
            <div className="absolute w-[320px] h-[320px] rounded-full animate-radar pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#E8C77E]/30 to-transparent origin-bottom-right transform rotate-45 rounded-tl-full" />
            </div>
          </div>

          {/* Top Bar on Radar */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#E8C77E]/15 bg-[#080D1B]/80 backdrop-blur-xs px-2 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#91C98A] animate-ping" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                DEL / BOM AIRSPACE SECTOR - PRIMARY RADAR
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E8C77E]">
              RANGE: 400 NM • 28 TARGETS ACQUIRED
            </span>
          </div>

          {/* Sample Flight Blips on Radar */}
          <div className="relative z-10 py-10 flex flex-wrap gap-4 justify-around pointer-events-auto">
            {flights.slice(0, 5).map((f, i) => (
              <div
                key={f.id}
                onClick={() => setSelectedFlight(f)}
                className="p-2.5 rounded-xl bg-[#111A2D]/90 border border-[#E8C77E]/30 hover:border-[#E8C77E] transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-[#E8C77E]">
                  <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                  <span>{f.flightNumber}</span>
                </div>
                <div className="text-[10px] text-white font-mono mt-0.5">
                  {f.originCode || 'DEL'} ➔ {f.destinationCode || 'BOM'}
                </div>
                <div className="text-[9px] text-[#91C98A] font-mono">
                  {f.altitude || 'FL360'} • {f.speed || '470 kt'}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar on Radar */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#E8C77E]/15 text-[11px] font-mono text-[#AAB2C2] bg-[#080D1B]/80 px-2 rounded-lg">
            <span>TCAS II & ADS-B V2 INTEGRATION: VERIFIED</span>
            <span className="text-[#91C98A]">SECTOR INTEGRITY: 100%</span>
          </div>
        </div>

        {/* Operational Alerts & Incident Feeds */}
        <div className="savera-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#E8B75F]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white m-0">
                  Operational Alerts Feed
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-[#E8C77E]/15 text-[#E8C77E] px-2 py-0.5 rounded font-bold">
                {notifications.length} Active
              </span>
            </div>

            <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{n.title}</span>
                    <span className="text-[10px] font-mono text-[#AAB2C2]">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-[#AAB2C2] m-0">{n.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8C77E]/15 mt-4">
            <button
              onClick={() => showToast('Dispatched operational advisory to all sector dispatchers', 'gold')}
              className="savera-btn-gold py-2 text-xs w-full cursor-pointer"
            >
              Broadcast OCC Advisory
            </button>
          </div>
        </div>
      </div>

      {/* Delay Overview & Root-Cause Mitigation Table */}
      <div className="savera-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E8C77E]/15 bg-[#10182B]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E8B75F]" />
            <h3 className="text-sm font-bold text-white m-0">
              Delay Monitoring & AI Turnaround Mitigations
            </h3>
          </div>
          <span className="text-xs font-mono text-[#91C98A]">
            Average Network Delay: 14 mins (Well below 25m industry threshold)
          </span>
        </div>

        <div className="divide-y divide-[#E8C77E]/10">
          {delayList.map((d, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-sm">
                    {d.flight}
                  </span>
                  <span className="text-xs font-semibold text-[#AAB2C2]">
                    ({d.route})
                  </span>
                  <span className="badge-status badge-delayed text-[10px]">
                    +{d.delayMinutes} Delay
                  </span>
                </div>
                <p className="text-xs text-white mt-1.5 font-medium m-0">
                  Cause: <span className="text-[#AAB2C2]">{d.reason}</span>
                </p>
                <p className="text-xs text-[#91C98A] mt-1 font-mono m-0">
                  FlightRipple Action: {d.mitigation}
                </p>
              </div>

              <button
                onClick={() => showToast(`Expedited turnaround priority authorized for ${d.flight}`, 'success')}
                className="savera-btn-secondary py-1.5 px-3 text-xs shrink-0 cursor-pointer"
              >
                Expedite Ground Priority
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaveraOperationsPage;
