
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AgentTicket {
  id: string;
  email: string;
  team_lead_group: string;
  group: string;
  shift_type: string;
  shift_status: string;
  date: string;
  helpdesk_tickets: number;
  calls: number;
  live_chat: number;
  support_dns_emails: number;
  social_tickets: number;
  billing_tickets: number;
  walk_ins: number;
  total_issues_handled: number;
  ticket_to_calls: number;
  call_classification: string;
  comment: string;
}

const defaultTicket: Partial<AgentTicket> = {
  email: "",
  team_lead_group: "",
  group: "",
  shift_type: "",
  shift_status: "",
  helpdesk_tickets: 0,
  calls: 0,
  live_chat: 0,
  support_dns_emails: 0,
  social_tickets: 0,
  billing_tickets: 0,
  walk_ins: 0,
  ticket_to_calls: 0,
  call_classification: "",
  comment: "",
};

const AgentTickets = () => {
  const [formData, setFormData] = useState<Partial<AgentTicket>>(defaultTicket);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['agent-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_tickets')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createTicketMutation = useMutation({
    mutationFn: async (newTicket: Partial<AgentTicket>) => {
      const { data, error } = await supabase
        .from('agent_tickets')
        .insert([newTicket])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent-tickets'] });
      setFormData(defaultTicket);
      toast({
        title: "Success",
        description: "Ticket created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create ticket: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicketMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof AgentTicket, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Tickets</h1>
          <p className="mt-2 text-gray-600">Manage your daily tickets and activities</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Ticket Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Lead Group</label>
                  <Input
                    value={formData.team_lead_group}
                    onChange={(e) => handleInputChange('team_lead_group', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Group</label>
                  <Input
                    value={formData.group}
                    onChange={(e) => handleInputChange('group', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Shift Type</label>
                  <Select
                    value={formData.shift_type}
                    onValueChange={(value) => handleInputChange('shift_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Shift Status</label>
                  <Select
                    value={formData.shift_status}
                    onValueChange={(value) => handleInputChange('shift_status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Helpdesk Tickets</label>
                  <Input
                    type="number"
                    value={formData.helpdesk_tickets}
                    onChange={(e) => handleInputChange('helpdesk_tickets', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Calls</label>
                  <Input
                    type="number"
                    value={formData.calls}
                    onChange={(e) => handleInputChange('calls', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Live Chat</label>
                  <Input
                    type="number"
                    value={formData.live_chat}
                    onChange={(e) => handleInputChange('live_chat', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Support DNS Emails</label>
                  <Input
                    type="number"
                    value={formData.support_dns_emails}
                    onChange={(e) => handleInputChange('support_dns_emails', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Social Tickets</label>
                  <Input
                    type="number"
                    value={formData.social_tickets}
                    onChange={(e) => handleInputChange('social_tickets', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing Tickets</label>
                  <Input
                    type="number"
                    value={formData.billing_tickets}
                    onChange={(e) => handleInputChange('billing_tickets', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Walk-ins</label>
                  <Input
                    type="number"
                    value={formData.walk_ins}
                    onChange={(e) => handleInputChange('walk_ins', parseInt(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ticket to Calls</label>
                  <Input
                    type="number"
                    value={formData.ticket_to_calls}
                    onChange={(e) => handleInputChange('ticket_to_calls', parseInt(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Call Classification</label>
                <Select
                  value={formData.call_classification}
                  onValueChange={(value) => handleInputChange('call_classification', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comment</label>
                <Input
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Add any additional notes..."
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Team Lead Group</TableHead>
                      <TableHead>Shift Type</TableHead>
                      <TableHead>Total Issues</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets?.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{new Date(ticket.date).toLocaleDateString()}</TableCell>
                        <TableCell>{ticket.email}</TableCell>
                        <TableCell>{ticket.team_lead_group}</TableCell>
                        <TableCell>{ticket.shift_type}</TableCell>
                        <TableCell>{ticket.total_issues_handled}</TableCell>
                        <TableCell>{ticket.shift_status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentTickets;
