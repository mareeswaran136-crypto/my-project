import React, { useState } from 'react';
import { X, Wrench, AlertTriangle } from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const NewMaintenanceModal = () => {
  const { isMaintenanceModalOpen, setIsMaintenanceModalOpen, addMaintenanceOrder, fleet } = useSkyRoute();

  const [formData, setFormData] = useState({
    aircraftTail: 'VT-GHI',
    aircraftModel: 'Airbus A320',
    taskName: '',
    taskCategory: 'Scheduled Maintenance',
    priority: 'High',
    assignedLead: 'Suresh Patel (Chief A&P)',
    location: 'Hangar 1 - MAA',
    dueDate: '25 Oct 2024',
    estHours: '8 hrs',
    description: ''
  });

  if (!isMaintenanceModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.taskName) return;
    addMaintenanceOrder(formData);
    setIsMaintenanceModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFBF0] border border-[#EADBBE] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C1D36] text-[#FDF6E3] p-5 flex items-center justify-between border-b border-[#1B3E70]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A059] flex items-center justify-center text-[#0C1D36]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Log Maintenance Work Order</h3>
              <p className="text-xs text-[#8F8372]">Airframe & Powerplant Engineering</p>
            </div>
          </div>
          <button
            onClick={() => setIsMaintenanceModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8F8372] hover:text-white hover:bg-[#132D52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Aircraft Tail</label>
              <select
                value={formData.aircraftTail}
                onChange={(e) => {
                  const sel = fleet.find(a => a.tailNumber === e.target.value);
                  setFormData({
                    ...formData,
                    aircraftTail: e.target.value,
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
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              >
                <option value="Critical">Critical (AOG - Aircraft on Ground)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Routine">Routine Scheduled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Task Title / Inspection</label>
            <input
              type="text"
              required
              placeholder="e.g. Engine 1 Borescope & Oil Filter Inspection"
              value={formData.taskName}
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Category</label>
              <input
                type="text"
                placeholder="e.g. Avionics, Landing Gear"
                value={formData.taskCategory}
                onChange={(e) => setFormData({ ...formData, taskCategory: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Est. Repair Time</label>
              <input
                type="text"
                placeholder="e.g. 12 hrs"
                value={formData.estHours}
                onChange={(e) => setFormData({ ...formData, estHours: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-mono font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Location / Hangar</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0C1D36] mb-1">Assigned Lead Tech</label>
              <input
                type="text"
                value={formData.assignedLead}
                onChange={(e) => setFormData({ ...formData, assignedLead: e.target.value })}
                className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0C1D36] mb-1">Defect / Work Scope Description</label>
            <textarea
              rows={3}
              placeholder="Describe symptoms, telemetry logs, or maintenance directives..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="p-4 bg-[#FDF6E3] border-t border-[#EADBBE] -mx-6 -mb-6 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsMaintenanceModalOpen(false)}
              className="px-4 py-2 border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#8F8372] hover:bg-[#EADBBE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0C1D36] hover:bg-[#132D52] text-[#FDF6E3] rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-[#C5A059]" />
              Create Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMaintenanceModal;
