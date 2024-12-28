import React from "react";
import TaskItem from "../components/task_item";

function DraggableTaskList({
  tasks,
  onDelete,
  onSave,
  onDragStart,
  onDrop,
  onDragOver
}: any) {
  return (
    <div className="task-list" onDragOver={onDragOver} onDrop={onDrop}>
      {tasks.map((task: any, index: any) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          desc={task.desc}
          index={index}
          onDelete={() => onDelete(task.id)}
          onSave={onSave}
          onDragStart={(e: any) => onDragStart(e, index)}
        />
      ))}
    </div>
  );
}

export default DraggableTaskList;
