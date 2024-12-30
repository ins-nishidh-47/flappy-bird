import React from 'react';

interface PipeProps {
  height: number;
  position: number;
  isTop?: boolean;
}

export function Pipe({ height, position, isTop = false }: PipeProps) {
  return (
    <div
      className="absolute w-16 bg-green-500 border-4 border-green-700"
      style={{
        height: `${height}px`,
        left: `${position}px`,
        top: isTop ? 0 : 'auto',
        bottom: isTop ? 'auto' : 0,
      }}
    >
      <div className={`absolute left-1/2 -translate-x-1/2 w-20 h-8 bg-green-500 border-4 border-green-700 ${isTop ? 'bottom-0' : 'top-0'}`} />
    </div>
  );
}