import { LoadingButton, type LoadingButtonProps } from '@mui/lab';
import {
  CircularProgress,
  type CircularProgressProps,
  IconButton,
  type IconButtonProps
} from '@mui/material';
import { useFormikContext } from 'formik';
import type React from 'react';

type SubmitButtonProps = {
  children: React.ReactNode;
  variant: 'text' | 'icon';
  textButtonProps?: LoadingButtonProps;
  iconButtonProps?: IconButtonProps;
  progressProps?: CircularProgressProps;
  afterSubmit?: () => void;
};

export function SubmitButton(props: SubmitButtonProps) {
  const { variant, textButtonProps, iconButtonProps, progressProps, afterSubmit, children } = props;
  const { submitForm, setSubmitting, isSubmitting } = useFormikContext();
  const handleClick = async () => {
    setSubmitting(true);
    await submitForm();
    setSubmitting(false);
    afterSubmit?.();
  };
  if (variant === 'icon') {
    return (
      <IconButton {...iconButtonProps} onClick={handleClick}>
        {isSubmitting ? <CircularProgress {...progressProps} /> : children}
      </IconButton>
    );
  }
  // If the button is not an icon button, it will be a LoadingButton.
  // LoadingButton is a button that shows a loading indicator when it's in a loading state.
  return (
    <LoadingButton
      variant='contained'
      {...textButtonProps}
      onClick={handleClick}
      loading={isSubmitting}
    >
      {children}
    </LoadingButton>
  );
}
