import React from "react";
import TaskItem from "./task_item";

function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          desc={task.desc}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
