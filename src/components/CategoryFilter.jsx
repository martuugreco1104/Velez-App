import React from 'react';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="my-5">
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <span>Deportes y Aranceles</span>
          <span className="text-[10px] font-semibold bg-blue-100 text-velez-blue px-2 py-0.5 rounded-full">
            Inscripción Abierta
          </span>
        </h2>
        <span className="text-[11px] text-slate-500 font-medium">Temporada 2026</span>
      </div>

      {/* Scrollable Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 select-none ${
                isActive
                  ? 'bg-velez-blue text-white shadow-md shadow-velez-blue/30 scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
