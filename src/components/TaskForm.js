import React, { useState } from "react";

const TaskForm = ({ setTasks }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Low" });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks(prevTasks => [...prevTasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: "", description: "", dueDate: "", priority: "Low" });
    }
  };

  return (
    <div className="task-form">
      <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <input type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
      <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button className="btn" onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
