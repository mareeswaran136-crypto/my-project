import React, { useState } from 'react';
import { X, UserPlus, Users } from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const NewCrewModal = () => {
  const { isCrewModalOpen, setIsCrewModalOpen, addCrewMember } = useSkyRoute();

  const [formData, setFormData] = useState({
    name: '',
    role: 'Pilot',
    designation: 'First Officer',
    flightNumber: 'Unassigned',
    aircraftType: 'Airbus A320neo',
    flightHours: '1,200 hrs',
    licenseNumber: 'CPL-IND-' + Math.floor(1000 + Math.random() * 9000),
    baseCity: 'Chennai',
    phone: '+91 98400 ' + Math.floor(10000 + Math.random() * 90000)
  });

  if (!isCrewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addCrewMember(formData);
    setIsCrewModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFBF0] border border-[#EADBBE] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C1D36] text-[#FDF6E3] p-5 flex items-center justify-between border-b border-[#1B3E70]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E63B3] flex items-center justify-center text-white">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Register Flight Crew Member</h3>
              <p className="text-xs text-[#8F8372]">Roster & Crew Assignment</p>
            </div>
          </div>
          <button
            onClick={() => setIsCrewModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8F8372] hover:text-white hover:bg-[#132D52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Capt. Ramesh Sen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Crew Role</label>
              <select
                value={formData.role}
                onChange={(e) => {
                  const role = e.target.value;
                  setFormData({
                    ...formData,
                    role,
                    designation: role === 'Pilot' ? 'Captain / Commander' : 'Lead In-Flight Purser'
                  });
                }}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              >
                <option value="Pilot">Flight Deck (Pilot)</option>
                <option value="Cabin Crew">Cabin Crew</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Type Rating / Aircraft</label>
              <input
                type="text"
                value={formData.aircraftType}
                onChange={(e) => setFormData({ ...formData, aircraftType: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Flight Hours Logged</label>
              <input
                type="text"
                value={formData.flightHours}
                onChange={(e) => setFormData({ ...formData, flightHours: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Base Hub City</label>
              <input
                type="text"
                value={formData.baseCity}
                onChange={(e) => setFormData({ ...formData, baseCity: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FDF6E3] border-t border-[#EADBBE] -mx-6 -mb-6 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsCrewModalOpen(false)}
              className="px-4 py-2 border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#8F8372] hover:bg-[#EADBBE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1E63B3] hover:bg-[#154A87] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              Add to Roster
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCrewModal;
