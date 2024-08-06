import { Stack, type StackProps } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';

export function FitParentLayout(props: StackProps) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setHeight(containerRef.current.parentElement?.clientHeight || 0);
    setWidth(containerRef.current.parentElement?.clientWidth || 0);
    window.addEventListener('resize', () => {
      setHeight(containerRef.current?.parentElement?.clientHeight || 0);
      setWidth(containerRef.current?.parentElement?.clientWidth || 0);
    });
  }, [containerRef.current]);

  return <Stack ref={containerRef} height={height} width={width} {...props} />;
}
