// SAVÉRA AeroSync Enterprise Mock Data & Telemetry
// Brand: SAVÉRA | Platform: AeroSync | Tagline: "Fly Smarter. Grow Bigger."

export const SAVERA_BRAND = {
  name: "SAVÉRA",
  subtitle: "AIRLINES",
  platform: "AeroSync OCC",
  version: "v4.8.2 Enterprise",
  tagline: "Fly Smarter. Grow Bigger.",
  icao: "SVR",
  iata: "SV",
  callsign: "SAVERA",
  hub: "DEL (Indira Gandhi Int'l - Terminal 3)",
  secondaryHub: "BOM (Chhatrapati Shivaji Maharaj - Terminal 2)",
  timeZone: "Asia/Kolkata (IST / UTC+05:30)",
  adminUser: {
    name: "Capt. Rajesh Varma",
    title: "Chief Operations Controller",
    role: "Super Admin",
    badgeId: "SVR-OCC-001",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "rajesh.varma@savera.aero",
    shift: "Day Shift (06:00 - 18:00 IST)",
    clearance: "Level 5 - Unrestricted Airspace & Dispatch",
  }
};

export const SAVERA_STATS = {
  activeFlights: {
    value: 42,
    totalToday: 188,
    change: "+8.4%",
    isPositive: true,
    inAir: 28,
    taxiing: 9,
    boarding: 5,
    label: "Active Flights",
    period: "vs. yesterday"
  },
  aircraftOnline: {
    value: 28,
    totalFleet: 32,
    change: "87.5%",
    isPositive: true,
    inMaintenance: 3,
    standby: 1,
    label: "Aircraft Online",
    period: "Fleet Utilization"
  },
  crewOnDuty: {
    value: 184,
    totalCrew: 220,
    change: "+12",
    isPositive: true,
    captains: 42,
    firstOfficers: 46,
    cabinCrew: 96,
    standby: 16,
    label: "Crew on Duty",
    period: "Active Rosters"
  },
  onTimePerformance: {
    value: 94.8,
    target: 92.5,
    change: "+2.3%",
    isPositive: true,
    delayedCount: 4,
    avgDelayMin: 14,
    label: "On-Time Performance",
    period: "Target: >92.0%"
  }
};

