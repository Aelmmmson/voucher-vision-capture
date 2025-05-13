
# X100+ Voucher Scanner

A modern React application for scanning vouchers using the MagTek Excella STX device.

## Project Overview

This application provides a user interface for scanning vouchers, displaying the scanned images, and saving the data to a database. It consists of a React frontend that communicates with a Java Spring Boot backend (not included in this repository).

## Features

- Device connection status indicator
- Connect to MagTek Excella STX device
- Scan vouchers to capture MICR data and front/back images
- Save voucher data to a database
- Simple and intuitive user interface

## Technical Stack

- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Java Spring Boot REST API (to be implemented separately)
- **Device**: MagTek Excella STX scanner
- **Database**: Oracle database

## Getting Started

### Frontend Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Backend Integration

The frontend is designed to work with a Spring Boot backend that implements these endpoints:

- `GET /api/device-status`: Returns device connection status
- `POST /api/connect`: Connects to the scanning device
- `POST /api/scan-voucher`: Initiates a voucher scan
- `POST /api/save-to-db`: Saves voucher data to the database

Currently, the frontend uses mock API implementations. To connect to a real backend, update the API service in `src/services/api.ts`.

## Java Backend Implementation

The backend should be implemented as a Spring Boot application that:

1. Communicates with the MagTek Excella STX device using its Java SDK
2. Connects to an Oracle database for storing voucher data
3. Exposes REST endpoints for the frontend to consume

The database should include a `vouchers` table with these columns:
- `id`
- `voucher_no`
- `nation`  
- `micr`
- `front_image`
- `back_image`
- `created_at`

## License

This project is proprietary and confidential.
