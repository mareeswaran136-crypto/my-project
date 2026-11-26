import React, { useState } from 'react';
import { X, Plane, Layers, ShieldCheck, Wrench, Plus } from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import { api } from '../services/api';

const SaveraNewAircraftModal = ({ isOpen, onClose }) => {
  const { setFleet, showToast } = useSavera();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    registration: 'VT-SV',
    model: 'Airbus A350-900',
    modelCode: 'A350',
    msn: `${Math.floor(1000 + Math.random() * 9000)}`,
    capacity: 310,
    engineType: 'Rolls-Royce Trent XWB-84',
    availabilityStatus: 'Active',
    fleetHealthScore: 99.2,
    suites: 0,
    business: 32,
    economy: 278
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.registration || !formData.model) return;
    setIsSubmitting(true);

    const reg = formData.registration.toUpperCase().trim();
    const payload = {
      registration: reg,
      model: formData.model,
      modelCode: formData.model.includes('350') ? 'A350' : (formData.model.includes('787') ? 'B787' : (formData.model.includes('777') ? 'B777' : 'A320')),
      msn: formData.msn,
      capacity: Number(formData.capacity) || 310,
      airline: 'SAVÉRA',
      engineType: formData.engineType,
      availabilityStatus: formData.availabilityStatus,
      status: formData.availabilityStatus === 'In Maintenance' ? 'Maintenance' : 'Active',
      fleetHealthScore: Number(formData.fleetHealthScore) || 99,
      cabinBreakdown: {
        first: Number(formData.suites) || 0,
        business: Number(formData.business) || 32,
        economy: Number(formData.economy) || 278
      },
      isActive: true
    };

    try {
      const created = await api.fleet.create(payload);
      if (created) {
        setFleet(prev => [created, ...prev]);
      }
      showToast(`Aircraft ${reg} (${formData.model}) registered in MongoDB!`, 'gold');
      onClose();
    } catch (err) {
      console.warn('Backend fleet creation failed, added locally:', err.message);
      const localAc = {
        id: reg,
        _id: reg,
        tailNumber: reg,
        registration: reg,
        model: formData.model,
        manufacturer: formData.model.includes('Boeing') ? 'Boeing' : 'Airbus',
        status: formData.availabilityStatus === 'In Maintenance' ? 'Hangar Maintenance' : formData.availabilityStatus,
        availabilityStatus: formData.availabilityStatus,
        healthScore: formData.fleetHealthScore,
        assignedFlight: 'Standby',
        assignedRoute: 'Unassigned',
        totalHours: '0 hrs',
        cycles: '0',
        fuelCapacity: '141,000 L',
        currentFuel: '100%',
        nextCheck: 'A-Check in 500 hrs',
        airworthiness: '100% Certified',
        cabinConfig: `J${formData.business} Y${formData.economy}`
      };
      setFleet(prev => [localAc, ...prev]);
      showToast(`Aircraft ${reg} registered locally (${err.message})`, 'gold');
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
              <Plane className="w-4 h-4 transform -rotate-45" />
            </div>
            <h3 className="text-base font-bold text-white m-0">
              Register Fleet Aircraft
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
                Tail Registration
              </label>
              <input
                type="text"
                required
                placeholder="VT-SAV"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white font-mono focus:outline-none focus:border-[#E8C77E]"
              />
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Aircraft Model
              </label>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="Airbus A350-900">Airbus A350-900</option>
                <option value="Boeing 787-9 Dreamliner">Boeing 787-9 Dreamliner</option>
                <option value="Boeing 777-300ER">Boeing 777-300ER</option>
                <option value="Airbus A321neo">Airbus A321neo</option>
                <option value="Airbus A320neo">Airbus A320neo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Manufacturer Serial (MSN)
              </label>
              <input
                type="text"
                value={formData.msn}
                onChange={(e) => setFormData({ ...formData, msn: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white font-mono focus:outline-none focus:border-[#E8C77E]"
              />
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Total Passenger Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Powerplant / Engines
              </label>
              <input
                type="text"
                value={formData.engineType}
                onChange={(e) => setFormData({ ...formData, engineType: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              />
            </div>

            <div>
              <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                Availability Status
              </label>
              <select
                value={formData.availabilityStatus}
                onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
              >
                <option value="Active">Active (Flight Line)</option>
                <option value="Standby">Standby (Reserve)</option>
                <option value="In Maintenance">In Maintenance (Hangar)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
              Cabin Layout (Suites / Business / Economy)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="First/Suites"
                value={formData.suites}
                onChange={(e) => setFormData({ ...formData, suites: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white text-center"
              />
              <input
                type="number"
                placeholder="Business"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white text-center"
              />
              <input
                type="number"
                placeholder="Economy"
                value={formData.economy}
                onChange={(e) => setFormData({ ...formData, economy: e.target.value })}
                className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white text-center"
              />
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
              <Plus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Registering...' : 'Register Airframe'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveraNewAircraftModal;
