import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ مفاتيح Supabase غير موجودة!');
  console.error('تأكدي من وجود .env في المجلد الرئيسي');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('✅ تم تهيئة Supabase بنجاح');