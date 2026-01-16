
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import ImpactCounters from '../components/ImpactCounters';
import LiveFeed from '../components/LiveFeed';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 px-4 bg-gradient-mesh overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-bounce">
            <Heart size={16} className="fill-current" />
            100% Volunteer Powered
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Don't Waste. <span className="text-emerald-600 underline decoration-emerald-200">Share.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            SharePlate connects hotels and restaurants with excess food to orphanages and shelters in real-time. Together, we can end hunger and save the planet.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2"
            >
              I Have Food (Donor)
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/map" 
              className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 hover:scale-105 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2"
            >
              I Need Food (Recipient)
            </Link>
          </div>
        </div>
      </section>

      <LiveFeed />

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Real-time Impact</h2>
          <ImpactCounters />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="text-orange-500" size={32} />}
              title="Real-time Tracking"
              desc="Live countdowns ensure food reaches those in need while it's still fresh and safe."
            />
            <FeatureCard 
              icon={<Shield className="text-emerald-500" size={32} />}
              title="Safety First"
              desc="Every donation follows strict hygiene and temperature protocols verified by donors."
            />
            <FeatureCard 
              icon={<Users className="text-blue-500" size={32} />}
              title="Community Driven"
              desc="Verified volunteers and NGOs work together to bridge the last-mile gap."
            />
          </div>
        </div>
      </section>

      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
              <Heart fill="currentColor" size={20} />
            </div>
            <span className="text-xl font-bold text-white">SharePlate</span>
          </div>
          <p>© 2025 SharePlate Network. For a Zero-Waste World.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-500">Privacy</a>
            <a href="#" className="hover:text-emerald-500">Terms</a>
            <a href="#" className="hover:text-emerald-500">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 transition-colors shadow-sm">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