export const SAVERA_FLIGHTS = [
  {
    id: "SV-302",
    flightNumber: "SV 302",
    route: "DEL ➔ BOM",
    origin: "Delhi (DEL)",
    destination: "Mumbai (BOM)",
    status: "In Flight",
    departureTime: "08:30 IST",
    scheduledDeparture: "08:30",
    arrivalTime: "10:45 IST",
    scheduledArrival: "10:45",
    gate: "Gate 18A",
    terminal: "T3",
    aircraft: "VT-SAV (A350-900)",
    aircraftType: "Airbus A350-900",
    crew: {
      captain: "Capt. Rajesh Varma",
      firstOfficer: "FO Priya Sen",
      leadCabin: "Ananya Roy",
      crewCount: 8
    },
    passengers: 294,
    capacity: 310,
    altitude: "36,000 ft",
    speed: "875 km/h",
    progress: 68,
    flightRippleScore: "99.4% Optimum",
    fuelEfficiency: "+3.8% Saved"
  },
  {
    id: "SV-114",
    flightNumber: "SV 114",
    route: "MAA ➔ DXB",
    origin: "Chennai (MAA)",
    destination: "Dubai (DXB)",
    status: "In Flight",
    departureTime: "07:15 IST",
    scheduledDeparture: "07:15",
    arrivalTime: "10:00 GST",
    scheduledArrival: "10:00",
    gate: "Gate 04",
    terminal: "T2",
    aircraft: "VT-SVR (B787-9)",
    aircraftType: "Boeing 787-9 Dreamliner",
    crew: {
      captain: "Capt. Tarun Kapoor",
      firstOfficer: "FO Siddharth Mehta",
      leadCabin: "Kavita Rao",
      crewCount: 10
    },
    passengers: 288,
    capacity: 296,
    altitude: "39,000 ft",
    speed: "910 km/h",
    progress: 82,
    flightRippleScore: "98.9% Optimum",
    fuelEfficiency: "+4.1% Saved"
  },
  {
    id: "SV-805",
    flightNumber: "SV 805",
    route: "BLR ➔ LHR",
    origin: "Bengaluru (BLR)",
    destination: "London (LHR)",
    status: "Delayed",
    departureTime: "11:20 IST",
    scheduledDeparture: "10:35",
    arrivalTime: "16:45 GMT",
    scheduledArrival: "16:00",
    gate: "Gate 22B",
    terminal: "T2",
    aircraft: "VT-SVA (B787-9)",
    aircraftType: "Boeing 787-9 Dreamliner",
    crew: {
      captain: "Capt. Vikram Rathore",
      firstOfficer: "FO Ananya Dixit",
      leadCabin: "Rohit Malhotra",
      crewCount: 11
    },
    passengers: 280,
    capacity: 296,
    altitude: "Ground Hold",
    speed: "0 km/h",
    progress: 0,
    delayReason: "Air Traffic Flow Control (LHR Slot Hold)",
    flightRippleScore: "84.2% Mitigating",
    fuelEfficiency: "Re-routed for recovery"
  },
  {
    id: "SV-440",
    flightNumber: "SV 440",
    route: "CCU ➔ SIN",
    origin: "Kolkata (CCU)",
    destination: "Singapore (SIN)",
    status: "Boarding",
    departureTime: "10:15 IST",
    scheduledDeparture: "10:15",
    arrivalTime: "16:50 SGT",
    scheduledArrival: "16:50",
    gate: "Gate 11",
    terminal: "T1",
    aircraft: "VT-SVE (A321neo)",
    aircraftType: "Airbus A321neo",
    crew: {
      captain: "Capt. Meera Nair",
      firstOfficer: "FO Karan Oberoi",
      leadCabin: "Deepa Menon",
      crewCount: 6
    },
    passengers: 188,
    capacity: 192,
    altitude: "Gate Apron",
    speed: "0 km/h",
    progress: 0,
    flightRippleScore: "97.6% Optimum",
    fuelEfficiency: "Standard Profile"
  },
  {
    id: "SV-209",
    flightNumber: "SV 209",
    route: "HYD ➔ DEL",
    origin: "Hyderabad (HYD)",
    destination: "Delhi (DEL)",
    status: "On Time",
    departureTime: "11:00 IST",
    scheduledDeparture: "11:00",
    arrivalTime: "13:15 IST",
    scheduledArrival: "13:15",
    gate: "Gate 07",
    terminal: "T1",
    aircraft: "VT-SVC (A321neo)",
    aircraftType: "Airbus A321neo",
    crew: {
      captain: "Capt. Sameer Joshi",
      firstOfficer: "FO Neha Sharma",
      leadCabin: "Sunita Iyer",
      crewCount: 6
    },
    passengers: 184,
    capacity: 192,
    altitude: "Pre-Flight Check",
    speed: "0 km/h",
    progress: 0,
    flightRippleScore: "99.1% Optimum",
    fuelEfficiency: "+2.9% Saved"
  },
  {
    id: "SV-612",
    flightNumber: "SV 612",
    route: "BOM ➔ JFK",
    origin: "Mumbai (BOM)",
    destination: "New York (JFK)",
    status: "Scheduled",
    departureTime: "13:40 IST",
    scheduledDeparture: "13:40",
    arrivalTime: "19:15 EST",
    scheduledArrival: "19:15",
    gate: "Gate 48",
    terminal: "T2",
    aircraft: "VT-SVB (B777-300ER)",
    aircraftType: "Boeing 777-300ER",
    crew: {
      captain: "Capt. Arvind Swaminathan",
      firstOfficer: "FO Alok Deshmukh",
      leadCabin: "Fatima Sheikh",
      crewCount: 14
    },
    passengers: 338,
    capacity: 342,
    altitude: "Flight Plan Filed",
    speed: "0 km/h",
    progress: 0,
    flightRippleScore: "99.8% Optimum",
    fuelEfficiency: "+4.5% Saved"
  },
  {
    id: "SV-551",
    flightNumber: "SV 551",
    route: "DEL ➔ BLR",
    origin: "Delhi (DEL)",
    destination: "Bengaluru (BLR)",
    status: "In Flight",
    departureTime: "09:05 IST",
    scheduledDeparture: "09:05",
    arrivalTime: "11:50 IST",
    scheduledArrival: "11:50",
    gate: "Gate 15",
    terminal: "T3",
    aircraft: "VT-SVD (A350-900)",
    aircraftType: "Airbus A350-900",
    crew: {
      captain: "Capt. Kabir Bedi",
      firstOfficer: "FO Shweta Tiwari",
      leadCabin: "Aditya Verma",
      crewCount: 8
    },
    passengers: 302,
    capacity: 310,
    altitude: "38,000 ft",
    speed: "860 km/h",
    progress: 45,
    flightRippleScore: "98.7% Optimum",
    fuelEfficiency: "+3.2% Saved"
  },
  {
    id: "SV-718",
    flightNumber: "SV 718",
    route: "BOM ➔ DEL",
    origin: "Mumbai (BOM)",
    destination: "Delhi (DEL)",
    status: "On Time",
    departureTime: "12:15 IST",
    scheduledDeparture: "12:15",
    arrivalTime: "14:30 IST",
    scheduledArrival: "14:30",
    gate: "Gate 24",
    terminal: "T2",
    aircraft: "VT-SVF (A320neo)",
    aircraftType: "Airbus A320neo",
    crew: {
      captain: "Capt. Sunil Chetri",
      firstOfficer: "FO Manish Pandey",
      leadCabin: "Zoya Khan",
      crewCount: 6
    },
    passengers: 172,
    capacity: 180,
    altitude: "Turnaround In Progress",
    speed: "0 km/h",
    progress: 0,
    flightRippleScore: "96.4% Optimum",
    fuelEfficiency: "+2.1% Saved"
  }
];

