import React, { useState } from "react";
import InteractionsButtons from "../components/interactions_menu";
import DeleteTaskButton from "../components/delete_task_button";
import EditModal from "../components/modals/edit_modal.jsx";

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface TaskItemProps {
  id: string;
  title: string;
  desc: string;
  index?: number;
  onDelete: () => void;
  onSave: (task: Task) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

let lastSetMenuVisible: React.Dispatch<React.SetStateAction<boolean>> | null =
  null;

function TaskItem({
  id,
  title,
  desc,
  onDelete,
  onSave,
  onDragStart,
}: TaskItemProps) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(desc);

  const handleTaskClick = () => {
    if (lastSetMenuVisible && lastSetMenuVisible !== setMenuVisible) {
      lastSetMenuVisible(false);
    }

    setMenuVisible((prevVisible) => {
      const newVisibility = !prevVisible;
      if (newVisibility) {
        lastSetMenuVisible = setMenuVisible;
      } else {
        lastSetMenuVisible = null;
      }
      return newVisibility;
    });
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (updatedTask: Task) => {
    setTaskTitle(updatedTask.title);
    setTaskDesc(updatedTask.desc);
    onSave(updatedTask);
    setEditModalOpen(false);
  };

  return (
    <div
      className={`task-item ${isMenuVisible ? "active" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e)}
      onClick={handleTaskClick}
    >
      <div className="task-content">
        <h3 className="task-title">{taskTitle}</h3>
        <p className="task-desc">{taskDesc}</p>
      </div>
      <div className="delete-task-button">
        <DeleteTaskButton
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
      {isMenuVisible && (
        <div className="interactions-container">
          <InteractionsButtons
            title={taskTitle}
            desc={taskDesc}
            onEdit={handleEdit}
          />
        </div>
      )}
      {isEditModalOpen && (
        <EditModal
          task={{ id, title: taskTitle, desc: taskDesc }}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default TaskItem;
