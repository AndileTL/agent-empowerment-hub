
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import AgentManagement from "@/pages/AgentManagement";
import AgentDetails from "@/pages/AgentDetails";
import AgentPerformance from "@/pages/AgentPerformance";
import CSRStats from "@/pages/CSRStats";
import ContactCenterPerformance from "@/pages/ContactCenterPerformance";
import Recognition from "@/pages/Recognition";
import Training from "@/pages/Training";
import QAScoring from "@/pages/QAScoring";
import AgentTickets from "@/pages/AgentTickets";
import NotFound from "@/pages/NotFound";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agents" element={<AgentManagement />} />
            <Route path="/agents/:id" element={<AgentDetails />} />
            <Route path="/agent-performance/:id" element={<AgentPerformance />} />
            <Route path="/csr-stats" element={<CSRStats />} />
            <Route path="/cc-performance" element={<ContactCenterPerformance />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/training" element={<Training />} />
            <Route path="/qa-scoring" element={<QAScoring />} />
            <Route path="/tickets" element={<AgentTickets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
