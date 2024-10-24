import React from 'react';

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 ${className}`} />
  );
}

export default Skeleton;
