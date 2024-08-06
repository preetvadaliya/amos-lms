import { Button, Divider, Grid, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { SubmitButton, TextInput } from '@renderer/components';
import { useSupabase, useTitle } from '@renderer/hooks';
import type { PostgrestError } from '@supabase/supabase-js';
import { IconAt, IconBrandGithub, IconFingerprint } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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
    console.log('values:', values);
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

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
      })}
      validateOnBlur={true}
      validateOnChange={true}
      enableReinitialize={true}
      onSubmit={onLogIn}
    >
      <Form>
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={12}>
            <Stack direction={'column'} spacing={0.5}>
              <Typography variant='h5' textAlign={'center'}>
                LogIn
              </Typography>
              <Typography variant='body1' textAlign={'center'}>
                Login to your account
              </Typography>
            </Stack>
          </Grid>
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
              submitOnEnter={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconFingerprint size={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item={true} xs={12} display={'flex'} justifyContent={'flex-end'}>
            <Link
              variant={'caption'}
              component={'button'}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item={true} xs={6} marginX={'auto'}>
            <SubmitButton
              variant='text'
              textButtonProps={{ variant: 'contained', fullWidth: true }}
            >
              Log In
            </SubmitButton>
          </Grid>
          <Grid item={true} xs={12} marginX={'auto'}>
            <Divider orientation='horizontal' variant='middle' flexItem={true}>
              <Typography variant='body2' textAlign={'center'}>
                Continue with
              </Typography>
            </Divider>
          </Grid>
          <Grid item={true} xs={6} marginX={'auto'}>
            <Button
              variant='contained'
              fullWidth={true}
              startIcon={<IconBrandGithub size={20} />}
              color='github'
              onClick={() => {
                if (!supabase) {
                  enqueueSnackbar('Supabase client is not initialized', { variant: 'error' });
                  return;
                }
                supabase.auth.signInWithOAuth({ provider: 'github' });
              }}
            >
              Login with GitHub
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
