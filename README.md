# Round-Robin Coupon Distribution with Admin Panel

A full-featured full-stack coupon system that assigns coupons round-robin with secure admin controls and robust abuse prevention.

## Overview

This project provides a live web application where:
- Guest users can claim coupons sequentially.
- Abuse prevention is enforced using IP and browser session tracking.
- Administrators manage coupon generation, activation, and claim history via a secure admin panel.

## Features

- **Round-Robin Distribution:** Ensures coupons are assigned in order without duplication.
- **Guest Access:** Users can claim coupons without logging in.
- **Abuse Prevention:** Prevents multiple claims from the same IP or session.
- **Admin Panel:** Secure login for admins to generate coupons, toggle statuses, and view claim history.
- **Real-Time Management:** Live updates for coupon generation and claim monitoring.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**

   Create a `.env` file and add:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Run Database Migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the Application:**
   ```bash
   npm start
   ```

## Usage

- **User Side:**  
  Visit the home page to claim your coupon.

- **Admin Panel:**  
  Navigate to the login page, authenticate with your admin credentials (demo: `admin` / `password`), and access the admin panel to generate and manage coupons and view claim history.

## API Endpoints

- `POST /api/v1/coupon/generate` – Generate a new coupon.
- `GET /api/v1/coupon/all` – Retrieve all coupons.
- `PUT /api/v1/coupon/activate/:id` and `PUT /api/v1/coupon/deactivate/:id` – Toggle coupon status.
- `GET /api/v1/claim/all` – Retrieve all coupon claims.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).