
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgentManagement from "./pages/AgentManagement";
import AgentDetails from "./pages/AgentDetails";
import Training from "./pages/Training";
import QAScoring from "./pages/QAScoring";
import Recognition from "./pages/Recognition";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agents" element={<AgentManagement />} />
          <Route path="/agents/:id" element={<AgentDetails />} />
          <Route path="/training" element={<Training />} />
          <Route path="/qa" element={<QAScoring />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
