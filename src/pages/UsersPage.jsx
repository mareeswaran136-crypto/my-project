import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Lock,
  Mail,
  Building,
  Key
} from 'lucide-react';
import { useSkyRoute } from '../context/SkyRouteContext';

const UsersPage = () => {
  const { users, addUser, toggleUserStatus } = useSkyRoute();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Flight Dispatcher',
    department: 'Network Operations Control'
  });

  const filteredUsers = users.filter(u => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (roleFilter !== 'ALL' && u.role.toUpperCase() !== roleFilter) {
      return false;
    }

    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addUser(formData);
    setFormData({
      name: '',
      email: '',
      role: 'Flight Dispatcher',
      department: 'Network Operations Control'
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBBE]">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#1E63B3]" />
            <h1 className="text-2xl font-black text-[#0C1D36]">Personnel & Role-Based Access Control</h1>
          </div>
          <p className="text-xs text-[#8F8372] mt-0.5">
            Airline administrative staff, flight dispatchers, chief pilots, and engineering leads.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="sky-btn-primary text-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="sky-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8F8372] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user name, email, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg text-xs font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#8F8372]">Role:</span>
            {['ALL', 'ADMINISTRATOR', 'PILOT', 'FLIGHT DISPATCHER', 'MAINTENANCE CHIEF'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  roleFilter === r
                    ? 'bg-[#0C1D36] text-white'
                    : 'bg-[#FDF6E3] text-[#8F8372] hover:bg-[#FAF4E5] border border-[#EADBBE]'
                }`}
              >
                {r === 'ALL' ? 'All Roles' : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="sky-card p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EADBBE] text-[#8F8372] uppercase font-mono tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Personnel</th>
                <th className="py-2.5 px-3">Role & Permissions</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">2FA Security</th>
                <th className="py-2.5 px-3">Last Active</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Access Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBBE]/70">
              {filteredUsers.map((user) => {
                const isActive = user.status === 'Active';

                return (
                  <tr key={user.id} className="hover:bg-[#FAF4E5] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#EADBBE]"
                        />
                        <div>
                          <div className="font-bold text-[#0C1D36]">{user.name}</div>
                          <div className="text-[11px] text-[#8F8372] font-mono">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#1E63B3] bg-[#E9F1FA] px-2 py-0.5 rounded border border-[#C6DCF3]">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-medium text-[#0C1D36]">
                      {user.department}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          user.twoFactor === 'Enabled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <Shield className="w-3 h-3" />
                        {user.twoFactor}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono text-[#8F8372]">
                      {user.lastLogin}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`badge-status ${
                          isActive ? 'badge-on-time' : 'badge-delayed'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#FDF6E3] hover:bg-red-50 text-red-600 border border-[#EADBBE]'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isActive ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FFFBF0] border border-[#EADBBE] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-base font-bold text-[#0C1D36] mb-4">Provision Staff Account</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0C1D36] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Ananya Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0C1D36] mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="ananya.rao@skyroute.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0C1D36] mb-1">Assigned Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg font-semibold text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Flight Dispatcher">Flight Dispatcher</option>
                  <option value="Pilot">Pilot / Commander</option>
                  <option value="Cabin Crew Lead">Cabin Crew Lead</option>
                  <option value="Maintenance Chief">Maintenance Chief</option>
                  <option value="Station Officer">Station Officer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0C1D36] mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDF6E3] border border-[#EADBBE] rounded-lg font-medium text-[#0C1D36] focus:outline-none focus:border-[#1E63B3]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#EADBBE] rounded-lg text-xs font-semibold text-[#8F8372] hover:bg-[#EADBBE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E63B3] hover:bg-[#154A87] text-white rounded-lg text-xs font-bold"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
