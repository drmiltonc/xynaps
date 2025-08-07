export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          specialty: string | null;
          role: 'admin' | 'user' | 'subscriber';
          subscription_status: string;
          subscription_end_date: string | null;
          permissions: any;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          specialty?: string | null;
          role?: 'admin' | 'user' | 'subscriber';
          subscription_status?: string;
          subscription_end_date?: string | null;
          permissions?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          specialty?: string | null;
          role?: 'admin' | 'user' | 'subscriber';
          subscription_status?: string;
          subscription_end_date?: string | null;
          permissions?: any;
          created_at?: string;
        };
      };
      roles: {
        Row: {
          id: string;
          name: string;
          display_name: string;
          description: string | null;
          permissions: any;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_name: string;
          description?: string | null;
          permissions?: any;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          display_name?: string;
          description?: string | null;
          permissions?: any;
          is_active?: boolean;
          created_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role_id: string;
          assigned_by: string | null;
          assigned_at: string;
          expires_at: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          role_id: string;
          assigned_by?: string | null;
          assigned_at?: string;
          expires_at?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          role_id?: string;
          assigned_by?: string | null;
          assigned_at?: string;
          expires_at?: string | null;
          is_active?: boolean;
        };
      };
      chats: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          original_title: string | null;
          type: 'consultation' | 'simulation';
          language: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          original_title?: string | null;
          type: 'consultation' | 'simulation';
          language?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          original_title?: string | null;
          type?: 'consultation' | 'simulation';
          language?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          role: 'user' | 'assistant';
          content: string;
          audio_url: string | null;
          image_url: string | null;
          metadata: any;
          context_summary: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          role: 'user' | 'assistant';
          content: string;
          audio_url?: string | null;
          image_url?: string | null;
          metadata?: any;
          context_summary?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          audio_url?: string | null;
          image_url?: string | null;
          metadata?: any;
          context_summary?: string | null;
          created_at?: string;
        };
      };
      chat_contexts: {
        Row: {
          id: string;
          chat_id: string;
          context_type: 'patient_info' | 'medical_history' | 'specialty_context' | 'simulation_scenario';
          context_data: any;
          context_summary: string | null;
          importance_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          context_type: 'patient_info' | 'medical_history' | 'specialty_context' | 'simulation_scenario';
          context_data?: any;
          context_summary?: string | null;
          importance_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          context_type?: 'patient_info' | 'medical_history' | 'specialty_context' | 'simulation_scenario';
          context_data?: any;
          context_summary?: string | null;
          importance_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      agent_memories: {
        Row: {
          id: string;
          user_id: string;
          agent_type: 'medical_query' | 'clinical_simulation';
          memory_key: string;
          memory_data: any;
          memory_summary: string | null;
          importance_score: number;
          last_accessed: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agent_type: 'medical_query' | 'clinical_simulation';
          memory_key: string;
          memory_data?: any;
          memory_summary?: string | null;
          importance_score?: number;
          last_accessed?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agent_type?: 'medical_query' | 'clinical_simulation';
          memory_key?: string;
          memory_data?: any;
          memory_summary?: string | null;
          importance_score?: number;
          last_accessed?: string;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          paypal_subscription_id: string | null;
          plan_type: 'basic' | 'premium';
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          paypal_subscription_id?: string | null;
          plan_type: 'basic' | 'premium';
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          paypal_subscription_id?: string | null;
          plan_type?: 'basic' | 'premium';
          status?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'success' | 'error' | 'warning' | 'info';
          title: string;
          message: string;
          action_url: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'success' | 'error' | 'warning' | 'info';
          title: string;
          message: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'success' | 'error' | 'warning' | 'info';
          title?: string;
          message?: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
