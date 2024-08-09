import {
  type CSSObject,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  type Theme,
  Tooltip,
  useTheme
} from '@mui/material';
import { type Icon, IconChevronLeft, IconChevronRight, type IconProps } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type NavigationItem = {
  label: string;
  value: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

type NavigationRailProps = {
  items: NavigationItem[];
  index: number;
};

export function NavigationRail(props: NavigationRailProps) {
  const { items, index } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const openMixin = (theme: Theme): CSSObject => ({
    width: 160,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  });
  const closeMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  });
  return (
    <Drawer
      variant={'permanent'}
      open={open}
      PaperProps={{
        sx: {
          position: 'unset',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          paddingBottom: 2
        }
      }}
      sx={{
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
          ...openMixin(theme),
          '& .MuiDrawer-paper': openMixin(theme)
        }),
        ...(!open && {
          ...closeMixin(theme),
          '& .MuiDrawer-paper': closeMixin(theme)
        })
      }}
    >
      <List disablePadding={true}>
        {items.map((item) => {
          const { value, label, icon: Icon } = item;
          const isSelected =
            pathname === '/' ? value === pathname : value.includes(pathname.split('/')?.[index]);
          return (
            <Tooltip title={!open ? label : ''} placement='right' key={value}>
              <ListItem key={value} disablePadding={true} sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    paddingX: 2,
                    borderRight: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
                    minHeight: 48
                  }}
                  onClick={() => navigate(value)}
                  selected={isSelected}
                >
                  <ListItemIcon
                    sx={{ paddingLeft: 0, paddingRight: open ? 2 : 0, justifyContent: 'center' }}
                  >
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ variant: 'body2' }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
      <Stack direction={'column'} alignSelf={'center'}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
        </IconButton>
      </Stack>
    </Drawer>
  );
}
