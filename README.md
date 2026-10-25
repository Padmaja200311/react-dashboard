# React Dashboard

A responsive, multi-page React dashboard featuring authentication, user management, API integration, and dashboard statistics.

## Features

- **Authentication:** Login, logout, and protected routes.
- **Dashboard:** Statistics and recent user information.
- **User Management:** Search, city filtering, sorting, and pagination.
- **API Integration:** Fetches user data from the DummyJSON public API.
- **Settings:** Edit display name and email address, saved in localStorage.
- **Responsive Design:** Layout adapts to desktop, tablet, and mobile screens.
- **State Management:** React Context API for shared authentication and user data.

## Technologies Used

- React
- Vite
- React Router
- Context API
- JavaScript (ES6+)
- CSS
- DummyJSON API
- Browser localStorage

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Padmaja200311/react-dashboard.git
   ```

2. Open the project folder:

   ```bash
   cd react-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal.

## Demo Login

- **Email:** admin@example.com
- **Password:** admin123

These are demo credentials for this project, not production authentication credentials.

## API

User data is fetched from:

https://dummyjson.com/users?limit=0

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Note

This is a frontend assessment project. Authentication uses a demo login flow, and profile settings are stored in browser localStorage. It does not implement a secure backend authentication service.