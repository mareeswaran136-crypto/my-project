import React, { useState } from 'react';
import { X, UserPlus, Users, Plane, Award, Mail, Phone, Briefcase } from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import { api } from '../services/api';

const SaveraNewCrewModal = ({ isOpen, onClose }) => {
  const { setCrew, flights, showToast } = useSavera();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    crewRole: 'Captain',
    designation: 'Fleet Captain',
    department: 'Flight Operations',
    assignedFlightNumber: 'SV 302',
    aircraftType: 'Airbus A350-900',
    flightHoursTotal: 4500,
    officialEmail: '',
    phone: '+91 98765 43210',
    dutyStatus: 'On Duty',
    baseHub: 'DEL'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName) return;
    setIsSubmitting(true);

    const staffId = `CRW-${Math.floor(1000 + Math.random() * 9000)}`;
    const email = formData.officialEmail || `${formData.fullName.toLowerCase().replace(/[^a-z]/g, '.')}@savera.aero`;

    const payload = {
      staffId,
      crewId: staffId,
      badgeId: staffId,
      fullName: formData.fullName,
      officialEmail: email,
      crewRole: formData.crewRole,
      designation: formData.designation || `${formData.crewRole} (${formData.aircraftType.split(' ')[0]})`,
      department: formData.department,
      assignedFlightNumber: formData.assignedFlightNumber,
      aircraftType: formData.aircraftType,
      flightHoursTotal: Number(formData.flightHoursTotal) || 4500,
      phone: formData.phone,
      dutyStatus: formData.dutyStatus,
      baseHub: formData.baseHub,
      password: 'password123',
      role: 'staff',
      isActive: true
    };

    try {
      const created = await api.crew.create(payload);
      if (created) {
        setCrew(prev => [created, ...prev]);
      }
      showToast(`Crew member ${formData.fullName} (${staffId}) registered in MongoDB!`, 'gold');
      onClose();
    } catch (err) {
      console.warn('Backend crew creation failed, added locally:', err.message);
      const localCrew = {
        id: staffId,
        _id: staffId,
        name: formData.fullName,
        role: formData.crewRole,
        designation: formData.designation,
        department: formData.department,
        assignedFlight: formData.assignedFlightNumber,
        dutyTime: '02h 15m / 10h Max',
        dutyPercent: 22.5,
        dutyStatus: formData.dutyStatus,
        availabilityStatus: formData.dutyStatus,
        baseHub: formData.baseHub,
        experienceYears: 8,
        flightHours: `${formData.flightHoursTotal} hrs`,
        phone: formData.phone,
        email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        aircraftType: formData.aircraftType,
        license: `ATPL-IND-${Math.floor(10000 + Math.random() * 90000)}`
      };
      setCrew(prev => [localCrew, ...prev]);
      showToast(`Crew member ${formData.fullName} registered locally (${err.message})`, 'gold');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-lg w-full shadow-2xl p-6 text-white max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/30 flex items-center justify-center text-[#E8C77E]">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white m-0">
              Register Crew Member
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#AAB2C2] hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Capt. Ramesh Sen"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              />
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Crew Role
              </label>
              <select
                value={formData.crewRole}
                onChange={(e) => setFormData({ ...formData, crewRole: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="Captain">Captain</option>
                <option value="First Officer">First Officer</option>
                <option value="Cabin Senior">Cabin Senior / Purser</option>
                <option value="Cabin Crew">Cabin Crew</option>
                <option value="Operations">Operations Controller</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Aircraft Fleet Rating
              </label>
              <select
                value={formData.aircraftType}
                onChange={(e) => setFormData({ ...formData, aircraftType: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="Airbus A350-900">Airbus A350-900</option>
                <option value="Boeing 787-9 Dreamliner">Boeing 787-9 Dreamliner</option>
                <option value="Boeing 777-300ER">Boeing 777-300ER</option>
                <option value="Airbus A321neo">Airbus A321neo</option>
                <option value="Airbus A320neo">Airbus A320neo</option>
              </select>
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Duty Status
              </label>
              <select
                value={formData.dutyStatus}
                onChange={(e) => setFormData({ ...formData, dutyStatus: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="On Duty">On Duty</option>
                <option value="Standby">Standby (Reserves)</option>
                <option value="Rest Period">Rest Period (FTL Safe)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Assigned Flight Pair
              </label>
              <select
                value={formData.assignedFlightNumber}
                onChange={(e) => setFormData({ ...formData, assignedFlightNumber: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="Unassigned">Standby / Hot Reserve</option>
                {flights.map(f => (
                  <option key={f.id} value={f.flightNumber}>
                    {f.flightNumber} ({f.route || `${f.origin} ➔ ${f.destination}`})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Total Flight Hours
              </label>
              <input
                type="number"
                value={formData.flightHoursTotal}
                onChange={(e) => setFormData({ ...formData, flightHoursTotal: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Airline Email (Optional)
              </label>
              <input
                type="email"
                placeholder="auto-generated if empty"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              />
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Base Hub
              </label>
              <select
                value={formData.baseHub}
                onChange={(e) => setFormData({ ...formData, baseHub: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="DEL">Delhi Hub (DEL)</option>
                <option value="BOM">Mumbai Hub (BOM)</option>
                <option value="BLR">Bengaluru Hub (BLR)</option>
                <option value="MAA">Chennai Hub (MAA)</option>
                <option value="CCU">Kolkata Hub (CCU)</option>
                <option value="HYD">Hyderabad Hub (HYD)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8C77E]/20 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="savera-btn-gold py-1.5 px-4 text-xs cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Registering...' : 'Register Crew Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveraNewCrewModal;
