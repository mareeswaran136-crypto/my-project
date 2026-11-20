import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  MapPin,
  UserCheck,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const MaintenancePage = () => {
  const {
    maintenance,
    updateMaintenanceStatus,
    setIsMaintenanceModalOpen
  } = useSkyRoute();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredOrders = maintenance.filter(m => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        m.id.toLowerCase().includes(q) ||
        m.aircraftTail.toLowerCase().includes(q) ||
        m.taskName.toLowerCase().includes(q) ||
        m.assignedLead.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'ALL' && m.status.toUpperCase() !== statusFilter) {
      return false;
    }

    if (priorityFilter !== 'ALL' && m.priority.toUpperCase() !== priorityFilter) {
      return false;
    }

    return true;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'badge-critical';
      case 'High':
        return 'badge-high';
      case 'Medium':
        return 'badge-medium';
      default:
        return 'badge-routine';
    }
  };

  const pendingCount = maintenance.filter(m => m.status === 'Pending').length;
  const criticalCount = maintenance.filter(m => m.priority === 'Critical' && m.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#A9843F]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Airframe & Powerplant Maintenance</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Aircraft on Ground (AOG) alerts, borescope engine checks, avionics calibrations, and structural repairs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {criticalCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-800 border border-red-300 text-xs font-bold font-mono">
              <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
              <span>{criticalCount} AOG CRITICAL</span>
            </div>
          )}

          <button
            onClick={() => setIsMaintenanceModalOpen(true)}
            className="sky-btn-primary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Work Order</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sky-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8F8372] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search WO#, tail (VT-GHI), task, lead..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8F8372]">Status:</span>
            {['ALL', 'PENDING', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-[#0C1D36] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {st === 'ALL' ? 'All Orders' : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-[#8F8372]">Priority:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'ROUTINE'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  priorityFilter === p
                    ? 'bg-[#1E63B3] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {p === 'ALL' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="sky-card p-12 text-center text-[#8F8372]">
            No maintenance work orders found for the selected criteria.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isCompleted = order.status === 'Completed';

            return (
              <div
                key={order.id}
                className={`sky-card p-5 border-l-4 transition-all ${
                  order.priority === 'Critical'
                    ? 'border-l-red-600 bg-[#FFFDFD]'
                    : order.priority === 'High'
                    ? 'border-l-orange-500'
                    : order.priority === 'Medium'
                    ? 'border-l-amber-500'
                    : 'border-l-emerald-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#EADBBE]">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#0C1D36] text-[#C5A059]'
                      }`}
                    >
                      <Wrench className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-base font-black text-[#0C1D36]">
                          {order.id}
                        </span>
                        <span className="font-mono font-bold text-[#1E63B3] bg-[#E9F1FA] px-2 py-0.5 rounded border border-[#C6DCF3]">
                          {order.aircraftTail} ({order.aircraftModel})
                        </span>
                        <span className={`badge-status text-[10px] ${getPriorityBadge(order.priority)}`}>
                          {order.priority}
                        </span>
                        <span
                          className={`badge-status text-[10px] ${
                            isCompleted ? 'badge-on-time' : 'badge-delayed'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-[#0C1D36] text-sm mt-1">{order.taskName}</h4>
                      <p className="text-xs text-[#8F8372]">{order.taskCategory}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        updateMaintenanceStatus(
                          order.id,
                          isCompleted ? 'Pending' : 'Completed'
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isCompleted
                          ? 'bg-[#FDF6E3] hover:bg-[#FAF4E5] text-[#0C1D36] border border-[#EADBBE]'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCompleted ? 'Re-open Work Order' : 'Mark Task Completed'}</span>
                    </button>
                  </div>
                </div>

                {/* Scope & Description */}
                <div className="py-3">
                  <p className="text-xs text-[#1A283B] bg-[#FDF6E3] p-3 rounded-lg border border-[#EADBBE] leading-relaxed">
                    <strong className="text-[#8F8372]">Technical Scope: </strong>
                    {order.description}
                  </p>
                </div>

                {/* Meta footer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 text-[#8F8372]">
                  <div>
                    <span>Hangar / Bay: </span>
                    <strong className="text-[#0C1D36] font-mono">{order.location}</strong>
                  </div>
                  <div>
                    <span>Lead Tech: </span>
                    <strong className="text-[#0C1D36]">{order.assignedLead}</strong>
                  </div>
                  <div>
                    <span>Reported: </span>
                    <strong className="text-[#0C1D36] font-mono">{order.reportedDate}</strong>
                  </div>
                  <div>
                    <span>Due Date: </span>
                    <strong className="text-amber-800 font-mono font-bold">{order.dueDate} ({order.estHours})</strong>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
