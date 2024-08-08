import { Button, Divider, Grid, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { SubmitButton, TextInput } from '@renderer/components';
import { useSupabase, useTitle } from '@renderer/hooks';
import type { PostgrestError } from '@supabase/supabase-js';
import {
  IconAt,
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconFingerprint
} from '@tabler/icons-react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

interface LogInFormValues {
  email: string;
  password: string;
}

export function LogIn() {
  useTitle('LogIn');
  const navigate = useNavigate();
  const supabase = useSupabase();
  const { enqueueSnackbar } = useSnackbar();

  const onLogIn = async (values: LogInFormValues) => {
    const { email, password } = values;
    if (!supabase) {
      enqueueSnackbar('Supabase client is not initialized', { variant: 'error' });
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  };

  const onLogInWithGithub = async () => {
    if (!supabase) {
      enqueueSnackbar('Supabase client is not initialized', { variant: 'error' });
      return;
    }
    try {
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: window.location.origin }
      });
      console.log(data);
      if (error) throw error;
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  };

  return (
    <Stack direction={'column'} spacing={2}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
        <Typography variant={'h5'}>Log In</Typography>
        <Typography variant={'body2'}>Log in to your account</Typography>
      </Stack>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={object({
          email: string().email('Invalid email').required('Email is required'),
          password: string().required('Password is required')
        })}
        onSubmit={onLogIn}
        validateOnBlur={true}
        validateOnChange={true}
      >
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={12}>
            <TextInput
              fieldName={'email'}
              label={'Email'}
              type={'email'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconAt size={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <TextInput
              fieldName={'password'}
              label={'Password'}
              type={'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconFingerprint size={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item={true} xs={12} display={'flex'}>
            <Link
              variant='caption'
              marginLeft={'auto !important'}
              component={'button'}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item={true} xs={12} display={'flex'}>
            <SubmitButton
              variant={'text'}
              textButtonProps={{ variant: 'contained', sx: { width: '50%', marginX: 'auto' } }}
            >
              Log In
            </SubmitButton>
          </Grid>
        </Grid>
      </Formik>
      <Divider orientation={'horizontal'} variant={'middle'} flexItem={true}>
        <Typography variant={'body2'}>Continue with</Typography>
      </Divider>
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2}>
        <Button
          variant={'contained'}
          fullWidth={true}
          color={'google'}
          startIcon={<IconBrandGoogleFilled size={20} />}
        >
          LogIn with Google
        </Button>
        <Button
          variant={'contained'}
          fullWidth={true}
          color={'github'}
          startIcon={<IconBrandGithubFilled size={20} />}
          onClick={onLogInWithGithub}
        >
          LogIn with GitHub
        </Button>
      </Stack>
    </Stack>
  );
}
