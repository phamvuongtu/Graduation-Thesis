// SharePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditorSection from './components/CodeEditorSection';

const SharePage = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Fetch the code using the share ID
    fetch(`${backendUrl}/api/get-shared-code/${id}`)
      .then(response => response.json())
      .then(data => setCode(data.code));
  }, [id]);

  return (
    <div className="flex flex-col justify-center p-5 bg-white dark:bg-gray-800 h-full">
      <CodeEditorSection
        code={code}
        onChange={() => {}}
        language="plaintext"
        theme="vs-dark"
        darkMode={false}
        readOnly={true}
      />
    </div>
  );
};

export default SharePage;
