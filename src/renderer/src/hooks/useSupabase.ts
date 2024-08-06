import { Supabase } from '@renderer/helpers';
import { useAtomValue } from 'jotai';

export const useSupabase = () => {
  const supabase = useAtomValue(Supabase);
  return supabase;
};
