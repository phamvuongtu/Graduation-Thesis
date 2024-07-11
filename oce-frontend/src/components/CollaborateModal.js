import React, { useState, useRef } from "react";
import Button from "./Button";
import { CloseIcon, Link, Copy } from "./Icon";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";

const CollaborateModal = ({ onClose, code, language }) => {
  const [collaborateLink, setCollaborateLink] = useState("");
  const [expiryHours, setExpiryHours] = useState(1);

  const requestSent = useRef(false);

  const handleExpiryHoursChange = (value) => {
    setExpiryHours(value);
  };

  const generateCollaborateLink = async () => {
    if (requestSent.current) return;
    requestSent.current = true;

    const payload = { code, expiryHours, language };
    console.log("Sending payload:", payload);

    try {
      const response = await fetch(
        "http://localhost:8080/api/generate-collaborate-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      setCollaborateLink(data.link);
      toast.success("Collaborative link generated successfully");
    } catch (error) {
      console.error("Failed to generate collaborative link", error);
      requestSent.current = false;
    }
  };

  const copyToClipboardAndOpen = () => {
    navigator.clipboard.writeText(collaborateLink);
    window.open(collaborateLink, "_blank");
    toast.success("Link copied to clipboard successfully");
  };

  const expiryOptions = [
    { label: "in 1 hour", value: 1 },
    { label: "in 6 hours", value: 6 },
    { label: "in 24 hours", value: 24 },
    { label: "in 3 days", value: 72 },
    { label: "in 7 days", value: 168 }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Collaborate Code
        </h2>
        <p className="mb-6 text-gray-600">
          Share this link to allow others to edit your code. The link will
          expire after the selected time.
        </p>
        <label htmlFor="expiryHours" className="block text-gray-600 mb-2">
          Expiration:
        </label>
        <div className="flex items-center mb-4 space-x-4">
          <Dropdown
            label="Select expiry time"
            textColor="text-primary-primary500"
            options={expiryOptions}
            onChange={handleExpiryHoursChange}
            value={expiryHours}
            className="flex-grow"
          />
          <Button
            label="Get link"
            icon={<Link />}
            onClick={generateCollaborateLink}
            textColor="text-primary-primary500"
            className="ml-auto"
          />
        </div>
        {collaborateLink && (
          <div className="flex items-center space-x-4 mt-4">
            <input
              type="text"
              readOnly
              value={collaborateLink}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-primary500"
            />
            <Button
              label="Copy"
              icon={<Copy />}
              altText="Copy Link"
              onClick={copyToClipboardAndOpen}
              className="w-auto"
              bgColor="bg-primary-primary500"
              textColor="text-base-white"
              borderColor="border-primary-primary500"
              hoverBgColor="hover:bg-primary-primary900"
              hoverTextColor="hover:text-base-white"
              hoverBorderColor="hover:border-primary-primary600"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborateModal;