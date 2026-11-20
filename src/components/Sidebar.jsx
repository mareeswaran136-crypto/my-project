import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Radio,
  Layers,
  Users,
  Wrench,
  Calendar,
  UserCheck,
  Settings,
  Compass,
  Activity,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { stats, clock, currentHub } = useSkyRoute();

  const navItems = [
    { to: '/admin', label: 'SAVÉRA Admin Portal', icon: Sparkles, badge: 'Live', isSpecial: true },
    { to: '/', label: 'Operations Dashboard', icon: LayoutDashboard },
    { to: '/flights', label: 'Flights Control', icon: Plane, badge: stats.totalFlights },
    { to: '/radar', label: 'Airborne Radar', icon: Radio, live: true, badge: stats.airborneFlights },
    { to: '/fleet', label: 'Aircraft Fleet', icon: Layers, badge: `${stats.activeAircraft}/${stats.totalFleet}` },
    { to: '/crew', label: 'Crew & Rosters', icon: Users, badge: stats.totalCrew },
    { to: '/maintenance', label: 'Maintenance Tech', icon: Wrench, alertBadge: stats.pendingMaintenance },
    { to: '/calendar', label: 'Ops Calendar', icon: Calendar },
    { to: '/users', label: 'Personnel & Access', icon: UserCheck },
    { to: '/settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0C1D36] text-[#FDF6E3] flex flex-col border-r border-[#1B3E70] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* SkyRoute Brand Header */}
        <div className="p-5 border-b border-[#1B3E70]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E63B3] to-[#C5A059] flex items-center justify-center text-white shadow-md">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-lg text-white font-mono">SKYROUTE</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#C5A059] text-[#0C1D36] rounded tracking-widest">OPS</span>
              </div>
              <p className="text-xs text-[#8F8372] font-medium tracking-tight">Airline Flight Management</p>
            </div>
          </div>

          {/* Hub Status Bar */}
          <div className="mt-4 px-3 py-2 rounded-md bg-[#132D52] border border-[#1B3E70] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-indicator" />
              <span className="text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">MAA Hub Live</span>
            </div>
            <span className="text-[#A9843F] font-mono text-[11px] font-medium">{stats.onTimeRate}% On-Time</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#8F8372]">Operations Core</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.isSpecial
                    ? 'bg-gradient-to-r from-[#C5A059]/25 to-transparent border border-[#C5A059]/40 text-[#FFE4A0] font-semibold hover:border-[#ECC880]'
                    : isActive
                    ? 'bg-[#1E63B3] text-white shadow-sm font-semibold'
                    : 'text-[#D9C8A5] hover:bg-[#132D52] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0 text-[#C5A059]" />
                <span>{item.label}</span>
              </div>

              {item.live && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700 rounded-full font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {item.badge}
                </span>
              )}

              {item.badge && !item.live && (
                <span className="px-2 py-0.5 text-[11px] bg-[#132D52] text-[#D9C8A5] rounded font-mono font-semibold">
                  {item.badge}
                </span>
              )}

              {item.alertBadge > 0 && (
                <span className="px-2 py-0.5 text-[11px] bg-amber-900/60 text-amber-300 border border-amber-600 rounded-full font-mono font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {item.alertBadge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Telemetry Clock Card */}
        <div className="p-3 mx-3 mb-3 rounded-lg bg-[#132D52]/70 border border-[#1B3E70]">
          <div className="flex items-center justify-between text-xs text-[#8F8372] mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" /> NOC Feed
            </span>
            <span className="font-mono text-cyan-400 font-semibold">{clock.utc}</span>
          </div>
          <div className="text-[11px] text-[#A9843F] font-mono flex justify-between">
            <span>Local Time:</span>
            <span>{clock.local}</span>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#1B3E70] bg-[#091527] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
              alt="Admin Officer"
              className="w-9 h-9 rounded-full border border-[#C5A059] object-cover shrink-0"
            />
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Admin Officer</div>
              <div className="text-[10px] text-[#8F8372] truncate">Chief Dispatcher</div>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-indicator shrink-0" title="System Online" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
