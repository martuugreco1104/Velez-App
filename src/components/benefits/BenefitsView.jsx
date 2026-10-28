import React, { useState } from 'react';
import { BENEFIT_CATEGORIES, BENEFITS_LIST } from '../../data/benefitsData';
import { Search, Copy, Check, X, ChevronLeft, ShieldCheck } from 'lucide-react';

export default function BenefitsView({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [copied, setCopied] = useState(false);

  const filteredBenefits = BENEFITS_LIST.filter(b => {
    const matchesCat = activeCategory === 'Todos' || b.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = b.partner.toLowerCase().includes(q) ||
                          b.title.toLowerCase().includes(q) ||
                          b.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-6">
      
      {/* Top Header */}
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-10 px-2 -ml-2 rounded-xl text-slate-600 hover:text-velez-primary hover:bg-slate-100 flex items-center gap-1 text-xs font-bold transition-colors active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-velez-primary bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            fortinerosoy.velez.com.ar
          </span>
        </div>
      )}

      {/* Banner Fortinero Soy! */}
      <div className="rounded-3xl bg-gradient-to-r from-velez-dark via-[#091D36] to-velez-primary text-white p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white text-[#001D4A] px-2.5 py-0.5 rounded-full shadow-sm">
              Fortinero Soy!
            </span>
            <span className="text-[10px] text-sky-200">Red Oficial de Beneficios</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Descuentos Exclusivos</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-[260px] leading-relaxed">
            Más de 1.000 comercios adheridos con tu condición de socia al día de Vélez Sarsfield.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Buscar marcas, cines, gastronomía..."
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

      {/* Category Filter Chips with no-scrollbar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {BENEFIT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 select-none flex items-center active:scale-[0.98] ${
              activeCategory === cat
                ? 'bg-velez-primary text-white shadow-md shadow-velez-primary/20 scale-[1.02]'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Benefits List */}
      <div className="space-y-3">
        {filteredBenefits.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedCoupon(b)}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover hover:border-velez-primary transition-all flex items-center justify-between cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                {b.logo}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-velez-primary transition-colors">
                    {b.partner}
                  </h4>
                  <span className="text-[9px] font-bold bg-blue-50 text-velez-primary border border-blue-200 px-1.5 py-0.2 rounded">
                    {b.badge}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-700 mt-1 leading-snug">
                  {b.title}
                </p>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  {b.validity}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-2">
              <span className="text-xs font-bold text-white bg-velez-primary px-2.5 py-1 rounded-xl shadow-sm block">
                {b.discount}
              </span>
              <span className="text-[10px] font-bold text-velez-primary group-hover:underline mt-1 block">
                Canjear
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp">
            
            <div className="p-4 sm:p-5 bg-gradient-to-r from-velez-dark to-velez-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedCoupon.logo}</span>
                <div>
                  <h3 className="text-base font-bold tracking-tight">{selectedCoupon.partner}</h3>
                  <span className="text-[10px] text-sky-200 font-semibold uppercase">{selectedCoupon.category}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCoupon(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center transition-colors text-white"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-xl font-extrabold text-velez-primary block mb-1">
                  {selectedCoupon.discount} de Ahorro
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {selectedCoupon.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {selectedCoupon.terms}
                </p>
              </div>

              {/* Voucher Code Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-velez-primary/50 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Código de Descuento Oficial:
                </span>
                <div className="text-xl font-mono font-black text-slate-900 tracking-wider">
                  {selectedCoupon.code}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                  Presentá este código en caja o ingresalo en el checkout web.
                </p>

                <button
                  onClick={() => handleCopyCode(selectedCoupon.code)}
                  className="mt-3.5 h-11 px-5 rounded-xl bg-velez-primary text-white text-xs font-bold shadow-md hover:bg-velez-dark active:scale-[0.98] transition-all inline-flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Código Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Beneficio oficial validado por Fortinero Soy! y CAVS.</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
