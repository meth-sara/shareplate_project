
import React from 'react';
import { MOCK_DONATIONS } from '../data';

const LiveFeed: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white py-3 overflow-hidden whitespace-nowrap border-y border-slate-800">
      <div className="flex animate-marquee space-x-12">
        {/* Doubled for seamless loop */}
        {[...MOCK_DONATIONS, ...MOCK_DONATIONS].map((d, i) => (
          <div key={`${d.id}-${i}`} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="font-bold text-emerald-400">{d.donorName}</span>
            <span className="text-slate-400">just donated {d.quantity} {d.foodType} packs</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveFeed;
