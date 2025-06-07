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
      ai_feedback: {
        Row: {
          ai_response: string | null
          created_at: string | null
          feedback_text: string | null
          id: string
          interaction_type: string | null
          rating: number | null
          user_id: string
          user_input: string | null
        }
        Insert: {
          ai_response?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          interaction_type?: string | null
          rating?: number | null
          user_id: string
          user_input?: string | null
        }
        Update: {
          ai_response?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          interaction_type?: string | null
          rating?: number | null
          user_id?: string
          user_input?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          consultation_fee: number | null
          created_at: string | null
          doctor_id: string
          id: string
          mode: Database["public"]["Enums"]["appointment_mode"]
          notes: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          symptoms: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_id: string
          id?: string
          mode: Database["public"]["Enums"]["appointment_mode"]
          notes?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_id?: string
          id?: string
          mode?: Database["public"]["Enums"]["appointment_mode"]
          notes?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      approved_institutions: {
        Row: {
          city: string
          contact_email: string
          contact_phone: string
          created_at: string
          district: string
          id: string
          institution_type: Database["public"]["Enums"]["institution_type"]
          is_active: boolean
          location: string
          name: string
          registration_id: string | null
          services_description: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city: string
          contact_email: string
          contact_phone: string
          created_at?: string
          district: string
          id?: string
          institution_type: Database["public"]["Enums"]["institution_type"]
          is_active?: boolean
          location: string
          name: string
          registration_id?: string | null
          services_description: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          district?: string
          id?: string
          institution_type?: Database["public"]["Enums"]["institution_type"]
          is_active?: boolean
          location?: string
          name?: string
          registration_id?: string | null
          services_description?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approved_institutions_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "institution_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_availability: {
        Row: {
          day_of_week: number | null
          doctor_id: string
          end_time: string
          id: string
          is_active: boolean | null
          start_time: string
        }
        Insert: {
          day_of_week?: number | null
          doctor_id: string
          end_time: string
          id?: string
          is_active?: boolean | null
          start_time: string
        }
        Update: {
          day_of_week?: number | null
          doctor_id?: string
          end_time?: string
          id?: string
          is_active?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          consultation_fee: number | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: string
          is_available: boolean | null
          name: string
          phone: string | null
          qualification: string | null
          specialization: Database["public"]["Enums"]["doctor_specialization"]
        }
        Insert: {
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_available?: boolean | null
          name: string
          phone?: string | null
          qualification?: string | null
          specialization: Database["public"]["Enums"]["doctor_specialization"]
        }
        Update: {
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_available?: boolean | null
          name?: string
          phone?: string | null
          qualification?: string | null
          specialization?: Database["public"]["Enums"]["doctor_specialization"]
        }
        Relationships: []
      }
      health_records: {
        Row: {
          created_at: string | null
          date_issued: string | null
          description: string | null
          doctor_name: string | null
          file_name: string | null
          file_url: string | null
          id: string
          record_type: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_issued?: string | null
          description?: string | null
          doctor_name?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          record_type?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_issued?: string | null
          description?: string | null
          doctor_name?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          record_type?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      institution_registrations: {
        Row: {
          admin_notes: string | null
          city: string
          contact_email: string
          contact_phone: string
          created_at: string
          district: string
          id: string
          institution_type: Database["public"]["Enums"]["institution_type"]
          legal_document_name: string | null
          legal_document_url: string | null
          location: string
          name: string
          reviewed_at: string | null
          reviewed_by: string | null
          services_description: string
          status: Database["public"]["Enums"]["registration_status"]
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          city: string
          contact_email: string
          contact_phone: string
          created_at?: string
          district: string
          id?: string
          institution_type: Database["public"]["Enums"]["institution_type"]
          legal_document_name?: string | null
          legal_document_url?: string | null
          location: string
          name: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          services_description: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          city?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          district?: string
          id?: string
          institution_type?: Database["public"]["Enums"]["institution_type"]
          legal_document_name?: string | null
          legal_document_url?: string | null
          location?: string
          name?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          services_description?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Relationships: []
      }
      lab_bookings: {
        Row: {
          booking_date: string
          booking_time: string | null
          collection_address: string | null
          created_at: string | null
          id: string
          is_home_collection: boolean | null
          lab_test_id: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["lab_test_status"] | null
          total_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_time?: string | null
          collection_address?: string | null
          created_at?: string | null
          id?: string
          is_home_collection?: boolean | null
          lab_test_id: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["lab_test_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_time?: string | null
          collection_address?: string | null
          created_at?: string | null
          id?: string
          is_home_collection?: boolean | null
          lab_test_id?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["lab_test_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_bookings_lab_test_id_fkey"
            columns: ["lab_test_id"]
            isOneToOne: false
            referencedRelation: "lab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_home_collection_available: boolean | null
          name: string
          preparation_instructions: string | null
          price: number
          report_delivery_days: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_home_collection_available?: boolean | null
          name: string
          preparation_instructions?: string | null
          price: number
          report_delivery_days?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_home_collection_available?: boolean | null
          name?: string
          preparation_instructions?: string | null
          price?: number
          report_delivery_days?: number | null
        }
        Relationships: []
      }
      medicine_order_items: {
        Row: {
          id: string
          medicine_id: string
          order_id: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: string
          medicine_id: string
          order_id: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: string
          medicine_id?: string
          order_id?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "medicine_order_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medicine_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "medicine_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine_orders: {
        Row: {
          created_at: string | null
          delivery_address: string
          delivery_fee: number | null
          estimated_delivery_date: string | null
          id: string
          prescription_id: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_address: string
          delivery_fee?: number | null
          estimated_delivery_date?: string | null
          id?: string
          prescription_id?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_address?: string
          delivery_fee?: number | null
          estimated_delivery_date?: string | null
          id?: string
          prescription_id?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medicine_orders_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "health_records"
            referencedColumns: ["id"]
          },
        ]
      }
      medicines: {
        Row: {
          created_at: string | null
          description: string | null
          dosage_form: string | null
          generic_name: string | null
          id: string
          in_stock: boolean | null
          manufacturer: string | null
          name: string
          prescription_required: boolean | null
          price: number | null
          strength: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          dosage_form?: string | null
          generic_name?: string | null
          id?: string
          in_stock?: boolean | null
          manufacturer?: string | null
          name: string
          prescription_required?: boolean | null
          price?: number | null
          strength?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          dosage_form?: string | null
          generic_name?: string | null
          id?: string
          in_stock?: boolean | null
          manufacturer?: string | null
          name?: string
          prescription_required?: boolean | null
          price?: number | null
          strength?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          gateway_response: Json | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference_id: string | null
          reference_type: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          gateway_response?: Json | null
          id?: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference_id?: string | null
          reference_type?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          gateway_response?: Json | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          reference_id?: string | null
          reference_type?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contact: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          preferred_language: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "hospital" | "pathology_lab" | "user"
      appointment_mode: "online" | "physical"
      appointment_status:
        | "scheduled"
        | "completed"
        | "cancelled"
        | "rescheduled"
      doctor_specialization:
        | "general"
        | "cardiologist"
        | "dermatologist"
        | "neurologist"
        | "pediatrician"
        | "psychiatrist"
        | "orthopedic"
        | "gynecologist"
      institution_type: "hospital" | "pathology_lab"
      lab_test_status:
        | "booked"
        | "sample_collected"
        | "processing"
        | "completed"
        | "cancelled"
      payment_method: "esewa" | "khalti" | "bank_transfer" | "cash"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      registration_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "hospital", "pathology_lab", "user"],
      appointment_mode: ["online", "physical"],
      appointment_status: [
        "scheduled",
        "completed",
        "cancelled",
        "rescheduled",
      ],
      doctor_specialization: [
        "general",
        "cardiologist",
        "dermatologist",
        "neurologist",
        "pediatrician",
        "psychiatrist",
        "orthopedic",
        "gynecologist",
      ],
      institution_type: ["hospital", "pathology_lab"],
      lab_test_status: [
        "booked",
        "sample_collected",
        "processing",
        "completed",
        "cancelled",
      ],
      payment_method: ["esewa", "khalti", "bank_transfer", "cash"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      registration_status: ["pending", "approved", "rejected"],
    },
  },
} as const
