import React, { useState } from "react";
import InteractionsButtons from "../components/interactions_menu";
import DeleteTaskButton from "../components/delete_task_button";
import EditModal from "../components/modals/edit_modal.jsx";

let lastActiveTask = null;

function TaskItem({ id, title, desc, onDelete, onSave }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(desc);

  const taskItemRef = React.useRef(null);

  const handleTaskClick = () => {
    if (lastActiveTask && lastActiveTask !== taskItemRef.current) {
      lastActiveTask.setMenuVisible(false);
    }

    setMenuVisible((prevVisible) => {
      const newVisibility = !prevVisible;
      if (newVisibility) {
        lastActiveTask = taskItemRef.current;
      } else {
        lastActiveTask = null;
      }
      return newVisibility;
    });
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (updatedTask) => {
    setTaskTitle(updatedTask.title);
    setTaskDesc(updatedTask.desc);
    onSave(updatedTask);
    setEditModalOpen(false);
  };

  return (
    <div
      className={`task-item ${isMenuVisible ? "active" : ""}`}
      ref={taskItemRef}
      onClick={handleTaskClick}
    >
      <div className="task-content">
        <h3 className="task-title">{taskTitle}</h3>
        <p className="task-desc">{taskDesc}</p>
      </div>
      <div className="delete-task-button">
        <DeleteTaskButton
          onClick={(e) => {
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
