import { useTitle } from '@renderer/hooks';

export function Home() {
  useTitle('Home');
  return <div>Home</div>;
}
