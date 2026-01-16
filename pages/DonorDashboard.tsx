
import React, { useState } from 'react';
import { Utensils, Package, Calendar, MapPin, Plus, CheckCircle2 } from 'lucide-react';
import SafetyChecklist from '../components/SafetyChecklist';
import { MOCK_DONATIONS } from '../data';
import CountdownTimer from '../components/CountdownTimer';

const DonorDashboard: React.FC = () => {
  const [safetyChecked, setSafetyChecked] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    foodType: 'Veg',
    quantity: 10,
    pickupTime: 'Immediate',
    expiryHours: 3,
    description: ''
  });

  const handleSafetyToggle = (id: string) => {
    setSafetyChecked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isFormValid = safetyChecked.length === 3 && formData.description.length > 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Post Donation Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Post New Donation</h2>
                <p className="opacity-80">Make sure the details are accurate for volunteers.</p>
              </div>
              <Plus size={32} />
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Food Type</label>
                  <div className="flex gap-4">
                    {['Veg', 'Non-veg', 'Bakery'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, foodType: type})}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                          formData.foodType === type 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                            : 'border-slate-100 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Quantity (Packs)</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Details & Description</label>
                <textarea
                  placeholder="E.g., 50 packs of vegetable curry and steamed rice. Pick up from service entrance."
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Best Before (Hours)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" min="1" max="12" 
                      value={formData.expiryHours}
                      onChange={(e) => setFormData({...formData, expiryHours: parseInt(e.target.value)})}
                      className="flex-1 accent-emerald-600"
                    />
                    <span className="font-bold text-emerald-600 min-w-[3rem]">{formData.expiryHours}h</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Window</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select 
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                    >
                      <option>Immediate</option>
                      <option>In 30 mins</option>
                      <option>After 6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <SafetyChecklist 
                checkedItems={safetyChecked} 
                onChange={handleSafetyToggle} 
              />

              <button
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isFormValid 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : success ? (
                  <>
                    <CheckCircle2 size={24} />
                    Success! Posted
                  </>
                ) : (
                  'Confirm & Post Donation'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Active Donations Sidebar */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Utensils size={20} className="text-emerald-600" />
            Your Live Posts
          </h3>
          {MOCK_DONATIONS.map(donation => (
            <div key={donation.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
               <div className="flex justify-between items-start mb-3">
                 <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                   donation.foodType === 'Veg' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                 }`}>
                   {donation.foodType}
                 </span>
                 <CountdownTimer expiryTimestamp={donation.expiryTime} />
               </div>
               <h4 className="font-bold text-slate-900 mb-1">{donation.quantity} Food Packs</h4>
               <p className="text-sm text-slate-500 line-clamp-2 mb-4">{donation.description}</p>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <MapPin size={14} />
                 {donation.location.label}
               </div>
               
               <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
                 <button className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100">Details</button>
                 <button className="px-3 py-2 bg-slate-50 text-slate-400 rounded-lg text-xs font-bold hover:text-red-500">Cancel</button>
               </div>
            </div>
          ))}
          <div className="p-6 bg-slate-900 rounded-3xl text-white">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-sm text-slate-400 mb-4">Our logistics team is available 24/7 to help with complex pickups.</p>
            <button className="text-emerald-400 font-bold text-sm flex items-center gap-2 hover:underline">
              Contact Logistics Hub <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

export default DonorDashboard;
