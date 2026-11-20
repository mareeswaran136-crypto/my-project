import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Plus,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Filter,
  Wrench,
  Sparkles
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const Navbar = ({ onOpenMobileSidebar }) => {
  const {
    clock,
    notifications,
    stats,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    currentHub,
    setCurrentHub,
    setIsNewFlightModalOpen,
    setIsMaintenanceModalOpen,
    searchQuery,
    setSearchQuery
  } = useSkyRoute();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const hubs = [
    'MAA - Chennai (Primary Hub)',
    'BOM - Mumbai Chhatrapati',
    'DEL - Delhi Indira Gandhi',
    'DXB - Dubai International',
    'BLR - Bengaluru Kempegowda'
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFFBF0] border-b border-[#EADBBE] px-4 lg:px-8 py-3 flex items-center justify-between gap-4 shadow-xs">
      {/* Left: Mobile Toggle & Hub Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#0C1D36] hover:bg-[#F3EBD9] rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Operational Hub Selector */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FDF6E3] border border-[#EADBBE] text-xs">
          <Compass className="w-4 h-4 text-[#1E63B3]" />
          <span className="font-semibold text-[#8F8372]">Base Hub:</span>
          <select
            value={currentHub}
            onChange={(e) => setCurrentHub(e.target.value)}
            className="bg-transparent font-bold text-[#0C1D36] focus:outline-none cursor-pointer"
          >
            {hubs.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle: Flight Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8F8372] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flights (e.g. SQ101, BOM, VT-ABC, Sharma)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] placeholder-[#8F8372] focus:outline-none focus:border-[#1E63B3] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F8372] hover:text-[#0C1D36]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Clock, Notifications & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Clock Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F1FA] border border-[#C6DCF3] text-xs font-mono text-[#154A87]">
          <Clock className="w-3.5 h-3.5 text-[#1E63B3]" />
          <span className="font-bold">{clock.utc}</span>
          <span className="text-gray-400">|</span>
          <span className="text-[#8F8372]">{clock.local}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg text-[#0C1D36] hover:bg-[#F3EBD9] transition-colors border border-transparent hover:border-[#EADBBE]"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-[#1E63B3]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFBF0] border border-[#EADBBE] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="p-3 bg-[#0C1D36] text-[#FDF6E3] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-bold text-sm">Operations Alerts</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] bg-red-500 text-white rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#C5A059] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#EADBBE]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#8F8372]">
                    No operations alerts at this moment.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs transition-colors ${
                        n.read ? 'bg-[#FFFBF0]' : 'bg-[#FAF4E5] font-semibold'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {n.urgent ? (
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="w-4 h-4 text-[#1E63B3] shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[#0C1D36] font-bold">{n.title}</div>
                            <div className="text-[#8F8372] mt-0.5 leading-snug">{n.message}</div>
                            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#A9843F]">
                              <span>{n.timestamp}</span>
                              <span>•</span>
                              <span className="uppercase tracking-wider font-bold">{n.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {!n.read && (
                            <button
                              onClick={() => markAsRead(n.id)}
                              className="p-1 text-emerald-600 hover:text-emerald-800"
                              title="Mark read"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="p-1 text-[#8F8372] hover:text-red-600"
                            title="Dismiss"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-[#FDF6E3] border-t border-[#EADBBE] text-center">
                <span className="text-[11px] text-[#8F8372]">SkyRoute Central Operations Stream</span>
              </div>
            </div>
          )}
        </div>

        {/* SAVÉRA AeroSync Admin Dashboard Shortcut */}
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ECC880] to-[#C5A059] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#070F1E] text-xs font-extrabold shadow-sm transition-all border border-[#FFE4A0]"
          title="Open SAVÉRA AeroSync Admin Dashboard"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#070F1E]" />
          <span className="hidden sm:inline">SAVÉRA Admin</span>
          <span className="sm:hidden">Admin</span>
        </Link>

        {/* Quick Dispatch / Action Buttons */}
        <button
          onClick={() => setIsMaintenanceModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EADBBE] bg-[#FDF6E3] hover:bg-[#FAF4E5] text-xs font-semibold text-[#0C1D36] transition-colors"
          title="Create Maintenance Work Order"
        >
          <Wrench className="w-3.5 h-3.5 text-[#A9843F]" />
          <span>Work Order</span>
        </button>

        <button
          onClick={() => setIsNewFlightModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1E63B3] hover:bg-[#154A87] text-white text-xs font-bold transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Flight</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
