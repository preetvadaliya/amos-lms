import { Divider } from '@mui/material';
import HomeImage from '@renderer/assets/home.png';
import {
  AppBar,
  Breadcrumb,
  FitParentLayout,
  type NavigationItem,
  NavigationRail
} from '@renderer/components';
import { useTitle, useUser } from '@renderer/hooks';
import { IconHome } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

export function HomeLayout() {
  useTitle('Home');
  const Outlet = useOutlet();
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { 'replace': true });
    }
  }, [user]);

  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      value: '/',
      icon: IconHome
    }
  ];

  return (
    <FitParentLayout direction={'column'}>
      <AppBar />
      <Divider orientation={'horizontal'} />
      <FitParentLayout direction={'row'}>
        <NavigationRail items={navigationItems} index={0} />
        <FitParentLayout direction={'column'} flex={1} overflow={'auto'}>
          <Breadcrumb />
          {Outlet ? (
            <FitParentLayout>{Outlet}</FitParentLayout>
          ) : (
            <FitParentLayout direction={'column'} justifyContent={'center'} alignItems={'center'}>
              <img src={HomeImage} alt={'Home'} width={450} height={'auto'} />
            </FitParentLayout>
          )}
        </FitParentLayout>
      </FitParentLayout>
    </FitParentLayout>
  );
}
