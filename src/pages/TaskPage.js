import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TaskPage = ({ darkMode, setDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Medium", dueDate: "" });
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title || !newTask.description) return alert("Task Title & Description are required!");

    const updatedTasks = [...tasks, { ...newTask, id: Date.now(), completed: false }];
    setTasks(updatedTasks);
    setNewTask({ title: "", description: "", priority: "Medium", dueDate: "" });
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "priority") return a.priority.localeCompare(b.priority);
    if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "status") return a.completed - b.completed;
    return 0;
  });

  return (
    <div className="task-page">
      <div className="header">
        <h2>Task Manager</h2>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} value={newTask.priority}>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="sort-container">
        <label>Sort by:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <small>Priority: {task.priority} | Due: {task.dueDate || "N/A"}</small>
            </div>
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Link to="/" className="btn back-btn">Back to Home</Link>
    </div>
  );
};

export default TaskPage;
