import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SaveraProvider, useSavera } from './context/SaveraContext';
import SaveraSidebar from './components/SaveraSidebar';
import SaveraNavbar from './components/SaveraNavbar';
import SaveraFlightDetailModal from './components/SaveraFlightDetailModal';
import FlightRippleModal from './components/FlightRippleModal';
import SaveraNewFlightModal from './components/SaveraNewFlightModal';
import SaveraAuthModal from './components/SaveraAuthModal';

// SAVÉRA Operations Pages
import SaveraDashboard from './pages/SaveraDashboard';
import SaveraFlightsPage from './pages/SaveraFlightsPage';
import SaveraCrewPage from './pages/SaveraCrewPage';
import SaveraFleetPage from './pages/SaveraFleetPage';
import SaveraOperationsPage from './pages/SaveraOperationsPage';
import SaveraMaintenancePage from './pages/SaveraMaintenancePage';
import SaveraAnalyticsPage from './pages/SaveraAnalyticsPage';
import SaveraSettingsPage from './pages/SaveraSettingsPage';

import { CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';

const SaveraAppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toastMessage } = useSavera();
  const location = useLocation();

  // Determine current page title dynamically
  const getPageTitle = (path) => {
    switch (path) {
      case '/':
      case '/dashboard':
        return 'Operations Dashboard';
      case '/flights':
        return 'Flight Schedule & Control';
      case '/crew':
        return 'Crew Management & Rosters';
      case '/fleet':
        return 'Fleet Management';
      case '/operations':
        return 'Live Operations & Radar';
      case '/maintenance':
        return 'Aircraft Maintenance';
      case '/analytics':
        return 'Operations Analytics';
      case '/settings':
        return 'System Settings';
      default:
        return 'SAVÉRA Operations';
    }
  };

  return (
    <div className="min-h-screen bg-[#080D1B] text-white flex overflow-x-hidden">
      {/* Luxury Sidebar */}
      <SaveraSidebar
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Luxury Top Header */}
        <SaveraNavbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          pageTitle={getPageTitle(location.pathname)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<SaveraDashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/flights" element={<SaveraFlightsPage />} />
            <Route path="/crew" element={<SaveraCrewPage />} />
            <Route path="/fleet" element={<SaveraFleetPage />} />
            <Route path="/operations" element={<SaveraOperationsPage />} />
            <Route path="/maintenance" element={<SaveraMaintenancePage />} />
            <Route path="/analytics" element={<SaveraAnalyticsPage />} />
            <Route path="/settings" element={<SaveraSettingsPage />} />
            
            {/* Legacy route redirects to seamlessly support any bookmarked links */}
            <Route path="/radar" element={<Navigate to="/operations" replace />} />
            <Route path="/calendar" element={<Navigate to="/flights" replace />} />
            <Route path="/users" element={<Navigate to="/crew" replace />} />
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="/savera" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Luxury Operations Footer */}
        <footer className="py-4 px-6 border-t border-[#E8C77E]/15 text-center text-xs text-[#AAB2C2] bg-[#0C1424]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>© 2026 SAVÉRA Airlines Ltd. • Luxury Airline Operations Management System</span>
            <span className="font-mono text-[11px] text-[#E8C77E]">
              ICAO: SVR • IATA: SV • FlightRipple™ Active • Delhi Hub (DEL / VIDP)
            </span>
          </div>
        </footer>
      </div>

      {/* Global Modals */}
      <SaveraFlightDetailModal />
      <FlightRippleModal />
      <SaveraNewFlightModal />
      <SaveraAuthModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#111A2D] text-white border border-[#E8C77E]/60 rounded-xl shadow-2xl animate-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#91C98A] shrink-0" />
          ) : toastMessage.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-[#E8B75F] shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-[#E8C77E] shrink-0" />
          )}
          <span className="text-xs font-semibold">{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SaveraProvider>
        <SaveraAppLayout />
      </SaveraProvider>
    </BrowserRouter>
  );
}

export default App;
