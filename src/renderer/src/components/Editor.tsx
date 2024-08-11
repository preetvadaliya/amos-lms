import EditorJS from '@editorjs/editorjs';
import { Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useLayoutEffect, useRef, useState } from 'react';

export function Editor() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<EditorJS | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (editor) return;
    const newEditor = new EditorJS({
      holder: containerRef.current,
      tools: {},
      async onChange(api, event) {
        const data = await api.saver.save();
        console.log(data, event);
      }
    });
    setEditor(newEditor);
  }, [editor, containerRef.current]);

  return <Stack ref={containerRef} component={Paper} variant='outlined' bgcolor={'#FFF'} />;
}
