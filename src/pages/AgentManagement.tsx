
import { useState } from "react";
import { Plus, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCSRStats } from "@/hooks/useCSRStats";
import AgentsList from "@/components/agents/AgentsList";
import { AddAgentForm } from "@/components/forms/AddAgentForm";

const AgentManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: agentStats, mutate } = useCSRStats();
  const navigate = useNavigate();

  const handleAddSuccess = () => {
    // Refresh the agent stats after a new agent is added
    mutate();
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your contact center agents</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate("/agent-performance/overview")} 
              variant="outline"
              className="flex items-center"
            >
              <BarChart2 className="mr-2 h-4 w-4" /> 
              Agent Performance
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Agent
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <AgentsList agents={agentStats} />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[700px] dark:bg-gray-800 dark:text-white">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Enter the details of the new agent below.
              </DialogDescription>
            </DialogHeader>
            <AddAgentForm
              onSuccess={handleAddSuccess}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AgentManagement;
