import React from "react";
import { Sun, Moon, GitFork, UsersFour } from "./Icon";
import ThemeDropdown from "./ThemeDropdown";
import Button from "./Button";
import DownloadButton from "./DownloadButton";

const Header = ({
  code,
  toggleDarkMode,
  darkMode,
  language,
  theme,
  handleThemeChange,
  handleFork,
  userCount,
}) => {
  return (
    <header className="flex flex-col w-full px-2 lg:px-4">
      <h1 className="text-2xl font-bold leading-snug text-base-black dark:text-base-white">
        Online code editor (Collaborative code page)
      </h1>
      <nav className="flex flex-wrap justify-between mt-6 text-base gap-5">
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            label="Fork"
            icon={<GitFork />}
            altText="Fork Action"
            textColor="text-primary-primary500"
            onClick={handleFork}
          />
          <DownloadButton code={code} language={language} />
          <div className="flex items-center gap-2">
            <UsersFour />
            <span className="text-gray-600 dark:text-gray-400">
              {userCount} users
            </span>
          </div>
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
    </header>
  );
};

export default Header;
