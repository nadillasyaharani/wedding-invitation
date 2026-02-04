
import { createClient } from '@supabase/supabase-js';

/**
 * For local development, you can use the hardcoded strings.
 * For production (Vercel), please set these in your dashboard:
 * VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 */
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgyshqfmmhpjxtpdbuud.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_cRomJ33DkUWxLzzn2t_EtQ_zGAj2eFh';

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
