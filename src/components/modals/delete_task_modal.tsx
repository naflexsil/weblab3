import React from "react";
import "../../styles/delete_task_modal.scss";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm
}: any) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-style" onClick={onClose}>
      <div
        className="delete-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Delete this task?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-delete-confirm">
            Yes
          </button>
          <button onClick={onClose} className="btn-delete-cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
