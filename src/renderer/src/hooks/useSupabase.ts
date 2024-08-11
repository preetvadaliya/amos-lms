import { Supabase } from '@renderer/helpers';
import { useAtomValue } from 'jotai';

export const useSupabase = () => {
  return useAtomValue(Supabase);
};
