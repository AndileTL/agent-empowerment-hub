
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CSRStatsData {
  agent_id: string;
  email: string;
  total_calls: number;
  total_chats: number;
  total_tickets: number;
  average_handling_time: number;
  satisfaction_score: number;
  date: string;
  group: string;
  shift_type: string;
  helpdesk_tickets: number;
  calls: number;
  live_chat: number;
  support_dns_emails: number;
  social_tickets: number;
  billing_tickets: number;
  walk_ins: number;
  total_issues_handled: number;
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

  const mutate = async (updates: Partial<CSRStatsData>) => {
    const { data, error } = await supabase
      .from('agent_tickets')
      .upsert(updates)
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
