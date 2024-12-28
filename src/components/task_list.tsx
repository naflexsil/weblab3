import React from "react";
import TaskItem from "../components/task_item";

function TaskList({
  tasks,
  onDelete,
  onSave
}: any) {
  return (
    <div className="task-list">
      {tasks.map((task: any) => <TaskItem
        key={task.id}
        id={task.id}
        title={task.title}
        desc={task.desc}
        onDelete={() => onDelete(task.id)}
        onSave={onSave}
      />)}
    </div>
  );
}

export default TaskList;
