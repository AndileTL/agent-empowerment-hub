
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useShiftRoster = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['shift-roster'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_tickets')
        .select('*')
        .order('email', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const createShift = async (shiftData: any) => {
    const { data, error } = await supabase
      .from('agent_tickets')
      .insert(shiftData)
      .select()
      .single();

    if (error) throw error;
    
    queryClient.invalidateQueries({ queryKey: ['shift-roster'] });
    return data;
  };

  const updateShift = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('agent_tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    queryClient.invalidateQueries({ queryKey: ['shift-roster'] });
    return data;
  };

  return {
    data,
    isLoading,
    createShift,
    updateShift,
  };
};
