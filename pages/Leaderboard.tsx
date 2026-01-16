
import React from 'react';
import { MOCK_LEADERBOARD } from '../data';
import { Trophy, Medal, Star, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Leaderboard: React.FC = () => {
  const chartData = [
    { name: 'Mon', count: 120 },
    { name: 'Tue', count: 210 },
    { name: 'Wed', count: 180 },
    { name: 'Thu', count: 450 },
    { name: 'Fri', count: 320 },
    { name: 'Sat', count: 580 },
    { name: 'Sun', count: 620 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Ranking List */}
        <div className="lg:col-span-1 space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl text-white">
              <Trophy size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Top Saviors</h1>
          </div>

          <div className="space-y-4">
            {MOCK_LEADERBOARD.map((entry, idx) => (
              <div 
                key={entry.id} 
                className={`p-6 rounded-3xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${
                  idx === 0 ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-200' : 'bg-white border-slate-100 text-slate-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                  idx === 0 ? 'bg-white text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <img src={entry.avatar} alt={entry.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1">
                  <h3 className="font-black leading-none mb-1">{entry.name}</h3>
                  <p className={`text-xs font-bold uppercase ${idx === 0 ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {entry.badge}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xl font-black">{entry.mealsSaved.toLocaleString()}</span>
                  <span className={`text-[10px] font-bold uppercase ${idx === 0 ? 'text-emerald-200' : 'text-slate-400'}`}>Meals</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-yellow-400" fill="currentColor" size={20} />
              <h3 className="text-xl font-bold">Your Achievements</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BadgeCard icon={<Zap className="text-orange-400" />} label="Quick Responder" />
              <BadgeCard icon={<Target className="text-blue-400" />} label="Goal Getter" />
              <BadgeCard icon={<Medal className="text-emerald-400" />} label="First 100" />
              <div className="flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl h-24">
                <span className="text-slate-600 text-xs font-bold">Locked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Charts */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Weekly Saving Momentum</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.count > 500 ? '#10b981' : '#fb923c'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
              <h4 className="text-emerald-700 font-black uppercase text-xs tracking-widest mb-4">Community Milestone</h4>
              <p className="text-4xl font-black text-emerald-900 mb-2">94%</p>
              <p className="text-emerald-700/70 font-medium">Progress towards our monthly goal of 50,000 meals.</p>
              <div className="mt-6 h-3 bg-emerald-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-[94%] transition-all duration-1000"></div>
              </div>
            </div>

            <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100">
              <h4 className="text-orange-700 font-black uppercase text-xs tracking-widest mb-4">Avg Rescue Time</h4>
              <p className="text-4xl font-black text-orange-900 mb-2">24 mins</p>
              <p className="text-orange-700/70 font-medium">Average time from post to pickup by our volunteers.</p>
              <div className="mt-6 flex gap-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-8 flex-1 rounded-lg ${i <= 4 ? 'bg-orange-400' : 'bg-orange-200'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const BadgeCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center justify-center bg-slate-800 rounded-2xl h-24 p-2 text-center group hover:bg-slate-700 transition-colors cursor-help">
    <div className="mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{label}</span>
  </div>
);

export default Leaderboard;
