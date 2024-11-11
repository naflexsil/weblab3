import React from "react";

function InteractionsButtons({ title, desc }) {
  const openInfoModal = () => {
    alert(`Title: ${title}\nDescription: ${desc}`);
  };

  return (
    <div className="task-buttons-container">
      <img src="../src/icons/share.svg" className="task-icon" />
      <img
        src="../src/icons/info.svg"
        className="task-icon"
        onClick={openInfoModal}
      />
      <img src="../src/icons/edit.svg" className="task-icon" />
    </div>
  );
}

export default InteractionsButtons;
