
import { useQuery } from "@tanstack/react-query";
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
}

interface UseCSRStatsOptions {
  startDate?: string;
  endDate?: string;
  agentId?: string;
}

export const useCSRStats = ({ startDate, endDate, agentId }: UseCSRStatsOptions = {}) => {
  return useQuery({
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

      // Aggregate stats by agent
      const aggregatedStats = data.reduce((acc: { [key: string]: any }, curr) => {
        if (!acc[curr.email]) {
          acc[curr.email] = {
            agent_id: curr.agent_id,
            email: curr.email,
            total_calls: 0,
            total_chats: 0,
            total_tickets: 0,
            total_handling_time: 0,
            count: 0,
            dates: new Set()
          };
        }

        acc[curr.email].total_calls += curr.calls || 0;
        acc[curr.email].total_chats += curr.live_chat || 0;
        acc[curr.email].total_tickets += (
          (curr.helpdesk_tickets || 0) +
          (curr.social_tickets || 0) +
          (curr.billing_tickets || 0)
        );
        acc[curr.email].count += 1;
        acc[curr.email].dates.add(curr.date);

        return acc;
      }, {});

      return Object.values(aggregatedStats).map((stat: any) => ({
        ...stat,
        average_handling_time: stat.total_handling_time / stat.count,
        satisfaction_score: Math.round(Math.random() * 20 + 80), // Placeholder for demo
        date: Array.from(stat.dates).sort().reverse()[0], // Most recent date
        dates: undefined // Remove the Set from the final object
      }));
    },
  });
};
