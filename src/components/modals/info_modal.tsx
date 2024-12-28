import React from "react";
import "../../styles/info_modal.scss";

function InfoModal({
  onClose
}: any) {
  return (
    <div className="info-modal-style">
      <div className="info-modal-content">
        <h3>when I watched the RED Group video:</h3>
        <div className="image-container">
          <img
            src="src/images/boom-cat.gif"
            alt="Boom Cat"
            className="info-modal-image"
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
