import React from "react";
import "../../styles/share_modal.scss";

function ShareModal({
  title,
  desc,
  onClose
}: any) {
  const copyToClipboard = () => {
    const textToCopy = `${title}\n${desc}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("☆ текст скопирован ☆");
        onClose();
      })
      .catch((err) => {
        console.error("не удалось скопировать текст:", err);
      });
  };

  const handleClickOutside = (e: any) => {
    if (e.target.className === "share-modal-style") {
      onClose();
    }
  };

  return (
    <div className="share-modal-style" onClick={handleClickOutside}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="share-icons">
          <img
            src="../src/images/icons/copy.svg"
            alt="Copy"
            title="Copy"
            onClick={copyToClipboard}
          />
          <img
            src="../src/images/icons/vk.svg"
            alt="VK"
            title="Share on VK"
            onClick={() => window.open("https://vk.com", "_blank")}
          />
          <img
            src="../src/images/icons/tg.svg"
            alt="Telegram"
            title="Share on Telegram"
            onClick={() =>
              window.open("https://t.me/share/url?url=YOUR_URL", "_blank")
            }
          />
          <img
            src="../src/images/icons/wh.svg"
            alt="WhatsApp"
            title="Share on WhatsApp"
            onClick={() =>
              window.open("https://wa.me/?text=YOUR_TEXT", "_blank")
            }
          />
          <img
            src="../src/images/icons/f.svg"
            alt="Facebook"
            title="Share on Facebook"
            onClick={() => window.open("https://facebook.com", "_blank")}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
