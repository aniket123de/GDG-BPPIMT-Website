import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FloatingNavbar.css';

const FloatingNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="floating-navbar" aria-label="Quick Navigation">
      <div className="floating-nav-content">
        <Link 
          to="/leaderboard" 
          className={`floating-nav-item ${location.pathname === '/leaderboard' ? 'active' : ''}`}
          title="Home"
        >
          <span className="floating-nav-icon">🏠</span>
          <span className="floating-nav-label">Home</span>
        </Link>
        <Link 
          to="/syllabus" 
          className={`floating-nav-item ${location.pathname === '/syllabus' ? 'active' : ''}`}
          title="Syllabus"
        >
          <span className="floating-nav-icon">📚</span>
          <span className="floating-nav-label">Syllabus</span>
        </Link>
        <Link 
          to="/leaderboard/table" 
          className={`floating-nav-item ${location.pathname === '/leaderboard/table' ? 'active' : ''}`}
          title="Leaderboard"
        >
          <span className="floating-nav-icon">📈</span>
          <span className="floating-nav-label">Leaderboard</span>
        </Link>
        <Link 
          to="/winners" 
          className={`floating-nav-item ${location.pathname === '/winners' ? 'active' : ''}`}
          title="Winners"
        >
          <span className="floating-nav-icon">🏆</span>
          <span className="floating-nav-label">Winners</span>
        </Link>
        <Link 
          to="/rules" 
          className={`floating-nav-item ${location.pathname === '/rules' ? 'active' : ''}`}
          title="Completion Guide"
        >
          <span className="floating-nav-icon">📋</span>
          <span className="floating-nav-label">Guide</span>
        </Link>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
