export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_url: string | null
          created_at: string | null
          criteria: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          badge_url?: string | null
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          badge_url?: string | null
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      agent_achievements: {
        Row: {
          achievement_id: string
          agent_id: string
          awarded_at: string | null
          id: string
        }
        Insert: {
          achievement_id: string
          agent_id: string
          awarded_at?: string | null
          id?: string
        }
        Update: {
          achievement_id?: string
          agent_id?: string
          awarded_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_attendance: {
        Row: {
          agent_id: string
          created_at: string | null
          date: string
          id: string
          status: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          date?: string
          id?: string
          status: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          date?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_attendance_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_certifications: {
        Row: {
          agent_id: string
          certification_id: string
          completed_date: string | null
          created_at: string | null
          id: string
          progress: number | null
          status: string
        }
        Insert: {
          agent_id: string
          certification_id: string
          completed_date?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          status: string
        }
        Update: {
          agent_id?: string
          certification_id?: string
          completed_date?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_certifications_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_performance: {
        Row: {
          agent_id: string
          created_at: string | null
          date: string
          description: string
          id: string
          type: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          date?: string
          description: string
          id?: string
          type: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_agent"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tickets: {
        Row: {
          agent_id: string
          billing_tickets: number | null
          call_classification: string | null
          calls: number | null
          comment: string | null
          created_at: string | null
          date: string
          date_of_birth: string | null
          email: string
          group: string
          helpdesk_tickets: number | null
          home_address: string | null
          id: string
          live_chat: number | null
          name: string | null
          next_of_kin_name: string | null
          next_of_kin_phone: string | null
          phone_number: string | null
          role: string | null
          shift_status: string
          shift_type: string
          social_tickets: number | null
          support_dns_emails: number | null
          team_lead: string | null
          team_lead_group: string
          ticket_to_calls: number | null
          total_issues_handled: number | null
          walk_ins: number | null
        }
        Insert: {
          agent_id: string
          billing_tickets?: number | null
          call_classification?: string | null
          calls?: number | null
          comment?: string | null
          created_at?: string | null
          date?: string
          date_of_birth?: string | null
          email: string
          group: string
          helpdesk_tickets?: number | null
          home_address?: string | null
          id?: string
          live_chat?: number | null
          name?: string | null
          next_of_kin_name?: string | null
          next_of_kin_phone?: string | null
          phone_number?: string | null
          role?: string | null
          shift_status: string
          shift_type: string
          social_tickets?: number | null
          support_dns_emails?: number | null
          team_lead?: string | null
          team_lead_group: string
          ticket_to_calls?: number | null
          total_issues_handled?: number | null
          walk_ins?: number | null
        }
        Update: {
          agent_id?: string
          billing_tickets?: number | null
          call_classification?: string | null
          calls?: number | null
          comment?: string | null
          created_at?: string | null
          date?: string
          date_of_birth?: string | null
          email?: string
          group?: string
          helpdesk_tickets?: number | null
          home_address?: string | null
          id?: string
          live_chat?: number | null
          name?: string | null
          next_of_kin_name?: string | null
          next_of_kin_phone?: string | null
          phone_number?: string | null
          role?: string | null
          shift_status?: string
          shift_type?: string
          social_tickets?: number | null
          support_dns_emails?: number | null
          team_lead?: string | null
          team_lead_group?: string
          ticket_to_calls?: number | null
          total_issues_handled?: number | null
          walk_ins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_tickets_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_training_progress: {
        Row: {
          agent_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string
          score: number | null
          status: string
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id: string
          score?: number | null
          status: string
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string
          score?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_training_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      monitoring_settings: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          last_monitored_at: string | null
          monitor_frequency: string
          supervisor_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          last_monitored_at?: string | null
          monitor_frequency: string
          supervisor_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          last_monitored_at?: string | null
          monitor_frequency?: string
          supervisor_id?: string
        }
        Relationships: []
      }
      qa_criteria: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          max_score: number
          name: string
          weight: number
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          max_score: number
          name: string
          weight: number
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          max_score?: number
          name?: string
          weight?: number
        }
        Relationships: []
      }
      qa_evaluations: {
        Row: {
          agent_id: string
          created_at: string | null
          evaluation_date: string
          evaluator_id: string
          feedback: string | null
          id: string
          interaction_id: string | null
          interaction_type: string
          total_score: number
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          evaluation_date: string
          evaluator_id: string
          feedback?: string | null
          id?: string
          interaction_id?: string | null
          interaction_type: string
          total_score: number
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          evaluation_date?: string
          evaluator_id?: string
          feedback?: string | null
          id?: string
          interaction_id?: string | null
          interaction_type?: string
          total_score?: number
        }
        Relationships: []
      }
      qa_scores: {
        Row: {
          comment: string | null
          created_at: string | null
          criteria_id: string
          evaluation_id: string
          id: string
          score: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          criteria_id: string
          evaluation_id: string
          id?: string
          score: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          criteria_id?: string
          evaluation_id?: string
          id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "qa_scores_criteria_id_fkey"
            columns: ["criteria_id"]
            isOneToOne: false
            referencedRelation: "qa_criteria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qa_scores_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "qa_evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          agent_id: string
          completed_at: string | null
          id: string
          score: number
          training_resource_id: string | null
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          id?: string
          score: number
          training_resource_id?: string | null
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          id?: string
          score?: number
          training_resource_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_training_resource_id_fkey"
            columns: ["training_resource_id"]
            isOneToOne: false
            referencedRelation: "training_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          id: string
          options: Json
          question: string
          training_resource_id: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          id?: string
          options: Json
          question: string
          training_resource_id?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          id?: string
          options?: Json
          question?: string
          training_resource_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_training_resource_id_fkey"
            columns: ["training_resource_id"]
            isOneToOne: false
            referencedRelation: "training_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      training_modules: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          duration: number
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          duration: number
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_resources: {
        Row: {
          content_url: string | null
          created_at: string | null
          duration: number | null
          id: string
          module_id: string | null
          title: string
          type: string
        }
        Insert: {
          content_url?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          module_id?: string | null
          title: string
          type: string
        }
        Update: {
          content_url?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          module_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_resources_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
