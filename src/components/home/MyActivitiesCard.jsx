import React from 'react';
import { Dumbbell, Waves, Clock, ChevronRight } from 'lucide-react';

export default function MyActivitiesCard({ activities, onExploreMore, onSelectActivity }) {
  return (
    <section className="my-2">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center">
          <span>Mis Actividades</span>
          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
            {activities.length}
          </span>
        </h3>
        <button
          onClick={onExploreMore}
          className="text-xs font-semibold text-[#0055A4] hover:underline transition-colors active:scale-[0.98]"
        >
          Explorar más →
        </button>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => {
          const isWater = act.id.includes('natacion');
          const Icon = isWater ? Waves : Dumbbell;

          return (
            <div 
              key={act.id}
              onClick={() => onSelectActivity && onSelectActivity(act)}
              className="group cursor-pointer p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover hover:border-velez-primary transition-all flex items-center justify-between active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${
                  isWater 
                    ? 'bg-sky-50 text-sky-600 border-sky-200' 
                    : 'bg-blue-50 text-velez-primary border-blue-200'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-velez-primary transition-colors">
                      {act.name}
                    </h4>
                    <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                      {act.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {act.level} • {act.days}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {act.hours}
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-[140px] font-medium">{act.venue.split('/')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pl-2">
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-velez-primary flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
