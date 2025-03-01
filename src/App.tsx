
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Index";
import Agent from "./pages/Agent";
import Training from "./pages/Training";
import Recognition from "./pages/Recognition";
import NotFound from "./pages/NotFound";
import ShiftRoster from "./pages/ShiftRoster";
import CallCenterMetrics from "@/pages/CallCenterMetrics";
import CSRStats from "@/pages/CSRStats";
import QAScoring from "@/pages/QAScoring";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent-management" element={<Agent />} />
        <Route path="/csr-stats" element={<CSRStats />} />
        <Route path="/training" element={<Training />} />
        <Route path="/qa-scoring" element={<QAScoring />} />
        <Route path="/recognition" element={<Recognition />} />
        <Route path="/shift-roster" element={<ShiftRoster />} />
        <Route path="/call-center-metrics" element={<CallCenterMetrics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
