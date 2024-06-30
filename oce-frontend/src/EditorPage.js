import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import Header from './components/Header';
import EditorSection from './components/EditorSection';
import OutputSection from './components/OutputSection';
import { defineTheme } from './libs/defineTheme';
import monacoThemes from 'monaco-themes/themes/themelist';
import { languageOptions } from './constants/languageOptions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function EditorPage() {
  const pythonDefault = `# Write your Python code here\nprint("Hello, Python!")`;
  const javaDefault = `// Write your Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`;
  const cDefault = `#include <stdio.h>\n\nint main() {\n  printf("Hello, C!");\n  return 0;\n}`;
  const cppDefault = `#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}`;

  const [code, setCode] = useState(cDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
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

  useEffect(() => {
    if (language) {
      switch (language.value) {
        case 'py':
          setCode(pythonDefault);
          break;
        case 'java':
          setCode(javaDefault);
          break;
        case 'c':
          setCode(cDefault);
          break;
        case 'cpp':
          setCode(cppDefault);
          break;
        default:
          setCode('');
      }
    }
  }, [language, pythonDefault, javaDefault, cDefault, cppDefault]);

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
  };

  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
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
