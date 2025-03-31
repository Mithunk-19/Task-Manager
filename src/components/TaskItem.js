import React from "react";

const TaskItem = ({ provided, task, toggleComplete, deleteTask }) => {
  return (
    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <button onClick={() => toggleComplete(task.id)}>✔</button>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑</button>
    </li>
  );
};

export default TaskItem;
