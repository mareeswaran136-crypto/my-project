import React, { useState } from 'react';
import { X, Plane, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const NewFlightModal = () => {
  const { isNewFlightModalOpen, setIsNewFlightModalOpen, addFlight, fleet } = useSkyRoute();

  const [formData, setFormData] = useState({
    flightNumber: 'SR' + Math.floor(100 + Math.random() * 900),
    airline: 'SkyRoute Express',
    origin: 'Chennai',
    originCode: 'MAA',
    destination: 'Singapore',
    destinationCode: 'SIN',
    status: 'Scheduled',
    departureTime: '18:30',
    arrivalTime: '01:15',
    gate: 'B08',
    terminal: 'T2',
    aircraft: 'VT-ABC',
    aircraftModel: 'Airbus A320neo',
    captain: 'Capt. Arjun Sharma',
    passengers: 154,
    capacity: 180,
    distanceKm: 2910,
    eta: 'Scheduled 18:30',
    category: 'International'
  });

  if (!isNewFlightModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlight(formData);
    setIsNewFlightModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFBF0] border border-[#EADBBE] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C1D36] text-[#FDF6E3] p-5 flex items-center justify-between border-b border-[#1B3E70]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E63B3] flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Schedule New Flight</h3>
              <p className="text-xs text-[#8F8372]">Create a flight dispatch order</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewFlightModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8F8372] hover:text-white hover:bg-[#132D52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Flight Number</label>
              <input
                type="text"
                required
                value={formData.flightNumber}
                onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Airline Brand</label>
              <select
                value={formData.airline}
                onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              >
                <option value="SkyRoute Express">SkyRoute Express</option>
                <option value="SkyRoute Premium">SkyRoute Premium</option>
                <option value="SkyRoute Shuttle">SkyRoute Shuttle</option>
                <option value="SkyRoute Regional">SkyRoute Regional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Origin City & Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City (e.g. Chennai)"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-2/3 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
                <input
                  type="text"
                  placeholder="MAA"
                  maxLength={3}
                  required
                  value={formData.originCode}
                  onChange={(e) => setFormData({ ...formData, originCode: e.target.value.toUpperCase() })}
                  className="w-1/3 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Destination City & Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City (e.g. Singapore)"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-2/3 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
                <input
                  type="text"
                  placeholder="SIN"
                  maxLength={3}
                  required
                  value={formData.destinationCode}
                  onChange={(e) => setFormData({ ...formData, destinationCode: e.target.value.toUpperCase() })}
                  className="w-1/3 px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Scheduled Departure</label>
              <input
                type="text"
                placeholder="18:30"
                required
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Scheduled Arrival</label>
              <input
                type="text"
                placeholder="01:15"
                required
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Gate</label>
              <input
                type="text"
                value={formData.gate}
                onChange={(e) => setFormData({ ...formData, gate: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Terminal</label>
              <input
                type="text"
                value={formData.terminal}
                onChange={(e) => setFormData({ ...formData, terminal: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              >
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Assigned Aircraft Tail</label>
              <select
                value={formData.aircraft}
                onChange={(e) => {
                  const sel = fleet.find(a => a.tailNumber === e.target.value);
                  setFormData({
                    ...formData,
                    aircraft: e.target.value,
                    aircraftModel: sel ? sel.model : formData.aircraftModel
                  });
                }}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-bold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              >
                {fleet.map((ac) => (
                  <option key={ac.tailNumber} value={ac.tailNumber}>
                    {ac.tailNumber} ({ac.model})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Flight Commander</label>
              <input
                type="text"
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FDF6E3] border-t border-[#EADBBE] -mx-6 -mb-6 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsNewFlightModalOpen(false)}
              className="px-4 py-2 border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#8F8372] hover:bg-[#EADBBE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1E63B3] hover:bg-[#154A87] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              Dispatch & Schedule Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFlightModal;
