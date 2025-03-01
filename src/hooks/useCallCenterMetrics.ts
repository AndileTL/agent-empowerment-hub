
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CallCenterMetrics {
  id: string;
  date: string;
  tickets_received: number;
  tickets_resolved: number;
  cases_escalated: number;
  calls_received: number;
  calls_answered: number;
  calls_sla: number;
  calls_crt: number;
  livechat_received: number;
  livechat_answered: number;
  livechat_sla: number;
  livechat_la: number;
  email_received: number;
  emails_sas_resolved: number;
  emails_resolved: number;
  emails_frr: number;
  social_resolved: number;
  walk_in: number;
  total_issues: number;
  ticket_to_calls: number;
  dialogues_classification: number;
  major_network_outages: number;
  system_downtime: number;
  team_lead_group: string;
  created_at: string;
}

export interface CallReasons {
  id: string;
  metrics_id: string;
  date: string;
  technical_issues: number;
  billing_questions: number;
  account_management: number;
  product_information: number;
  service_outage: number;
  other: number;
  created_at: string;
}

interface UseCallCenterMetricsOptions {
  startDate?: string;
  endDate?: string;
}

export const useCallCenterMetrics = ({ startDate, endDate }: UseCallCenterMetricsOptions = {}) => {
  const queryClient = useQueryClient();

  const { data: metricsData, isLoading: isMetricsLoading } = useQuery({
    queryKey: ['call-center-metrics', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('call_center_metrics')
        .select('*')
        .order('date', { ascending: false });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CallCenterMetrics[];
    },
  });

  const { data: reasonsData, isLoading: isReasonsLoading } = useQuery({
    queryKey: ['call-reasons', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('call_reasons')
        .select('*')
        .order('date', { ascending: false });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CallReasons[];
    },
  });

  // Get call reasons data for a specific metrics entry
  const getCallReasonsForMetrics = async (metricsId: string) => {
    const { data, error } = await supabase
      .from('call_reasons')
      .select('*')
      .eq('metrics_id', metricsId)
      .single();

    if (error) throw error;
    return data as CallReasons;
  };

  return {
    metricsData: metricsData || [],
    reasonsData: reasonsData || [],
    isLoading: isMetricsLoading || isReasonsLoading,
    getCallReasonsForMetrics,
  };
};
