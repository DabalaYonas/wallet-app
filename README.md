# Wallet App

A mobile-responsive React application for managing digital wallet transactions and calculating daily engagement points. Built with React 19, TypeScript, and Vite.

## Features

- **Transactions List**: View a comprehensive list of all wallet transactions.
- **Transaction Details**: In-depth view of individual transaction data.
- **Daily Points System**: Dynamic daily points calculation based on the current season day with a recursive reward formula (100% of the day before previous + 60% of the previous day).
- **Format Utilities**: Automatic formatting for large numbers (e.g., 29K) and comprehensive date/time management.
- **Responsive Design**: Mobile-first UI utilizing FontAwesome icons and precise layout styling.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Icons**: FontAwesome

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd wallet-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/components`: UI components including transaction lists and detail cards.
- `src/utils`: Contains utility functions like `dateUtils.ts` for time management and point calculation logic.
- `src/assets`: Static assets and styling defaults.
