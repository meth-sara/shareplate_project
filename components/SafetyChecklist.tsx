
import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface SafetyChecklistProps {
  checkedItems: string[];
  onChange: (id: string) => void;
}

const SafetyChecklist: React.FC<SafetyChecklistProps> = ({ checkedItems, onChange }) => {
  const items = [
    { id: 'cooked', label: 'Food cooked within last 3 hours' },
    { id: 'hygiene', label: 'Hygienically packed in clean containers' },
    { id: 'temp', label: 'Stored at safe temperature until pickup' }
  ];

  return (
    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
      <div className="flex items-center gap-2 mb-4 text-emerald-700">
        <ShieldCheck size={20} />
        <h3 className="font-bold">Food Safety Declaration</h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <label 
            key={item.id} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div 
              onClick={() => onChange(item.id)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                checkedItems.includes(item.id) 
                  ? 'bg-emerald-600 border-emerald-600 text-white' 
                  : 'bg-white border-slate-300 group-hover:border-emerald-400'
              }`}
            >
              {checkedItems.includes(item.id) && <Check size={16} />}
            </div>
            <span className="text-slate-700 text-sm font-medium">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SafetyChecklist;
