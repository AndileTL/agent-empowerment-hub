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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="agent" element={<Agent />} />
          <Route path="training" element={<Training />} />
          <Route path="shift-roster" element={<ShiftRoster />} />
        </Route>
        <Route path="recognition" element={<Recognition />} />
        <Route path="call-center-metrics" element={<CallCenterMetrics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
