import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop: keyof SupabaseClient) {
    if (!_supabase) {
      const url = (import.meta as any).env.VITE_SUPABASE_URL;
      const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        throw new Error('Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      }
      _supabase = createClient(url, key);
    }
    return (_supabase as any)[prop];
  }
});

export type Testimonial = {
  id: string;
  name: string;
  event: string;
  text: string;
  rating: number;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  url: string;
  type: 'image' | 'video';
  category: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  created_at: string;
};
