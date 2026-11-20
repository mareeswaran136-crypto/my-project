import React from 'react';
import {
  Plane,
  Clock,
  Users,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraKpiCards = () => {
  const { stats } = useSavera();

  const cards = [
    {
      id: 'active-flights',
      title: 'Active Flights',
      value: stats.activeFlights.value,
      unit: '',
      change: stats.activeFlights.change,
      isPositive: true,
      subtext: `${stats.activeFlights.inAir} in air • ${stats.activeFlights.boarding} boarding • ${stats.activeFlights.taxiing} taxiing`,
      icon: Plane,
      iconColor: 'text-[#E8C77E]',
      iconBg: 'bg-[#E8C77E]/12 border-[#E8C77E]/30 shadow-[0_0_12px_rgba(232,199,126,0.15)]',
      indicator: 'Operational Airspace Normal'
    },
    {
      id: 'on-time-perf',
      title: 'On-Time Performance',
      value: `${stats.onTimePerformance.value}%`,
      unit: '',
      change: stats.onTimePerformance.change,
      isPositive: true,
      subtext: `Target: >92.0% • 4 minor delays avg 14 min`,
      icon: Clock,
      iconColor: 'text-[#82D197]',
      iconBg: 'bg-[#82D197]/12 border-[#82D197]/30 shadow-[0_0_12px_rgba(130,209,151,0.15)]',
      indicator: 'Above Target Index'
    },
    {
      id: 'crew-on-duty',
      title: 'Crew On Duty',
      value: stats.crewOnDuty.value,
      unit: `/${stats.crewOnDuty.totalCrew}`,
      change: stats.crewOnDuty.change,
      isPositive: true,
      subtext: `${stats.crewOnDuty.captains} Captains • ${stats.crewOnDuty.firstOfficers} FOs • ${stats.crewOnDuty.cabinCrew} Cabin`,
      icon: Users,
      iconColor: 'text-[#69C0FF]',
      iconBg: 'bg-[#69C0FF]/12 border-[#69C0FF]/30 shadow-[0_0_12px_rgba(105,192,255,0.15)]',
      indicator: '16 Standby Available'
    },
    {
      id: 'fleet-utilization',
      title: 'Fleet Utilization',
      value: stats.aircraftOnline.change,
      unit: '',
      change: `${stats.aircraftOnline.value}/${stats.aircraftOnline.totalFleet}`,
      isPositive: true,
      subtext: `${stats.aircraftOnline.value} Active • ${stats.aircraftOnline.inMaintenance} Hangar Check • 1 Standby`,
      icon: Activity,
      iconColor: 'text-[#ECC168]',
      iconBg: 'bg-[#ECC168]/12 border-[#ECC168]/30 shadow-[0_0_12px_rgba(236,193,104,0.15)]',
      indicator: 'Optimal Load Metric'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="savera-card p-5 relative overflow-hidden group cursor-pointer"
          >
            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9EABBE]">
                {card.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${card.iconBg}`}
              >
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            {/* Middle: Big Stat */}
            <div className="mt-3.5 flex items-baseline gap-2">
              <span className="text-3xl font-black font-serif text-[#F8F6F0] tracking-tight text-gold-gradient">
                {card.value}
              </span>
              {card.unit && (
                <span className="text-sm font-bold text-[#9EABBE]">
                  {card.unit}
                </span>
              )}
              <span
                className={`ml-auto inline-flex items-center text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                  card.isPositive
                    ? 'text-[#82D197] bg-[#82D197]/15 border border-[#82D197]/30'
                    : 'text-[#E87474] bg-[#E87474]/15 border border-[#E87474]/30'
                }`}
              >
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {card.change}
              </span>
            </div>

            {/* Supporting Information */}
            <p className="mt-2 text-[11px] text-[#9EABBE] leading-relaxed truncate m-0 font-medium">
              {card.subtext}
            </p>

            {/* Bottom Row: Status Indicator */}
            <div className="mt-3.5 pt-3 border-t border-[#E8C77E]/12 flex items-center justify-between text-[10px]">
              <span className="text-[#9EABBE]/70 font-semibold uppercase tracking-wider">Demonstration Metric</span>
              <span className="text-[#F7E5B5] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C77E] shadow-[0_0_6px_#E8C77E]" />
                {card.indicator}
              </span>
            </div>

            {/* Subtle Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E8C77E]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};

export default SaveraKpiCards;
