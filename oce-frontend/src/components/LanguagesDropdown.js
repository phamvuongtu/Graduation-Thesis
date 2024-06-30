import React, { useState, useEffect } from "react";
import { languageOptions } from "../constants/languageOptions";
import Dropdown from './Dropdown';
import { CaretDown } from './Icon';

const LanguagesDropdown = ({ handleLanguageChange, language, className }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    if (!currentLanguage && languageOptions.length > 0) {
      setCurrentLanguage(languageOptions[0].value);
    }
  }, [currentLanguage]);

  const handleChange = (newLanguage) => {
    const selectedLanguage = languageOptions.find(
      (lang) => lang.value === newLanguage
    );
    setCurrentLanguage(selectedLanguage);
    handleLanguageChange(selectedLanguage);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Dropdown
        icon={<CaretDown />}
        altText="Language Actions"
        textColor="text-primary-primary500"
        placeholder={`Select Language`}
        options={languageOptions.map((lang) => ({
          label: lang.label,
          value: lang.value,
          key: lang.id,
        }))}
        onChange={handleChange}
        value={currentLanguage?.value}
        className="w-full"
      />
    </div>
  );
};

export default LanguagesDropdown;