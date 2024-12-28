import React, { useState } from "react";
import ShareModal from "./modals/share_modal";
import InfoModal from "./modals/info_modal";
import "../styles/interactions_menu.scss";

function InteractionsButtons({
  title,
  desc,
  onEdit
}: any) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const openShareModal = () => setShareModalOpen(true);
  const closeShareModal = () => setShareModalOpen(false);

  const openInfoModal = () => setInfoModalOpen(true);
  const closeInfoModal = () => setInfoModalOpen(false);

  return (
    <div className="task-buttons-container">
      <img
        src="../src/images/icons/share.svg"
        className="task-icon"
        alt="Share"
        onClick={(e) => {
          e.stopPropagation();
          openShareModal();
        }}
      />
      <img
        src="../src/images/icons/info.svg"
        className="task-icon"
        alt="Info"
        onClick={(e) => {
          e.stopPropagation();
          openInfoModal();
        }}
      />
      <img
        src="../src/images/icons/edit.svg"
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
      {isInfoModalOpen && <InfoModal onClose={closeInfoModal} />}
    </div>
  );
}

export default InteractionsButtons;
