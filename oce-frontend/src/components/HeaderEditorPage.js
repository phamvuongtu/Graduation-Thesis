import React, { useState } from "react";
import { Play, ShareFat, UsersFour, Sun, Moon } from "./Icon";
import ThemeDropdown from "./ThemeDropdown";
import Button from "./Button";
import DownloadButton from "./DownloadButton";
import LanguagesDropdown from "./LanguagesDropdown";
import ShareModal from "./ShareModal";
import CollaborateModal from "./CollaborateModal";

const Header = ({
  handleCompile,
  processing,
  code,
  toggleDarkMode,
  darkMode,
  handleLanguageChange,
  language,
  theme,
  handleThemeChange,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCollaborateModalOpen, setIsCollaborateModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCollaborate = () => {
    setIsCollaborateModalOpen(true);
  };

  return (
    <header className="flex flex-col w-full px-2 lg:px-4">
      <h1 className="text-2xl font-bold leading-snug text-base-black dark:text-base-white">
        Online code editor
      </h1>
      <nav className="flex flex-wrap justify-between mt-6 text-base gap-5">
        <div className="flex flex-wrap gap-2">
          <Button
            label={processing ? "Processing" : "Run"}
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
          {/* <Button
            label="Formatter"
            icon={<CodeBlock />}
            altText="Formatter Command"
            textColor="text-primary-primary500"
          /> */}
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
            onClick={handleCollaborate}
          />
          <DownloadButton code={code} language={language.value} />
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Button
            label={darkMode ? "Light Mode" : "Dark Mode"}
            icon={darkMode ? <Sun /> : <Moon />}
            onClick={toggleDarkMode}
            textColor="text-primary-primary500"
          />
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-base-black dark:text-base-white font-bold">
              Language
            </label>
            <LanguagesDropdown
              handleLanguageChange={handleLanguageChange}
              language={language}
              className="w-32"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-base-black dark:text-base-white font-bold">
              Theme
            </label>
            <ThemeDropdown
              handleThemeChange={handleThemeChange}
              theme={theme}
              className="w-52"
            />
          </div>
        </div>
      </nav>
      {isShareModalOpen && (
        <ShareModal
          onClose={() => setIsShareModalOpen(false)}
          code={code}
          language={language.value}
        />
      )}
      {isCollaborateModalOpen && (
        <CollaborateModal
          onClose={() => setIsCollaborateModalOpen(false)}
          code={code}
          language={language.value}
        />
      )}
    </header>
  );
};

export default Header;
