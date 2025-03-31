import React from "react";
import { Link } from "react-router-dom";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="header">
      <h1>Task Manager</h1>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
      </nav>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
