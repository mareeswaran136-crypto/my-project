import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [systemStatus] = useState(SYSTEM_STATUS_DATA);

  // Active view state (for single page or routing sync)
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

  const showToast = (message, type = 'gold') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Update Flight Status
  const updateFlightStatus = (flightId, newStatus) => {
    setFlights(prev =>
      prev.map(f => {
        if (f.id === flightId || f.flightNumber === flightId) {
          let updatedProgress = f.progress;
          let updatedAltitude = f.altitude;
          let updatedSpeed = f.speed;

          if (newStatus === 'Departed' || newStatus === 'En Route') {
            updatedProgress = 35;
            updatedAltitude = '34,000 ft';
            updatedSpeed = '840 km/h';
          } else if (newStatus === 'Landed') {
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
    showToast(`Flight ${flightId} status updated to ${newStatus}`, 'success');
  };

  // Add a new Flight
  const addFlight = (newFlight) => {
    const flightObj = {
      ...newFlight,
      id: `SV-${Math.floor(400 + Math.random() * 500)}`,
      progress: 0,
      altitude: 'Scheduled',
      speed: '0 km/h'
    };
    setFlights(prev => [flightObj, ...prev]);
    showToast(`Flight ${flightObj.flightNumber} registered into Dispatch System`, 'gold');
  };

  // Notification actions
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All operational alerts marked as read', 'info');
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
        markAsRead,
        markAllAsRead
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
