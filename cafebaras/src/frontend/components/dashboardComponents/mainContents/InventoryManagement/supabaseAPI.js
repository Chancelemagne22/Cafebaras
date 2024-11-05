import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Accessing VITE environment variables
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Accessing VITE environment variables
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
