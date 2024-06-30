import React from "react";

const OutputDetails = ({ outputDetails, darkMode }) => {
  if (!outputDetails) return null;

  // Function to get the text before the first newline character
  const getFirstLine = (text) => {
    return text ? text.split('\n')[0] : '';
  };

  // Function to get the language name
  const getLanguageName = (code) => {
    switch (code) {
      case "c":
        return "C";
      case "cpp":
        return "C++";
      case "java":
        return "Java";
      case "py":
        return "Python";
      default:
        return code;
    }
  };

  return (
    <div className={`metrics-container mt-4 flex flex-col space-y-3 ${darkMode ? 'text-base-white' : 'text-base-black'}`}>
      <p className="text-sm">
        Status:{" "}
        <span className={`font-semibold px-2 py-1 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
          {outputDetails.status}
        </span>
      </p>
      <p className="text-sm">
        Language:{" "}
        <span className={`font-semibold px-2 py-1 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
          {getLanguageName(outputDetails.language)}
        </span>
      </p>
      <p className="text-sm">
        Info:{" "}
        <span className={`font-semibold px-2 py-1 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} whitespace-pre-wrap`}>
          {getFirstLine(outputDetails.info)}
        </span>
      </p>
      <p className="text-sm">
        Time Stamp:{" "}
        <span className={`font-semibold px-2 py-1 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
          {new Date(outputDetails.timeStamp).toLocaleString()}
        </span>
      </p>
      {/* {outputDetails.error && (
        <p className="text-sm text-red-500">
          Error:{" "}
          <span className={`font-semibold px-2 py-1 rounded-md bg-red-100 whitespace-pre-wrap`}>
            {outputDetails.error}
          </span>
        </p>
      )} */}
    </div>
  );
};

export default OutputDetails;