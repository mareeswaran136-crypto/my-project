/**
 * SAVÉRA AeroSync OCC - Express.js REST API Server
 * For Future Backend Integration & Enterprise Telemetry Feed
 * 
 * Brand: SAVÉRA | Platform: AeroSync | Special Feature: FlightRipple
 * Tagline: Fly Smarter. Grow Bigger.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Can be connected to PostgreSQL / MongoDB / Redis)
const SAVERA_DATA = {
  brand: {
    name: "SAVÉRA",
    platform: "AeroSync OCC",
    version: "v4.8.2 Enterprise",
    tagline: "Fly Smarter. Grow Bigger.",
    icao: "SVR",
    iata: "SV",
    callsign: "SAVERA",
    hub: "DEL (Indira Gandhi Int'l - Terminal 3)",
    secondaryHub: "BOM (Chhatrapati Shivaji Maharaj - Terminal 2)"
  },
  stats: {
    activeFlights: 42,
    aircraftOnline: "28/32",
    crewOnDuty: 184,
    onTimePerformance: 94.8,
    cascadingDelaysPreventedMinutes: 142,
    costSavingsUSD: "$38,450"
  },
  flights: [
    {
      id: "SV-302",
      flightNumber: "SV 302",
      route: "DEL ➔ BOM",
      origin: "Delhi (DEL)",
      destination: "Mumbai (BOM)",
      status: "In Flight",
      departureTime: "08:30 IST",
      arrivalTime: "10:45 IST",
      aircraft: "VT-SAV (A350-900)",
      captain: "Capt. Rajesh Varma",
      progress: 68,
      altitude: "36,000 ft",
      speed: "875 km/h",
      flightRippleScore: "99.4% Optimum"
    },
    {
      id: "SV-114",
      flightNumber: "SV 114",
      route: "MAA ➔ DXB",
      origin: "Chennai (MAA)",
      destination: "Dubai (DXB)",
      status: "In Flight",
      departureTime: "07:15 IST",
      arrivalTime: "10:00 GST",
      aircraft: "VT-SVR (B787-9)",
      captain: "Capt. Tarun Kapoor",
      progress: 82,
      altitude: "39,000 ft",
      speed: "910 km/h",
      flightRippleScore: "98.9% Optimum"
    },
    {
      id: "SV-805",
      flightNumber: "SV 805",
      route: "BLR ➔ LHR",
      origin: "Bengaluru (BLR)",
      destination: "London (LHR)",
      status: "Delayed",
      departureTime: "11:20 IST",
      arrivalTime: "16:45 GMT",
      aircraft: "VT-SVA (B787-9)",
      captain: "Capt. Vikram Rathore",
      progress: 0,
      altitude: "Ground Hold",
      speed: "0 km/h",
      delayReason: "Air Traffic Flow Control (LHR Slot Hold)",
      flightRippleScore: "84.2% Mitigating"
    },
    {
      id: "SV-440",
      flightNumber: "SV 440",
      route: "CCU ➔ SIN",
      origin: "Kolkata (CCU)",
      destination: "Singapore (SIN)",
      status: "Boarding",
      departureTime: "10:15 IST",
      arrivalTime: "16:50 SGT",
      aircraft: "VT-SVE (A321neo)",
      captain: "Capt. Meera Nair",
      progress: 0,
      altitude: "Gate Apron",
      speed: "0 km/h",
      flightRippleScore: "97.6% Optimum"
    },
    {
      id: "SV-209",
      flightNumber: "SV 209",
      route: "HYD ➔ DEL",
      origin: "Hyderabad (HYD)",
      destination: "Delhi (DEL)",
      status: "On Time",
      departureTime: "11:00 IST",
      arrivalTime: "13:15 IST",
      aircraft: "VT-SVC (A321neo)",
      captain: "Capt. Sameer Joshi",
      progress: 0,
      altitude: "Pre-Flight Check",
      speed: "0 km/h",
      flightRippleScore: "99.1% Optimum"
    }
  ],
  systemStatus: {
    server: { status: "Operational", uptime: "99.99%", latency: "18ms" },
    database: { status: "Connected", pool: "PostgreSQL 16 Multi-AZ", latency: "14ms" },
    api: { status: "Healthy", rate: "124 req/s", errorRate: "0.001%" },
    dataSync: { status: "Synchronized", lastSync: "Just now", heartbeat: "WebSocket Active" },
    backup: { status: "Continuous WAL Active", rpo: "< 1s", snapshot: "14m ago" }
  }
};

// 1. Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'SAVÉRA AeroSync Backend API',
    timestamp: new Date().toISOString()
  });
});

// 2. Brand & Platform Metadata
app.get('/api/brand', (req, res) => {
  res.json(SAVERA_DATA.brand);
});

// 3. High-Level OCC Statistics
app.get('/api/stats', (req, res) => {
  res.json(SAVERA_DATA.stats);
});

// 4. Live Flight Operations
app.get('/api/flights', (req, res) => {
  const { status, search } = req.query;
  let results = [...SAVERA_DATA.flights];

  if (status && status !== 'ALL') {
    results = results.filter(f => f.status.toUpperCase() === status.toUpperCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(f =>
      f.flightNumber.toLowerCase().includes(q) ||
      f.route.toLowerCase().includes(q) ||
      f.aircraft.toLowerCase().includes(q) ||
      f.captain.toLowerCase().includes(q)
    );
  }

  res.json({
    total: results.length,
    flights: results
  });
});

// 5. Single Flight Detail Telemetry
app.get('/api/flights/:id', (req, res) => {
  const flight = SAVERA_DATA.flights.find(f => f.id === req.params.id || f.flightNumber === req.params.id);
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found in AeroSync tracking' });
  }
  res.json(flight);
});

// 6. Dispatch / Schedule New Flight
app.post('/api/flights', (req, res) => {
  const newFlight = {
    id: `SV-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    status: req.body.status || 'Scheduled',
    progress: 0,
    flightRippleScore: '99.5% Optimum'
  };
  SAVERA_DATA.flights.unshift(newFlight);
  res.status(201).json({
    message: `Flight ${newFlight.flightNumber} successfully dispatched via AeroSync`,
    flight: newFlight
  });
});

// 7. FlightRipple AI Telemetry
app.get('/api/flightripple/metrics', (req, res) => {
  res.json({
    syncStatus: "Real-time Synchronized",
    cascadingDelayPreventedMinutes: SAVERA_DATA.stats.cascadingDelaysPreventedMinutes,
    costSavingsUSD: SAVERA_DATA.stats.costSavingsUSD,
    activeMitigationEvents: 3,
    algorithms: ["HubTurnCompress-v3", "StepClimbOptimizer", "SlotHoldBuffer"]
  });
});

// 8. FlightRipple Simulator
app.post('/api/flightripple/simulate', (req, res) => {
  const { delayMinutes = 20 } = req.body;
  const unmitigated = delayMinutes * 3.4;
  const mitigated = Math.round(delayMinutes * 0.35);

  res.json({
    inputDelay: delayMinutes,
    unmitigatedRippleDelayMinutes: unmitigated,
    mitigatedDelayMinutes: mitigated,
    delayRecoveredMinutes: Math.round(unmitigated - mitigated),
    projectedCostProtectedUSD: `$${Math.round(delayMinutes * 1280)}`,
    mitigationStrategy: [
      "Prioritize turnaround ground dispatch team at bay",
      "Deploy dual-point fueling",
      "Request high-mach cruise step vector from ATC"
    ]
  });
});

// 9. Mission-Critical System Status
app.get('/api/system/status', (req, res) => {
  res.json(SAVERA_DATA.systemStatus);
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✈️  SAVÉRA AeroSync Backend running on port ${PORT}`);
    console.log(`📡 Endpoints available at http://localhost:${PORT}/api/flights`);
  });
}

module.exports = app;
