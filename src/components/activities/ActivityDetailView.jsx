import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Users, 
  Building, 
  Sparkles,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function ActivityDetailView({ 
  activity, 
  userAptoValid, 
  onBack, 
  onConfirmInscription 
}) {
  const type = activity.type || 'standard';
  const branches = activity.branches || [];
  const showBranches = type !== 'pass' && branches.length > 0;

  // Paso actual: 1 = Configuración, 2 = Forma de Pago
  const [currentStep, setCurrentStep] = useState(1);

  // Estados de selección
  const [selectedBranchName, setSelectedBranchName] = useState(
    branches.length > 0 ? branches[0].name : ''
  );

  const currentBranch = branches.find(b => b.name === selectedBranchName) || branches[0] || {};
  const activeCategories = currentBranch.categories || activity.categories || [];

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    activeCategories.length > 0 ? activeCategories[0].name : ''
  );

  const [selectedFrequency, setSelectedFrequency] = useState(
    activity.frequencies ? activity.frequencies[0].name : ''
  );

  // Modalidad de pago en el Paso 2:
  // 'card' (Tarjeta) | 'mp' (Mercado Pago) | 'cbu' (Débito Automático CBU) | 'office' (Oficina de Socios)
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState('cbu');

  const [isSuccess, setIsSuccess] = useState(false);

  if (!activity) return null;

  // Categoría actual
  const currentCategory = activeCategories.find(c => c.name === selectedCategoryName) || activeCategories[0] || {};

  // Precios base
  let priceOffice = currentCategory.priceOffice || activity.priceOffice || 38000;
  if (type === 'frequency' && activity.frequencies) {
    const freqObj = activity.frequencies.find(f => f.name === selectedFrequency);
    if (freqObj) priceOffice = freqObj.priceOffice;
  }

  // Si elige débito automático tiene 20% OFF
  const priceAutoDebit = Math.round(priceOffice * 0.8);
  const isAutoDebit = chosenPaymentMethod === 'cbu';
  const finalPrice = isAutoDebit ? priceAutoDebit : priceOffice;

  // Días y horarios consolidados
  const activeDays = currentCategory.days || ['LUN', 'MIE', 'VIE'];
  const activeSchedule = currentCategory.schedule || activity.schedule || 'Lunes a Viernes de 08:00 a 21:00 hs';

  // Manejar cambio de rama
  const handleSelectBranch = (bName) => {
    setSelectedBranchName(bName);
    const bObj = branches.find(b => b.name === bName);
    if (bObj && bObj.categories?.length > 0) {
      setSelectedCategoryName(bObj.categories[0].name);
    }
  };

  // Confirmar inscripción final desde Paso 2
  const handleFinalSubmit = () => {
    setIsSuccess(true);
    const payNow = chosenPaymentMethod === 'card' || chosenPaymentMethod === 'mp';
    
    setTimeout(() => {
      onConfirmInscription({
        ...activity,
        chosenBranch: currentBranch.name || 'Única',
        chosenLevel: currentCategory.name || 'General',
        chosenSchedule: activeSchedule,
        chosenVenue: currentCategory.venue || activity.venue,
        chosenDays: activeDays,
        paymentMethod: chosenPaymentMethod,
        isAutoDebit: isAutoDebit,
        finalPrice: finalPrice
      }, payNow);
      onBack();
    }, 600);
  };

  return (
    <div className="font-sans animate-fadeIn pb-32">
      
      {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 -mx-4 px-4 py-3 flex items-center justify-between mb-4">
        <button
          onClick={currentStep === 2 ? () => setCurrentStep(1) : onBack}
          className="h-11 min-h-[44px] px-3 -ml-1 rounded-xl hover:bg-slate-100 active:scale-95 text-slate-700 hover:text-[#0055A4] font-bold text-xs flex items-center gap-2 transition-all leading-none"
          aria-label="Volver"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          <img src="/escudo-velez.png" alt="CAVS" className="w-6 h-6 object-contain drop-shadow" />
        </div>
      </div>

      {/* 2. HERO DE LA DISCIPLINA */}
      <div className="rounded-3xl bg-gradient-to-br from-[#001D4A] via-[#00275C] to-[#001433] text-white p-5 sm:p-6 shadow-xl relative overflow-hidden border border-white/10 mb-5">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-44 h-44 opacity-[0.08] text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/15 text-white px-2.5 py-0.5 rounded-full border border-white/20">
              {activity.tag || 'Deporte Oficial'}
            </span>
            <span className="text-xs text-blue-200 font-medium">Club Atlético Vélez Sarsfield</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            {activity.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium mt-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{activity.venue}</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PASO 1: SELECCIÓN DE MODALIDAD, CATEGORÍA Y HORARIOS           */}
      {/* ============================================================== */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Rama / Género */}
          {showBranches && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2.5">
                1. Seleccioná Rama / Género
              </label>
              <div className="flex gap-2">
                {branches.map((b) => {
                  const isSelected = selectedBranchName === b.name;
                  return (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => handleSelectBranch(b.name)}
                      className={`flex-1 h-11 min-h-[44px] rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                        isSelected 
                          ? 'bg-[#0055A4] text-white shadow-md shadow-[#0055A4]/25' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <span>{b.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categoría / División o Plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2.5">
              {type === 'pass' ? '1. Seleccioná tu Plan o Combo' : showBranches ? '2. Categoría / División' : '1. Categoría / División'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              {activeCategories.map((cat) => {
                const isSelected = selectedCategoryName === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategoryName(cat.name)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between active:scale-[0.98] ${
                      isSelected 
                        ? 'border-[#0055A4] bg-[#EBF3FC] ring-2 ring-[#0055A4]/20 shadow-xs' 
                        : 'border-slate-200/90 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 block tracking-tight">
                        {cat.name}
                      </span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0055A4]" />
                      )}
                    </div>
                    {cat.schedule && (
                      <span className="text-xs mt-1.5 font-mono text-slate-600 block">
                        {cat.schedule}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Días y Horarios */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
              Días de Entrenamiento y Horarios
            </label>
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {activeDays.map((d) => (
                <span key={d} className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-xs font-black text-[#0055A4]">
                  {d}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-2 pt-1 font-mono">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{activeSchedule}</span>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* PASO 2: SELECCIÓN DE FORMA DE PAGO (LAS 4 OPCIONES OFICIALES)  */}
      {/* ============================================================== */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Resumen de la Inscripción Elegida */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Resumen de la Inscripción
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-black text-slate-900">
                {activity.name} • {selectedCategoryName}
              </h3>
              <span className="text-xs font-bold text-[#0055A4]">
                {selectedBranchName || 'General'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              {activeDays.join(', ')} • {activeSchedule}
            </p>
          </div>

          {/* Selector de las 4 Opciones de Pago */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
            <div>
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Seleccioná tu Forma de Pago
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Elegí cómo abonar el arancel mensual de la disciplina.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              
              {/* 1. Débito Automático CBU (20% OFF — Se carga a Cuenta Corriente) */}
              <div
                onClick={() => setChosenPaymentMethod('cbu')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  chosenPaymentMethod === 'cbu'
                    ? 'border-[#0A7E43] bg-emerald-50/50 ring-2 ring-[#0A7E43]/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A7E43] text-white flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 text-emerald-200" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        Débito Automático con CBU (20% OFF)
                      </div>
                      <div className="text-[11px] text-[#0A7E43] font-bold mt-0.5">
                        Se carga a tu Cuenta Corriente con bonificación mensual
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-black text-[#0A7E43] block">
                      ${priceAutoDebit.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[9px] text-slate-400 line-through">
                      ${priceOffice.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Tarjeta de Débito / Crédito (Pago en el Momento) */}
              <div
                onClick={() => setChosenPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  chosenPaymentMethod === 'card'
                    ? 'border-[#0055A4] bg-blue-50/50 ring-2 ring-[#0055A4]/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 text-sky-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        Tarjeta de Débito / Crédito
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Pago en el momento online (Visa, Mastercard, Cabal)
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-sm font-black text-slate-900">
                    ${priceOffice.toLocaleString('es-AR')}
                  </div>
                </div>
              </div>

              {/* 3. Mercado Pago (Pago en el Momento) */}
              <div
                onClick={() => setChosenPaymentMethod('mp')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  chosenPaymentMethod === 'mp'
                    ? 'border-[#0055A4] bg-blue-50/50 ring-2 ring-[#0055A4]/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                      MP
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        Mercado Pago
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Pago en el momento con dinero en cuenta o tarjetas
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-sm font-black text-slate-900">
                    ${priceOffice.toLocaleString('es-AR')}
                  </div>
                </div>
              </div>

              {/* 4. Pago en Oficina de Socios (Se carga a Cuenta Corriente) */}
              <div
                onClick={() => setChosenPaymentMethod('office')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  chosenPaymentMethod === 'office'
                    ? 'border-[#0055A4] bg-blue-50/50 ring-2 ring-[#0055A4]/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        Pago en Oficina de Socios
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Se carga a tu Cuenta Corriente para abonar en sede
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-sm font-black text-slate-900">
                    ${priceOffice.toLocaleString('es-AR')}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 4. BARRA INFERIOR FIJA (STICKY FOOTER REACTIVO AL PASO)        */}
      {/* ============================================================== */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl flex items-center justify-between z-50 pb-safe">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Arancel Mensual:</span>
            {isAutoDebit && (
              <span className="text-[10px] font-black text-[#0A7E43] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                20% OFF
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl sm:text-2xl font-black text-[#001D4A] font-mono tracking-tight">
              ${finalPrice.toLocaleString('es-AR')}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">/mes</span>
          </div>
        </div>

        {currentStep === 1 ? (
          /* Botón Siguiente */
          <button
            type="button"
            onClick={() => {
              setCurrentStep(2);
              const mainEl = document.querySelector('main');
              if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="h-12 min-h-[48px] px-6 rounded-xl bg-[#0055A4] hover:bg-[#004080] active:scale-[0.98] text-white font-bold text-sm transition-all shadow-sm flex items-center gap-2 leading-none"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        ) : (
          /* Botón Confirmar Paso 2 */
          <button
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSuccess}
            className="h-12 min-h-[48px] px-6 rounded-xl bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] leading-none disabled:opacity-70"
          >
            {isSuccess ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Confirmando...</span>
              </>
            ) : (chosenPaymentMethod === 'cbu' || chosenPaymentMethod === 'office') ? (
              <>
                <span>Inscribirse</span>
                <Check className="w-4 h-4 shrink-0" />
              </>
            ) : (
              <>
                <span>Pagar (${finalPrice.toLocaleString('es-AR')})</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
}
