import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  Info, 
  CreditCard, 
  Building2,
  ArrowRight
} from 'lucide-react';

export default function ActivityDetail({ 
  activity, 
  userAptoValid, 
  onClose, 
  onConfirmInscription 
}) {
  if (!activity) return null;

  // Normalización de ramas y categorías
  const branches = activity.branches && activity.branches.length > 0 
    ? activity.branches 
    : [
        {
          name: activity.genders && activity.genders.length === 1 ? activity.genders[0] : 'Mixto',
          categories: (activity.levels || ['General']).map(lvl => ({
            name: lvl,
            schedule: activity.schedule,
            venue: activity.venue,
            days: activity.availableDays || ['LUN', 'MIE', 'VIE'],
            priceOffice: activity.priceOffice || 38000,
            priceAutoDebit: activity.priceAutoDebit || 30400
          }))
        }
      ];

  const activityType = activity.type || (branches.length > 1 ? 'team_sport' : 'workshop');
  const isPassType = activityType === 'pass';
  const isFrequencyType = activityType === 'frequency';
  const isWorkshopType = activityType === 'workshop';
  const isTeamSport = activityType === 'team_sport';

  const showBranches = isTeamSport && branches.length > 1;
  const stepCategoryNum = showBranches ? 2 : 1;
  const stepScheduleNum = stepCategoryNum + 1;
  const stepPaymentNum = stepScheduleNum + 1;

  // Título para la selección de categorías/planes
  let categoryStepTitle = `${stepCategoryNum}. Categoría / División`;
  if (isPassType) categoryStepTitle = `${stepCategoryNum}. Seleccioná tu Plan o Combo`;
  else if (isFrequencyType) categoryStepTitle = `${stepCategoryNum}. Frecuencia Semanal`;
  else if (isWorkshopType) categoryStepTitle = `${stepCategoryNum}. Taller / Nivel`;

  // Estado Paso 1: Rama activa
  const [selectedBranchName, setSelectedBranchName] = useState(branches[0].name);

  // Rama y categorías activas
  const currentBranch = branches.find(b => b.name === selectedBranchName) || branches[0];
  const activeCategories = currentBranch.categories || [];

  // Estado Paso 2: Categoría / División seleccionada
  const [selectedCategoryName, setSelectedCategoryName] = useState(activeCategories[0]?.name || '');

  // Estado Paso 4: Modalidad de pago
  const [paymentPlan, setPaymentPlan] = useState('autoDebit');
  const [isSuccess, setIsSuccess] = useState(false);

  // Al cambiar la actividad o al montarse, reiniciar la selección
  useEffect(() => {
    if (branches.length > 0) {
      const initialBranch = branches[0];
      setSelectedBranchName(initialBranch.name);
      if (initialBranch.categories && initialBranch.categories.length > 0) {
        setSelectedCategoryName(initialBranch.categories[0].name);
      }
    }
  }, [activity?.id]);

  // Al cambiar de rama, resetear automáticamente la categoría a la primera de esa rama
  const handleSelectBranch = (bName) => {
    setSelectedBranchName(bName);
    const targetBranch = branches.find(b => b.name === bName);
    if (targetBranch && targetBranch.categories && targetBranch.categories.length > 0) {
      setSelectedCategoryName(targetBranch.categories[0].name);
    }
  };

  // Categoría actual seleccionada
  const currentCategory = activeCategories.find(c => c.name === selectedCategoryName) || activeCategories[0] || {
    name: 'General',
    schedule: activity.schedule,
    venue: activity.venue,
    days: activity.availableDays || ['LUN', 'MIE', 'VIE'],
    priceOffice: activity.priceOffice || 38000,
    priceAutoDebit: activity.priceAutoDebit || 30400
  };

  const allWeekDays = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  const activeDays = currentCategory.days || activity.availableDays || [];

  // Cálculos de Aranceles
  const priceOffice = currentCategory.priceOffice || activity.priceOffice || 38000;
  const priceAutoDebit = currentCategory.priceAutoDebit || Math.round(priceOffice * 0.8);
  const discountAmount = priceOffice - priceAutoDebit;
  const discountPct = Math.round((discountAmount / priceOffice) * 100);
  const finalPrice = paymentPlan === 'autoDebit' ? priceAutoDebit : priceOffice;

  const handleInscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmInscription({
        ...activity,
        chosenBranch: currentBranch.name,
        chosenLevel: currentCategory.name,
        chosenSchedule: currentCategory.schedule,
        chosenVenue: currentCategory.venue,
        chosenDays: activeDays,
        paymentPlan: paymentPlan,
        finalPrice: finalPrice
      });
      onClose();
    }, 1400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Oficial con Título y Botón de Cierre */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-velez-dark via-[#091D36] to-velez-primary text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full">
              Ficha de Inscripción Oficial
            </span>
            <span className="text-[10px] text-sky-200">Temporada 2026</span>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center transition-colors text-white"
            aria-label="Cerrar ficha"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container con Safe-Area Padding inferior (pb-8) */}
        <div className="p-5 pb-8 overflow-y-auto space-y-4 flex-1">
          
          {/* Main Title & General Venue */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {activity.name}
              </h2>
              {isPassType && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-velez-primary px-2 py-0.5 rounded-full">
                  Pase Libre
                </span>
              )}
            </div>
            <p className="text-xs text-velez-primary font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activity.venue}</span>
            </p>
            {activity.description && (
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {activity.description}
              </p>
            )}
          </div>

          {/* PASO 1: RAMA / GÉNERO (Solo si aplica a deportes por equipo) */}
          {showBranches && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                1. Rama / Género
              </label>
              <div className="flex items-center gap-2">
                {branches.map((b) => {
                  const isSelected = selectedBranchName === b.name;
                  return (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => handleSelectBranch(b.name)}
                      className={`flex-1 h-11 px-3 rounded-xl text-xs font-bold transition-all text-center active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[#0055A4] text-white shadow-md shadow-[#0055A4]/25 scale-[1.01]'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {b.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO CATEGORÍA / PLAN / FRECUENCIA (Adaptado según tipología) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {categoryStepTitle}
              </label>
              <span className="text-[10px] text-slate-400 font-medium">
                {activeCategories.length} opciones
              </span>
            </div>

            <div className={`grid ${isPassType ? 'grid-cols-1' : 'grid-cols-2'} gap-2 max-h-52 overflow-y-auto p-1 -m-1`}>
              {activeCategories.map((cat) => {
                const isSelected = selectedCategoryName === cat.name;
                const catDebit = cat.priceAutoDebit || Math.round((cat.priceOffice || 38000) * 0.8);
                const catOffice = cat.priceOffice || 38000;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategoryName(cat.name)}
                    className={`p-3 rounded-xl border text-left transition-all active:scale-[0.98] flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0055A4] bg-blue-50/70 text-[#0055A4] ring-2 ring-[#0055A4]/30 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs leading-snug">{cat.name}</span>
                      {isPassType && (
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          ${catDebit.toLocaleString('es-AR')}
                        </span>
                      )}
                    </div>
                    {isPassType ? (
                      <span className="text-[10px] text-slate-500 mt-1 font-medium">
                        Oficina: ${catOffice.toLocaleString('es-AR')} • Acceso continuo
                      </span>
                    ) : (
                      <span className={`text-[10px] mt-1 font-mono font-semibold ${
                        isSelected ? 'text-[#0055A4]' : 'text-slate-400'
                      }`}>
                        {cat.days ? cat.days.join(' · ') : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO DÍAS Y HORARIOS (Adaptado por tipología) */}
          {isPassType ? (
            /* TIPO A: "pass" — BANNER DE DISPONIBILIDAD CONTINUA (Sin pastillas LUN, MAR...) */
            <div className="p-4 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 rounded-2xl border border-blue-200/80 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {stepScheduleNum}. Disponibilidad y Horarios de Acceso
                </label>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-sm">
                  Lunes a Sábados
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-velez-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Horarios de acceso libre:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      Lunes a Viernes de 8:00 a 22:00 hs | Sábados de 9:00 a 19:00 hs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Instalaciones incluidas:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      Gimnasio de Musculación / Sala de Fitness (Sede y Polideportivo)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : isFrequencyType ? (
            /* TIPO B: "frequency" — FRECUENCIA Y CRONOGRAMA */
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {stepScheduleNum}. Días y Turnos
                </label>
                <span className="text-[10px] text-velez-primary font-bold">
                  {activeDays.length > 0 ? `${activeDays.length} días/sem` : 'A convenir'}
                </span>
              </div>

              {activeDays.length > 0 && (
                <div className="flex items-center justify-between gap-1.5">
                  {allWeekDays.map((day) => {
                    const isActive = activeDays.includes(day);
                    return (
                      <div
                        key={day}
                        className={`flex-1 h-9 rounded-xl text-xs font-black flex items-center justify-center select-none transition-all ${
                          isActive
                            ? 'bg-[#0055A4] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-velez-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Cronograma / Turno:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      {currentCategory.schedule || "Turnos y horarios a convenir con el profesor"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Sede y espacio:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      {currentCategory.venue || activity.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TIPO C ("team_sport") Y TIPO D ("workshop"): DÍAS DINÁMICOS CON CHIPS ILUMINADOS */
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {stepScheduleNum}. {isWorkshopType ? 'Días del Taller' : 'Días de Entrenamiento'}
                  </label>
                  <span className="text-[10px] text-[#0055A4] font-bold">
                    Cronograma Oficial CAVS
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1.5">
                  {allWeekDays.map((day) => {
                    const isActive = activeDays.includes(day);
                    return (
                      <div
                        key={day}
                        className={`flex-1 h-9 rounded-xl text-xs font-black flex items-center justify-center select-none transition-all ${
                          isActive
                            ? 'bg-[#0055A4] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#0055A4] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Horario asignado:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      {currentCategory.schedule}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Sede y espacio:</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      {currentCategory.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO FINAL: ARANCELES Y LIQUIDACIÓN (Débito Automático vs Oficina) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              {stepPaymentNum}. Modalidad de Pago de Arancel
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Opción A: Débito Automático (20% OFF) */}
              <div 
                onClick={() => setPaymentPlan('autoDebit')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative active:scale-[0.98] ${
                  paymentPlan === 'autoDebit'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Débito Automático
                  </span>
                  <span className="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                    {discountPct}% OFF
                  </span>
                </div>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  ${priceAutoDebit.toLocaleString('es-AR')}
                  <span className="text-[10px] font-normal text-slate-500"> /mes</span>
                </div>
                <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                  Ahorrás ${discountAmount.toLocaleString('es-AR')} por mes adhiriendo tarjeta.
                </p>
                {paymentPlan === 'autoDebit' && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </div>

              {/* Opción B: Pago en Oficina */}
              <div 
                onClick={() => setPaymentPlan('office')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative active:scale-[0.98] ${
                  paymentPlan === 'office'
                    ? 'border-[#0055A4] bg-blue-50/50 shadow-md ring-2 ring-[#0055A4]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Pago en Oficina
                  </span>
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  ${priceOffice.toLocaleString('es-AR')}
                  <span className="text-[10px] font-normal text-slate-500"> /mes</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Abono en ventanilla del club o Pago Mis Cuentas sin descuento.
                </p>
                {paymentPlan === 'office' && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0055A4]" />
                )}
              </div>

            </div>
          </div>

          {/* Validación de Apto Físico */}
          <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs ${
            activity.requiresMedical 
              ? userAptoValid 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-orange-50 border-orange-200 text-orange-950'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            {activity.requiresMedical ? (
              userAptoValid ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block">Apto Físico Vigente Validado</span>
                    <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                      Tu certificado médico está aprobado en el sistema del club hasta 2027. Cumplís con los requisitos para iniciar.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block">Certificado Médico Requerido</span>
                    <p className="text-xs text-orange-800 mt-0.5 leading-relaxed">
                      Deberás adjuntar el apto médico en tu perfil antes del primer entrenamiento práctico.
                    </p>
                  </div>
                </>
              )
            ) : (
              <>
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs block">Sin Exigencia de Apto Físico</span>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Esta actividad o taller cultural no requiere examen médico previo.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Botón de Acción Principal CTA */}
          <div className="pt-2">
            {isSuccess ? (
              <div className="w-full h-12 rounded-2xl bg-emerald-600 text-white font-bold text-sm text-center flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-5 h-5" />
                <span>¡Inscripción Exitosa!</span>
              </div>
            ) : (
              <button
                onClick={handleInscribe}
                className="w-full h-12 px-4 rounded-2xl bg-[#0055A4] hover:bg-[#004282] text-white text-sm font-bold transition-all shadow-lg shadow-[#0055A4]/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Confirmar Inscripción a {activity.name}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
