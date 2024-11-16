import React, { useState } from "react";
import ShareModal from "./modals/share_modal";
import "../styles/interactions_menu.scss";

function InteractionsButtons({ title, desc, onEdit }) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const openShareModal = () => setShareModalOpen(true);
  const closeShareModal = () => setShareModalOpen(false);

  const openInfoModal = () => {
    alert(`Title: ${title}\nDescription: ${desc}`);
  };

  return (
    <div className="task-buttons-container">
      <img
        src="../src/icons/share.svg"
        className="task-icon"
        alt="Share"
        onClick={(e) => {
          e.stopPropagation();
          openShareModal();
        }}
      />
      <img
        src="../src/icons/info.svg"
        className="task-icon"
        alt="Info"
        onClick={(e) => {
          e.stopPropagation();
          openInfoModal();
        }}
      />
      <img
        src="../src/icons/edit.svg"
        className="task-icon"
        alt="Edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      />
      {isShareModalOpen && (
        <ShareModal title={title} desc={desc} onClose={closeShareModal} />
      )}
    </div>
  );
}

export default InteractionsButtons;
