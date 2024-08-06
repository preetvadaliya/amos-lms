import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    const mainTitle = 'OSS FAU';
    document.title = `OSS | ${title}`;
    return () => {
      document.title = mainTitle;
    };
  }, [title]);
};
