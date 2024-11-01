import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddTask = () => {
    if (title.trim() && desc.trim()) {
      addTask(title, desc);
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div className="input-wrapper">
      <div className="input-group">
        <input
          type="text"
          placeholder="Title..."
          className="task-input title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="About..."
          className="task-input about-input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button className="add-task-button" onClick={handleAddTask}>
        +
      </button>
    </div>
  );
}

export default TaskInput;
