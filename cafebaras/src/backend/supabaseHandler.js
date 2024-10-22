import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL; // Get from .env
const supabaseKey = process.env.SUPABASE_KEY; // Get from .env
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
