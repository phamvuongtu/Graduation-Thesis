import React from 'react';
import CodeEditorSection from './CodeEditorSection';

const EditorSection = ({ code, onChange, language, theme, darkMode }) => (
  <section className="flex flex-col w-full">
    <CodeEditorSection
      code={code}
      onChange={onChange}
      language={language}
      theme={theme}
      darkMode={darkMode}

    />
  </section>
);

export default EditorSection;
