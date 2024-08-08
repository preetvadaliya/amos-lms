import { User } from '@renderer/helpers';
import { useAtomValue } from 'jotai';

export const useUser = () => {
  return useAtomValue(User);
};
