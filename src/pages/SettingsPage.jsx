import React, { useState } from 'react';
import {
  Settings,
  Compass,
  Clock,
  Wrench,
  Radio,
  Bell,
  Shield,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const SettingsPage = () => {
  const { currentHub, setCurrentHub, showToast } = useSkyRoute();

  const [settings, setSettings] = useState({
    primaryHub: 'MAA - Chennai (Primary Hub)',
    secondaryHubs: 'BOM, DEL, BLR, DXB, HYD, CCU',
    defaultTimezone: 'UTC & IST Dual Mode',
    minTurnaroundMins: 45,
    radarSweepSpeed: '6 seconds',
    maintenanceThresholdHours: 500,
    fdtlDutyCapHours: 9,
    soundAlerts: true,
    aogAutoNotification: true,
    fuelSafetyReservePct: 5
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('SkyRoute Operational Parameters saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">System & Operational Settings</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Configure flight scheduling buffers, primary FIR radar telemetry, FDTL safety rules, and station hubs.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="sky-btn-primary text-xs shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hub & Route Operations */}
        <div className="sky-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EADBBE]">
            <Compass className="w-5 h-5 text-[#1E63B3]" />
            <h3 className="text-sm font-bold text-[#0C1D36]">Airline Hub Configuration</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Primary Base Station</label>
            <select
              value={settings.primaryHub}
              onChange={(e) => {
                setSettings({ ...settings, primaryHub: e.target.value });
                setCurrentHub(e.target.value);
              }}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-bold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            >
              <option value="MAA - Chennai (Primary Hub)">MAA - Chennai International (Primary)</option>
              <option value="BOM - Mumbai Chhatrapati">BOM - Mumbai Chhatrapati Shivaji</option>
              <option value="DEL - Delhi Indira Gandhi">DEL - Delhi Indira Gandhi</option>
              <option value="DXB - Dubai International">DXB - Dubai International</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Secondary Regional Hubs</label>
            <input
              type="text"
              value={settings.secondaryHubs}
              onChange={(e) => setSettings({ ...settings, secondaryHubs: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Minimum Turnaround Time (TAT)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.minTurnaroundMins}
                onChange={(e) => setSettings({ ...settings, minTurnaroundMins: e.target.value })}
                className="w-24 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36]"
              />
              <span className="text-xs text-[#8F8372]">minutes (between landing and next departure)</span>
            </div>
          </div>
        </div>

        {/* Flight Dispatch & Radar Preferences */}
        <div className="sky-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EADBBE]">
            <Radio className="w-5 h-5 text-cyan-600" />
            <h3 className="text-sm font-bold text-[#0C1D36]">Radar & Timezone Telemetry</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Timezone Display Format</label>
            <select
              value={settings.defaultTimezone}
              onChange={(e) => setSettings({ ...settings, defaultTimezone: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            >
              <option value="UTC & IST Dual Mode">Dual Mode (UTC / Zulu + Local IST)</option>
              <option value="UTC Only">Aviation Standard UTC (Zulu Only)</option>
              <option value="Local Station Only">Local Station Time (IST)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Radar Antenna Rotation Period</label>
            <select
              value={settings.radarSweepSpeed}
              onChange={(e) => setSettings({ ...settings, radarSweepSpeed: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            >
              <option value="4 seconds">4 seconds (High-Speed Terminal Radar)</option>
              <option value="6 seconds">6 seconds (Enroute PSR/SSR - Default)</option>
              <option value="12 seconds">12 seconds (Long-Range Oceanic)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">ICAO Contingency Fuel Reserve</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.fuelSafetyReservePct}
                onChange={(e) => setSettings({ ...settings, fuelSafetyReservePct: e.target.value })}
                className="w-24 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36]"
              />
              <span className="text-xs text-[#8F8372]">% of trip fuel + 30 min holding</span>
            </div>
          </div>
        </div>

        {/* Safety, Crew Duty & Maintenance Limits */}
        <div className="sky-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EADBBE]">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#0C1D36]">Safety, Crew FDTL & Inspections</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Max Daily Flight Duty Period (FDTL)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.fdtlDutyCapHours}
                onChange={(e) => setSettings({ ...settings, fdtlDutyCapHours: e.target.value })}
                className="w-24 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36]"
              />
              <span className="text-xs text-[#8F8372]">hours (alerts trigger at 80% duty elapsed)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">A-Check Maintenance Interval</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.maintenanceThresholdHours}
                onChange={(e) => setSettings({ ...settings, maintenanceThresholdHours: e.target.value })}
                className="w-24 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36]"
              />
              <span className="text-xs text-[#8F8372]">flight hours per airframe</span>
            </div>
          </div>
        </div>

        {/* Notifications & System Audio */}
        <div className="sky-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EADBBE]">
            <Bell className="w-5 h-5 text-[#A9843F]" />
            <h3 className="text-sm font-bold text-[#0C1D36]">Alerts & Broadcast Streams</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundAlerts}
                onChange={(e) => setSettings({ ...settings, soundAlerts: e.target.checked })}
                className="w-4 h-4 rounded text-[#1E63B3] accent-[#1E63B3]"
              />
              <div>
                <span className="font-bold text-[#0C1D36] block">Acoustic Audio Chime on Slot Alert</span>
                <span className="text-[#8F8372]">Play subtle chime when ATC issues slot revisions or gate updates</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.aogAutoNotification}
                onChange={(e) => setSettings({ ...settings, aogAutoNotification: e.target.checked })}
                className="w-4 h-4 rounded text-[#1E63B3] accent-[#1E63B3]"
              />
              <div>
                <span className="font-bold text-[#0C1D36] block">Auto-Dispatch AOG Alerts to Chief Engineer</span>
                <span className="text-[#8F8372]">Broadcast critical defect reports immediately to Hangar 1 lead</span>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
