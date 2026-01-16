
import React from 'react';
import { MOCK_DONATIONS } from '../data';
import { Bell, AlertCircle, Clock, MapPin, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const Notifications: React.FC = () => {
  const urgentDonations = MOCK_DONATIONS.filter(d => (d.expiryTime - Date.now()) < 1000 * 60 * 60 * 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 p-3 rounded-2xl text-white animate-pulse">
            <Bell size={28} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Rescue Hub</h1>
        </div>
        <button className="text-slate-400 hover:text-slate-600 font-bold text-sm">Mark all as read</button>
      </div>

      <div className="space-y-6">
        {urgentDonations.length > 0 ? (
          urgentDonations.map(d => (
            <Link 
              to="/map" 
              key={d.id} 
              className="block bg-white border border-red-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  URGENT RESCUE
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-red-50 p-6 rounded-3xl text-red-600 flex items-center justify-center">
                   <Zap size={40} className="fill-current" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">
                      {d.quantity} Packs expiring soon!
                    </h3>
                    <p className="text-slate-500 font-medium">Posted by <span className="text-slate-900 font-bold">{d.donorName}</span> in {d.location.label}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-slate-600 text-sm font-bold border border-slate-100">
                      <Clock size={16} className="text-orange-500" />
                      Expires in: <CountdownTimer expiryTimestamp={d.expiryTime} />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-slate-600 text-sm font-bold border border-slate-100">
                      <MapPin size={16} className="text-emerald-500" />
                      {d.location.label}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-emerald-600 font-black group-hover:gap-4 transition-all">
                    Start Rescue Mission
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Bell size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-700">All Quiet for Now</h2>
            <p className="text-slate-400 max-w-xs mx-auto mt-2">No urgent rescues needed. Check the live map for standard donations.</p>
            <Link to="/map" className="mt-8 inline-block px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl">View Live Map</Link>
          </div>
        )}

        <div className="bg-slate-100 p-8 rounded-[2rem] border border-slate-200">
           <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
             <AlertCircle size={18} />
             System Updates
           </h4>
           <div className="space-y-4">
             <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
               <div>
                 <p className="text-sm font-bold text-slate-900">Route Optimization Improved</p>
                 <p className="text-xs text-slate-500">Our new algorithm saves 15% more fuel for volunteer drivers.</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>
                 <p className="text-sm font-bold text-slate-900">New Shelter Onboarded</p>
                 <p className="text-xs text-slate-500">Welcome "Grace Children's Home" to the network.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
