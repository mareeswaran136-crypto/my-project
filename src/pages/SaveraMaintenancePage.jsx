import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Plane,
  ShieldCheck,
  Plus,
  X
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';
import { api } from '../services/api';

const SaveraMaintenancePage = () => {
  const { maintenance, setMaintenance, fleet, showToast, signOffMaintenance } = useSavera();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [taskForm, setTaskForm] = useState({
    aircraftRegistration: fleet[0]?.tailNumber || 'VT-SAV',
    taskTitle: 'A-Check Periodic Airframe & Avionics Inspection',
    category: 'A-Check',
    hangarBay: 'DEL Terminal 3 Hangar Bay 4',
    status: 'IN PROGRESS'
  });

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const code = `WO-${Math.floor(1000 + Math.random() * 9000)}`;
    const selAircraft = fleet.find(a => a.tailNumber === taskForm.aircraftRegistration || a.registration === taskForm.aircraftRegistration) || fleet[0];

    const payload = {
      aircraftId: selAircraft?.id || taskForm.aircraftRegistration,
      taskTitle: taskForm.taskTitle,
      checkCode: code,
      category: taskForm.category,
      hangarBay: taskForm.hangarBay,
      status: taskForm.status,
      estimatedReturnToService: new Date(Date.now() + 6 * 3600 * 1000)
    };

    try {
      const created = await api.maintenance.create(payload);
      if (created) {
        setMaintenance(prev => [created, ...prev]);
      }
      showToast(`Work Order ${code} logged in MongoDB Hangar Registry!`, 'gold');
      setIsNewTaskOpen(false);
    } catch (err) {
      console.warn('Backend maintenance log failed, added locally:', err.message);
      const localTask = {
        id: code,
        _id: code,
        aircraft: `${selAircraft?.tailNumber || 'VT-SAV'} (${selAircraft?.model || 'Airbus A350-900'})`,
        task: taskForm.taskTitle,
        type: `${taskForm.category} (${code})`,
        technician: 'Eng. Suresh Nair (Lead)',
        hangar: taskForm.hangarBay,
        status: taskForm.status === 'IN PROGRESS' ? 'In Progress' : 'Scheduled',
        started: 'Today 08:00 IST',
        estCompletion: 'Today 16:30 IST',
        progress: taskForm.status === 'IN PROGRESS' ? 35 : 0
      };
      setMaintenance(prev => [localTask, ...prev]);
      showToast(`Work order ${code} logged locally (${err.message})`, 'gold');
      setIsNewTaskOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTasks = maintenance.filter(m => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        m.aircraft.toLowerCase().includes(q) ||
        m.task.toLowerCase().includes(q) ||
        m.technician.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filter === 'ALL') return true;
    if (filter === 'IN_PROGRESS') return m.status === 'In Progress';
    if (filter === 'SCHEDULED') return m.status === 'Scheduled';
    if (filter === 'COMPLETED') return m.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8C77E]/15">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C77E]/10 border border-[#E8C77E]/25 flex items-center justify-center text-[#E8C77E]">
              <Wrench className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0">
              Aircraft Maintenance & Technical Logs
            </h1>
          </div>
          <p className="text-xs text-[#AAB2C2] mt-1 m-0">
            Hangar inspection logs, A/B/C scheduled checks, avionics calibrations, engine health diagnostics, and DGCA airworthiness records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="savera-btn-gold py-2 px-4 text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Maintenance Task</span>
          </button>
        </div>
      </div>

      {/* Hangar Status KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
          <div className="text-xs text-[#AAB2C2] uppercase font-bold">Airframes in Hangar</div>
          <div className="text-2xl font-serif font-black text-[#E8B75F] mt-1">3 Frames</div>
          <div className="text-[10px] text-[#AAB2C2] font-mono">DEL Bay 4 & 5</div>
        </div>
        <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
          <div className="text-xs text-[#AAB2C2] uppercase font-bold">A-Check Cycle Cleared</div>
          <div className="text-2xl font-serif font-black text-[#91C98A] mt-1">29 Cleared</div>
          <div className="text-[10px] text-[#91C98A] font-mono">100% Airworthy</div>
        </div>
        <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
          <div className="text-xs text-[#AAB2C2] uppercase font-bold">Pending Calibrations</div>
          <div className="text-2xl font-serif font-black text-[#72C4FF] mt-1">2 Avionics</div>
          <div className="text-[10px] text-[#AAB2C2] font-mono">Routine weather radar test</div>
        </div>
        <div className="p-4 rounded-xl bg-[#10182B] border border-[#E8C77E]/20">
          <div className="text-xs text-[#AAB2C2] uppercase font-bold">Regulatory Audits</div>
          <div className="text-2xl font-serif font-black text-[#E8C77E] mt-1">Zero Findings</div>
          <div className="text-[10px] text-[#91C98A] font-mono">DGCA Compliant</div>
        </div>
      </div>

      {/* Maintenance Tasks Table */}
      <div className="savera-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E8C77E]/15 bg-[#10182B]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {['ALL', 'IN_PROGRESS', 'SCHEDULED', 'COMPLETED'].map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  filter === st
                    ? 'bg-[#E8C77E] text-[#080D1B]'
                    : 'text-[#AAB2C2] hover:text-white bg-[#080D1B] border border-[#E8C77E]/15'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search airframe tail or task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#080D1B] border border-[#E8C77E]/20 rounded-xl text-xs text-white placeholder-[#AAB2C2]/60 focus:outline-none focus:border-[#E8C77E]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8C77E]/15 bg-[#0C1424] text-[11px] font-bold uppercase tracking-wider text-[#AAB2C2]">
                <th className="py-3.5 px-4 sm:px-6">Aircraft Registration</th>
                <th className="py-3.5 px-4 sm:px-6">Maintenance Task</th>
                <th className="py-3.5 px-4 sm:px-6">Type & Check Code</th>
                <th className="py-3.5 px-4 sm:px-6">Assigned Engineer</th>
                <th className="py-3.5 px-4 sm:px-6">Estimated Return to Service</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8C77E]/10 text-xs">
              {filteredTasks.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTask(t)}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-white">
                    {t.aircraft}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-white font-medium">
                    {t.task}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="px-2 py-0.5 rounded bg-[#E8C77E]/15 text-[#E8C77E] font-mono text-[10px] font-bold">
                      {t.checkType || 'A-Check'}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#AAB2C2]">
                    {t.technician}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-white">
                    {t.scheduledDate || 'Tomorrow 08:00 IST'}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    {t.status === 'Completed' ? (
                      <span className="badge-status badge-ontime">Completed</span>
                    ) : t.status === 'In Progress' ? (
                      <span className="badge-status badge-boarding">In Progress</span>
                    ) : (
                      <span className="badge-status badge-scheduled">Scheduled</span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        signOffMaintenance(t.id, `Airworthiness sign-off completed for ${t.aircraft}`);
                      }}
                      className="savera-btn-secondary py-1 px-2.5 text-xs rounded-lg cursor-pointer"
                    >
                      Sign Off
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Creation Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111A2D] border border-[#E8C77E]/40 rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8C77E]/20">
              <h3 className="text-base font-bold text-white m-0">Schedule Hangar Maintenance</h3>
              <button onClick={() => setIsNewTaskOpen(false)} className="text-[#AAB2C2] hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                  Aircraft Tail Registration
                </label>
                <select
                  value={taskForm.aircraftRegistration}
                  onChange={(e) => setTaskForm({ ...taskForm, aircraftRegistration: e.target.value })}
                  className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white font-mono focus:outline-none focus:border-[#E8C77E]"
                >
                  {fleet.map((a) => (
                    <option key={a.tailNumber || a.registration} value={a.tailNumber || a.registration}>
                      {a.tailNumber || a.registration} ({a.model})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                  Task Title / Description
                </label>
                <input
                  type="text"
                  required
                  value={taskForm.taskTitle}
                  onChange={(e) => setTaskForm({ ...taskForm, taskTitle: e.target.value })}
                  className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                    Check Category
                  </label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
                  >
                    <option value="A-Check">A-Check (Standard 500-FH)</option>
                    <option value="Avionics Calibration">Avionics Calibration</option>
                    <option value="Engine Diagnostics">Engine Diagnostics</option>
                    <option value="Hangar Inspection">Hangar Inspection</option>
                    <option value="Audit">DGCA Audit Review</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                    Work Order Status
                  </label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                    className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
                  >
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="SCHEDULED">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#AAB2C2] block mb-1 font-bold uppercase text-[10px]">
                  Hangar Facility Bay
                </label>
                <input
                  type="text"
                  value={taskForm.hangarBay}
                  onChange={(e) => setTaskForm({ ...taskForm, hangarBay: e.target.value })}
                  className="w-full bg-[#080D1B] border border-[#E8C77E]/25 p-2 rounded-xl text-white focus:outline-none focus:border-[#E8C77E]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8C77E]/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskOpen(false)}
                  className="savera-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="savera-btn-gold py-1.5 px-4 text-xs cursor-pointer"
                >
                  {isSubmitting ? 'Logging...' : 'Log Work Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveraMaintenancePage;
