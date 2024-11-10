import React from "react";
import TaskItem from "./task_item";

function TaskList({ tasks, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} deleteTask={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
