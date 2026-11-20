import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STATS,
  FLIGHTS_DATA,
  HOURLY_ACTIVITY_DATA,
  FLEET_DATA,
  CREW_DATA,
  MAINTENANCE_DATA,
  NOTIFICATIONS_DATA,
  USERS_DATA,
  OCTOBER_2024_CALENDAR,
  AIRBORNE_RADAR_FLIGHTS
} from '../data/mockData';

const SkyRouteContext = createContext();

export const SkyRouteProvider = ({ children }) => {
  const [flights, setFlights] = useState(FLIGHTS_DATA);
  const [fleet, setFleet] = useState(FLEET_DATA);
  const [crew, setCrew] = useState(CREW_DATA);
  const [maintenance, setMaintenance] = useState(MAINTENANCE_DATA);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [users, setUsers] = useState(USERS_DATA);
  const [radarFlights, setRadarFlights] = useState(AIRBORNE_RADAR_FLIGHTS);
  
  // UI states
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isNewFlightModalOpen, setIsNewFlightModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [currentHub, setCurrentHub] = useState('MAA - Chennai (Primary)');
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Live Clocks (UTC & IST)
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

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Flight Handlers
  const addFlight = (newFlight) => {
    const flightWithId = {
      ...newFlight,
      id: `FL-${Math.floor(100 + Math.random() * 900)}`,
      progress: 0,
      altitude: 'Pending Departure',
      speed: '0 km/h'
    };
    setFlights([flightWithId, ...flights]);
    showToast(`Flight ${flightWithId.flightNumber} successfully scheduled!`, 'success');
  };

  const updateFlightStatus = (flightId, newStatus) => {
    setFlights(prev =>
      prev.map(f => {
        if (f.id === flightId || f.flightNumber === flightId) {
          let updatedProgress = f.progress;
          let updatedAltitude = f.altitude;
          let updatedSpeed = f.speed;

          if (newStatus === 'Departed') {
            updatedProgress = 20;
            updatedAltitude = '14,000 ft';
            updatedSpeed = '640 km/h';
          } else if (newStatus === 'Landed') {
            updatedProgress = 100;
            updatedAltitude = '0 ft (Taxied)';
            updatedSpeed = '0 km/h';
          } else if (newStatus === 'Boarding') {
            updatedProgress = 5;
            updatedAltitude = '0 ft (Gate)';
            updatedSpeed = '0 km/h';
          } else if (newStatus === 'Delayed') {
            updatedProgress = 0;
            updatedAltitude = 'Hold';
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
    showToast(`Status for flight updated to "${newStatus}"`, 'info');
  };

  const deleteFlight = (flightId) => {
    setFlights(prev => prev.filter(f => f.id !== flightId && f.flightNumber !== flightId));
    showToast(`Flight record removed.`, 'warning');
  };

  // Fleet Handlers
  const updateFleetStatus = (tailNumber, newStatus) => {
    setFleet(prev =>
      prev.map(ac => (ac.tailNumber === tailNumber ? { ...ac, status: newStatus } : ac))
    );
    showToast(`Aircraft ${tailNumber} status changed to ${newStatus}`, 'info');
  };

  // Maintenance Handlers
  const addMaintenanceOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      reportedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setMaintenance([orderWithId, ...maintenance]);
    showToast(`Maintenance Work Order ${orderWithId.id} created!`, 'success');
  };

  const updateMaintenanceStatus = (id, newStatus) => {
    setMaintenance(prev =>
      prev.map(m => (m.id === id ? { ...m, status: newStatus } : m))
    );
    showToast(`Work Order ${id} marked as ${newStatus}`, 'info');
  };

  // Crew Handlers
  const addCrewMember = (newCrew) => {
    const crewWithId = {
      ...newCrew,
      id: `CRW-${String(crew.length + 1).padStart(2, '0')}`,
      status: 'Standby',
      dutyPeriod: 'Resting (Off-Duty)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setCrew([crewWithId, ...crew]);
    showToast(`Crew member ${crewWithId.name} added to roster!`, 'success');
  };

  const assignCrew = (crewId, flightNumber) => {
    setCrew(prev =>
      prev.map(c =>
        c.id === crewId
          ? { ...c, flightNumber, status: flightNumber === 'Unassigned' ? 'Standby' : 'Assigned' }
          : c
      )
    );
    showToast(`Crew assigned to flight ${flightNumber}`, 'info');
  };

  // Notification Handlers
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Users Handlers
  const addUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: `USR-${String(users.length + 1).padStart(2, '0')}`,
      status: 'Active',
      lastLogin: 'Never',
      twoFactor: 'Enabled',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setUsers([...users, userWithId]);
    showToast(`User ${userWithId.name} provisioned!`, 'success');
  };

  const toggleUserStatus = (id) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
  };

  // Dynamic Statistics
  const activeAircraftCount = fleet.filter(f => f.status === 'Available').length;
  const maintenanceCount = maintenance.filter(m => m.status === 'Pending').length;
  const onTimeCount = flights.filter(f => f.status === 'On Time' || f.status === 'Landed').length;
  const onTimeRate = flights.length > 0 ? Math.round((onTimeCount / flights.length) * 100) : 92;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const stats = {
    ...INITIAL_STATS,
    totalFlights: flights.length,
    activeAircraft: activeAircraftCount,
    totalFleet: fleet.length,
    pendingMaintenance: maintenanceCount,
    onTimeRate: onTimeRate,
    totalCrew: crew.length,
    airborneFlights: radarFlights.length,
    unreadNotifications: unreadNotificationsCount
  };

  return (
    <SkyRouteContext.Provider
      value={{
        stats,
        flights,
        fleet,
        crew,
        maintenance,
        notifications,
        users,
        radarFlights,
        hourlyActivity: HOURLY_ACTIVITY_DATA,
        calendarData: OCTOBER_2024_CALENDAR,
        clock,
        currentHub,
        setCurrentHub,
        selectedFlight,
        setSelectedFlight,
        isNewFlightModalOpen,
        setIsNewFlightModalOpen,
        isMaintenanceModalOpen,
        setIsMaintenanceModalOpen,
        isCrewModalOpen,
        setIsCrewModalOpen,
        toastMessage,
        showToast,
        searchQuery,
        setSearchQuery,
        // actions
        addFlight,
        updateFlightStatus,
        deleteFlight,
        updateFleetStatus,
        addMaintenanceOrder,
        updateMaintenanceStatus,
        addCrewMember,
        assignCrew,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        addUser,
        toggleUserStatus
      }}
    >
      {children}
    </SkyRouteContext.Provider>
  );
};

export const useSkyRoute = () => {
  const context = useContext(SkyRouteContext);
  if (!context) {
    throw new Error('useSkyRoute must be used within a SkyRouteProvider');
  }
  return context;
};
