# APS Hubs Browser

A web application and Node.js backend for managing authentication, permissions, and viewing Autodesk Platform Services (APS) Hubs. This project is organized into a server (Node.js/Express) and a modern frontend (Vite + React).

## Features

- **User Authentication**: Secure login and session management
- **APS Integration**: Connects to Autodesk Platform Services for hub and file viewing
- **Role-Based Permissions**: Manage access and permissions for different users
- **Modern Frontend**: Built with React, Vite, and modular components
- **RESTful API**: Backend exposes endpoints for authentication, hubs, and APS services

## Project Structure

```
acc_permision_folder/
├── package.json           # Backend dependencies and scripts
├── server.js              # Main Express server
├── config/                # Configuration files (e.g., APS credentials)
│   └── aps.js
├── routes/                # Express route handlers
│   ├── auth.js
│   ├── hubs.js
├── services/              # Backend service logic
│   └── aps.js
├── wwwroot/               # Frontend (Vite + React)
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── index.html         # Main HTML entry
│   ├── src/               # React source code
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/    # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Viewer.jsx
│   │   ├── services/      # Frontend service logic
│   │   │   ├── authService.js
│   │   │   ├── hubsService.js
│   │   │   └── viewerService.js
│   │   └── assets/        # Static assets (e.g., images)
│   └── public/            # Public static files
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Backend Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure APS credentials in `config/aps.js`.
3. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd wwwroot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

- `POST /auth/login` — User login
- `GET /hubs` — List APS hubs

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **APS SDK**: Autodesk Platform Services integration
- **ESLint**: Code linting

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
