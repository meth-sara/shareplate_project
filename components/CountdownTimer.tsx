
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  expiryTimestamp: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryTimestamp }) => {
  const calculateTimeLeft = () => {
    const difference = expiryTimestamp - Date.now();
    let timeLeft = {
      h: 0,
      m: 0,
      s: 0,
    };

    if (difference > 0) {
      timeLeft = {
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp]);

  const isCritical = expiryTimestamp - Date.now() < 1000 * 60 * 60; // < 1 hour

  return (
    <div className={`flex items-center gap-1.5 font-mono font-bold text-sm py-1 px-3 rounded-full ${
      isCritical ? 'bg-orange-100 text-orange-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'
    }`}>
      <Clock size={14} />
      {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
    </div>
  );
};

export default CountdownTimer;
