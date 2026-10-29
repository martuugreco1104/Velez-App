import React, { useState } from 'react';
import { ACTIVITY_CATEGORIES, ACTIVITIES, getConsolidatedDays } from '../../data/activitiesData';
import { 
  Search, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

const FILTER_TABS = [
  { id: 'todos', label: 'Todos' },
  { id: 'deportes', label: 'Deportes' },
  { id: 'cultura', label: 'Cultura & Talleres' },
  { id: 'fitness', label: 'Fitness' }
];

export default function SportsCatalog({ onSelectActivity, userAptoValid, externalSearchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);

  const normalize = (str) => 
    (str || '')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const filtered = ACTIVITIES.filter((act) => {
    let matchesCategory = true;
    if (activeCategory === 'deportes') {
      matchesCategory = ['pelota', 'raqueta_pista', 'marciales', 'deportes'].includes(act.category);
    } else if (activeCategory === 'cultura') {
      matchesCategory = act.category === 'cultura';
    } else if (activeCategory === 'fitness') {
      matchesCategory = act.category === 'fitness';
    }

    const q = normalize(searchQuery);
    if (!q) return matchesCategory;

    const matchesSearch = 
      normalize(act.name).includes(q) ||
      normalize(act.venue).includes(q) ||
      (act.description && normalize(act.description).includes(q)) ||
      (act.tags && act.tags.some(t => normalize(t).includes(q))) ||
      (act.category && normalize(act.category).includes(q)) ||
      (act.levels && act.levels.some(l => normalize(l).includes(q)));

    return matchesCategory && matchesSearch;
  });

  const getCountForTab = (tabId) => {
    if (tabId === 'todos') return ACTIVITIES.length;
    if (tabId === 'deportes') {
      return ACTIVITIES.filter(a => ['pelota', 'raqueta_pista', 'marciales', 'deportes'].includes(a.category)).length;
    }
    if (tabId === 'cultura') {
      return ACTIVITIES.filter(a => a.category === 'cultura').length;
    }
    if (tabId === 'fitness') {
      return ACTIVITIES.filter(a => a.category === 'fitness').length;
    }
    return 0;
  };

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-6">
      
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Deportes y Actividades
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Polideportivo y Sede Central • Temporada 2026
          </p>
        </div>
        <span className="text-[10px] font-bold bg-blue-50 text-velez-primary border border-blue-200 px-2.5 py-1 rounded-full">
          {ACTIVITIES.length} disciplinas
        </span>
      </div>

      {/* Internal Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Buscar básquet, natación, hockey, yoga..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-9 pr-8 rounded-2xl bg-white border border-slate-200 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-velez-primary/20 focus:border-velez-primary transition-all shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="w-8 h-8 absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center text-xs font-bold active:scale-[0.98]"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips (Pestañas de filtro normalizadas) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {FILTER_TABS.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCountForTab(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 select-none flex items-center gap-1.5 active:scale-[0.98] ${
                isActive
                  ? 'bg-velez-primary text-white shadow-md shadow-velez-primary/25 scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Activities Cards Grid */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((act) => {
            const discountPct = Math.round(((act.priceOffice - act.priceAutoDebit) / act.priceOffice) * 100);

            return (
              <article
                key={act.id}
                onClick={() => onSelectActivity(act)}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover hover:border-velez-primary transition-all p-4 relative overflow-hidden active:scale-[0.98]"
              >
                {/* Discount Ribbon */}
                {discountPct > 0 && (
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-xl shadow-sm whitespace-nowrap">
                    {discountPct}% OFF Débito
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-velez-primary transition-colors tracking-tight">
                      {act.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-velez-primary shrink-0" />
                      <span>{act.venue}</span>
                    </p>
                  </div>
                </div>

                {/* Resumen consolidado de días y categorías disponibles */}
                <div className="mt-3 flex items-center flex-wrap gap-1 text-xs">
                  <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                    DÍAS:
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">
                    {act.daysSummary || getConsolidatedDays(act)}
                  </span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {act.levels.length} {act.levels.length === 1 ? 'categoría disponible' : 'categorías disponibles'}
                  </span>
                </div>

                {/* Price Box with Office vs AutoDebit Comparison */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block line-through">
                        Oficina: ${act.priceOffice.toLocaleString('es-AR')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-slate-900">
                          ${act.priceAutoDebit.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">/mes</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">
                      Con Débito Automático
                    </span>
                  </div>

                  {/* CTA button: 44px min height */}
                  <button 
                    type="button"
                    className="h-11 px-4 rounded-xl bg-[#0055A4] group-hover:bg-[#004080] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98] leading-none"
                  >
                    <span>Inscribirme</span>
                  </button>
                </div>

              </article>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
            <p className="text-xs font-medium text-slate-500">
              No encontramos actividades que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => { setActiveCategory('todos'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-velez-primary underline"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
