import { Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { SubmitButton, TextInput } from '@renderer/components';
import { useSupabase, useTitle } from '@renderer/hooks';
import type { PostgrestError } from '@supabase/supabase-js';
import { IconFingerprint } from '@tabler/icons-react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export function ResetPassword() {
  useTitle('Reset Password');
  const navigate = useNavigate();
  const supabase = useSupabase();
  const { enqueueSnackbar } = useSnackbar();

  const onResetPassword = async (values: ResetPasswordFormValues) => {
    const { password } = values;
    if (!supabase) {
      enqueueSnackbar('Supabase client is not initialized', { variant: 'error' });
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      if (error) throw error;
      enqueueSnackbar('Password reset successfully', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      enqueueSnackbar((error as PostgrestError).message, { variant: 'error' });
    }
  };

  return (
    <Stack direction={'column'} spacing={2}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
        <Typography variant={'h5'}>Reset Password</Typography>
        <Typography variant={'body2'}>Enter your new password to reset your password</Typography>
      </Stack>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={object({
          password: string().required(),
          confirmPassword: string()
            .oneOf([ref('password')])
            .required()
        })}
        onSubmit={onResetPassword}
        validateOnBlur={true}
        validateOnChange={true}
      >
        <Grid container={true} spacing={1}>
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
          <Grid item={true} xs={12}>
            <TextInput
              fieldName={'confirmPassword'}
              label={'Confirm Password'}
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
            <SubmitButton
              variant={'text'}
              textButtonProps={{ variant: 'contained', sx: { width: '50%', marginX: 'auto' } }}
            >
              Reset Password
            </SubmitButton>
          </Grid>
        </Grid>
      </Formik>
    </Stack>
  );
}