export const SAVERA_CREW = [
  {
    id: "CRW-8821",
    name: "Capt. Rajesh Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    designation: "Fleet Captain (A350/B787)",
    department: "Flight Operations",
    assignedFlight: "SV-302",
    dutyTime: "04h 15m / 10h Max",
    dutyPercent: 42.5,
    availabilityStatus: "On Duty",
    baseHub: "DEL",
    experienceYears: 18,
    flightHours: "12,450 hrs",
    license: "ATPL-IND-99120"
  },
  {
    id: "CRW-4019",
    name: "Capt. Tarun Kapoor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    designation: "Senior Captain (B787)",
    department: "Flight Operations",
    assignedFlight: "SV-114",
    dutyTime: "05h 45m / 10h Max",
    dutyPercent: 57.5,
    availabilityStatus: "On Duty",
    baseHub: "MAA",
    experienceYears: 16,
    flightHours: "11,200 hrs",
    license: "ATPL-IND-88432"
  },
  {
    id: "CRW-9142",
    name: "Capt. Vikram Rathore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    designation: "Commander (B787-9)",
    department: "Flight Operations",
    assignedFlight: "SV-805",
    dutyTime: "02h 30m / 10h Max",
    dutyPercent: 25.0,
    availabilityStatus: "Briefing",
    baseHub: "BLR",
    experienceYears: 14,
    flightHours: "9,800 hrs",
    license: "ATPL-IND-77319"
  },
  {
    id: "CRW-6330",
    name: "FO Priya Sen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    designation: "First Officer (A350)",
    department: "Flight Operations",
    assignedFlight: "SV-302",
    dutyTime: "04h 15m / 10h Max",
    dutyPercent: 42.5,
    availabilityStatus: "On Duty",
    baseHub: "DEL",
    experienceYears: 7,
    flightHours: "4,600 hrs",
    license: "CPL-IND-54129"
  },
  {
    id: "CRW-7215",
    name: "Capt. Meera Nair",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    designation: "Captain (A321neo)",
    department: "Flight Operations",
    assignedFlight: "SV-440",
    dutyTime: "01h 10m / 10h Max",
    dutyPercent: 11.6,
    availabilityStatus: "On Duty",
    baseHub: "CCU",
    experienceYears: 12,
    flightHours: "8,900 hrs",
    license: "ATPL-IND-66124"
  },
  {
    id: "CRW-3108",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    designation: "Lead In-Flight Purser",
    department: "Cabin Services",
    assignedFlight: "SV-302",
    dutyTime: "04h 30m / 11h Max",
    dutyPercent: 40.9,
    availabilityStatus: "On Duty",
    baseHub: "DEL",
    experienceYears: 9,
    flightHours: "6,200 hrs",
    license: "CC-IND-9943"
  },
  {
    id: "CRW-5544",
    name: "Kavita Rao",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    designation: "Senior Cabin Lead",
    department: "Cabin Services",
    assignedFlight: "SV-114",
    dutyTime: "06h 00m / 11h Max",
    dutyPercent: 54.5,
    availabilityStatus: "On Duty",
    baseHub: "MAA",
    experienceYears: 10,
    flightHours: "7,100 hrs",
    license: "CC-IND-8812"
  },
  {
    id: "CRW-1982",
    name: "Capt. Sameer Joshi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    designation: "Senior Captain (A321)",
    department: "Flight Operations",
    assignedFlight: "SV-209",
    dutyTime: "00h 45m / 10h Max",
    dutyPercent: 7.5,
    availabilityStatus: "Briefing",
    baseHub: "HYD",
    experienceYears: 15,
    flightHours: "10,500 hrs",
    license: "ATPL-IND-77812"
  },
  {
    id: "CRW-9901",
    name: "FO Karan Oberoi",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    designation: "First Officer (A321neo)",
    department: "Flight Operations",
    assignedFlight: "SV-440",
    dutyTime: "01h 10m / 10h Max",
    dutyPercent: 11.6,
    availabilityStatus: "On Duty",
    baseHub: "CCU",
    experienceYears: 5,
    flightHours: "3,200 hrs",
    license: "CPL-IND-44219"
  },
  {
    id: "CRW-2219",
    name: "Capt. Alok Deshmukh",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    designation: "Relief Captain (B777)",
    department: "Flight Operations",
    assignedFlight: "SV-612 (Standby)",
    dutyTime: "00h 00m / 12h Max",
    dutyPercent: 0,
    availabilityStatus: "Standby",
    baseHub: "BOM",
    experienceYears: 13,
    flightHours: "9,100 hrs",
    license: "ATPL-IND-55912"
  },
  {
    id: "CRW-4402",
    name: "Rohit Malhotra",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    designation: "Flight Attendant / Safety Officer",
    department: "Cabin Services",
    assignedFlight: "SV-805",
    dutyTime: "02h 30m / 11h Max",
    dutyPercent: 22.7,
    availabilityStatus: "Briefing",
    baseHub: "BLR",
    experienceYears: 6,
    flightHours: "4,100 hrs",
    license: "CC-IND-6631"
  },
  {
    id: "CRW-1088",
    name: "Sunita Iyer",
    avatar: "https://images.unsplash.com/photo-1534751516642-a171edd25217?w=150&auto=format&fit=crop&q=80",
    designation: "Cabin Supervisor",
    department: "Cabin Services",
    assignedFlight: "SV-209",
    dutyTime: "00h 45m / 11h Max",
    dutyPercent: 6.8,
    availabilityStatus: "Briefing",
    baseHub: "HYD",
    experienceYears: 8,
    flightHours: "5,800 hrs",
    license: "CC-IND-7734"
  }
];

