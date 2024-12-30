import React from 'react';

interface BirdProps {
  position: number;
  rotation: number;
}

export function Bird({ position, rotation }: BirdProps) {
  return (
    <div
      className="absolute w-8 h-8 bg-yellow-400 rounded-full"
      style={{
        top: `${position}px`,
        left: '100px',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      {/* Bird's eye */}
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-1">
        <div className="absolute w-1 h-1 bg-black rounded-full top-0.5 right-0.5" />
      </div>
      {/* Bird's beak */}
      <div className="absolute w-4 h-2 bg-orange-500 rounded-r-lg top-3 -right-2" />
    </div>
  );
}