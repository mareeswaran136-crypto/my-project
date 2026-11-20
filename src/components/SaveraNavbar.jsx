import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Clock,
  Sparkles,
  Settings,
  Mail,
  ShieldAlert,
  ChevronDown,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import { useNavigate } from 'react-router-dom';

const SaveraNavbar = ({ onOpenMobileSidebar, pageTitle = 'Operations Dashboard' }) => {
  const {
    clock,
    notifications,
    markAsRead,
    markAllAsRead,
    brand,
    globalSearch,
    setGlobalSearch,
    setIsFlightRippleModalOpen
  } = useSavera();

  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#0D1426]/92 backdrop-blur-md border-b border-[#E8C77E]/20 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-all shadow-xl">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#9EABBE] hover:text-[#F8F6F0] hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-[#E8C77E]/20"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-[#F8F6F0] m-0">
              {pageTitle}
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-[#E8C77E]/20 to-[#E8C77E]/5 text-[#F7E5B5] border border-[#E8C77E]/40 tracking-wider font-mono shadow-xs">
              OCC DISPATCH
            </span>
          </div>
          <p className="text-[11px] text-[#9EABBE] hidden sm:block m-0 font-medium mt-0.5">
            SAVÉRA International Luxury Fleet Network • Delhi Central Hub
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#9EABBE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search flight number, route, captain, or tail ID..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-[#080D1B]/90 border border-[#E8C77E]/25 rounded-xl text-xs font-medium text-[#F8F6F0] placeholder-[#9EABBE]/60 focus:outline-none focus:border-[#E8C77E] focus:ring-1 focus:ring-[#E8C77E]/50 transition-all shadow-inner"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9EABBE] hover:text-[#F8F6F0]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Live Time, Alerts, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date & Time Widget */}
        <div className="hidden xl:flex flex-col text-right px-3.5 py-1.5 bg-[#0A1020] border border-[#E8C77E]/20 rounded-xl shadow-inner">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F7E5B5]">
            <Clock className="w-3.5 h-3.5 text-[#E8C77E]" />
            <span>{clock.local}</span>
            <span className="text-[#9EABBE]/60 font-normal">|</span>
            <span className="text-[#9EABBE]">{clock.utc}</span>
          </div>
          <span className="text-[10px] text-[#9EABBE] font-semibold tracking-wide">
            {clock.date}
          </span>
        </div>

        {/* FlightRipple Quick Action Pill */}
        <button
          onClick={() => setIsFlightRippleModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E8C77E]/20 to-[#E8C77E]/5 border border-[#E8C77E]/40 text-[#F7E5B5] hover:border-[#E8C77E] hover:bg-[#E8C77E]/25 text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow-[#E8C77E]/20"
          title="Open FlightRipple Optimization Engine"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C77E] animate-pulse" />
          <span className="tracking-wide">FlightRipple</span>
        </button>

        {/* Operational Messages / Dispatch Comms */}
        <button
          onClick={() => navigate('/operations')}
          className="p-2 text-[#9EABBE] hover:text-[#F8F6F0] hover:bg-white/5 rounded-xl border border-transparent hover:border-[#E8C77E]/20 transition-colors relative"
          title="Operational Dispatch Communications"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8C77E] shadow-[0_0_6px_#E8C77E]" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-[#9EABBE] hover:text-[#E8C77E] hover:bg-white/5 rounded-xl border border-transparent hover:border-[#E8C77E]/20 transition-colors relative"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E87474] text-[9px] font-bold text-white shadow-[0_0_8px_rgba(232,116,116,0.5)]">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#10192F] border border-[#E8C77E]/35 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-4 border-b border-[#E8C77E]/20 flex items-center justify-between bg-[#0D1426]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#E8C77E]" />
                  <span className="font-bold text-xs tracking-wider uppercase text-[#F8F6F0]">
                    Operational Alerts
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#E8C77E]/20 text-[#F7E5B5] font-bold border border-[#E8C77E]/30">
                    {unreadCount} new
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#E8C77E] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#E8C77E]/10">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#9EABBE]">
                    No active alerts at this time. All systems nominal.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer flex gap-3 ${
                        !n.read ? 'bg-[#15223E]/60' : ''
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {n.severity === 'high' ? (
                          <ShieldAlert className="w-4 h-4 text-[#E87474]" />
                        ) : n.severity === 'medium' ? (
                          <Sparkles className="w-4 h-4 text-[#ECC168]" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-[#82D197]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-[#F8F6F0] truncate m-0">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-[#9EABBE] font-mono shrink-0">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9EABBE] mt-1 line-clamp-2 m-0 font-medium">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings Shortcut */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 text-[#9EABBE] hover:text-[#F8F6F0] hover:bg-white/5 rounded-xl border border-transparent hover:border-[#E8C77E]/20 transition-colors"
          title="Platform Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#E8C77E]/25 hover:border-[#E8C77E]/60 transition-all shadow-sm"
          >
            <img
              src={brand.adminUser.avatar}
              alt={brand.adminUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-[#E8C77E]/50 shadow"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-[#F8F6F0] leading-tight m-0">
                {brand.adminUser.name}
              </p>
              <p className="text-[9px] text-[#E8C77E] leading-tight m-0 font-semibold tracking-wide">
                Chief Controller
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#9EABBE]" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#10192F] border border-[#E8C77E]/35 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E8C77E]/20">
                <img
                  src={brand.adminUser.avatar}
                  alt={brand.adminUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#E8C77E] shadow-md"
                />
                <div>
                  <p className="text-xs font-bold text-[#F8F6F0] m-0">
                    {brand.adminUser.name}
                  </p>
                  <p className="text-[10px] text-[#E8C77E] font-semibold m-0">
                    {brand.adminUser.badgeId} • {brand.adminUser.role}
                  </p>
                  <p className="text-[10px] text-[#9EABBE] m-0">
                    {brand.adminUser.email}
                  </p>
                </div>
              </div>

              <div className="py-2.5 space-y-1">
                <div className="text-[10px] text-[#9EABBE] font-bold uppercase tracking-wider px-1">
                  Security Clearance
                </div>
                <div className="text-[11px] text-[#82D197] font-mono px-1 font-semibold">
                  {brand.adminUser.clearance}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8C77E]/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="text-xs text-[#E8C77E] hover:underline font-bold"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="text-xs text-[#9EABBE] hover:text-[#F8F6F0]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SaveraNavbar;
