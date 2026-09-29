import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

const navigation = [
  { to: '/activities', label: 'Activity', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { to: '/teams', label: 'Teams', icon: '◌' },
  { to: '/users', label: 'Members', icon: '○' },
  { to: '/workouts', label: 'Workouts', icon: '＋' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} className="nav-link"><span>{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="connection"><span className="status-dot" /> API live</div>
      </header>
      <main className="main-content">
        <div className="intro-row"><span className="route-label">OCTOFIT / TRACKER</span><span className="api-label">{API_BASE_URL.replace('https://', '').replace('http://', '')}</span></div>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
      <footer className="app-footer"><span>Build consistency. Find momentum.</span><span>OCTOFIT TRACKER <span className="brand-dot">●</span></span></footer>
    </div>
  );
}

export default App;
