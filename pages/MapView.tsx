
import React, { useState } from 'react';
import MapVisualization from '../components/MapVisualization';
import { MOCK_DONATIONS, MOCK_RECIPIENTS } from '../data';
import { Donation, Recipient } from '../types';
import { Truck, Timer, ChevronRight, CheckCircle, Info } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

const MapView: React.FC = () => {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [routeActive, setRouteActive] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);

  const handleClaim = () => {
    // Assign a default recipient if none selected
    if (!selectedRecipient) setSelectedRecipient(MOCK_RECIPIENTS[0]);
    setRouteActive(true);
    setIsDelivering(true);
  };

  const activeRouteCoords = (routeActive && selectedDonation && selectedRecipient) 
    ? { from: selectedDonation.location, to: selectedRecipient.location } 
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Food Rescue Map</h1>
          <p className="text-slate-500 font-medium">Click on a green pin to start a delivery mission.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-sm">
             {MOCK_DONATIONS.length} Active Donations
           </div>
           <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl font-bold text-sm">
             {MOCK_RECIPIENTS.length} Shelters waiting
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        {/* Sidebar Info/Selection */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {!selectedDonation ? (
            <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center text-center justify-center min-h-[400px]">
              <div className="bg-slate-200 p-4 rounded-full mb-4">
                <Info size={32} className="text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-700 mb-2">No selection</h3>
              <p className="text-sm text-slate-400">Select a donation on the map to see details and start a route.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6 animate-in fade-in slide-in-from-left duration-300">
               <div className="flex justify-between items-start">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded">AVAILABLE</span>
                  <CountdownTimer expiryTimestamp={selectedDonation.expiryTime} />
               </div>
               
               <div>
                 <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">
                   {selectedDonation.quantity} Packs from {selectedDonation.donorName}
                 </h2>
                 <p className="text-slate-500 text-sm leading-relaxed">{selectedDonation.description}</p>
               </div>

               <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <Truck size={18} className="text-emerald-500" />
                    <span>Pickup: {selectedDonation.pickupTime}</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <Timer size={18} className="text-emerald-500" />
                    <span>Est. Travel: 12-15 mins</span>
                 </div>
               </div>

               {isDelivering ? (
                 <div className="p-4 bg-emerald-600 rounded-2xl text-white space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                       <CheckCircle size={18} />
                       Mission Active!
                    </div>
                    <p className="text-xs opacity-90">Please head to {selectedDonation.donorName} service entrance.</p>
                    <button 
                      onClick={() => {
                        setRouteActive(false);
                        setIsDelivering(false);
                        setSelectedDonation(null);
                      }}
                      className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold mt-2"
                    >
                      Complete Delivery
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={handleClaim}
                   className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group transition-all"
                 >
                   Accept Delivery Mission
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               )}
            </div>
          )}

          {routeActive && selectedRecipient && (
             <div className="bg-orange-50 p-6 rounded-3xl border border-orange-200 space-y-3 animate-in fade-in duration-500">
                <h4 className="font-black text-orange-700 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                   Recipient Detail
                </h4>
                <div className="space-y-1">
                   <p className="font-bold text-slate-900">{selectedRecipient.name}</p>
                   <p className="text-xs text-orange-600 uppercase font-black">{selectedRecipient.type}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100 flex justify-between items-center">
                   <span className="text-xs font-bold text-slate-500">Needed</span>
                   <span className="text-lg font-black text-orange-600">{selectedRecipient.neededPacks} Packs</span>
                </div>
             </div>
          )}
        </div>

        {/* Main Map */}
        <div className="lg:col-span-3">
          <MapVisualization 
            onSelectDonation={(d) => {
              if (!isDelivering) setSelectedDonation(d);
            }} 
            activeRoute={activeRouteCoords}
          />
        </div>
      </div>
    </div>
  );
};

export default MapView;
