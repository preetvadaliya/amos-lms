import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useField, useFormikContext } from 'formik';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import type React from 'react';

type TextInputProps = {
  fieldName: string;
  submitOnEnter?: boolean;
};

export function TextInput(props: TextInputProps & TextFieldProps) {
  const { fieldName, submitOnEnter, InputProps, type, ...rest } = props;
  const [field, meta] = useField(fieldName);
  const { setFieldValue, submitForm } = useFormikContext();
  const [fieldType, setFieldType] = useState<React.HTMLInputTypeAttribute | undefined>(type);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFieldValue(fieldName, event.target.value),
    [setFieldValue, fieldName]
  );

  const handleKeyPress = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (submitOnEnter && event.key === 'Enter') await submitForm();
    },
    [submitOnEnter, submitForm]
  );

  const togglePasswordVisibility = useCallback(() => {
    setFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }, []);

  const endAdornment = useMemo(() => {
    if (type === 'password') {
      return (
        <InputAdornment position='end'>
          <IconButton onClick={togglePasswordVisibility}>
            {fieldType === 'password' ? <IconEye /> : <IconEyeClosed />}
          </IconButton>
        </InputAdornment>
      );
    }
    return null;
  }, [type, fieldType, togglePasswordVisibility]);

  return (
    <TextField
      {...field}
      {...rest}
      type={fieldType}
      helperText={meta.touched && meta.error ? meta.error : ''}
      error={meta.touched && Boolean(meta.error)}
      value={field.value ?? ''}
      onChange={onChange}
      onKeyDown={handleKeyPress}
      InputProps={{
        ...InputProps,
        endAdornment
      }}
    />
  );
}
