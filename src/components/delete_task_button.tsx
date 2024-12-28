import React from "react";
import "../styles/delete_task_button.scss";

function DeleteTaskButton({ onClick }) {
  return (
    <button className="delete-task-button" onClick={onClick}>
      ×
    </button>
  );
}

export default DeleteTaskButton;
