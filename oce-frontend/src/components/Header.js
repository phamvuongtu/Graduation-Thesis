import React, { useState } from 'react';
import { Play, ShareFat, UsersFour, CodeBlock, Sun, Moon } from './Icon';
import ThemeDropdown from './ThemeDropdown';
import Button from './Button';
import DownloadButton from './DownloadButton';
import LanguagesDropdown from './LanguagesDropdown';
import ShareModal from './ShareModal';

const Header = ({
  handleCompile,
  processing,
  code,
  toggleDarkMode,
  darkMode,
  handleLanguageChange,
  language,
  theme,
  handleThemeChange
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <header className="flex flex-col w-full px-2 lg:px-4">
      <h1 className="text-2xl font-bold leading-snug text-base-black dark:text-base-white">
        Online code editor
      </h1>
      <nav className="flex flex-wrap justify-between mt-6 text-base gap-5">
        <div className="flex flex-wrap gap-2">
          <Button
            label={processing ? 'Processing' : 'Run'}
            icon={<Play />}
            altText="Run"
            bgColor="bg-primary-primary500"
            textColor="text-base-white"
            borderColor="border-primary-primary500"
            hoverBgColor="hover:bg-primary-primary900"
            hoverTextColor="hover:text-base-white"
            hoverBorderColor="hover:border-primary-primary600"
            onClick={handleCompile}
            disabled={!code}
          />
          <Button
            label="Formatter"
            icon={<CodeBlock />}
            altText="Formatter Command"
            textColor="text-primary-primary500"
          />
          <Button
            label="Share"
            icon={<ShareFat />}
            altText="Share Action"
            textColor="text-primary-primary500"
            onClick={handleShare}
          />
          <Button
            label="Collaborate"
            icon={<UsersFour />}
            altText="Collaborate Action"
            textColor="text-primary-primary500"
          />
          <DownloadButton code={code} language={language} />
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative group">
            {darkMode ? (
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-black dark:text-white"
              >
                <Sun />
                <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
                  Light mode
                </span>
              </button>
            ) : (
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-black dark:text-white"
              >
                <Moon />
                <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
                  Dark mode
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-base-black dark:text-base-white font-bold">Language</label>
            <LanguagesDropdown
              handleLanguageChange={handleLanguageChange}
              language={language}
              className="w-32"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-base-black dark:text-base-white font-bold">Theme</label>
            <ThemeDropdown
              handleThemeChange={handleThemeChange}
              theme={theme}
              className="w-44"
            />
          </div>
        </div>
      </nav>
      {isShareModalOpen && (
        <ShareModal
          onClose={() => setIsShareModalOpen(false)}
          code={code}
        />
      )}
    </header>
  );
};

export default Header;
