import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiEffectProps {
  duration?: number;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ 
  duration = 3000, 
  onComplete 
}) => {
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth,
    height: window.innerHeight 
  });
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setIsActive(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  if (!isActive) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={300}
      gravity={0.2}
    />
  );
};

export default ConfettiEffect; 