import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import "./styles.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        {/* Header */}
        <header className="header">
          <h1>Task Manager</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">© 2024 Task Manager | Mithun Kannan</footer>
      </div>
    </Router>
  );
};

export default App;
