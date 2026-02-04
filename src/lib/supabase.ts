import { createClient } from '@supabase/supabase-js'

// Use Vite's way of accessing environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail-safe check: Makes debugging your .env much easier
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Error: Supabase environment variables are missing. " +
    "Check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set."
  )
}

// Create the single supabase instance to be used across the entire app
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
)
