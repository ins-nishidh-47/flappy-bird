import React from 'react';

interface Cloud {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  speed: number;
}

export function SkyBackground() {
  const [clouds, setClouds] = React.useState<Cloud[]>(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: Math.random() * 150 + 100,
      height: Math.random() * 60 + 40,
      top: Math.random() * 60,
      left: Math.random() * 100,
      speed: Math.random() * 0.02 + 0.01,
    }))
  );

  React.useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => ({
          ...cloud,
          left: cloud.left - cloud.speed < -20 
            ? 100 
            : cloud.left - cloud.speed,
        }))
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bg-white rounded-full opacity-50 transition-transform"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
          }}
        />
      ))}
    </div>
  );
}