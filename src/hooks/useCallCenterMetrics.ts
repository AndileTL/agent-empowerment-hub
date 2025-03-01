
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CallCenterMetrics, CallReasons } from "@/integrations/supabase/schema";

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

export type { CallCenterMetrics, CallReasons };
