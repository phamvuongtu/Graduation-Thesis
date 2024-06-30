// src/components/DownloadButton.js
import React, { useState } from "react";
import { Download } from "./Icon";
import Button from "./Button";
import ConfirmationModal from "./DownloadModal"; // Import the new modal component
import { toast } from "react-toastify"; // Import toast

const DownloadButton = ({ code, language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `code.${language.value === "py" ? "py" : language.value === "java" ? "java" : language.value === "c" ? "c" : "cpp"}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    // Show toast notification
    toast.success("Download successful");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDownload = () => {
    handleDownload();
    handleCloseModal();
  };

  return (
    <>
      <Button
        label="Download"
        icon={<Download />}
        altText="Download Action"
        textColor="text-primary-primary500"
        onClick={handleOpenModal}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDownload}
      />
    </>
  );
};

export default DownloadButton;