import React from "react";

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Due: {task.dueDate} | Priority: {task.priority}</small>
      <div>
        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
        <button className="btn delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
