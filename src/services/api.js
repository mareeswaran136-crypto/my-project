/**
 * SAVÉRA Airlines - Enterprise REST API Client
 * Integrated with SAVÉRA Common Backend (Express + MongoDB)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  getToken() {
    return localStorage.getItem('savera_token') || 'demo-token';
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('savera_token', token);
    } else {
      localStorage.removeItem('savera_token');
    }
  }

  removeToken() {
    localStorage.removeItem('savera_token');
    localStorage.removeItem('savera_user');
  }

  getSavedUser() {
    try {
      const user = localStorage.getItem('savera_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  setSavedUser(user) {
    if (user) {
      localStorage.setItem('savera_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('savera_user');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const config = {
      ...options,
      headers
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        const error = new Error(errorData.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      return await response.json();
    } catch (err) {
      // If server is unreachable
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        const netErr = new Error(`Cannot reach SAVÉRA OCC Backend at ${this.baseUrl}. Verify that the backend server is running.`);
        netErr.isNetworkError = true;
        throw netErr;
      }
      throw err;
    }
  }

  // --- Normalizers to ensure exact UI compatibility ---
  normalizeFlight(f) {
    if (!f) return null;
    const captainStaff = f.crewMembers?.find(c => c.crewRole === 'Captain' || c.designation?.includes('Captain'));
    const foStaff = f.crewMembers?.find(c => c.crewRole === 'First Officer' || c.designation?.includes('First Officer'));
    const leadCabin = f.crewMembers?.find(c => c.crewRole === 'Cabin Senior' || c.department === 'Cabin Services');

    const aircraftReg = typeof f.aircraft === 'object' && f.aircraft ? f.aircraft.registration : 'VT-SAV';
    const aircraftModel = typeof f.aircraft === 'object' && f.aircraft ? f.aircraft.model : 'Airbus A350-900';
    const aircraftLabel = `${aircraftReg} (${aircraftModel})`;

    const depDate = f.scheduledDeparture ? new Date(f.scheduledDeparture) : new Date();
    const arrDate = f.scheduledArrival ? new Date(f.scheduledArrival) : new Date();

    return {
      id: f.flightNumber || f._id,
      _id: f._id,
      flightNumber: f.flightNumber,
      route: `${f.origin} ➔ ${f.destination}`,
      origin: f.origin.length <= 4 ? `${f.origin} (${f.origin})` : f.origin,
      destination: f.destination.length <= 4 ? `${f.destination} (${f.destination})` : f.destination,
      status: f.flightStatus || 'Scheduled',
      departureTime: depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      scheduledDeparture: depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      scheduledArrival: arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gate: f.gate || 'Gate 18A',
      terminal: f.gate?.includes('T') ? f.gate.split('-')[0] : 'T3',
      aircraft: aircraftLabel,
      aircraftType: aircraftModel,
      crew: {
        captain: captainStaff?.fullName || 'Capt. Rajesh Varma',
        firstOfficer: foStaff?.fullName || 'FO Priya Sen',
        leadCabin: leadCabin?.fullName || 'Ananya Roy',
        crewCount: f.crewMembers?.length || 8
      },
      passengers: f.passengers || (f.aircraft?.capacity ? Math.floor(f.aircraft.capacity * 0.92) : 284),
      capacity: f.aircraft?.capacity || 310,
      altitude: f.flightStatus === 'In Flight' || f.flightStatus === 'In Transit' ? '36,000 ft' : (f.flightStatus === 'Delayed' ? 'Ground Hold' : 'Gate Apron'),
      speed: f.flightStatus === 'In Flight' || f.flightStatus === 'In Transit' ? '875 km/h' : '0 km/h',
      progress: f.flightStatus === 'In Flight' || f.flightStatus === 'In Transit' ? 68 : (f.flightStatus === 'Boarding' ? 10 : 0),
      flightRippleScore: '98.9% Optimum',
      fuelEfficiency: '+3.8% Saved',
      raw: f
    };
  }

  normalizeCrew(c) {
    if (!c) return null;
    return {
      id: c.staffId || c.crewId || c._id,
      _id: c._id,
      name: c.fullName,
      role: c.crewRole || c.role || 'Captain',
      designation: c.designation || 'Flight Operations',
      department: c.department || 'Flight Operations',
      assignedFlight: c.assignedFlightNumber || 'SV 302',
      dutyTime: '04h 15m / 10h Max',
      dutyPercent: 42.5,
      dutyStatus: c.dutyStatus || 'On Duty',
      availabilityStatus: c.dutyStatus || 'On Duty',
      baseHub: c.baseHub || 'DEL',
      experienceYears: c.experienceYears || 14,
      flightHours: `${c.flightHoursTotal || 9800} hrs`,
      phone: c.phone || '+91 98765 43210',
      email: c.officialEmail,
      avatar: c.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      aircraftType: c.aircraftType || 'Airbus A350-900',
      license: c.license || 'ATPL-IND-99120',
      raw: c
    };
  }

  normalizeAircraft(a) {
    if (!a) return null;
    return {
      id: a._id,
      _id: a._id,
      tailNumber: a.registration,
      registration: a.registration,
      model: a.model,
      manufacturer: a.model?.toLowerCase().includes('boeing') ? 'Boeing' : 'Airbus',
      status: a.availabilityStatus === 'In Maintenance' ? 'Hangar Maintenance' : (a.availabilityStatus || 'Active'),
      healthScore: a.fleetHealthScore || 98,
      assignedFlight: a.assignedRoute?.flightNumber ? `${a.assignedRoute.flightNumber} (${a.assignedRoute.origin} ➔ ${a.assignedRoute.destination})` : 'Standby',
      assignedRoute: a.assignedRoute?.flightNumber ? `${a.assignedRoute.origin} ➔ ${a.assignedRoute.destination}` : 'DEL ➔ BOM',
      totalHours: '3,420 hrs',
      cycles: '820',
      fuelCapacity: a.model?.includes('350') ? '141,000 L' : (a.model?.includes('787') ? '126,000 L' : '32,940 L'),
      currentFuel: '84%',
      nextCheck: a.maintenanceStatus?.nextCheckSummary || 'A-Check in 480 hrs',
      airworthiness: a.maintenanceStatus?.isCleared !== false ? '100% Certified' : 'Under Maintenance',
      cabinConfig: a.cabinBreakdown ? `J${a.cabinBreakdown.business || 24} Y${a.cabinBreakdown.economy || 200}` : 'J32 Y254',
      raw: a
    };
  }

  normalizeMaintenance(m) {
    if (!m) return null;
    return {
      id: m.checkCode || m._id,
      _id: m._id,
      aircraft: `${m.registrationNumber} (${m.aircraftModel})`,
      tailNumber: m.registrationNumber,
      aircraftModel: m.aircraftModel,
      taskTitle: m.taskTitle,
      type: `${m.category} (${m.checkCode})`,
      category: m.category,
      bay: m.hangarBay || 'Hangar Bay 4 (DEL)',
      leadTech: m.assignedEngineer?.fullName || 'Eng. Suresh Nair',
      status: m.status === 'IN PROGRESS' ? 'In Progress' : (m.status === 'COMPLETED' ? 'Completed' : 'Scheduled'),
      started: '06:00 IST',
      estCompletion: m.estimatedReturnToService ? new Date(m.estimatedReturnToService).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST' : '15:30 IST',
      progress: m.status === 'COMPLETED' ? 100 : (m.status === 'IN PROGRESS' ? 72 : 15),
      priority: 'High',
      raw: m
    };
  }

  // --- API Endpoints ---
  health = {
    check: () => this.request('/health')
  };

  auth = {
    login: (credentials) => this.request('/auth/login', { method: 'POST', body: credentials }),
    quickLogin: (role = 'admin') => this.request('/auth/quick-login', { method: 'POST', body: { role } }),
    getMe: () => this.request('/auth/me'),
    logout: () => this.request('/auth/logout', { method: 'POST' })
  };

  dashboard = {
    getOverview: (period = 'all') => this.request(`/dashboard/overview?period=${encodeURIComponent(period)}`),
    getKpis: (period = 'all') => this.request(`/dashboard/kpis?period=${encodeURIComponent(period)}`),
    getOperations: () => this.request('/dashboard/operations')
  };

  flights = {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await this.request(`/flights${query ? `?${query}` : ''}`);
      const rawFlights = res.flights || [];
      return {
        count: res.count || rawFlights.length,
        flights: rawFlights.map(f => this.normalizeFlight(f))
      };
    },
    getById: async (id) => {
      const res = await this.request(`/flights/${id}`);
      return this.normalizeFlight(res.flight);
    },
    create: async (flightData) => {
      const res = await this.request('/flights', { method: 'POST', body: flightData });
      return this.normalizeFlight(res.flight);
    },
    update: async (id, flightData) => {
      const res = await this.request(`/flights/${id}`, { method: 'PUT', body: flightData });
      return this.normalizeFlight(res.flight);
    },
    updateStatus: async (id, status, operationalStatus) => {
      const res = await this.request(`/flights/${id}/status`, {
        method: 'PATCH',
        body: { status, flightStatus: status, operationalStatus }
      });
      return this.normalizeFlight(res.flight);
    },
    delete: (id) => this.request(`/flights/${id}`, { method: 'DELETE' }),
    getFilterCounts: () => this.request('/flights/filters/counts')
  };

  fleet = {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await this.request(`/fleet${query ? `?${query}` : ''}`);
      const rawFleet = res.fleet || [];
      return {
        count: res.count || rawFleet.length,
        fleet: rawFleet.map(a => this.normalizeAircraft(a))
      };
    },
    getSummary: () => this.request('/fleet/stats/summary'),
    getById: async (id) => {
      const res = await this.request(`/fleet/${id}`);
      return this.normalizeAircraft(res.aircraft);
    },
    create: async (aircraftData) => {
      const res = await this.request('/fleet', { method: 'POST', body: aircraftData });
      return this.normalizeAircraft(res.aircraft);
    },
    updateAvailability: async (id, availabilityStatus) => {
      const res = await this.request(`/fleet/${id}/availability`, {
        method: 'PATCH',
        body: { availabilityStatus }
      });
      return this.normalizeAircraft(res.aircraft);
    },
    delete: (id) => this.request(`/fleet/${id}`, { method: 'DELETE' })
  };

  crew = {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await this.request(`/crew${query ? `?${query}` : ''}`);
      const rawCrew = res.crew || [];
      return {
        count: res.count || rawCrew.length,
        crew: rawCrew.map(c => this.normalizeCrew(c))
      };
    },
    getSummary: () => this.request('/crew/stats/summary'),
    getById: async (id) => {
      const res = await this.request(`/crew/${id}`);
      return this.normalizeCrew(res.crew);
    },
    create: async (crewData) => {
      const res = await this.request('/crew', { method: 'POST', body: crewData });
      return this.normalizeCrew(res.crew);
    },
    updateDutyStatus: async (id, dutyStatus) => {
      const res = await this.request(`/crew/${id}/duty-status`, {
        method: 'PATCH',
        body: { dutyStatus }
      });
      return this.normalizeCrew(res.crew);
    },
    assignFlight: async (id, flightNumber) => {
      const res = await this.request(`/crew/${id}/assign-flight`, {
        method: 'PATCH',
        body: { flightNumber }
      });
      return this.normalizeCrew(res.crew);
    },
    delete: (id) => this.request(`/crew/${id}`, { method: 'DELETE' })
  };

  maintenance = {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await this.request(`/maintenance${query ? `?${query}` : ''}`);
      const rawLogs = res.logs || [];
      return {
        count: res.count || rawLogs.length,
        maintenance: rawLogs.map(m => this.normalizeMaintenance(m))
      };
    },
    getSummary: () => this.request('/maintenance/stats/summary'),
    create: async (data) => {
      const res = await this.request('/maintenance', { method: 'POST', body: data });
      return this.normalizeMaintenance(res.log);
    },
    signOff: async (id, signOffRemarks = '') => {
      const res = await this.request(`/maintenance/${id}/sign-off`, {
        method: 'PATCH',
        body: { signOffRemarks }
      });
      return this.normalizeMaintenance(res.log);
    },
    delete: (id) => this.request(`/maintenance/${id}`, { method: 'DELETE' })
  };

  liveOps = {
    getRadar: () => this.request('/live-ops/radar'),
    syncRadar: () => this.request('/live-ops/radar/sync', { method: 'POST' }),
    getAlerts: () => this.request('/live-ops/alerts'),
    getDelays: () => this.request('/live-ops/delays'),
    broadcastAdvisory: (advisory) => this.request('/live-ops/alerts/broadcast', { method: 'POST', body: advisory }),
    expediteDelay: (flightId) => this.request(`/live-ops/delays/${flightId}/expedite`, { method: 'PATCH' })
  };

  analytics = {
    getOverview: (period = 'all') => this.request(`/analytics/overview?period=${encodeURIComponent(period)}`),
    getHourlyOtp: () => this.request('/analytics/hourly-otp'),
    getFleetProductivity: () => this.request('/analytics/fleet-productivity'),
    recalculate: () => this.request('/analytics/recalculate', { method: 'POST' })
  };

  operations = {
    getActivityLogs: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return this.request(`/operations/activity${query ? `?${query}` : ''}`);
    }
  };
}

export const api = new ApiClient(API_BASE_URL);
export default api;
