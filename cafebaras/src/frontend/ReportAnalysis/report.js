export {default as Inventory} from './Inventory.jsx';
export {default as Transaction} from './Transaction.jsx';
export {default as SalesReport} from './SalesReport.jsx';
export {default as ProfitLoss} from './ProfitLoss.jsx'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;