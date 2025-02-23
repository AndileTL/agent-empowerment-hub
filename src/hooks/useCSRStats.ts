
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CSRStatsData {
  id: string;
  agent_id: string;
  email: string;
  name: string | null;
  date: string;
  group: string;
  shift_type: string;
  shift_status: string;
  team_lead_group: string;
  helpdesk_tickets: number | null;
  calls: number | null;
  live_chat: number | null;
  support_dns_emails: number | null;
  social_tickets: number | null;
  billing_tickets: number | null;
  walk_ins: number | null;
  total_issues_handled: number | null;
  ticket_to_calls: number | null;
  call_classification: string | null;
  comment: string | null;
  created_at: string | null;
}

interface UseCSRStatsOptions {
  startDate?: string;
  endDate?: string;
  agentId?: string;
}

export const useCSRStats = ({ startDate, endDate, agentId }: UseCSRStatsOptions = {}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['csr-stats', startDate, endDate, agentId],
    queryFn: async () => {
      let query = supabase
        .from('agent_tickets')
        .select('*')
        .order('date', { ascending: false });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }
      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const mutate = async (updates: Partial<CSRStatsData> & { agent_id: string; email: string }) => {
    if (!updates.agent_id || !updates.email) {
      throw new Error('agent_id and email are required fields');
    }

    const payload = {
      ...updates,
      date: updates.date || new Date().toISOString().split('T')[0],
      shift_type: updates.shift_type || 'day',
      shift_status: updates.shift_status || 'active',
      team_lead_group: updates.team_lead_group || 'default',
      group: updates.group || 'default',
      agent_id: updates.agent_id,
      email: updates.email
    };

    const { data, error } = await supabase
      .from('agent_tickets')
      .upsert(payload)
      .select();

    if (error) throw error;
    
    queryClient.invalidateQueries({ queryKey: ['csr-stats'] });
    return data;
  };

  return {
    data: data || [],
    isLoading,
    mutate,
  };
};
