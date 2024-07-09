import React, { useState, useRef } from "react";
import Button from "./Button";
import { Link, CloseIcon, Eye } from "./Icon";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";

const ShareModal = ({ onClose, code, language }) => {
  const [shareLink, setShareLink] = useState("");
  const [expiryHours, setExpiryHours] = useState(1); // Default expiry time is 1 hour

  const requestSent = useRef(false);

  const handleExpiryHoursChange = (value) => {
    setExpiryHours(value);
  };

  const generateShareLink = async () => {
    if (requestSent.current) return;
    requestSent.current = true;

    const payload = { code, expiryHours, language };
    console.log("Sending payload:", payload);

    try {
      const response = await fetch(
        "http://localhost:8080/api/generate-share-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send code and expiry time to the server
        }
      );
      const data = await response.json();
      setShareLink(data.link);
      toast.success("Link generated successfully");
    } catch (error) {
      console.error("Failed to generate share link", error);
      requestSent.current = false;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard successfully");
  };

  const expiryOptions = [...Array(36).keys()].map((i) => ({
    label: `${i + 1} hour(s)`,
    value: i + 1,
  }));

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
          Share Code
        </h2>
        <p className="mb-6 text-gray-600">
          Share this link to allow others to view your code. The link will
          expire after the selected time.
        </p>
        <label htmlFor="expiryHours" className="block text-gray-600 mb-2">
          Set Expiry Time (in hours):
        </label>
        <div className="flex items-center mb-4 space-x-4">
          <Dropdown
            label="Select expiry time"
            textColor="text-primary-primary500"
            options={expiryOptions}
            onChange={handleExpiryHoursChange}
            value={expiryHours}
            className="flex-grow w-auto"
          />
          <Button
            label="Get link"
            icon={<Eye />}
            onClick={generateShareLink}
            textColor="text-primary-primary500"
            className="ml-auto w-auto"
          />
        </div>
        {shareLink && (
          <div className="flex items-center space-x-4 mt-4">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-primary500"
            />
            <Button
              label="Copy"
              icon={<Link />}
              altText="Copy Link"
              onClick={copyToClipboard}
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

export default ShareModal;
