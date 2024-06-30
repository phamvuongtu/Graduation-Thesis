import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    if (!outputDetails) return null;

    if (outputDetails.error) {
      // Error if any
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap">
          {outputDetails.error}
        </pre>
      );
    }

    return (
      <pre className="px-2 py-1 font-normal text-xs text-green-500 whitespace-pre-wrap">
        {outputDetails.output}
      </pre>
    );
  };

  return (
    <div>
      <h2 className="max-md:max-w-full">Output</h2>
      <div className="w-full h-56 mt-4 bg-neutrals-neutrals800 rounded-xl text-white font-normal text-sm overflow-y-auto p-2">
        {getOutput()}
      </div>
    </div>
  );
};

export default OutputWindow;