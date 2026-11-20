import React, { useState } from 'react';
import {
  Radio,
  Compass,
  Plane,
  Eye,
  ShieldAlert,
  Wind,
  Navigation,
  Activity,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';
import RadarScreen from '../components/RadarScreen';

const RadarPage = () => {
  const { radarFlights, clock, currentHub, setSelectedFlight, flights } = useSkyRoute();
  const [selectedRadarId, setSelectedRadarId] = useState(radarFlights[0]?.id || null);

  const selectedTarget = radarFlights.find(r => r.id === selectedRadarId) || radarFlights[0];

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-600 animate-pulse" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Airborne Radar & Telemetry Tracker</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Secondary Surveillance Radar (SSR) transponder feeds • Coverage: South Asian Bay of Bengal & Arabian Sea FIR
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C1D36] text-cyan-400 font-mono text-xs border border-cyan-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 live-indicator" />
            <span>RADAR FEED: ONLINE</span>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-[#E9F1FA] text-[#1E63B3] font-mono text-xs font-bold border border-[#C6DCF3]">
            {radarFlights.length} Airborne Contacts
          </span>
        </div>
      </div>

      {/* Main Radar Screen Display */}
      <RadarScreen height="560px" showControls={true} />

      {/* Bottom Grid: Airborne Targets Telemetry Roster & Airspace Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Transponders Roster */}
        <div className="lg:col-span-2 sky-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#1E63B3]" />
              <h3 className="text-sm font-bold text-[#0C1D36]">Enroute Transponder Telemetry Roster</h3>
            </div>
            <span className="text-[11px] font-mono text-[#8F8372]">SSR Mode-S Data</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#EADBBE] text-[#8F8372] uppercase text-[10px]">
                  <th className="py-2 px-3">Callsign</th>
                  <th className="py-2 px-3">Sector</th>
                  <th className="py-2 px-3">Squawk</th>
                  <th className="py-2 px-3">Altitude</th>
                  <th className="py-2 px-3">Speed</th>
                  <th className="py-2 px-3">Heading</th>
                  <th className="py-2 px-3">Phase</th>
                  <th className="py-2 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBBE]/70">
                {radarFlights.map((rf) => (
                  <tr
                    key={rf.id}
                    onClick={() => setSelectedRadarId(rf.id)}
                    className={`hover:bg-[#FAF4E5] cursor-pointer transition-colors ${
                      selectedRadarId === rf.id ? 'bg-[#FAF4E5] font-bold text-[#1E63B3]' : 'text-[#0C1D36]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold">{rf.flightNumber}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-gray-700">{rf.route}</td>
                    <td className="py-2.5 px-3 text-cyan-700 font-bold">{rf.squawk}</td>
                    <td className="py-2.5 px-3">{rf.altitude.toLocaleString()} FT</td>
                    <td className="py-2.5 px-3">{rf.speed} km/h</td>
                    <td className="py-2.5 px-3">{rf.heading}°</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E9F1FA] text-[#1E63B3] font-sans font-semibold">
                        {rf.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          const m = flights.find(f => f.flightNumber === rf.flightNumber);
                          if (m) setSelectedFlight(m);
                        }}
                        className="p-1 text-[#1E63B3] hover:underline text-[11px] font-sans font-bold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Airspace Advisory & Weather METAR */}
        <div className="space-y-4">
          <div className="sky-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-4 h-4 text-[#1E63B3]" />
              <h3 className="text-sm font-bold text-[#0C1D36]">Enroute Airspace METAR</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FDF6E3] border border-[#EADBBE]">
                <div className="flex justify-between items-center font-bold text-[#0C1D36]">
                  <span>VOMM (Chennai International)</span>
                  <span className="text-emerald-700 font-mono">CAVOK</span>
                </div>
                <p className="text-[11px] font-mono text-[#8F8372] mt-1">
                  181430Z 08008KT 9999 FEW020 29/24 Q1012 NOSIG
                </p>
                <div className="mt-1.5 text-[10px] text-[#A9843F]">
                  Wind 080° at 8 knots • Visibility 10km+ • Altimeter 1012 hPa
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FDF6E3] border border-[#EADBBE]">
                <div className="flex justify-between items-center font-bold text-[#0C1D36]">
                  <span>VABB (Mumbai International)</span>
                  <span className="text-amber-700 font-mono">CROSSWIND</span>
                </div>
                <p className="text-[11px] font-mono text-[#8F8372] mt-1">
                  181400Z 27022G28KT 6000 SCT018 31/22 Q1010 TEMPO
                </p>
                <div className="mt-1.5 text-[10px] text-amber-700 font-semibold">
                  Gusting crosswinds 28 kts across RWY 27. Moderate turbulence on final approach.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FDF6E3] border border-[#EADBBE]">
                <div className="flex justify-between items-center font-bold text-[#0C1D36]">
                  <span>OMDB (Dubai International)</span>
                  <span className="text-emerald-700 font-mono">CLEAR</span>
                </div>
                <p className="text-[11px] font-mono text-[#8F8372] mt-1">
                  181300Z 34010KT CAVOK 33/19 Q1014 NOSIG
                </p>
                <div className="mt-1.5 text-[10px] text-[#A9843F]">
                  Slot flow control delay ~20 mins due to Gulf airspace density.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarPage;
