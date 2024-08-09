import { Stack, type StackProps } from '@mui/material';

export function FitParentLayout(props: StackProps) {
  return <Stack flex={1} minHeight={0} overflow={'auto'} {...props} />;
}
