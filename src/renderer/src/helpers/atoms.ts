import { SupabaseClient, type User as UserType } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const Supabase = atom<SupabaseClient>(
  new SupabaseClient(process.env.VITE_SUPABASE_URL || '', process.env.VITE_SUPABASE_ANON_KEY || '')
);
export const User = atom<UserType | null>(null);
