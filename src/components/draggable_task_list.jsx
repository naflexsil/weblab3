import React from "react";
import TaskItem from "./task_item";

function DraggableTaskList({
  tasks,
  onDelete,
  onSave,
  onDragStart,
  onDrop,
  onDragOver,
}) {
  return (
    <div className="task-list" onDragOver={onDragOver} onDrop={onDrop}>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          desc={task.desc}
          index={index}
          onDelete={() => onDelete(task.id)}
          onSave={onSave}
          onDragStart={(e) => onDragStart(e, index)}
        />
      ))}
    </div>
  );
}

export default DraggableTaskList;
