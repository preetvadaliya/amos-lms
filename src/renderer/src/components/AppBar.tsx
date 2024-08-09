import { Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useSupabase, useUser } from '@renderer/hooks';
import type { PostgrestError } from '@supabase/supabase-js';
import { IconArrowBack, IconArrowForward, IconLogout, IconUserFilled } from '@tabler/icons-react';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';

export function AppBar() {
  const supabase = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const onLogout = async () => {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      enqueueSnackbar('Logged out successfully', { variant: 'success' });
    } catch (error) {
      console.error('Failed to logout:', error);
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  };

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      maxHeight={80}
      px={2}
      py={1}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Stack direction={'row'} alignItems={'center'}>
          <Tooltip title={'Back'}>
            <IconButton onClick={() => navigate(-1)} disabled={!(location.key !== 'default')}>
              <IconArrowBack size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Forward'}>
            <IconButton onClick={() => navigate(1)}>
              <IconArrowForward size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Divider orientation='vertical' flexItem={true} />
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Typography variant='body1' fontWeight={500}>
            OSS
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Tooltip title={'Profile'}>
          <Button
            size='small'
            startIcon={<IconUserFilled size={16} />}
            onClick={() => navigate(`/user/${user?.id}`)}
          >
            <Typography variant='body2'>{user?.email}</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={'Logout'}>
          <IconButton color='error' onClick={onLogout}>
            <IconLogout size={20} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
