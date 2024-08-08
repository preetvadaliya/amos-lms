import { createClient } from '@supabase/supabase-js';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Supabase, User } from './helpers';
import {
  AuthLayout,
  Course,
  Dashboard,
  ForgotPassword,
  Home,
  Loading,
  LogIn,
  MainLayout,
  ResetPassword
} from './screens';

export function Router() {
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useAtom(Supabase);
  const setUser = useSetAtom(User);

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        Component: MainLayout,
        children: [
          { path: 'home', Component: Home, index: true },
          { path: 'my-course', Component: Course },
          { path: 'dashboard', Component: Dashboard }
        ]
      },
      {
        path: '/',
        Component: AuthLayout,
        children: [
          { path: 'login', Component: LogIn },
          { path: 'forgot-password', Component: ForgotPassword },
          { path: 'reset-password', Component: ResetPassword }
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    if (supabase) return;
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL || '',
      process.env.VITE_SUPABASE_ANON_KEY || ''
    );
    setSupabase(supabaseClient);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') await router.navigate('/login', { replace: true });
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        await router.navigate('/home', { replace: true });
      }
    });
    setIsLoading(false);
  }, [supabase]);

  if (isLoading)
    return <Loading primaryMessage='Please Wait...' secondaryMessage='Getting User Information' />;
  return <RouterProvider router={router} />;
}
