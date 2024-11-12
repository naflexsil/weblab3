import React, { useState, useEffect } from "react";
import InteractionsButtons from "./interactions_buttons";
import DeleteTaskButton from "./components/delete_task_button";

let lastActiveTask = null;

function TaskItem({ id, title, desc, onDelete }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
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

  return (
    <div className="task-item" ref={taskItemRef} onClick={handleTaskClick}>
      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        <p className="task-desc">{desc}</p>
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
        <InteractionsButtons title={title} desc={desc} />
      </div>
    </div>
  );
}

export default TaskItem;
