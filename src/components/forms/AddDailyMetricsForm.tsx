
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddDailyMetricsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AddDailyMetricsForm = ({ onSuccess, onCancel }: AddDailyMetricsFormProps) => {
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState("tickets");
  const { toast } = useToast();
  
  const [metrics, setMetrics] = useState({
    date: new Date().toISOString().split('T')[0],
    tickets_received: 0,
    tickets_resolved: 0,
    cases_escalated: 0,
    calls_received: 0,
    calls_answered: 0,
    calls_sla: 0,
    calls_crt: 0,
    livechat_received: 0,
    livechat_answered: 0,
    livechat_sla: 0,
    livechat_la: 0,
    email_received: 0,
    emails_sas_resolved: 0,
    emails_resolved: 0,
    emails_frr: 0,
    social_resolved: 0,
    walk_in: 0,
    total_issues: 0,
    ticket_to_calls: 0,
    dialogues_classification: 0,
    major_network_outages: 0,
    system_downtime: 0,
  });

  // Calculate the total issues handled
  const calculateTotalIssues = (data: typeof metrics) => {
    return (
      (data.tickets_received || 0) +
      (data.calls_received || 0) +
      (data.livechat_received || 0) +
      (data.email_received || 0) +
      (data.social_resolved || 0) +
      (data.walk_in || 0)
    );
  };

  // Add call reason analysis state
  const [callReasons, setCallReasons] = useState({
    technical_issues: 0,
    billing_questions: 0,
    account_management: 0,
    product_information: 0,
    service_outage: 0,
    other: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Check if value is a number and not negative
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    const updatedMetrics = { ...metrics, [name]: numValue };
    
    // Calculate total issues whenever values change
    updatedMetrics.total_issues = calculateTotalIssues(updatedMetrics);
    
    // Calculate ticket to calls ratio if both values are available
    if (updatedMetrics.tickets_received > 0 && updatedMetrics.calls_received > 0) {
      updatedMetrics.ticket_to_calls = Math.round((updatedMetrics.tickets_received / updatedMetrics.calls_received) * 100);
    }
    
    setMetrics(updatedMetrics);
  };

  const handleCallReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Check if value is a number and not negative
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setCallReasons({ ...callReasons, [name]: numValue });
  };

  const handleSubmit = async () => {
    try {
      // Insert the metrics data
      const { data: metricsData, error: metricsError } = await supabase
        .from('call_center_metrics')
        .upsert({
          date: metrics.date,
          tickets_received: metrics.tickets_received,
          tickets_resolved: metrics.tickets_resolved,
          cases_escalated: metrics.cases_escalated,
          calls_received: metrics.calls_received,
          calls_answered: metrics.calls_answered,
          calls_sla: metrics.calls_sla,
          calls_crt: metrics.calls_crt,
          livechat_received: metrics.livechat_received,
          livechat_answered: metrics.livechat_answered,
          livechat_sla: metrics.livechat_sla,
          livechat_la: metrics.livechat_la,
          email_received: metrics.email_received,
          emails_sas_resolved: metrics.emails_sas_resolved,
          emails_resolved: metrics.emails_resolved,
          emails_frr: metrics.emails_frr,
          social_resolved: metrics.social_resolved,
          walk_in: metrics.walk_in,
          total_issues: metrics.total_issues,
          ticket_to_calls: metrics.ticket_to_calls,
          dialogues_classification: metrics.dialogues_classification,
          major_network_outages: metrics.major_network_outages,
          system_downtime: metrics.system_downtime,
          team_lead_group: 'default', // Required field from the schema
        })
        .select();

      if (metricsError) {
        throw metricsError;
      }

      // Insert call reason data
      if (metricsData && metricsData.length > 0) {
        const { error: reasonsError } = await supabase
          .from('call_reasons')
          .upsert({
            metrics_id: metricsData[0].id,
            date: metrics.date,
            technical_issues: callReasons.technical_issues,
            billing_questions: callReasons.billing_questions,
            account_management: callReasons.account_management,
            product_information: callReasons.product_information,
            service_outage: callReasons.service_outage,
            other: callReasons.other,
          });

        if (reasonsError) {
          throw reasonsError;
        }
      }

      toast({
        title: "Success",
        description: "Daily metrics have been added successfully",
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['call-center-metrics'] });
      queryClient.invalidateQueries({ queryKey: ['call-reasons'] });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting metrics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add daily metrics. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add Daily Metrics</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={metrics.date}
            onChange={(e) => setMetrics({ ...metrics, date: e.target.value })}
          />
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="tickets">Tickets & Calls</TabsTrigger>
            <TabsTrigger value="chat">Chat & Email</TabsTrigger>
            <TabsTrigger value="reasons">Call Reasons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tickets_received">Tickets Received</Label>
                <Input
                  id="tickets_received"
                  name="tickets_received"
                  type="number"
                  min="0"
                  value={metrics.tickets_received}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tickets_resolved">Tickets Resolved</Label>
                <Input
                  id="tickets_resolved"
                  name="tickets_resolved"
                  type="number"
                  min="0"
                  value={metrics.tickets_resolved}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cases_escalated">Cases Escalated</Label>
                <Input
                  id="cases_escalated"
                  name="cases_escalated"
                  type="number"
                  min="0"
                  value={metrics.cases_escalated}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calls_received">Calls Received</Label>
                <Input
                  id="calls_received"
                  name="calls_received"
                  type="number"
                  min="0"
                  value={metrics.calls_received}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calls_answered">Calls Answered</Label>
                <Input
                  id="calls_answered"
                  name="calls_answered"
                  type="number"
                  min="0"
                  value={metrics.calls_answered}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calls_sla">Calls SLA (%)</Label>
                <Input
                  id="calls_sla"
                  name="calls_sla"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.calls_sla}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calls_crt">Calls CRT (%)</Label>
                <Input
                  id="calls_crt"
                  name="calls_crt"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.calls_crt}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dialogues_classification">Dialogues Classification (%)</Label>
                <Input
                  id="dialogues_classification"
                  name="dialogues_classification"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.dialogues_classification}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="livechat_received">LiveChat Received</Label>
                <Input
                  id="livechat_received"
                  name="livechat_received"
                  type="number"
                  min="0"
                  value={metrics.livechat_received}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="livechat_answered">LiveChat Answered</Label>
                <Input
                  id="livechat_answered"
                  name="livechat_answered"
                  type="number"
                  min="0"
                  value={metrics.livechat_answered}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="livechat_sla">LiveChat SLA (%)</Label>
                <Input
                  id="livechat_sla"
                  name="livechat_sla"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.livechat_sla}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="livechat_la">LiveChat LA (%)</Label>
                <Input
                  id="livechat_la"
                  name="livechat_la"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.livechat_la}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email_received">Email Received</Label>
                <Input
                  id="email_received"
                  name="email_received"
                  type="number"
                  min="0"
                  value={metrics.email_received}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emails_sas_resolved">Emails SAS Resolved</Label>
                <Input
                  id="emails_sas_resolved"
                  name="emails_sas_resolved"
                  type="number"
                  min="0"
                  value={metrics.emails_sas_resolved}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emails_resolved">Emails Resolved</Label>
                <Input
                  id="emails_resolved"
                  name="emails_resolved"
                  type="number"
                  min="0"
                  value={metrics.emails_resolved}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emails_frr">Emails FRR (%)</Label>
                <Input
                  id="emails_frr"
                  name="emails_frr"
                  type="number"
                  min="0"
                  max="100"
                  value={metrics.emails_frr}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_resolved">Social Resolved</Label>
                <Input
                  id="social_resolved"
                  name="social_resolved"
                  type="number"
                  min="0"
                  value={metrics.social_resolved}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="walk_in">Walk-In</Label>
                <Input
                  id="walk_in"
                  name="walk_in"
                  type="number"
                  min="0"
                  value={metrics.walk_in}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reasons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="technical_issues">Technical Issues</Label>
                <Input
                  id="technical_issues"
                  name="technical_issues"
                  type="number"
                  min="0"
                  value={callReasons.technical_issues}
                  onChange={handleCallReasonChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billing_questions">Billing Questions</Label>
                <Input
                  id="billing_questions"
                  name="billing_questions"
                  type="number"
                  min="0"
                  value={callReasons.billing_questions}
                  onChange={handleCallReasonChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account_management">Account Management</Label>
                <Input
                  id="account_management"
                  name="account_management"
                  type="number"
                  min="0"
                  value={callReasons.account_management}
                  onChange={handleCallReasonChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product_information">Product Information</Label>
                <Input
                  id="product_information"
                  name="product_information"
                  type="number"
                  min="0"
                  value={callReasons.product_information}
                  onChange={handleCallReasonChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service_outage">Service Outage</Label>
                <Input
                  id="service_outage"
                  name="service_outage"
                  type="number"
                  min="0"
                  value={callReasons.service_outage}
                  onChange={handleCallReasonChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="other">Other</Label>
                <Input
                  id="other"
                  name="other"
                  type="number"
                  min="0"
                  value={callReasons.other}
                  onChange={handleCallReasonChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="major_network_outages">Major Network Outages</Label>
              <Input
                id="major_network_outages"
                name="major_network_outages"
                type="number"
                min="0"
                value={metrics.major_network_outages}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="system_downtime">System Downtime (minutes)</Label>
              <Input
                id="system_downtime"
                name="system_downtime"
                type="number"
                min="0"
                value={metrics.system_downtime}
                onChange={handleInputChange}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Issues Handled:</span>
            <span className="font-semibold">{metrics.total_issues}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Ticket to Calls Ratio (%):</span>
            <span className="font-semibold">{metrics.ticket_to_calls}%</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit}>
            Submit Metrics
          </Button>
        </div>
      </div>
    </Card>
  );
};
