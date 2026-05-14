import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navigationItems = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Leaderboard', path: '/leaderboard' },
];

function Home() {
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="p-4 p-md-5 rounded-4 shadow-sm border bg-white">
            <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
            <h1 className="display-5 mb-3">Fitness tracking connected to the Django REST API</h1>
            <p className="lead text-secondary mb-4">
              Use the navigation menu to browse users, teams, activities, workouts, and leaderboard data served by the backend.
            </p>
            <div className="d-flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <NavLink key={item.path} className="btn btn-outline-primary" to={item.path}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg octofit-nav sticky-top">
        <div className="container py-2">
          <NavLink className="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/">
            <img alt="OctoFit logo" className="octofit-brand-logo" src={`${process.env.PUBLIC_URL}/octofitapp-small.svg`} />
            <span>OctoFit</span>
          </NavLink>

          <button
            aria-controls="octofit-navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-bs-target="#octofit-navigation"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon octofit-nav-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="octofit-navigation">
            <div className="navbar-nav ms-auto gap-lg-2">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              {navigationItems.map((item) => (
                <NavLink key={item.path} className="nav-link" to={item.path}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-5">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Leaderboard />} path="/leaderboard" />
        </Routes>
      </main>
    </div>
  );
}
