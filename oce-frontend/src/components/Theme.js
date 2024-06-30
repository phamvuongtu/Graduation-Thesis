import React, { useState, useEffect } from "react";
import monacoThemes from "monaco-themes/themes/themelist";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleChange = (event) => {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    handleThemeChange(newTheme);
  };

  useEffect(() => {
    // Set the default theme to be the first theme in the list if not selected yet
    if (!currentTheme && Object.keys(monacoThemes).length > 0) {
      setCurrentTheme(Object.keys(monacoThemes)[0]);
    }
  }, [currentTheme, monacoThemes]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-xl py-2 pl-3 pr-10 text-base leading-6 text-gray-700 focus:outline-none focus:border-blue-500 hover:border-gray-500 cursor-pointer bg-no-repeat bg-right"
        value={currentTheme}
        onChange={handleChange}
        aria-label="Theme Actions"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 17\'><path fill=\'%23666\' d=\'M13.53 7.03l-5 5a.751.751 0 0 1-1.062 0l-5-5a.751.751 0 1 1 1.063-1.062L8 10.438l4.47-4.47a.751.751 0 0 1 1.062 1.062h-.001Z\'/></svg>")',
          backgroundSize: '16px 17px',
        }}
      >
        <option value="" disabled>Select Theme</option>
        {Object.entries(monacoThemes).map(([themeId, themeName]) => (
          <option key={themeId} value={themeId}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeDropdown;