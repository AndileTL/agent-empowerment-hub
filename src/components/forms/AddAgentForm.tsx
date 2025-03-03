
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
  { value: "afternoon", label: "Afternoon Shift" },
];

export const roles = [
  { value: "technical_support", label: "Technical Support" },
  { value: "billing", label: "Billing" },
  { value: "sales", label: "Sales" },
];

export const teamLeads = [
  { value: "andile_moyo", label: "Andile Moyo" },
  { value: "jane_smith", label: "Jane Smith" },
  { value: "mike_jones", label: "Mike Jones" },
];

export const teamLeadGroups = [
  { value: "technical", label: "Technical" },
  { value: "sales", label: "Sales" },
  { value: "billing", label: "Billing" },
  { value: "support", label: "Support" },
];

export const AddAgentForm = ({ onSuccess, onCancel }: AddAgentFormProps) => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    role: "",
    group: "",
    shift_type: "",
    team_lead: "",
    team_lead_group: "", // Added missing field
    date_of_birth: "",
    phone_number: "",
    home_address: "",
    next_of_kin_name: "",
    next_of_kin_phone: "",
  });
  const { toast } = useToast();

  const handleAddAgent = async () => {
    try {
      if (!newAgent.name || !newAgent.email || !newAgent.role || !newAgent.group || 
          !newAgent.shift_type || !newAgent.team_lead || !newAgent.team_lead_group) { // Updated validation
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
          role: newAgent.role,
          group: newAgent.group,
          shift_type: newAgent.shift_type,
          team_lead: newAgent.team_lead,
          team_lead_group: newAgent.team_lead_group, // Added missing field
          date_of_birth: newAgent.date_of_birth,
          phone_number: newAgent.phone_number,
          home_address: newAgent.home_address,
          next_of_kin_name: newAgent.next_of_kin_name,
          next_of_kin_phone: newAgent.next_of_kin_phone,
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
        <Label htmlFor="name">Agent Name*</Label>
        <Input
          id="name"
          value={newAgent.name}
          onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email*</Label>
        <Input
          id="email"
          type="email"
          value={newAgent.email}
          onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
          placeholder="agent@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role*</Label>
        <Select
          value={newAgent.role}
          onValueChange={(value) => setNewAgent({ ...newAgent, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="group">Group*</Label>
        <Input
          id="group"
          value={newAgent.group}
          onChange={(e) => setNewAgent({ ...newAgent, group: e.target.value })}
          placeholder="Support Group"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shift_type">Shift Type*</Label>
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
        <Label htmlFor="team_lead">Team Lead*</Label>
        <Select
          value={newAgent.team_lead}
          onValueChange={(value) => setNewAgent({ ...newAgent, team_lead: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select team lead" />
          </SelectTrigger>
          <SelectContent>
            {teamLeads.map((lead) => (
              <SelectItem key={lead.value} value={lead.value}>
                {lead.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Added Team Lead Group field */}
      <div className="space-y-2">
        <Label htmlFor="team_lead_group">Team Lead Group*</Label>
        <Select
          value={newAgent.team_lead_group}
          onValueChange={(value) => setNewAgent({ ...newAgent, team_lead_group: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select team lead group" />
          </SelectTrigger>
          <SelectContent>
            {teamLeadGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          type="date"
          value={newAgent.date_of_birth}
          onChange={(e) => setNewAgent({ ...newAgent, date_of_birth: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          type="tel"
          value={newAgent.phone_number}
          onChange={(e) => setNewAgent({ ...newAgent, phone_number: e.target.value })}
          placeholder="+1234567890"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="home_address">Home Address</Label>
        <Input
          id="home_address"
          value={newAgent.home_address}
          onChange={(e) => setNewAgent({ ...newAgent, home_address: e.target.value })}
          placeholder="123 Main St, City, Country"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="next_of_kin_name">Next of Kin Name</Label>
        <Input
          id="next_of_kin_name"
          value={newAgent.next_of_kin_name}
          onChange={(e) => setNewAgent({ ...newAgent, next_of_kin_name: e.target.value })}
          placeholder="Jane Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="next_of_kin_phone">Next of Kin Phone Number</Label>
        <Input
          id="next_of_kin_phone"
          type="tel"
          value={newAgent.next_of_kin_phone}
          onChange={(e) => setNewAgent({ ...newAgent, next_of_kin_phone: e.target.value })}
          placeholder="+1234567890"
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
