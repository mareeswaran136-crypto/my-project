import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Fuel,
  Plane,
  ArrowUpRight,
  Calendar,
  Layers,
  Sparkles,
  PieChart
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraAnalyticsPage = () => {
  const { stats, flightRipple } = useSavera();
  const [timeRange, setTimeRange] = useState('Today');

  const hourlyTrends = [
    { hour: '06:00', otp: 98, departures: 14, fuelIndex: 94 },
    { hour: '08:00', otp: 96, departures: 22, fuelIndex: 96 },
    { hour: '10:00', otp: 95, departures: 18, fuelIndex: 95 },
    { hour: '12:00', otp: 93, departures: 24, fuelIndex: 92 },
    { hour: '14:00', otp: 94, departures: 20, fuelIndex: 94 },
    { hour: '16:00', otp: 97, departures: 26, fuelIndex: 97 },
    { hour: '18:00', otp: 95, departures: 28, fuelIndex: 95 },
    { hour: '20:00', otp: 96, departures: 21, fuelIndex: 96 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Operations & Performance Analytics
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Statistical breakdown of flight punctuality, fuel burn indexes, turnaround cycle times and fleet productivity metrics.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center p-1 rounded-xl bg-[#10182B] border border-[#E8C77E]/15 text-xs">
          {['Today', 'This Week', 'This Month', 'Q4 2026'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                timeRange === r
                  ? 'bg-[#E8C77E] text-[#080D1B] font-bold shadow-sm'
                  : 'text-[#AAB2C2] hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="savera-card p-5">
          <span className="text-xs font-semibold text-[#AAB2C2] uppercase">Average On-Time OTP</span>
          <div className="text-3xl font-black font-serif text-[#91C98A] mt-2">
            94.8%
          </div>
          <p className="text-[11px] text-[#AAB2C2] mt-1 m-0">+2.3% vs industry average</p>
        </div>

        <div className="savera-card p-5">
          <span className="text-xs font-semibold text-[#AAB2C2] uppercase">Fleet Utilization</span>
          <div className="text-3xl font-black font-serif text-[#E8C77E] mt-2">
            87.5%
          </div>
          <p className="text-[11px] text-[#AAB2C2] mt-1 m-0">12.4 block hrs / airframe daily</p>
        </div>

        <div className="savera-card p-5">
          <span className="text-xs font-semibold text-[#AAB2C2] uppercase">FlightRipple Fuel Saving</span>
          <div className="text-3xl font-black font-serif text-[#72C4FF] mt-2">
            $38,450
          </div>
          <p className="text-[11px] text-[#AAB2C2] mt-1 m-0">Across 188 flights today</p>
        </div>

        <div className="savera-card p-5">
          <span className="text-xs font-semibold text-[#AAB2C2] uppercase">Turnaround Average</span>
          <div className="text-3xl font-black font-serif text-white mt-2">
            38 min
          </div>
          <p className="text-[11px] text-[#AAB2C2] mt-1 m-0">Narrow-body A321 fleet benchmark</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Time Hourly Performance Bar Chart */}
        <div className="savera-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
            <div>
              <h3 className="text-sm font-bold text-white m-0">
                Hourly On-Time Performance (OTP %)
              </h3>
              <p className="text-[11px] text-[#AAB2C2] m-0">Target baseline: 92.0%</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#E8C77E]">24-Hour Cycle</span>
          </div>

          <div className="pt-4 flex items-end justify-between gap-3 h-48 px-2">
            {hourlyTrends.map((t, idx) => {
              const heightPercent = ((t.otp - 80) / 20) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-[#E8C77E] opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.otp}%
                  </span>
                  <div className="w-full bg-[#080D1B] rounded-t-lg h-36 flex items-end p-1">
                    <div
                      className="w-full bg-gradient-to-t from-[#B28A3C] to-[#E8C77E] rounded-md transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#AAB2C2]">{t.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fleet Utilization by Aircraft Type */}
        <div className="savera-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/15">
            <div>
              <h3 className="text-sm font-bold text-white m-0">
                Fleet Aircraft Type Productivity
              </h3>
              <p className="text-[11px] text-[#AAB2C2] m-0">Daily utilization in block hours</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#91C98A]">100% Airworthy</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">Airbus A350-900 (10 Frames)</span>
                <span className="font-mono text-[#E8C77E]">14.8 hrs / day (96%)</span>
              </div>
              <div className="w-full h-2 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8C77E] rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">Boeing 787-9 Dreamliner (8 Frames)</span>
                <span className="font-mono text-[#72C4FF]">14.1 hrs / day (92%)</span>
              </div>
              <div className="w-full h-2 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#72C4FF] rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white font-medium">Airbus A321neo Domestic Express (14 Frames)</span>
                <span className="font-mono text-[#91C98A]">11.6 hrs / day (82%)</span>
              </div>
              <div className="w-full h-2 bg-[#080D1B] rounded-full overflow-hidden">
                <div className="h-full bg-[#91C98A] rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8C77E]/10 flex items-center justify-between text-xs text-[#AAB2C2]">
            <span>Total Network Kilometers Today</span>
            <span className="font-mono font-bold text-white">428,950 km flown</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveraAnalyticsPage;
