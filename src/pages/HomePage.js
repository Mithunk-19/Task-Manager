import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Task Manager</h1>
      <button className="home-button" onClick={() => navigate("/tasks")}>
        Go to Task Manager
      </button>
    </div>
  );
};

export default HomePage;
