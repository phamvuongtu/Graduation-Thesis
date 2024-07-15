import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EditorSection from "./components/EditorSection";
import Header from "./components/HeaderCollaborativePage";
import monacoThemes from "monaco-themes/themes/themelist";
import { defineTheme } from "./libs/defineTheme";
import 'react-toastify/dist/ReactToastify.css';

const CollaborativePage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const socketRef = useRef(null); // Sử dụng useRef để giữ kết nối WebSocket.

  // useEffect to Initialize WebSocket and Fetch Initial Data
  useEffect(() => {
    //Thiết lập kết nối WebSocket đến máy chủ.
    socketRef.current = new WebSocket(`ws://localhost:8080/collaborate/${id}`);

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socketRef.current.onmessage = (event) => {
      const data = event.data;
      if (data.startsWith("users:")) {
        const count = parseInt(data.split(":")[1], 10);
        setUserCount(count);
      } else if (data.startsWith("Connected to room:")) {
        console.log(data);
      } else {
        console.log("Received new code:", data);
        setCode(data);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.warn("WebSocket connection closed");
    };

    fetch(`http://localhost:8080/api/get-collaborate-link/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCode(data.code);
        setLanguage(data.language);
        console.log("Fetched initial code and language:", data);
      })
      .catch((error) => {
        console.error("Error fetching collaborative code:", error);
      });

    // Đóng kết nối WebSocket khi component unmount.
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [id]);

  useEffect(() => {
    if (!theme && Object.keys(monacoThemes).length > 0) {
      const firstTheme = Object.keys(monacoThemes)[0];
      defineTheme(firstTheme).then(() => setTheme(firstTheme));
    }
  }, [theme]);

  const handleThemeChange = (themeId) => {
    defineTheme(themeId).then(() =>
      setTheme({ value: themeId, label: monacoThemes[themeId] })
    );
  };

  const handleChange = (newCode) => {
    setCode(newCode);
    socketRef.current.send(newCode);
    console.log("Sent new code:", newCode);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleFork = () => {
    navigate("/", { state: { code, language, darkMode, theme: theme.value } });
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex flex-col justify-center p-5 bg-white dark:bg-gray-800 h-full">
        <Header
          code={code}
          language={language}
          theme={theme}
          handleThemeChange={handleThemeChange}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          userCount={userCount}
          handleFork={handleFork}
        />
        <main className="mt-10 flex flex-col md:flex-row gap-2 relative flex-grow">
          <div className="flex-grow md:flex-grow-0 md:w-1/2">
            <EditorSection
              code={code}
              onChange={handleChange}
              language={language}
              theme={theme}
              readOnly={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollaborativePage;
