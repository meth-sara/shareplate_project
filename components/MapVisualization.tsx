
import React, { useState } from 'react';
import { MapPin, Navigation, Truck, User } from 'lucide-react';
import { MOCK_DONATIONS, MOCK_RECIPIENTS } from '../data';
import { Donation } from '../types';

interface MapVisualizationProps {
  onSelectDonation?: (d: Donation) => void;
  activeRoute?: { from: {x:number, y:number}, to: {x:number, y:number} };
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ onSelectDonation, activeRoute }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Simple coordinate conversion for the SVG viewbox 0 0 100 100
  return (
    <div className="relative w-full aspect-square md:aspect-[16/9] bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200">
      <svg viewBox="0 0 100 100" className="w-full h-full p-4">
        {/* Abstract Map Background Grids */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Abstract "Streets" */}
        <path d="M 0 50 L 100 50 M 50 0 L 50 100 M 0 20 L 100 20 M 20 0 L 20 100" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Route Visualization */}
        {activeRoute && (
          <>
            <path 
              d={`M ${activeRoute.from.x} ${activeRoute.from.y} Q 50 50 ${activeRoute.to.x} ${activeRoute.to.y}`} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            <circle r="2" fill="#10b981">
              <animateMotion 
                path={`M ${activeRoute.from.x} ${activeRoute.from.y} Q 50 50 ${activeRoute.to.x} ${activeRoute.to.y}`}
                dur="3s" 
                repeatCount="indefinite" 
              />
            </circle>
          </>
        )}

        {/* Recipient Pins (Orange) */}
        {MOCK_RECIPIENTS.map(r => (
          <g 
            key={r.id} 
            transform={`translate(${r.location.x}, ${r.location.y})`}
            className="cursor-help"
            onMouseEnter={() => setHovered(r.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle r="4" className="fill-orange-500/20 animate-ping" />
            <circle r="2.5" className="fill-orange-500" />
            {hovered === r.id && (
              <g transform="translate(0, -6)">
                <rect x="-15" y="-12" width="30" height="10" rx="2" fill="#0f172a" />
                <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">{r.name}</text>
              </g>
            )}
          </g>
        ))}

        {/* Donation Pins (Green) */}
        {MOCK_DONATIONS.map(d => (
          <g 
            key={d.id} 
            transform={`translate(${d.location.x}, ${d.location.y})`}
            className="cursor-pointer group"
            onClick={() => onSelectDonation?.(d)}
            onMouseEnter={() => setHovered(d.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle r="3.5" className="fill-emerald-500 transition-all group-hover:r-5" />
            <circle r="2" className="fill-white" />
            {hovered === d.id && (
              <g transform="translate(0, -8)">
                <rect x="-20" y="-14" width="40" height="12" rx="2" fill="#10b981" />
                <text x="0" y="-6" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">{d.donorName}</text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Floating Legend */}
      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-slate-200 text-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="font-bold text-slate-700">Available Food</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="font-bold text-slate-700">Needs Help</span>
        </div>
        <div className="flex items-center gap-2">
          <Navigation size={12} className="text-blue-500" />
          <span className="font-bold text-slate-700">Your Location</span>
        </div>
      </div>

      {/* User Location Simulated Marker */}
      <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-blue-600 p-1.5 rounded-full text-white shadow-lg border-2 border-white">
          <User size={16} />
        </div>
        <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm mt-1">You</span>
      </div>
    </div>
  );
};

export default MapVisualization;
