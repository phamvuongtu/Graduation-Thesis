import React, { useState } from "react";
import { CloseIcon } from "./Icon";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(fileName || "code");
    setFileName(''); // Reset file name after confirmation
  };

  const handleClose = () => {
    onClose();
    setFileName(''); // Reset file name when modal is closed
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirm Download</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to download the file?</p>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter file name"
          value={fileName}
          onChange={handleInputChange}
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none transition duration-150"
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none transition duration-150"
            onClick={handleConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;