import './App.css';
import appLogo from './octofitapp-small.png';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const backendUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src={appLogo} alt="OctoFit Tracker logo" className="app-logo me-2" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
            <a className="btn btn-outline-light btn-sm" href={backendUrl} target="_blank" rel="noreferrer">
              Backend API
            </a>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h1 className="h3 mb-1">OctoFit Tracker Dashboard</h1>
                <p className="text-muted mb-0">
                  Explore activities, leaderboard, teams, users, and workouts backed by the Django REST API.
                </p>
              </div>
              <a className="btn btn-outline-primary" href={backendUrl} target="_blank" rel="noreferrer">
                Open Backend API
              </a>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
