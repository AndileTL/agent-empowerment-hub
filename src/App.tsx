
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AgentManagement from "@/pages/AgentManagement";
import AgentDetails from "@/pages/AgentDetails";
import CSRStats from "@/pages/CSRStats";
import Recognition from "@/pages/Recognition";
import Training from "@/pages/Training";
import QAScoring from "@/pages/QAScoring";
import AgentTickets from "@/pages/AgentTickets";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/agents/:id" element={<AgentDetails />} />
        <Route path="/csr-stats" element={<CSRStats />} />
        <Route path="/recognition" element={<Recognition />} />
        <Route path="/training" element={<Training />} />
        <Route path="/qa-scoring" element={<QAScoring />} />
        <Route path="/tickets" element={<AgentTickets />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
