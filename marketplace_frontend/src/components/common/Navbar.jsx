import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar with responsive links based on auth state. */
  const { user, signOut, isListener } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link className="brand" to="/">
          <span className="brand-dot" />
          Secure Support
        </Link>

        <div className="nav-links">
          <NavLink className="nav-link" to="/marketplace">Marketplace</NavLink>
          {user && <NavLink className="nav-link" to="/messages">Messages</NavLink>}
          {user && !isListener && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}
          {user && isListener && <NavLink className="nav-link" to="/listener/dashboard">Listener</NavLink>}
          {!user && <NavLink className="nav-link" to="/login">Login</NavLink>}
          {!user && <NavLink className="nav-link" to="/signup"><span className="btn">Get Started</span></NavLink>}
          {user && <button className="btn ghost" onClick={handleLogout}>Logout</button>}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
