import React, { useState, useEffect } from "react";
import InteractionsButtons from "./interactions_buttons";
import DeleteTaskButton from "./delete_task_button";
import EditModal from "../modals/edit_modal";

let lastActiveTask = null;

function TaskItem({ id, title, desc, onDelete, onSave }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(desc);

  const taskItemRef = React.useRef(null);

  const handleTaskClick = () => {
    if (lastActiveTask && lastActiveTask !== taskItemRef.current) {
      lastActiveTask.querySelector(".interactions-container").style.display =
        "none";
      lastActiveTask.style.marginBottom = "10px";
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

  useEffect(() => {
    const buttonContainer = taskItemRef.current.querySelector(
      ".interactions-container"
    );
    if (buttonContainer) {
      buttonContainer.style.display = isMenuVisible ? "flex" : "none";
      taskItemRef.current.style.marginBottom = isMenuVisible ? "60px" : "10px";
    }
  }, [isMenuVisible]);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (updatedTask) => {
    setTaskTitle(updatedTask.title);
    setTaskDesc(updatedTask.description);
    onSave(updatedTask);
    setEditModalOpen(false);
  };

  return (
    <div className="task-item" ref={taskItemRef} onClick={handleTaskClick}>
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
      <div className="interactions-container">
        <InteractionsButtons
          title={taskTitle}
          desc={taskDesc}
          onEdit={handleEdit}
        />
      </div>
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
