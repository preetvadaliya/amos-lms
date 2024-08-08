import { Divider, Stack } from '@mui/material';
import LogInImage from '@renderer/assets/login.png';
import { FitParentLayout } from '@renderer/components';
import { useUser } from '@renderer/hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  return (
    <FitParentLayout direction={'row'} alignItems={'center'} justifyContent={'center'}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} flex={1} px={16}>
        <img src={LogInImage} alt='' style={{ width: '100%', height: 'auto' }} />
      </Stack>
      <Divider orientation={'vertical'} sx={{ maxHeight: '50%' }} />
      <Stack flex={1} px={16}>
        <Outlet />
      </Stack>
    </FitParentLayout>
  );
}
