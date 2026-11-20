import React, { useState } from 'react';
import {
  Radio,
  Compass,
  Plane,
  Eye,
  Shield,
  Navigation,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const RadarScreen = ({ height = '520px', showControls = true }) => {
  const { radarFlights, setSelectedFlight, flights } = useSkyRoute();
  const [selectedTarget, setSelectedTarget] = useState(radarFlights[0] || null);
  const [altitudeFilter, setAltitudeFilter] = useState('ALL'); // ALL, HIGH (>34000), MID (<34000)

  const filteredFlights = radarFlights.filter(f => {
    if (altitudeFilter === 'HIGH') return f.altitude >= 35000;
    if (altitudeFilter === 'MID') return f.altitude < 35000;
    return true;
  });

  const handleFlightClick = (rf) => {
    setSelectedTarget(rf);
    // Find matching flight in full flights data if available
    const matched = flights.find(f => f.flightNumber === rf.flightNumber);
    if (matched) {
      // Don't necessarily open the full modal immediately so user can inspect HUD
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* The Radar Canvas Container */}
      <div
        className="relative flex-1 rounded-2xl overflow-hidden border border-[#1B3E70] bg-[#071224] flex items-center justify-center select-none shadow-xl"
        style={{ minHeight: height }}
      >
        {/* Radar Range Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 - 50nm */}
          <div className="w-[18%] h-[18%] rounded-full border border-cyan-800/30 border-dashed" />
          {/* Ring 2 - 100nm */}
          <div className="w-[36%] h-[36%] rounded-full border border-cyan-800/40" />
          {/* Ring 3 - 200nm */}
          <div className="w-[58%] h-[58%] rounded-full border border-cyan-800/35 border-dashed" />
          {/* Ring 4 - 300nm */}
          <div className="w-[82%] h-[82%] rounded-full border border-cyan-800/45" />
          {/* Ring 5 - 400nm Outer Boundary */}
          <div className="w-[96%] h-[96%] rounded-full border border-cyan-600/50" />

          {/* Compass Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-cyan-900/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-[1px] bg-cyan-900/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center rotate-45">
            <div className="w-full h-[1px] bg-cyan-950/40" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <div className="w-full h-[1px] bg-cyan-950/40" />
          </div>
        </div>

        {/* Radar Rotating Sweep Line */}
        <div className="radar-sweep-beam" />

        {/* Center Station Transmitter Dot (MAA Hub) */}
        <div className="absolute z-20 flex flex-col items-center pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_12px_#00f0ff] animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white -mt-2.5" />
          <span className="mt-1 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#0C1D36]/90 text-cyan-300 border border-cyan-700/50 rounded shadow">
            MAA TWR (118.1 MHz)
          </span>
        </div>

        {/* Cardinal Azimuth Degrees */}
        <div className="absolute top-2 font-mono text-[10px] font-bold text-cyan-400/80">360° N</div>
        <div className="absolute bottom-2 font-mono text-[10px] font-bold text-cyan-400/80">180° S</div>
        <div className="absolute left-3 font-mono text-[10px] font-bold text-cyan-400/80">270° W</div>
        <div className="absolute right-3 font-mono text-[10px] font-bold text-cyan-400/80">090° E</div>

        {/* Range Ring Distance Labels */}
        <div className="absolute top-[31%] font-mono text-[9px] text-cyan-500/60 pointer-events-none">100 NM</div>
        <div className="absolute top-[20%] font-mono text-[9px] text-cyan-500/60 pointer-events-none">200 NM</div>
        <div className="absolute top-[8%] font-mono text-[9px] text-cyan-500/60 pointer-events-none">300 NM</div>

        {/* Airborne Targets / Blips */}
        {filteredFlights.map((rf) => {
          const isSelected = selectedTarget?.id === rf.id;
          return (
            <div
              key={rf.id}
              onClick={() => handleFlightClick(rf)}
              style={{ left: `${rf.x}%`, top: `${rf.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group transition-all`}
            >
              <div className="relative flex flex-col items-center">
                {/* Airplane directional blip */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-[#0C1D36] ring-4 ring-amber-400/40 shadow-[0_0_15px_#f59e0b]'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 hover:bg-cyan-400 hover:text-[#0C1D36] shadow-[0_0_10px_#00f0ff]'
                  }`}
                >
                  <Plane
                    className="w-4 h-4 transition-transform"
                    style={{ transform: `rotate(${rf.heading - 45}deg)` }}
                  />
                </div>

                {/* Tag Callout Label */}
                <div
                  className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap border shadow-lg transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-[#0C1D36] border-amber-500 font-extrabold'
                      : 'bg-[#0C1D36]/90 text-cyan-300 border-cyan-700/60 group-hover:border-cyan-400'
                  }`}
                >
                  <div>{rf.flightNumber} • FL{Math.round(rf.altitude / 100)}</div>
                  <div className="text-[8px] text-gray-400 font-normal">{rf.speed} kt • {rf.heading}°</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Top Overlay Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C1D36]/85 border border-[#1B3E70] text-xs font-mono text-cyan-300 backdrop-blur-xs">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-bold">SKYROUTE PRIMARY RADAR (PSR/SSR)</span>
          <span className="text-gray-500">|</span>
          <span className="text-emerald-400 font-bold">{filteredFlights.length} TARGETS</span>
        </div>

        {/* Filter Controls at Bottom of Radar */}
        {showControls && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#0C1D36]/90 border border-[#1B3E70] p-1 rounded-lg backdrop-blur-xs">
            <span className="text-[10px] font-mono text-[#8F8372] px-2">Altitude:</span>
            {['ALL', 'HIGH', 'MID'].map((flt) => (
              <button
                key={flt}
                onClick={() => setAltitudeFilter(flt)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                  altitudeFilter === flt
                    ? 'bg-cyan-500 text-[#0C1D36]'
                    : 'text-cyan-400 hover:bg-[#132D52]'
                }`}
              >
                {flt === 'ALL' ? 'All Flts' : flt === 'HIGH' ? '>FL340' : '<FL340'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Target Telemetry HUD Sidebar */}
      {selectedTarget && (
        <div className="w-full lg:w-80 bg-[#0C1D36] text-[#FDF6E3] border border-[#1B3E70] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1B3E70]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/50 flex items-center justify-center font-bold">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-base font-black text-amber-400">
                    {selectedTarget.flightNumber}
                  </h4>
                  <div className="text-[11px] text-[#8F8372] font-mono">{selectedTarget.route}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 rounded uppercase">
                {selectedTarget.status}
              </span>
            </div>

            {/* Flight HUD Data */}
            <div className="py-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">Squawk Code:</span>
                <span className="font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {selectedTarget.squawk}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">Altitude:</span>
                <span className="font-bold text-white">{selectedTarget.altitude.toLocaleString()} FT (FL{Math.round(selectedTarget.altitude / 100)})</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">Ground Speed:</span>
                <span className="font-bold text-white">{selectedTarget.speed} KM/H ({Math.round(selectedTarget.speed * 0.539957)} KTS)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">Heading:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Navigation
                    className="w-3.5 h-3.5 text-cyan-400"
                    style={{ transform: `rotate(${selectedTarget.heading}deg)` }}
                  />
                  {selectedTarget.heading}° DEG
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">GPS Position:</span>
                <span className="font-bold text-white">{selectedTarget.lat}, {selectedTarget.lon}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1B3E70]/60">
                <span className="text-[#8F8372]">Assigned Airframe:</span>
                <span className="font-bold text-amber-300">{selectedTarget.aircraft}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#8F8372]">ETA at Dest:</span>
                <span className="font-bold text-emerald-400">{selectedTarget.eta}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1B3E70]">
            <button
              onClick={() => {
                const matched = flights.find(f => f.flightNumber === selectedTarget.flightNumber);
                if (matched) {
                  setSelectedFlight(matched);
                }
              }}
              className="w-full py-2 bg-[#1E63B3] hover:bg-[#154A87] text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>View Full Flight Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadarScreen;
