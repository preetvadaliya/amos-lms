import type { SupabaseClient, User as UserType } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const Supabase = atom<SupabaseClient | null>(null);
export const User = atom<UserType | null>(null);
