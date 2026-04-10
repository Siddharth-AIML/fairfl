import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage.tsx";
import Index from "./pages/Index.tsx";
import ClientPanel from "./pages/ClientPanel.tsx";
import TrainingMonitor from "./pages/TrainingMonitor.tsx";
import FairnessAnalysis from "./pages/FairnessAnalysis.tsx";
import Explainability from "./pages/Explainability.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/client" element={<ClientPanel />} />
          <Route path="/training" element={<TrainingMonitor />} />
          <Route path="/fairness" element={<FairnessAnalysis />} />
          <Route path="/explainability" element={<Explainability />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
