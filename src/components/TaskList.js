import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleComplete, deleteTask, handleDragEnd }) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => (
                <TaskItem
                  provided={provided}
                  task={task}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TaskList;
