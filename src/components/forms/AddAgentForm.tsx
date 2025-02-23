
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddAgentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const shiftTypes = [
  { value: "day", label: "Day Shift" },
  { value: "night", label: "Night Shift" },
  { value: "flex", label: "Flex Shift" },
];

export const AddAgentForm = ({ onSuccess, onCancel }: AddAgentFormProps) => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    group: "",
    shift_type: "",
    team_lead_group: "",
  });
  const { toast } = useToast();

  const handleAddAgent = async () => {
    try {
      if (!newAgent.name || !newAgent.email || !newAgent.group || !newAgent.shift_type || !newAgent.team_lead_group) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required fields.",
        });
        return;
      }

      // First, create a user entry
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{ email: newAgent.email }])
        .select()
        .single();

      if (userError) {
        console.error('Error creating user:', userError);
        toast({
          variant: "destructive",
          title: "Error",
          description: userError.message === 'duplicate key value violates unique constraint "users_email_key"'
            ? "An agent with this email already exists."
            : "Failed to create user. Please try again.",
        });
        return;
      }

      // Then create the agent ticket using the new user's ID
      const { error: agentError } = await supabase
        .from('agent_tickets')
        .insert({
          agent_id: userData.id,
          name: newAgent.name,
          email: newAgent.email,
          group: newAgent.group,
          shift_type: newAgent.shift_type,
          team_lead_group: newAgent.team_lead_group,
          shift_status: 'active',
          date: new Date().toISOString().split('T')[0],
          calls: 0,
          live_chat: 0,
          helpdesk_tickets: 0,
          social_tickets: 0,
          billing_tickets: 0,
          walk_ins: 0,
          total_issues_handled: 0,
        });

      if (agentError) {
        console.error('Error creating agent ticket:', agentError);
        // Clean up the user entry if agent ticket creation fails
        await supabase
          .from('users')
          .delete()
          .eq('id', userData.id);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create agent ticket. Please try again.",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Agent has been added successfully",
      });

      onSuccess();
    } catch (error) {
      console.error('Error adding agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add agent. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Agent Name</Label>
        <Input
          id="name"
          value={newAgent.name}
          onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={newAgent.email}
          onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
          placeholder="agent@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="group">Group</Label>
        <Input
          id="group"
          value={newAgent.group}
          onChange={(e) => setNewAgent({ ...newAgent, group: e.target.value })}
          placeholder="Support Group"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shift_type">Shift Type</Label>
        <Select
          value={newAgent.shift_type}
          onValueChange={(value) => setNewAgent({ ...newAgent, shift_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select shift type" />
          </SelectTrigger>
          <SelectContent>
            {shiftTypes.map((shift) => (
              <SelectItem key={shift.value} value={shift.value}>
                {shift.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="team_lead_group">Team Lead Group</Label>
        <Input
          id="team_lead_group"
          value={newAgent.team_lead_group}
          onChange={(e) => setNewAgent({ ...newAgent, team_lead_group: e.target.value })}
          placeholder="Team Lead Group"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleAddAgent}>
          Add Agent
        </Button>
      </div>
    </div>
  );
};
