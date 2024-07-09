import React from "react";
import {CloseIcon} from "./Icon";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirm Download</h2>
        <p className="mb-6 text-gray-600">Are you sure to download the file?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none transition duration-150"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none transition duration-150"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;