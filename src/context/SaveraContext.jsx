import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SAVERA_BRAND,
  SAVERA_STATS,
  SAVERA_FLIGHTS,
  SAVERA_CREW,
  SAVERA_AIRCRAFT,
  FLIGHTRIPPLE_METRICS,
  NOTIFICATIONS_DATA_SAVERA,
  MAINTENANCE_RECORDS_SAVERA,
  SYSTEM_STATUS_DATA
} from '../data/saveraData';
import { api } from '../services/api';

const SaveraContext = createContext();

export const SaveraProvider = ({ children }) => {
  const [brand] = useState(SAVERA_BRAND);
  const [stats, setStats] = useState(SAVERA_STATS);
  const [flights, setFlights] = useState(SAVERA_FLIGHTS);
  const [crew, setCrew] = useState(SAVERA_CREW);
  const [fleet, setFleet] = useState(SAVERA_AIRCRAFT);
  const [maintenance, setMaintenance] = useState(MAINTENANCE_RECORDS_SAVERA);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA_SAVERA);
  const [flightRipple, setFlightRipple] = useState(FLIGHTRIPPLE_METRICS);
  const [systemStatus, setSystemStatus] = useState(SYSTEM_STATUS_DATA);

  // Connection & Auth States
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'offline' | 'checking'
  const [currentUser, setCurrentUser] = useState(() => api.getSavedUser() || brand.adminUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Active view state
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Interactive Modal / Details States
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [isFlightRippleModalOpen, setIsFlightRippleModalOpen] = useState(false);
  const [isNewFlightModalOpen, setIsNewFlightModalOpen] = useState(false);
  
  // Global Search & Filter
  const [globalSearch, setGlobalSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Live Clocks: Local & UTC
  const [clock, setClock] = useState({
    utc: new Date().toUTCString().slice(17, 25) + ' UTC',
    local: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST',
    date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock({
        utc: now.toUTCString().slice(17, 25) + ' UTC',
        local: now.toLocaleTimeString('en-US', { hour12: false }) + ' IST',
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = useCallback((message, type = 'gold') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Fetch full live data from Backend API
  const refreshData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setIsLoading(true);

      // Check backend health & auto-authenticate if needed
      try {
        await api.health.check();
        setBackendStatus('connected');
      } catch (healthErr) {
        console.warn('Backend server not responding:', healthErr.message);
        setBackendStatus('offline');
        if (isInitial) setIsLoading(false);
        return;
      }

      // If no token, perform auto quick-login for OCC admin clearance
      if (!api.getToken() || api.getToken() === 'demo-token') {
        try {
          const authRes = await api.auth.quickLogin('admin');
          if (authRes?.token) {
            api.setToken(authRes.token);
            if (authRes.staff) {
              const userObj = {
                name: authRes.staff.fullName,
                title: authRes.staff.designation,
                role: authRes.staff.role === 'admin' ? 'Super Admin' : authRes.staff.role,
                badgeId: authRes.staff.badgeId,
                email: authRes.staff.officialEmail,
                department: authRes.staff.department,
                clearance: authRes.staff.clearanceLevel || 'Level 5 - Unrestricted Airspace',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
              };
              setCurrentUser(userObj);
              api.setSavedUser(userObj);
            }
          }
        } catch (authErr) {
          console.warn('Auto quick-login note:', authErr.message);
        }
      }

      // Fetch all core resources in parallel
      const [flightsRes, crewRes, fleetRes, maintRes, overviewRes] = await Promise.allSettled([
        api.flights.getAll(),
        api.crew.getAll(),
        api.fleet.getAll(),
        api.maintenance.getAll(),
        api.dashboard.getOverview()
      ]);

      if (flightsRes.status === 'fulfilled' && flightsRes.value.flights?.length > 0) {
        setFlights(flightsRes.value.flights);
      }

      if (crewRes.status === 'fulfilled' && crewRes.value.crew?.length > 0) {
        setCrew(crewRes.value.crew);
      }

      if (fleetRes.status === 'fulfilled' && fleetRes.value.fleet?.length > 0) {
        setFleet(fleetRes.value.fleet);
      }

      if (maintRes.status === 'fulfilled' && maintRes.value.maintenance?.length > 0) {
        setMaintenance(maintRes.value.maintenance);
      }

      if (overviewRes.status === 'fulfilled' && overviewRes.value) {
        const kpis = overviewRes.value.kpis || overviewRes.value;
        if (kpis) {
          setStats(prev => ({
            activeFlights: {
              ...prev.activeFlights,
              value: kpis.activeFlights ?? prev.activeFlights.value,
              inAir: kpis.inFlight ?? prev.activeFlights.inAir,
              boarding: kpis.boardingFlights ?? prev.activeFlights.boarding
            },
            aircraftOnline: {
              ...prev.aircraftOnline,
              value: kpis.activeAircraft ?? prev.aircraftOnline.value,
              totalFleet: kpis.totalAircraft ?? prev.aircraftOnline.totalFleet
            },
            crewOnDuty: {
              ...prev.crewOnDuty,
              value: kpis.activeOnDutyCrew ?? prev.crewOnDuty.value,
              totalCrew: kpis.totalCrew ?? prev.crewOnDuty.totalCrew
            },
            onTimePerformance: {
              ...prev.onTimePerformance,
              value: kpis.onTimePerformancePercent ?? prev.onTimePerformance.value
            }
          }));
        }
      }

      setBackendStatus('connected');
    } catch (err) {
      console.error('Error syncing with SAVÉRA Backend:', err);
      setBackendStatus('offline');
    } finally {
      if (isInitial) setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshData(true);
  }, [refreshData]);

  // Update Flight Status (Connected to Backend)
  const updateFlightStatus = async (flightId, newStatus) => {
    // 1. Optimistic UI update
    setFlights(prev =>
      prev.map(f => {
        if (f.id === flightId || f.flightNumber === flightId) {
          let updatedProgress = f.progress;
          let updatedAltitude = f.altitude;
          let updatedSpeed = f.speed;

          if (newStatus === 'Departed' || newStatus === 'En Route' || newStatus === 'In Flight') {
            updatedProgress = 35;
            updatedAltitude = '34,000 ft';
            updatedSpeed = '840 km/h';
          } else if (newStatus === 'Landed' || newStatus === 'Arrived') {
            updatedProgress = 100;
            updatedAltitude = '0 ft (Taxied)';
            updatedSpeed = '0 km/h';
          } else if (newStatus === 'Boarding') {
            updatedProgress = 5;
            updatedAltitude = 'Gate';
            updatedSpeed = '0 km/h';
          } else if (newStatus === 'Delayed') {
            updatedProgress = 0;
            updatedAltitude = 'Ground Hold';
          }

          return {
            ...f,
            status: newStatus,
            progress: updatedProgress,
            altitude: updatedAltitude,
            speed: updatedSpeed
          };
        }
        return f;
      })
    );

    // 2. Persist to Backend API
    try {
      await api.flights.updateStatus(flightId, newStatus);
      showToast(`Flight ${flightId} status saved to OCC Backend: ${newStatus}`, 'success');
    } catch (err) {
      console.warn('Backend update failed, kept in local state:', err.message);
      showToast(`Flight ${flightId} status updated locally (${err.message})`, 'info');
    }
  };

  // Add a new Flight (Connected to Backend)
  const addFlight = async (newFlight) => {
    const flightNumber = newFlight.flightNumber || `SV ${Math.floor(400 + Math.random() * 500)}`;
    const origin = (newFlight.originCode || newFlight.origin || 'DEL').split(' ')[0].replace(/[^A-Z]/g, '') || 'DEL';
    const destination = (newFlight.destinationCode || newFlight.destination || 'BOM').split(' ')[0].replace(/[^A-Z]/g, '') || 'BOM';

    const now = new Date();
    const scheduledDeparture = new Date(now.getTime() + 60 * 60 * 1000);
    const scheduledArrival = new Date(now.getTime() + 180 * 60 * 1000);

    const payload = {
      flightNumber,
      origin,
      destination,
      scheduledDeparture,
      scheduledArrival,
      flightStatus: newFlight.status || 'Scheduled',
      airline: 'SAVÉRA',
      gate: newFlight.gate || 'Gate 22B',
      operationalStatus: 'Normal'
    };

    try {
      const created = await api.flights.create(payload);
      if (created) {
        setFlights(prev => [created, ...prev]);
      } else {
        throw new Error('No flight returned from server');
      }
      showToast(`Flight ${flightNumber} registered in MongoDB Dispatch System`, 'gold');
    } catch (err) {
      console.warn('Backend flight creation failed, creating locally:', err.message);
      const localFlight = {
        ...newFlight,
        id: flightNumber,
        flightNumber,
        route: `${origin} ➔ ${destination}`,
        origin: `${origin} (${origin})`,
        destination: `${destination} (${destination})`,
        status: newFlight.status || 'Scheduled',
        departureTime: '14:30 IST',
        arrivalTime: '17:15 IST',
        aircraft: newFlight.aircraft || 'VT-SAV (A350-900)',
        crew: { captain: newFlight.captain || 'Capt. Rajesh Varma', firstOfficer: newFlight.firstOfficer || 'FO Priya Sen' },
        progress: 0,
        altitude: 'Scheduled',
        speed: '0 km/h',
        flightRippleScore: '99.0% Optimum'
      };
      setFlights(prev => [localFlight, ...prev]);
      showToast(`Flight ${flightNumber} registered locally (${err.message})`, 'gold');
    }
  };

  // Update Crew Duty Status (Connected to Backend)
  const updateCrewDuty = async (crewId, dutyStatus) => {
    setCrew(prev =>
      prev.map(c => (c.id === crewId ? { ...c, dutyStatus, availabilityStatus: dutyStatus } : c))
    );

    try {
      await api.crew.updateDutyStatus(crewId, dutyStatus);
      showToast(`Crew roster status updated to ${dutyStatus}`, 'success');
    } catch (err) {
      console.warn('Backend crew duty update failed:', err.message);
      showToast(`Crew updated locally: ${dutyStatus}`, 'info');
    }
  };

  // Update Fleet Aircraft Availability (Connected to Backend)
  const updateFleetStatus = async (tailNumber, availabilityStatus) => {
    setFleet(prev =>
      prev.map(a =>
        a.tailNumber === tailNumber || a.registration === tailNumber
          ? { ...a, status: availabilityStatus, availabilityStatus }
          : a
      )
    );

    try {
      await api.fleet.updateAvailability(tailNumber, availabilityStatus);
      showToast(`Aircraft ${tailNumber} status updated to ${availabilityStatus}`, 'success');
    } catch (err) {
      console.warn('Backend fleet update failed:', err.message);
      showToast(`Aircraft ${tailNumber} updated locally`, 'info');
    }
  };

  // Sign off maintenance log (Connected to Backend)
  const signOffMaintenance = async (id, remarks = 'Inspection passed and certified.') => {
    setMaintenance(prev =>
      prev.map(m =>
        m.id === id || m._id === id
          ? { ...m, status: 'Completed', progress: 100 }
          : m
      )
    );

    try {
      await api.maintenance.signOff(id, remarks);
      showToast(`Maintenance log ${id} signed off and closed in backend`, 'success');
    } catch (err) {
      console.warn('Backend maintenance sign-off failed:', err.message);
      showToast(`Maintenance log ${id} signed off locally`, 'info');
    }
  };

  // Notification actions
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All operational alerts marked as read', 'info');
  };

  // Authentication Handlers
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await api.auth.login(credentials);
      if (res?.token) {
        api.setToken(res.token);
        const userObj = {
          name: res.staff.fullName,
          title: res.staff.designation,
          role: res.staff.role === 'admin' ? 'Super Admin' : res.staff.role,
          badgeId: res.staff.badgeId,
          email: res.staff.officialEmail,
          department: res.staff.department,
          clearance: res.staff.clearanceLevel || 'Level 4 - OCC',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        };
        setCurrentUser(userObj);
        api.setSavedUser(userObj);
        setIsAuthModalOpen(false);
        showToast(`Welcome back, ${userObj.name}`, 'gold');
        await refreshData();
        return { success: true };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      showToast(err.message || 'Authentication error', 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async (role = 'admin') => {
    setIsLoading(true);
    try {
      const res = await api.auth.quickLogin(role);
      if (res?.token) {
        api.setToken(res.token);
        const userObj = {
          name: res.staff.fullName,
          title: res.staff.designation,
          role: res.staff.role === 'admin' ? 'Super Admin' : res.staff.role,
          badgeId: res.staff.badgeId,
          email: res.staff.officialEmail,
          department: res.staff.department,
          clearance: res.staff.clearanceLevel || 'Level 5 - Unrestricted Airspace',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        };
        setCurrentUser(userObj);
        api.setSavedUser(userObj);
        setIsAuthModalOpen(false);
        showToast(`OCC Session Activated: ${userObj.name}`, 'gold');
        await refreshData();
        return { success: true };
      }
      throw new Error('Quick login returned no token');
    } catch (err) {
      showToast(err.message || 'Quick login failed', 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.removeToken();
    setCurrentUser(brand.adminUser);
    showToast('Logged out of OCC Dispatch session', 'info');
  };

  return (
    <SaveraContext.Provider
      value={{
        brand,
        stats,
        setStats,
        flights,
        setFlights,
        crew,
        setCrew,
        fleet,
        setFleet,
        maintenance,
        setMaintenance,
        notifications,
        flightRipple,
        setFlightRipple,
        systemStatus,
        setSystemStatus,
        activeTab,
        setActiveTab,
        selectedFlight,
        setSelectedFlight,
        selectedCrew,
        setSelectedCrew,
        selectedAircraft,
        setSelectedAircraft,
        isFlightRippleModalOpen,
        setIsFlightRippleModalOpen,
        isNewFlightModalOpen,
        setIsNewFlightModalOpen,
        globalSearch,
        setGlobalSearch,
        clock,
        toastMessage,
        showToast,
        updateFlightStatus,
        addFlight,
        updateCrewDuty,
        updateFleetStatus,
        signOffMaintenance,
        markAsRead,
        markAllAsRead,
        refreshData,
        backendStatus,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isLoading,
        login,
        quickLogin,
        logout,
        api
      }}
    >
      {children}
    </SaveraContext.Provider>
  );
};

export const useSavera = () => {
  const context = useContext(SaveraContext);
  if (!context) {
    throw new Error('useSavera must be used within a SaveraProvider');
  }
  return context;
};
export default SaveraContext;