export const FLIGHTRIPPLE_METRICS = {
  syncStatus: "Real-time Synchronized",
  lastCalculation: "3.2 seconds ago",
  cascadingDelayPreventedMinutes: 142,
  costSavingsUSD: "$38,450",
  activeMitigationEvents: 3,
  metrics: [
    {
      label: "Real-time Flight Sync",
      value: "99.8%",
      status: "Optimal",
      subtext: "42 active telemetry streams",
      color: "#C5A059"
    },
    {
      label: "Resource Allocation",
      value: "94.2%",
      status: "Balanced",
      subtext: "Gate, baggage, apron assigned",
      color: "#10B981"
    },
    {
      label: "Flight Efficiency",
      value: "96.5%",
      status: "High",
      subtext: "+3.8% fuel optimization",
      color: "#3B82F6"
    },
    {
      label: "Resource Usage",
      value: "88.4%",
      status: "Normal",
      subtext: "28/32 frames active",
      color: "#8B5CF6"
    },
    {
      label: "Operational Performance",
      value: "94.8%",
      status: "Surpassing",
      subtext: "+2.3% above target index",
      color: "#F59E0B"
    }
  ],
  // 24-Hour Network Telemetry Data for Interactive Ripple Chart
  timelineData: [
    { time: "00:00", efficiency: 91, sync: 98, rippleScore: 92, delaysPrevented: 4, fuelBurnIndex: 88 },
    { time: "02:00", efficiency: 93, sync: 99, rippleScore: 94, delaysPrevented: 6, fuelBurnIndex: 89 },
    { time: "04:00", efficiency: 95, sync: 100, rippleScore: 96, delaysPrevented: 11, fuelBurnIndex: 91 },
    { time: "06:00", efficiency: 94, sync: 99, rippleScore: 95, delaysPrevented: 18, fuelBurnIndex: 93 },
    { time: "08:00", efficiency: 96, sync: 100, rippleScore: 98, delaysPrevented: 24, fuelBurnIndex: 95 },
    { time: "10:00", efficiency: 97, sync: 100, rippleScore: 99, delaysPrevented: 31, fuelBurnIndex: 97 },
    { time: "12:00", efficiency: 95, sync: 99, rippleScore: 96, delaysPrevented: 22, fuelBurnIndex: 94 },
    { time: "14:00", efficiency: 96, sync: 100, rippleScore: 97, delaysPrevented: 28, fuelBurnIndex: 95 },
    { time: "16:00", efficiency: 98, sync: 100, rippleScore: 99, delaysPrevented: 35, fuelBurnIndex: 98 },
    { time: "18:00", efficiency: 96, sync: 99, rippleScore: 97, delaysPrevented: 29, fuelBurnIndex: 96 },
    { time: "20:00", efficiency: 94, sync: 99, rippleScore: 95, delaysPrevented: 19, fuelBurnIndex: 93 },
    { time: "22:00", efficiency: 93, sync: 98, rippleScore: 93, delaysPrevented: 12, fuelBurnIndex: 90 }
  ]
};

