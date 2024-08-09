import { Breadcrumbs, type BreadcrumbsProps, Chip, Stack, useTheme } from '@mui/material';
import { type Icon, IconChevronRight, type IconProps } from '@tabler/icons-react';
import {} from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

interface CrumbItem {
  crumbIcon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  crumbLabel: string;
}

export function Breadcrumb(props: BreadcrumbsProps) {
  const { ...rest } = props;
  const { pathname: cPath } = useLocation();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const paths = useMatches();

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      p={1}
      minHeight={48}
      sx={{ borderBottom: `solid 1px ${palette.divider}` }}
    >
      <Breadcrumbs maxItems={2} separator={<IconChevronRight size={20} />} {...rest}>
        {paths.map((path) => {
          const { pathname, handle } = path;
          const { crumbIcon: Icon, crumbLabel } = handle as CrumbItem;
          return (
            <Chip
              key={pathname}
              label={crumbLabel}
              size='small'
              icon={<Icon size={16} />}
              onClick={() => navigate(pathname)}
              color={pathname === cPath ? 'primary' : 'default'}
            />
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
