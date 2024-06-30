import React, { useState, useEffect } from "react";
import monacoThemes from "monaco-themes/themes/themelist";
import Dropdown from './Dropdown';
import { CaretDown } from './Icon';

const ThemeDropdown = ({ handleThemeChange, theme, className }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleChange = (newTheme) => {
    setCurrentTheme(newTheme);
    handleThemeChange(newTheme);
  };

  useEffect(() => {
    if (!currentTheme && Object.keys(monacoThemes).length > 0) {
      setCurrentTheme(Object.keys(monacoThemes)[0]);
    }
  }, [currentTheme]);

  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      <Dropdown
        icon={<CaretDown />}
        altText="Theme Actions"
        textColor="text-primary-primary500"
        placeholder={`Select Theme`}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
          label: themeName,
          value: themeId,
          key: themeId,
        }))}
        onChange={handleChange} 
        value={currentTheme}
        className="w-full"
      />
    </div>
  );
};

export default ThemeDropdown;