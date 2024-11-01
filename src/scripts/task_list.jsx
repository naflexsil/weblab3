import React from "react";
import TaskItem from "./task_item";

function TaskList({ tasks, deleteTask }) {
  return (
    <div className="tasks-list container">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

export default TaskList;
