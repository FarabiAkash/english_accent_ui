import React from "react";
import AccentAnalyzer from "./components/AccentAnalyzer";
import ApiDocumentation from "./components/ApiDocumentation";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <AccentAnalyzer />
        <ApiDocumentation />
      </div>
    </div>
  );
}

export default App;
