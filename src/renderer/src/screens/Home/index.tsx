import HomeImage from '@renderer/assets/home.png';
import { FitParentLayout } from '@renderer/components';
import { useTitle } from '@renderer/hooks';

export function Home() {
  useTitle('Home');
  return (
    <FitParentLayout direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <img src={HomeImage} alt={'Home'} width={450} height={'auto'} />
    </FitParentLayout>
  );
}
