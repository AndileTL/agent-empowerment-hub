
import { useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCSRStats } from "@/hooks/useCSRStats";
import AgentsList from "@/components/agents/AgentsList";
import { AddAgentForm } from "@/components/forms/AddAgentForm";

const AgentManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: agentStats, mutate } = useCSRStats();

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="mt-2 text-gray-600">Manage your contact center agents</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Agent
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <AgentsList agents={agentStats} />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>
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
