import { Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { SubmitButton, TextInput } from '@renderer/components';
import { useSupabase, useTitle } from '@renderer/hooks';
import type { PostgrestError } from '@supabase/supabase-js';
import { IconAt } from '@tabler/icons-react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

interface ForgotPasswordFormValues {
  email: string;
}

export function ForgotPassword() {
  useTitle('Forgot Password');
  const navigate = useNavigate();
  const supabase = useSupabase();
  const { enqueueSnackbar } = useSnackbar();

  const onForgotPassword = async (values: ForgotPasswordFormValues) => {
    const { email } = values;
    if (!supabase) {
      enqueueSnackbar('Supabase client is not initialized', { variant: 'error' });
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
      enqueueSnackbar('Password reset link sent successfully', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  };

  return (
    <Stack direction={'column'} spacing={2}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
        <Typography variant={'h5'}>Forgot Password</Typography>
        <Typography variant={'body2'} textAlign={'center'}>
          Enter your email address and we will send you a link to reset your password
        </Typography>
      </Stack>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={object({
          email: string().email('Invalid email').required('Email is required')
        })}
        onSubmit={onForgotPassword}
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
          <Grid item={true} xs={12} display={'flex'}>
            <SubmitButton
              variant={'text'}
              textButtonProps={{ variant: 'contained', sx: { width: '50%', marginX: 'auto' } }}
            >
              Send Reset Link
            </SubmitButton>
          </Grid>
        </Grid>
      </Formik>
    </Stack>
  );
}
