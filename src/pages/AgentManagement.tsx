
import { useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCSRStats } from "@/hooks/useCSRStats";
import AgentStatusPie from "@/components/AgentStatusPie";
import QuickStats from "@/components/stats/QuickStats";
import AgentsList from "@/components/agents/AgentsList";
import { AddAgentForm } from "@/components/forms/AddAgentForm";

const AgentManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: agentStats, mutate } = useCSRStats();

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    // We don't need to call mutate here as it will be handled by the AddAgentForm component
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="mt-2 text-gray-600">Manage and monitor agent performance</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AgentsList agents={agentStats} />

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Agent Status Overview</h2>
              <AgentStatusPie
                data={[
                  { status: "Online", value: 24, color: "#10b981" },
                  { status: "Busy", value: 12, color: "#f59e0b" },
                  { status: "Offline", value: 8, color: "#6b7280" },
                ]}
              />
            </div>

            <QuickStats agentStats={agentStats} />
          </div>
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
