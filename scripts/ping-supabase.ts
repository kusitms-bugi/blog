// scripts/ping-supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

async function pingSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or anon key not provided.');
    process.exit(1);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.from('comments').select('id').limit(1);

    if (error) {
      throw error;
    }

    console.log('Successfully pinged Supabase.');
  } catch (error) {
    console.error('Error pinging Supabase:', error);
    process.exit(1);
  }
}

pingSupabase();
