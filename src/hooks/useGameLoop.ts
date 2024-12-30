import { useEffect, useRef } from 'react';

export function useGameLoop(callback: () => void, isRunning: boolean) {
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isRunning) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      return;
    }

    function loop() {
      callback();
      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [callback, isRunning]);
}