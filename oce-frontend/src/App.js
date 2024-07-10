import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import SharePage from "./SharePage";
import CollaborativePage from "./CollaborativePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/share/:id" element={<SharePage />} />
        <Route path="/collaborate/:id" element={<CollaborativePage />} />
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
