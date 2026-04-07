import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ClientSubmission from "./pages/ClientSubmission";
import TrainingMonitor from "./pages/TrainingMonitor";
import FairnessAnalysis from "./pages/FairnessAnalysis";
import Explainability from "./pages/Explainability";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        {/* ✅ THIS IS REQUIRED */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/submit" element={<ClientSubmission />} />
          <Route path="/training" element={<TrainingMonitor />} />
          <Route path="/fairness" element={<FairnessAnalysis />} />
          <Route path="/explain" element={<Explainability />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;