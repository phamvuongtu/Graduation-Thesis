// EditorPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Header from './components/HeaderEditorPage';
import EditorSection from './components/EditorSection';
import OutputSection from './components/OutputSection';
import { defineTheme } from './libs/defineTheme';
import monacoThemes from 'monaco-themes/themes/themelist';
import { languageOptions } from './constants/languageOptions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditorPage() {
  const location = useLocation();
  const initialCode = location.state?.code || languageOptions[0].defaultCode;
  const initialLanguage = languageOptions.find(lang => lang.value === location.state?.language) || languageOptions[0];

  const [code, setCode] = useState(initialCode);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = debounce(() => {
      console.log('Resized!');
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        handleResize();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      handleResize.cancel();
    };
  }, []);

  useEffect(() => {
    if (!theme && Object.keys(monacoThemes).length > 0) {
      const firstTheme = Object.keys(monacoThemes)[0];
      defineTheme(firstTheme).then(() => setTheme(firstTheme));
    }
  }, [theme]);

  const getStatusDescription = (statusId) => {
    switch (statusId) {
      case 200:
        return 'Compile successfully';
      case 400:
        return 'Bad request';
      case 500:
        return 'Server error';
      default:
        return 'Unknown status';
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    try {
      const response = await fetch('https://api.codex.jaagrav.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code,
          language: language.value,
          input: customInput
        })
      });
      const data = await response.json();
      setOutputDetails(data);

      const statusMessage = getStatusDescription(data.status);
      toast(`Status: ${data.status} - ${statusMessage}`);
    } catch (error) {
      handleError(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleThemeChange = (themeId) => {
    defineTheme(themeId).then(() =>
      setTheme({ value: themeId, label: monacoThemes[themeId] })
    );
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(newLanguage.defaultCode);
  };

  const onChange = (newCode) => {
    setCode(newCode);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleError = (error) => {
    console.error('Error:', error);
    toast.error('An error occurred while compiling the code: ' + error.message);
  };

  return (
    <div ref={containerRef} className={`${darkMode ? 'dark' : ''}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
      <div className="flex flex-col justify-center p-5 bg-white dark:bg-gray-800 h-full">
        <Header
          handleCompile={handleCompile}
          processing={processing}
          code={code}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          handleLanguageChange={handleLanguageChange}
          language={language}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />
        <main className="mt-10 flex flex-col md:flex-row gap-2 relative flex-grow">
          <div className="flex-grow md:flex-grow-0 md:w-1/2">
            <EditorSection
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme}
              darkMode={darkMode}
            />
          </div>
          <div className="flex-grow md:w-1/2">
            <OutputSection
              customInput={customInput}
              setCustomInput={setCustomInput}
              outputDetails={outputDetails}
              darkMode={darkMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditorPage;