import { Typography } from '@mui/material';
import LoadingAnimation from '@renderer/assets/loading.webm';
import { FitParentLayout } from '@renderer/components';

interface LoadingProps {
  primaryMessage?: string;
  secondaryMessage?: string;
}

export function Loading(props: LoadingProps) {
  const { primaryMessage, secondaryMessage } = props;
  return (
    <FitParentLayout
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
    >
      <video autoPlay={true} loop={true} muted={true} style={{ maxWidth: 440 }}>
        <source src={LoadingAnimation} type='video/webm' />
      </video>
      {primaryMessage && <Typography variant='h6'>{primaryMessage}</Typography>}
      {secondaryMessage && <Typography variant='body2'>{secondaryMessage}</Typography>}
    </FitParentLayout>
  );
}
