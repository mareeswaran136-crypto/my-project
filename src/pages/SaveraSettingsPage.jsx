import React, { useState } from 'react';
import {
  Settings,
  Bell,
  User,
  Shield,
  Sliders,
  CheckCircle2,
  Lock,
  Sparkles,
  Plane,
  Save
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraSettingsPage = () => {
  const { brand, showToast } = useSavera();

  const [profile, setProfile] = useState({
    name: brand.adminUser.name,
    title: brand.adminUser.title,
    email: brand.adminUser.email,
    shift: brand.adminUser.shift,
    badgeId: brand.adminUser.badgeId
  });

  const [preferences, setPreferences] = useState({
    autoSyncFlightRipple: true,
    audioAlerts: true,
    highContrastRadar: false,
    delayThresholdWarning: '15',
    airspaceFIR: 'DEL_BOM_DUAL_CENTRAL',
    refreshRate: '5'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform preferences successfully updated in SAVÉRA Cloud', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Operations Control System Settings
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Configure OCC controller profile, notification priorities, radar telemetry thresholds, and FlightRipple™ AI integration parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="savera-btn-gold py-2 px-5 text-xs cursor-pointer shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="savera-card p-6 space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={brand.adminUser.avatar}
              alt={brand.adminUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8C77E]"
            />
            <div>
              <h2 className="text-base font-bold text-white m-0">{profile.name}</h2>
              <p className="text-xs text-[#E8C77E] font-medium m-0">{profile.title}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#91C98A]/15 text-[#91C98A] border border-[#91C98A]/30">
                Level 5 Clearance
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs border-t border-[#E8C77E]/15">
            <div>
              <label className="text-[#AAB2C2] block mb-1">Controller Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white font-medium"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Official OCC Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Badge Identification</label>
              <input
                type="text"
                value={profile.badgeId}
                disabled
                className="w-full bg-[#080D1B]/50 border border-white/10 p-2 rounded-xl text-[#AAB2C2] font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Assigned Operational Shift</label>
              <input
                type="text"
                value={profile.shift}
                onChange={(e) => setProfile({ ...profile, shift: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Notification & Dashboard Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Preferences */}
          <div className="savera-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8C77E]/15">
              <Bell className="w-4 h-4 text-[#E8C77E]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white m-0">
                Operational Notification & Alert Priorities
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/10 cursor-pointer hover:border-[#E8C77E]/30 transition-colors">
                <div>
                  <span className="font-semibold text-white block">
                    Real-Time FlightRipple Route Optimization Alerts
                  </span>
                  <span className="text-[#AAB2C2] text-[11px]">
                    Receive instant push notifications when fuel/time vector improvements exceed $1,000.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.autoSyncFlightRipple}
                  onChange={(e) => setPreferences({ ...preferences, autoSyncFlightRipple: e.target.checked })}
                  className="w-4 h-4 accent-[#E8C77E]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/10 cursor-pointer hover:border-[#E8C77E]/30 transition-colors">
                <div>
                  <span className="font-semibold text-white block">
                    Acoustic Dispatch Warning Chimes
                  </span>
                  <span className="text-[#AAB2C2] text-[11px]">
                    Audible notification for emergency squawks (7500, 7600, 7700) or high delay holds.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.audioAlerts}
                  onChange={(e) => setPreferences({ ...preferences, audioAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#E8C77E]"
                />
              </label>
            </div>
          </div>

          {/* Dashboard Telemetry Preferences */}
          <div className="savera-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8C77E]/15">
              <Sliders className="w-4 h-4 text-[#72C4FF]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white m-0">
                Dashboard & Radar Telemetry Parameters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#AAB2C2] block mb-1.5 font-medium">
                  Radar Refresh Interval
                </label>
                <select
                  value={preferences.refreshRate}
                  onChange={(e) => setPreferences({ ...preferences, refreshRate: e.target.value })}
                  className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
                >
                  <option value="1">1 Second (Ultra Fast ADS-B)</option>
                  <option value="5">5 Seconds (Standard OCC)</option>
                  <option value="15">15 Seconds (Low Bandwidth)</option>
                </select>
              </div>

              <div>
                <label className="text-[#AAB2C2] block mb-1.5 font-medium">
                  Delay Escalation Warning (Minutes)
                </label>
                <select
                  value={preferences.delayThresholdWarning}
                  onChange={(e) => setPreferences({ ...preferences, delayThresholdWarning: e.target.value })}
                  className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
                >
                  <option value="10">10 Minutes (Tight Dispatch)</option>
                  <option value="15">15 Minutes (Standard ICAO)</option>
                  <option value="30">30 Minutes (Relaxed)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveraSettingsPage;