export const SAVERA_AIRCRAFT = [
  {
    tailNumber: "VT-SAV",
    model: "Airbus A350-900",
    manufacturer: "Airbus",
    status: "In Flight",
    assignedFlight: "SV-302 (DEL ➔ BOM)",
    totalHours: "3,420 hrs",
    cycles: "820",
    fuelCapacity: "141,000 L",
    currentFuel: "84%",
    nextCheck: "A-Check in 480 hrs",
    airworthiness: "100% Certified",
    cabinConfig: "J32 W24 Y254"
  },
  {
    tailNumber: "VT-SVR",
    model: "Boeing 787-9 Dreamliner",
    manufacturer: "Boeing",
    status: "In Flight",
    assignedFlight: "SV-114 (MAA ➔ DXB)",
    totalHours: "4,180 hrs",
    cycles: "1,140",
    fuelCapacity: "126,000 L",
    currentFuel: "76%",
    nextCheck: "A-Check in 310 hrs",
    airworthiness: "100% Certified",
    cabinConfig: "J30 W21 Y245"
  },
  {
    tailNumber: "VT-SVA",
    model: "Boeing 787-9 Dreamliner",
    manufacturer: "Boeing",
    status: "Delayed / Ground",
    assignedFlight: "SV-805 (BLR ➔ LHR)",
    totalHours: "3,890 hrs",
    cycles: "980",
    fuelCapacity: "126,000 L",
    currentFuel: "98%",
    nextCheck: "Line Check Due in 4 days",
    airworthiness: "100% Certified",
    cabinConfig: "J30 W21 Y245"
  },
  {
    tailNumber: "VT-SVB",
    model: "Boeing 777-300ER",
    manufacturer: "Boeing",
    status: "Scheduled",
    assignedFlight: "SV-612 (BOM ➔ JFK)",
    totalHours: "7,820 hrs",
    cycles: "1,890",
    fuelCapacity: "181,280 L",
    currentFuel: "92%",
    nextCheck: "C-Check in 1,200 hrs",
    airworthiness: "100% Certified",
    cabinConfig: "F8 J40 W32 Y262"
  },
  {
    tailNumber: "VT-SVC",
    model: "Airbus A321neo",
    manufacturer: "Airbus",
    status: "Pre-Flight",
    assignedFlight: "SV-209 (HYD ➔ DEL)",
    totalHours: "2,150 hrs",
    cycles: "1,450",
    fuelCapacity: "32,940 L",
    currentFuel: "89%",
    nextCheck: "Weekly Service Today",
    airworthiness: "100% Certified",
    cabinConfig: "J12 Y180"
  },
  {
    tailNumber: "VT-SVE",
    model: "Airbus A321neo",
    manufacturer: "Airbus",
    status: "Boarding",
    assignedFlight: "SV-440 (CCU ➔ SIN)",
    totalHours: "1,980 hrs",
    cycles: "1,310",
    fuelCapacity: "32,940 L",
    currentFuel: "91%",
    nextCheck: "A-Check in 620 hrs",
    airworthiness: "100% Certified",
    cabinConfig: "J12 Y180"
  },
  {
    tailNumber: "VT-SVM",
    model: "Airbus A320neo",
    manufacturer: "Airbus",
    status: "Hangar Maintenance",
    assignedFlight: "Unassigned (A-Check)",
    totalHours: "5,420 hrs",
    cycles: "3,980",
    fuelCapacity: "27,200 L",
    currentFuel: "20%",
    nextCheck: "In Progress (Hangar Bay 4 - DEL)",
    airworthiness: "Under Maintenance",
    cabinConfig: "J8 Y168"
  }
];

