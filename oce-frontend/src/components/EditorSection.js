// EditorSection.js
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const EditorSection = ({ code, onChange, language, theme, darkMode, readOnly = false }) => {
  const [value, setValue] = useState(code || "");
  const [editorTheme, setEditorTheme] = useState(theme ? theme.value : "vs-dark");
  const editorRef = useRef(null);
  const monaco = useRef(null);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(code);
  }, [code]);

  useEffect(() => {
    setEditorTheme(theme ? theme.value : "vs-dark");
  }, [theme]);

  useEffect(() => {
    if (monaco.current && editorRef.current) {
      monaco.current.editor.setModelLanguage(editorRef.current.getModel(), language === "py" ? "python" : language);
    }
  }, [language]);

  return (
    <section className="flex flex-col w-full">
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
        <Editor
          height="85vh"
          width={`100%`}
          language={language === "py" ? "python" : language}
          value={value}
          theme={editorTheme}
          onChange={handleEditorChange}
          options={{ readOnly: readOnly }}
          onMount={value => monaco.current = value}
          editorDidMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </section>
  );
};

export default EditorSection;
