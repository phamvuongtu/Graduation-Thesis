import React from "react";
import { Play, Sun, Moon, GitFork } from "./Icon";
import ThemeDropdown from "./ThemeDropdown";
import Button from "./Button";
import DownloadButton from "./DownloadButton";

const Header = ({
  handleCompile,
  processing,
  code,
  toggleDarkMode,
  darkMode,
  language,
  theme,
  handleThemeChange,
  handleFork,
}) => {
  return (
    <header className="flex flex-col w-full px-2 lg:px-4">
      <h1 className="text-2xl font-bold leading-snug text-base-black dark:text-base-white">
        Online code editor (Read-only page)
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
          <Button
            label="Fork"
            icon={<GitFork />}
            altText="Fork Action"
            textColor="text-primary-primary500"
            onClick={handleFork}
          />
          <DownloadButton code={code} language={language} />
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
