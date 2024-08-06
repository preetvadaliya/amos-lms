import type { SupabaseClient } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const Supabase = atom<SupabaseClient | null>(null);
