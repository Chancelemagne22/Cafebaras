export { default as ItemManagement } from './ItemManagement.jsx';
export { default as StockManagement } from './StockManagement.jsx';
export { default as SupplierManagement } from './SupplierManagement.jsx';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
