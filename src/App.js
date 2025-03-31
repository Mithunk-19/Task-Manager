import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Low" });
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [tasks, darkMode]);

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: "", description: "", dueDate: "", priority: "Low" });
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOption === "priority") {
      const priorityOrder = { "Low": 1, "Medium": 2, "High": 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortOption === "completed") return a.completed - b.completed;
    return 0;
  });

  const filteredTasks = sortedTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <h1>Task Management App</h1>
      <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <input type="text" placeholder="Search tasks..." onChange={(e) => setSearchQuery(e.target.value)} className="search-bar" />
      
      <select onChange={(e) => setSortOption(e.target.value)} className="sort-options">
        <option value="none">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="completed">Completion Status</option>
      </select>

      <div className="task-input">
        <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <input type="text" placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`task-item ${task.completed ? "completed" : ""}`}>
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <small>Due: {task.dueDate} | Priority: {task.priority}</small>
                      </div>
                      <div className="task-actions">
                        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;