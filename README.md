# Dynamic Event Calendar

## Features

### Calendar View
- Displays a calendar grid for the current month with all days properly aligned.
- Allows users to navigate between months using "Previous" and "Next" buttons.

### Event Management
- Add events by clicking on a day.
- Edit or delete events for a selected day.
- Each event includes:
  - Event name
  - Start time and end time
  - Optional description

### Event List
- Displays a list of all events for the selected day in a modal or side panel.

### Data Persistence
- Uses **localStorage** or an in-memory data store to persist events between page refreshes.

### UI Features
- Clean and modern UI using **shadcn** for components.
- Displays days in a grid with clear separation for weekends and weekdays.
- Highlights the current day and selected day visually.

### Complex Logic
- Automatically handles month transitions (e.g., from Jan 31 to Feb 1).
- Prevents overlapping events (e.g., two events at the same time).
- Allows filtering of events by keyword.

### Bonus Features
- Color coding for events based on categories (e.g., work, personal, others).

---

## Instructions to Run the App Locally

### Prerequisites
- Node.js (v16 or later)
- npm or yarn package manager

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/parthasarathi94/Dynamic-Event-Calendar.git
   cd Dynamic-Event-Calendar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the app.

4. **Build for Production** (optional)
   ```bash
   npm run build
   npm start
   ```

---

## Deployment

The app is deployed on Vercel. You can access it using the following link:

[Dynamic Event Calendar - Live App](https://dynamic-event-calendar-psp.vercel.app/)

---

## Repository

Find the source code on GitHub:

[Dynamic Event Calendar - GitHub Repo](https://github.com/parthasarathi94/Dynamic-Event-Calendar)
