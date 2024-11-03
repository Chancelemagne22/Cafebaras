import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL; // Ensure this variable is defined in your .env
const supabaseKey = process.env.SUPABASE_KEY; // Ensure this variable is defined in your .env
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; // Exporting supabase correctly
