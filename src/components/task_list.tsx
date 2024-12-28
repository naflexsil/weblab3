import React from "react";
import TaskItem from "./task_item";

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onSave: (task: Task) => void;
}

function TaskList({ tasks, onDelete, onSave }: TaskListProps) {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    console.log(`Dragging task ${taskId}`);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          desc={task.desc}
          onDelete={() => onDelete(task.id)}
          onSave={onSave}
          onDragStart={(e) => handleDragStart(e, task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
