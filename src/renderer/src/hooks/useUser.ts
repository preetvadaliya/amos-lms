import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useSupabase } from './useSupabase';

export const useUser = () => {
  const supabase = useSupabase();
  const [isGettingUser, setIsGettingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(data.session?.user ?? null);
        setSession(data.session);
      } catch (error) {
        console.error('useUser', error);
      } finally {
        setIsGettingUser(false);
      }
    };
    getUser();
    const { data } = supabase.auth.onAuthStateChange(async (event, _) => {
      if (event === 'SIGNED_OUT') setUser(null);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return { isGettingUser, user, session };
};
