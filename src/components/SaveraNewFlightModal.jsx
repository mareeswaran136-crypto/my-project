import React, { useState } from 'react';
import {
  X,
  Plane,
  Clock,
  Compass,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraNewFlightModal = () => {
  const { isNewFlightModalOpen, setIsNewFlightModalOpen, addFlight } = useSavera();

  const [formData, setFormData] = useState({
    flightNumber: 'SV 418',
    origin: 'Delhi (DEL)',
    originCode: 'DEL',
    destination: 'Bengaluru (BLR)',
    destinationCode: 'BLR',
    scheduledDeparture: '14:30 IST',
    scheduledArrival: '17:15 IST',
    aircraft: 'VT-SAV (A350-900)',
    aircraftType: 'Airbus A350-900',
    captain: 'Capt. Rajesh Varma',
    firstOfficer: 'FO Priya Sen',
    passengers: 280,
    capacity: 310,
    status: 'Scheduled',
    gate: 'Gate 22B',
    terminal: 'T3'
  });

  if (!isNewFlightModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlight(formData);
    setIsNewFlightModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-lg w-full shadow-2xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/30 flex items-center justify-center text-[#E8C77E]">
              <Plane className="w-4 h-4 transform -rotate-45" />
            </div>
            <h3 className="text-base font-bold text-white m-0">
              Schedule New Flight Dispatch
            </h3>
          </div>
          <button
            onClick={() => setIsNewFlightModalOpen(false)}
            className="text-[#AAB2C2] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1">Flight Number</label>
              <input
                type="text"
                required
                value={formData.flightNumber}
                onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Assigned Aircraft</label>
              <select
                value={formData.aircraft}
                onChange={(e) => setFormData({ ...formData, aircraft: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              >
                <option value="VT-SAV (A350-900)">VT-SAV (A350-900)</option>
                <option value="VT-SVR (A321neo)">VT-SVR (A321neo)</option>
                <option value="VT-LUX (B787-9)">VT-LUX (B787-9)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1">Departure City</label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value, originCode: e.target.value.slice(0,3).toUpperCase() })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Arrival City</label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value, destinationCode: e.target.value.slice(0,3).toUpperCase() })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1">Departure Time</label>
              <input
                type="text"
                required
                value={formData.scheduledDeparture}
                onChange={(e) => setFormData({ ...formData, scheduledDeparture: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Arrival Time</label>
              <input
                type="text"
                required
                value={formData.scheduledArrival}
                onChange={(e) => setFormData({ ...formData, scheduledArrival: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1">Captain Commander</label>
              <input
                type="text"
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-[#AAB2C2] block mb-1">Gate / Terminal</label>
              <input
                type="text"
                value={formData.gate}
                onChange={(e) => setFormData({ ...formData, gate: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/20 p-2 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8C77E]/20 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewFlightModalOpen(false)}
              className="savera-btn-secondary py-1.5 px-3.5 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="savera-btn-gold py-1.5 px-4 text-xs cursor-pointer shadow-md"
            >
              Dispatch Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveraNewFlightModal;
