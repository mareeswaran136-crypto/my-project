import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Plane,
  Clock
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const CalendarPage = () => {
  const { calendarData, stats } = useSkyRoute();
  const [selectedDay, setSelectedDay] = useState(calendarData[17] || calendarData[0]); // Oct 18 (Today)

  const totalMonthlyFlights = calendarData.reduce((acc, d) => acc + d.flightsCount, 0);
  const totalDelayed = calendarData.reduce((acc, d) => acc + d.delayed, 0);
  const totalOnTime = calendarData.reduce((acc, d) => acc + d.onTime, 0);
  const monthlyOnTimeRate = Math.round((totalOnTime / totalMonthlyFlights) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Flight Operations Calendar</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            October 2024 flight rotation schedules, peak traffic heatmaps, and on-time reliability audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F1FA] border border-[#C6DCF3] text-xs font-mono">
            <span className="font-bold text-[#1E63B3]">{totalMonthlyFlights.toLocaleString()} Movements</span>
            <span className="text-[#8F8372]">|</span>
            <span className="font-bold text-emerald-700">{monthlyOnTimeRate}% On-Time</span>
          </div>
        </div>
      </div>

      {/* Monthly Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sky-card p-4">
          <span className="text-xs font-bold text-[#8F8372] uppercase tracking-wider">Total Operations Planned</span>
          <div className="text-2xl font-black font-mono text-[#0C1D36] mt-1">
            {totalMonthlyFlights.toLocaleString()} Flights
          </div>
          <div className="text-xs text-emerald-700 font-bold mt-1">
            Daily average: {Math.round(totalMonthlyFlights / 31)} flights
          </div>
        </div>

        <div className="sky-card p-4">
          <span className="text-xs font-bold text-[#8F8372] uppercase tracking-wider">Average OTP (On-Time Perf.)</span>
          <div className="text-2xl font-black font-mono text-emerald-700 mt-1">
            {monthlyOnTimeRate}%
          </div>
          <div className="text-xs text-[#8F8372] mt-1">
            Industry Benchmark: 88.0% (+{monthlyOnTimeRate - 88}%)
          </div>
        </div>

        <div className="sky-card p-4">
          <span className="text-xs font-bold text-[#8F8372] uppercase tracking-wider">Peak Operational Days</span>
          <div className="text-2xl font-black font-mono text-[#1E63B3] mt-1">
            Saturdays & Sundays
          </div>
          <div className="text-xs text-[#A9843F] font-semibold mt-1">
            Highest: Day 26 (282 scheduled sectors)
          </div>
        </div>
      </div>

      {/* Calendar Grid & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The 31-day October Grid */}
        <div className="lg:col-span-2 sky-card p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBBE]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#C5A059]" />
              <h3 className="text-base font-extrabold text-[#0C1D36]">October 2024 Flight Schedule</h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#1E63B3] bg-[#E9F1FA] px-2.5 py-1 rounded-md border border-[#C6DCF3]">
              31 Operational Days
            </span>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-[#8F8372] uppercase tracking-wider mb-2">
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
            <div>Mon</div>
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((d) => {
              const isSelected = selectedDay?.day === d.day;
              const isToday = d.highlight;
              const onTimePct = Math.round((d.onTime / d.flightsCount) * 100);

              return (
                <div
                  key={d.day}
                  onClick={() => setSelectedDay(d)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-h-[75px] ${
                    isSelected
                      ? 'bg-[#0C1D36] text-white border-[#0C1D36] shadow-md ring-2 ring-[#C5A059]'
                      : isToday
                      ? 'bg-[#E9F1FA] border-[#1E63B3] text-[#0C1D36]'
                      : 'bg-[#FDF6E3] border-[#EADBBE] hover:border-[#1E63B3] text-[#0C1D36]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm">{d.day}</span>
                    {isToday && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 live-indicator" title="Current Day" />
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="font-mono font-extrabold text-xs">
                      {d.flightsCount}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        isSelected ? 'text-[#C5A059]' : onTimePct >= 93 ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {onTimePct}% OTP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Card */}
        {selectedDay && (
          <div className="sky-card p-5 flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-[#EADBBE]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A9843F]">
                  Selected Day Telemetry
                </span>
                <h3 className="text-xl font-black text-[#0C1D36] mt-0.5">
                  Day {selectedDay.day} October 2024 ({selectedDay.weekday})
                </h3>
                {selectedDay.highlight && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                    Current Operational Day
                  </span>
                )}
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#EADBBE]/50">
                  <span className="text-[#8F8372]">Total Scheduled Flights:</span>
                  <strong className="font-mono text-[#0C1D36] text-sm">{selectedDay.flightsCount} flights</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#EADBBE]/50">
                  <span className="text-[#8F8372]">On-Time Departures:</span>
                  <strong className="font-mono text-emerald-700 font-bold">{selectedDay.onTime}</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#EADBBE]/50">
                  <span className="text-[#8F8372]">Delayed Departures:</span>
                  <strong className="font-mono text-red-600 font-bold">{selectedDay.delayed}</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#EADBBE]/50">
                  <span className="text-[#8F8372]">Daily On-Time Rating:</span>
                  <strong className="font-mono text-[#1E63B3] text-sm">
                    {Math.round((selectedDay.onTime / selectedDay.flightsCount) * 100)}%
                  </strong>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#8F8372]">Operational Reliability</span>
                    <span className="font-bold text-emerald-700">
                      {Math.round((selectedDay.onTime / selectedDay.flightsCount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EADBBE] rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-full rounded-l-full"
                      style={{
                        width: `${Math.round((selectedDay.onTime / selectedDay.flightsCount) * 100)}%`
                      }}
                    />
                    <div
                      className="bg-red-500 h-full rounded-r-full"
                      style={{
                        width: `${Math.round((selectedDay.delayed / selectedDay.flightsCount) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF6E3] border border-[#EADBBE] text-[11px] text-[#8F8372] mt-4">
                  <strong className="text-[#0C1D36] block mb-1">Dispatch Advisory:</strong>
                  Standard ATC slots allocated. Morning wave (06:00 - 10:00) and evening international bank (18:00 - 22:00) expected at capacity.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADBBE]">
              <div className="text-[11px] text-center font-mono text-[#8F8372]">
                SkyRoute Operations Automation Engine
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
