import { IconHome, IconUser } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useUser } from './hooks';
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
  const { isGettingUser, user } = useUser();
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
  }, []);

  useEffect(() => {
    if (isGettingUser) return;
    if (!user) router.navigate('/login');
  }, [isGettingUser, user]);

  if (isGettingUser)
    return <Loading primaryMessage='Please Wait...' secondaryMessage='Getting User Information' />;
  return <RouterProvider router={router} />;
}
