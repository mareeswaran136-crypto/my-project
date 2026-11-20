import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Users,
  Layers,
  Activity,
  Wrench,
  BarChart3,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { stats, brand, setIsFlightRippleModalOpen } = useSavera();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/flights', label: 'Flights', icon: Plane, badge: stats.activeFlights.value },
    { to: '/crew', label: 'Crew Management', icon: Users, badge: stats.crewOnDuty.value },
    { to: '/fleet', label: 'Fleet Management', icon: Layers, badge: `${stats.aircraftOnline.value}/${stats.aircraftOnline.totalFleet}` },
    { to: '/operations', label: 'Operations', icon: Activity, live: true },
    { to: '/maintenance', label: 'Maintenance', icon: Wrench, alert: stats.aircraftOnline.inMaintenance },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0D1426] via-[#0A1020] to-[#070B18] text-[#F8F6F0] flex flex-col border-r border-[#E8C77E]/20 transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E8C77E]/18 bg-radial from-[#15223E]/40 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7E5B5] via-[#E8C77E] to-[#A9843F] p-[1.5px] shadow-lg shadow-[#E8C77E]/25 shrink-0">
              <div className="w-full h-full bg-[#0D1426] rounded-[10px] flex items-center justify-center">
                <Plane className="w-5 h-5 text-[#E8C77E] transform -rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-[0.24em] text-lg font-black text-gold-gradient">
                  SAVÉRA
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase bg-[#E8C77E]/20 text-[#F7E5B5] border border-[#E8C77E]/40 rounded shadow-xs">
                  LUXE
                </span>
              </div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#9EABBE] font-semibold mt-0.5">
                AeroSync Operations
              </p>
            </div>
          </div>

          {/* Quick Hub Telemetry Indicator with Rich Glow */}
          <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#10192F] to-[#0D1426] border border-[#E8C77E]/20 flex items-center justify-between text-xs shadow-inner">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82D197] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82D197]"></span>
              </span>
              <span className="text-[#82D197] text-[11px] font-bold tracking-wide">
                DEL • Hub 1 Live
              </span>
            </div>
            <span className="text-[#F7E5B5] font-mono text-[11px] font-bold bg-[#E8C77E]/10 px-2 py-0.5 rounded border border-[#E8C77E]/20">
              OTP {stats.onTimePerformance.value}%
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9EABBE]/70">
            Control Center
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E8C77E]/25 via-[#E8C77E]/12 to-transparent text-[#F7E5B5] border border-[#E8C77E]/45 shadow-lg shadow-[#000]/40'
                    : 'text-[#9EABBE] hover:bg-white/[0.04] hover:text-[#F8F6F0] border border-transparent hover:border-[#E8C77E]/15'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#E8C77E] drop-shadow-[0_0_6px_rgba(232,199,126,0.5)]' : 'text-[#9EABBE] group-hover:text-[#E8C77E]'
                      }`}
                    />
                    <span className="tracking-wide">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.live && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-[#69C0FF] animate-pulse shadow-[0_0_8px_#69C0FF]" />
                    )}
                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                          isActive
                            ? 'bg-gradient-to-r from-[#F7E5B5] to-[#E8C77E] text-[#070B18] shadow-sm'
                            : 'bg-white/10 text-[#9EABBE] group-hover:text-[#F8F6F0] group-hover:bg-white/15'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.alert && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ECC168]/20 text-[#ECC168] border border-[#ECC168]/35">
                        {item.alert}
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          ))}

          {/* FlightRipple Signature Feature Mini Card */}
          <div className="pt-4">
            <div
              onClick={() => setIsFlightRippleModalOpen(true)}
              className="p-4 rounded-xl bg-gradient-to-br from-[#15223E] via-[#10192F] to-[#0A1020] border border-[#E8C77E]/30 hover:border-[#E8C77E]/70 transition-all cursor-pointer group shadow-xl hover:shadow-[#E8C77E]/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8C77E] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider text-[#F7E5B5] uppercase">
                    FlightRipple™
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#82D197] bg-[#82D197]/20 border border-[#82D197]/35 px-1.5 py-0.5 rounded shadow-xs">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-[#9EABBE] mt-2 leading-relaxed font-medium">
                Real-Time Route Optimization Engine
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#E8C77E] group-hover:translate-x-1 transition-transform">
                <span>View Route Insights</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </nav>

        {/* Footer: User & System Status */}
        <div className="p-4 border-t border-[#E8C77E]/18 bg-[#090E1C]">
          <div className="flex items-center gap-3">
            <img
              src={brand.adminUser.avatar}
              alt={brand.adminUser.name}
              className="w-9 h-9 rounded-full object-cover border border-[#E8C77E]/50 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#F8F6F0] truncate m-0">
                {brand.adminUser.name}
              </p>
              <p className="text-[10px] text-[#E8C77E] truncate m-0 font-medium">
                {brand.adminUser.title}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#82D197] shadow-[0_0_6px_#82D197]" title="Online" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SaveraSidebar;
