import React from "react";

function TaskItem({ task, deleteTask }) {
  return (
    <div className="task-item" data-id={task.id}>
      <div className="task-content">
        <div className="task-title">{task.title}</div>
        <div className="task-desc">{task.desc}</div>
      </div>
      <button
        className="delete-task-button"
        onClick={() => deleteTask(task.id)}
      >
        ×
      </button>
    </div>
  );
}

export default TaskItem;
