import { useRef } from 'react';

export default function useRenderCount() {
  const renders = useRef(0);
  console.log(`Renders: ${(renders.current += 1)}`);
}
