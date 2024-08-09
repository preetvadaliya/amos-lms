import { createClient } from '@supabase/supabase-js';
import { IconHome, IconUser } from '@tabler/icons-react';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Supabase, User } from './helpers';
import {
  AuthLayout,
  ForgotPassword,
  HomeLayout,
  Loading,
  LogIn,
  Profile,
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
        Component: HomeLayout,
        handle: {
          crumbIcon: IconHome,
          crumbLabel: 'Home'
        },
        children: [
          {
            path: 'user/:uId',
            Component: Profile,
            handle: {
              crumbIcon: IconUser,
              crumbLabel: 'Profile'
            }
          }
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
  }, [supabase]);

  useEffect(() => {
    if (supabase) return;
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL || '',
      process.env.VITE_SUPABASE_ANON_KEY || ''
    );
    setSupabase(supabaseClient);
    const { data } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user;
      setUser(user || null);
      if (!user && event === 'SIGNED_OUT') await router.navigate('/login', { replace: true });
    });
    setIsLoading(false);
    return () => {
      data.subscription.unsubscribe();
      setSupabase(null);
      setUser(null);
    };
  }, []);

  if (isLoading)
    return <Loading primaryMessage='Please Wait...' secondaryMessage='Getting User Information' />;
  return <RouterProvider router={router} />;
}
