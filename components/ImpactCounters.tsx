
import React, { useEffect, useState } from 'react';

interface CounterProps {
  label: string;
  target: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ label, target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <span className="text-4xl font-bold text-emerald-600 mb-1">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-slate-500 font-medium text-sm text-center uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

const ImpactCounters: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
      <Counter label="Meals Saved" target={45230} />
      <Counter label="CO2 Prevented" target={1250} suffix=" kg" />
      <Counter label="Non-profits Served" target={128} />
    </div>
  );
};

export default ImpactCounters;
