
// This file defines TypeScript types for our Supabase tables
// It helps with type checking when interacting with the database

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

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_achievements: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_attendance: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_certifications: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_performance: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_tickets: {
        Row: any;
        Insert: any;
        Update: any;
      };
      agent_training_progress: {
        Row: any;
        Insert: any;
        Update: any;
      };
      certifications: {
        Row: any;
        Insert: any;
        Update: any;
      };
      monitoring_settings: {
        Row: any;
        Insert: any;
        Update: any;
      };
      qa_criteria: {
        Row: any;
        Insert: any;
        Update: any;
      };
      qa_evaluations: {
        Row: any;
        Insert: any;
        Update: any;
      };
      qa_scores: {
        Row: any;
        Insert: any;
        Update: any;
      };
      quiz_attempts: {
        Row: any;
        Insert: any;
        Update: any;
      };
      quiz_questions: {
        Row: any;
        Insert: any;
        Update: any;
      };
      training_modules: {
        Row: any;
        Insert: any;
        Update: any;
      };
      training_resources: {
        Row: any;
        Insert: any;
        Update: any;
      };
      users: {
        Row: any;
        Insert: any;
        Update: any;
      };
      call_center_metrics: {
        Row: CallCenterMetrics;
        Insert: Omit<CallCenterMetrics, 'id' | 'created_at'>;
        Update: Partial<Omit<CallCenterMetrics, 'id' | 'created_at'>>;
      };
      call_reasons: {
        Row: CallReasons;
        Insert: Omit<CallReasons, 'id' | 'created_at'>;
        Update: Partial<Omit<CallReasons, 'id' | 'created_at'>>;
      };
    };
  };
};
