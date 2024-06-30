import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Link } from "./Icon";
import { toast } from "react-toastify"; // Import toast

const ShareModal = ({ onClose, code }) => {
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const generateShareLink = async () => {
      // Call your back-end service to generate a unique shareable link
      const response = await fetch(
        "http://localhost:8080/api/generate-share-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );
      const data = await response.json();
      setShareLink(data.link);
    };

    generateShareLink();
  }, [code]); // Add `code` as a dependency

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard successfully");
    // alert('Link copied to clipboard');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Share Code
        </h2>
        <p className="mb-6 text-gray-600">
          Share this link to allow others to view your code. The link will
          expire after one hour.
        </p>
        {shareLink ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button
              label="Copy"
              icon={<Link />} // Uncomment if you have a Copy icon
              altText="Copy Link"
              onClick={copyToClipboard}
            />
          </div>
        ) : (
          <p>Generating link...</p>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
