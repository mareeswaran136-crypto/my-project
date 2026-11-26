import React, { useState } from 'react';
import {
  X,
  Shield,
  Key,
  Mail,
  Building,
  CheckCircle2,
  Lock,
  UserCheck,
  Sparkles,
  Zap
} from 'lucide-react';
import { useSavera } from '../context/SaveraContext';

const SaveraAuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    login,
    quickLogin,
    logout,
    isLoading,
    backendStatus
  } = useSavera();

  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'credentials'
  const [formData, setFormData] = useState({
    department: 'OCC',
    identifier: 'rajesh.varma@savera.aero',
    passcode: 'password123',
    rememberMe: true
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E1528] border border-[#E8C77E]/40 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8C77E]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8C77E]/10 border border-[#E8C77E]/30 flex items-center justify-center text-[#E8C77E]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white m-0">
                OCC Dispatch Clearance
              </h3>
              <p className="text-xs text-[#AAB2C2] m-0">
                SAVÉRA Airlines Security & Token Auth
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-[#AAB2C2] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Status */}
        <div className="mt-4 p-3 rounded-xl bg-[#080D1B] border border-[#E8C77E]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#82D197] animate-pulse" />
            <div>
              <span className="text-xs font-semibold text-white block">
                {currentUser?.name || 'Authorized Dispatcher'}
              </span>
              <span className="text-[10px] text-[#AAB2C2] font-mono">
                {currentUser?.email || 'rajesh.varma@savera.aero'} • {currentUser?.role || 'Admin'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              backendStatus === 'connected'
                ? 'bg-[#82D197]/15 text-[#82D197] border-[#82D197]/30'
                : 'bg-[#E87474]/15 text-[#E87474] border-[#E87474]/30'
            }`}>
              {backendStatus === 'connected' ? 'API Live' : 'API Offline'}
            </span>
          </div>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-[#080D1B] border border-[#E8C77E]/15">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'quick'
                ? 'bg-[#E8C77E] text-[#080D1B]'
                : 'text-[#AAB2C2] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Quick Clearance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('credentials')}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'credentials'
                ? 'bg-[#E8C77E] text-[#080D1B]'
                : 'text-[#AAB2C2] hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Airline Login
          </button>
        </div>

        {/* Quick Roles Dispatch Tab */}
        {activeTab === 'quick' && (
          <div className="mt-4 space-y-2.5">
            <p className="text-xs text-[#AAB2C2]">
              Select an operational role to automatically acquire a signed JWT token from the backend:
            </p>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => quickLogin('admin')}
              className="w-full p-3 rounded-xl bg-[#10182B] hover:bg-[#15233E] border border-[#E8C77E]/25 hover:border-[#E8C77E] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <strong className="text-xs text-white block group-hover:text-[#E8C77E] transition-colors">
                  Capt. Rajesh Varma (Chief OCC)
                </strong>
                <span className="text-[11px] text-[#AAB2C2]">
                  Role: Super Admin • Clearance: Level 5
                </span>
              </div>
              <span className="text-xs text-[#E8C77E] font-mono font-bold">
                Connect →
              </span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => quickLogin('controller')}
              className="w-full p-3 rounded-xl bg-[#10182B] hover:bg-[#15233E] border border-[#E8C77E]/25 hover:border-[#E8C77E] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <strong className="text-xs text-white block group-hover:text-[#E8C77E] transition-colors">
                  Capt. Meera Nair (Senior Dispatcher)
                </strong>
                <span className="text-[11px] text-[#AAB2C2]">
                  Role: Controller • Clearance: Level 4
                </span>
              </div>
              <span className="text-xs text-[#E8C77E] font-mono font-bold">
                Connect →
              </span>
            </button>
          </div>
        )}

        {/* Credentials Form Tab */}
        {activeTab === 'credentials' && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-[#AAB2C2] uppercase mb-1">
                Operational Department
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-[#080D1B] border border-[#E8C77E]/25 rounded-xl text-xs text-white focus:outline-none focus:border-[#E8C77E]"
                >
                  <option value="OCC">OCC (Operations Control Center)</option>
                  <option value="Flight Operations">Flight Operations</option>
                  <option value="Engineering">Engineering & Maintenance</option>
                  <option value="Cabin Services">Cabin Services</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#AAB2C2] uppercase mb-1">
                Airline Email or Staff ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="name@savera.aero or SVR-OCC-001"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-[#080D1B] border border-[#E8C77E]/25 rounded-xl text-xs text-white focus:outline-none focus:border-[#E8C77E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#AAB2C2] uppercase mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#AAB2C2] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Security passcode"
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-[#080D1B] border border-[#E8C77E]/25 rounded-xl text-xs text-white focus:outline-none focus:border-[#E8C77E]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full savera-btn-gold py-2.5 text-xs font-bold cursor-pointer mt-2"
            >
              {isLoading ? 'Verifying Credentials...' : 'Authenticate OCC Dispatch'}
            </button>
          </form>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-[#E8C77E]/15 flex items-center justify-between text-xs text-[#AAB2C2]">
          <span className="font-mono text-[10px]">
            API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}
          </span>
          <button
            type="button"
            onClick={logout}
            className="text-[#E87474] hover:underline cursor-pointer"
          >
            Clear Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveraAuthModal;