export const SYSTEM_STATUS_DATA = {
  serverStatus: {
    status: "Operational",
    uptime: "99.99%",
    region: "AWS Asia-South (Mumbai) + Azure DR Failover",
    responseTime: "18ms",
    healthy: true
  },
  databaseConnection: {
    status: "Connected",
    latency: "14ms",
    cluster: "AeroSync Multi-AZ PostgreSQL 16.3",
    poolSize: "128 Active Connections",
    healthy: true
  },
  apiStatus: {
    status: "Healthy",
    rate: "124 req/sec",
    services: "ADS-B Telemetry, Weather Radar, GDS Ticketing",
    errorRate: "0.001%",
    healthy: true
  },
  lastDataSync: {
    status: "Synchronized",
    interval: "4 seconds ago",
    autoRefresh: "Active (WebSocket Heartbeat)",
    recordsProcessed: "184,200 events/hr",
    healthy: true
  },
  backupStatus: {
    status: "Continuous WAL Active",
    lastSnapshot: "14 minutes ago",
    rpo: "< 1 second",
    rto: "< 2 minutes",
    storage: "Encrypted S3 Geo-Redundant",
    healthy: true
  }
};

export const NOTIFICATIONS_DATA_SAVERA = [
  {
    id: "notif-01",
    title: "FlightRipple Auto-Mitigation: SV-805",
    description: "Calculated optimal Mach 0.85 step climb to absorb 22 min LHR slot hold, saving 1.2 tons fuel.",
    time: "2 mins ago",
    type: "ripple",
    read: false,
    priority: "high"
  },
  {
    id: "notif-02",
    title: "Air Traffic Flow Management Advisory",
    description: "Monsoon squall alert over Mumbai (VABB). Expect 10-15m tactical vectors for Runway 27 arrivals.",
    time: "12 mins ago",
    type: "weather",
    read: false,
    priority: "warning"
  },
  {
    id: "notif-03",
    title: "Crew FTL Compliance Verified",
    description: "Capt. Rajesh Varma and FO Priya Sen cleared for SV-302 turnaround within statutory duty limits.",
    time: "25 mins ago",
    type: "crew",
    read: true,
    priority: "info"
  },
  {
    id: "notif-04",
    title: "Aircraft VT-SVM Maintenance Update",
    description: "Left CFM LEAP-1A hydraulic seal inspection passed in Hangar 4. Ground release expected 15:30 IST.",
    time: "48 mins ago",
    type: "maintenance",
    read: true,
    priority: "info"
  }
];

export const MAINTENANCE_RECORDS_SAVERA = [
  {
    id: "WO-9941",
    aircraft: "VT-SVM (A320neo)",
    type: "A-Check Scheduled",
    bay: "Hangar Bay 4 (DEL)",
    leadTech: "Eng. Suresh Nair",
    status: "In Progress",
    started: "06:00 IST",
    estCompletion: "15:30 IST",
    progress: 72,
    priority: "High"
  },
  {
    id: "WO-9938",
    aircraft: "VT-SVA (B787-9)",
    type: "APU EGT Sensor Calibration",
    bay: "Terminal 2 Apron (BLR)",
    leadTech: "Eng. Amit Roy",
    status: "Completed",
    started: "08:15 IST",
    estCompletion: "09:45 IST",
    progress: 100,
    priority: "Normal"
  },
  {
    id: "WO-9935",
    aircraft: "VT-SVC (A321neo)",
    type: "Avionics TCAS Software Update 7.1",
    bay: "Line Maintenance (HYD)",
    leadTech: "Eng. Pooja Dave",
    status: "Completed",
    started: "04:30 IST",
    estCompletion: "05:45 IST",
    progress: 100,
    priority: "Routine"
  }
];
