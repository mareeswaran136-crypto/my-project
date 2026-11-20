# SAVÉRA AeroSync Backend API (Node.js & Express.js)

Enterprise REST API server powering the SAVÉRA Airline Operations Admin Dashboard.

## Features
- **Flight Operations Telemetry**: Live ADS-B radar coordination (`/api/flights`, `/api/flights/:id`)
- **FlightRipple™ AI Engine**: Real-time delay cascade prediction & algorithmic recovery (`/api/flightripple/metrics`, `/api/flightripple/simulate`)
- **Fleet Airworthiness & CAMO**: Airframe tracking and engine cycles
- **DGCA / FAA Crew FTL**: statutory duty hours and roster dispatch
- **Mission-Critical Status**: Server uptime, database clustering, and sync heartbeat

## Running the Backend

```bash
cd server
npm install
npm start
```

The server runs at `http://localhost:5000`.
