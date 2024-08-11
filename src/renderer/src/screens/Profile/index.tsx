import { Button, Divider } from '@mui/material';
import { FitParentLayout } from '@renderer/components';
import { useSupabase, useUser } from '@renderer/hooks';
import type { PostgrestError, UserIdentity } from '@supabase/supabase-js';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import { useSnackbar } from 'notistack';
import {} from 'octokit';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Profile() {
  const supabase = useSupabase();
  const { uId = '' } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const [identities, setIdentities] = useState<UserIdentity[]>([]);

  useEffect(() => {
    const getIdentities = async () => {
      try {
        const { data, error } = await supabase.auth.getUserIdentities();
        if (error) throw error;
        setIdentities(data?.identities ?? []);
      } catch (error) {
        enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
      }
    };
    getIdentities();
    return () => setIdentities([]);
  }, []);

  const onUnLinkToGitHub = useCallback(async () => {
    if (user?.id !== uId) return;
    try {
      const identity = identities.find((i) => i.provider === 'github');
      if (!identity) throw new Error('GitHub identity not found');
      const { error } = await supabase.auth.unlinkIdentity(identity);
      if (error) throw error;
      enqueueSnackbar('Unlink to GitHub successful', { variant: 'success' });
      setIdentities(identities.filter((i) => i.provider !== 'github'));
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  }, [uId, user, identities]);

  const onLinkToGitHub = useCallback(async () => {
    if (user?.id !== uId) return;
    try {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'github',
        options: { redirectTo: window.location.href }
      });
      if (error) throw error;
      enqueueSnackbar('Link to GitHub successful', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  }, [uId, user, identities]);

  return (
    <FitParentLayout direction={'row'} alignItems={'stretch'}>
      <FitParentLayout flex={2} direction={'column'} alignItems={'center'} p={2}>
        {/*  */}
      </FitParentLayout>
      <Divider orientation={'vertical'} flexItem={true} />
      <FitParentLayout flex={8} p={2} direction={'column'} alignItems={'flex-start'}>
        <Button
          variant='contained'
          color='github'
          size='small'
          onClick={async () => {
            if (identities.find((i) => i.provider === 'github')) {
              await onUnLinkToGitHub();
              console.log('unlink');
            } else {
              await onLinkToGitHub();
            }
          }}
          startIcon={<IconBrandGithubFilled size={16} />}
          disabled={user?.id !== uId}
        >
          {identities.find((i) => i.provider === 'github') ? 'Unlink' : 'Link'} to{' '}
          {identities.find((i) => i.provider === 'github')?.identity_data?.user_name ?? 'GitHub'}
        </Button>
      </FitParentLayout>
    </FitParentLayout>
  );
}
