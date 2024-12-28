import React, { useState } from "react";
import "../../styles/edit_modal.scss";

function EditModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);

  const handleSave = () => {
    const updatedTask = { id: task.id, title, desc };
    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-style">
      <div className="edit-modal-content">
        <h2>Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" Title"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder=" Description"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
