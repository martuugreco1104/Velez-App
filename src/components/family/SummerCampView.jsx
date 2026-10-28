import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sun, 
  CheckCircle2, 
  ShieldCheck, 
  Utensils, 
  Calendar, 
  Sparkles,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

const SHIFTS = [
  { id: 'manana', name: 'Turno Mañana', hours: '09:00 a 13:00 hs', basePrice: 55000, desc: 'Actividades recreativas matutinas y pileta' },
  { id: 'tarde', name: 'Turno Tarde', hours: '14:00 a 18:00 hs', basePrice: 55000, desc: 'Tardes de deportes náuticos y talleres' },
  { id: 'completo', name: 'Turno Completo', hours: '09:00 a 18:00 hs', basePrice: 85000, recommended: true, desc: 'Jornada integral con todas las disciplinas y pileta libre' }
];

export default function SummerCampView({ member, onBack, onConfirm, hasSiblingDiscount = true }) {
  const [selectedShift, setSelectedShift] = useState('completo');
  const [lunchService, setLunchService] = useState('comedor'); // 'comedor' | 'vianda'
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!member) return null;

  const currentShiftObj = SHIFTS.find(s => s.id === selectedShift) || SHIFTS[2];
  const lunchCost = lunchService === 'comedor' ? 28000 : 0;
  const subtotal = currentShiftObj.basePrice + lunchCost;
  const discountRate = hasSiblingDiscount ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  const handleEnroll = () => {
    if (!agreedTerms) {
      alert("Por favor aceptá el reglamento y términos de la colonia de vacaciones.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const registrationData = {
        memberId: member.id,
        memberName: member.name,
        modality: `Colonia Verano 2027 - ${currentShiftObj.name} (${lunchService === 'comedor' ? 'con Comedor CAVS' : 'con Vianda Propia'})`,
        amount: total,
        shift: currentShiftObj.name,
        lunchService
      };
      onConfirm(registrationData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-4 font-sans animate-fadeIn pb-32">
      
      {/* 1. Barra Superior de Navegación */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-600 hover:text-[#0055A4] hover:bg-slate-100 flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Grupo Familiar</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0055A4] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          TEMPORADA VERANO 2027 • POLIDEPORTIVO
        </span>
      </div>

      {/* 2. Banner de Cabecera con Identidad Vélez */}
      <div className="rounded-3xl bg-gradient-to-r from-[#001D4A] via-[#091D36] to-[#0055A4] text-white p-5 shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-10 text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
            <Sun className="w-6 h-6 text-sky-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              Inscripción Oficial CAVS
            </span>
            <h2 className="text-xl font-black tracking-tight text-white leading-tight">
              Colonia de Vacaciones 2027
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-0.5">
              Polideportivo Vélez Sarsfield • Para hijos y menores a cargo
            </p>
          </div>
        </div>
      </div>

      {/* 3. Ficha del Menor Inscripto */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5">
        <img 
          src={member.avatar} 
          alt={member.name} 
          className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
              {member.name}
            </h3>
            <span className="text-[10px] font-extrabold bg-[#EBF3FC] text-[#0055A4] px-2 py-0.5 rounded-full shrink-0">
              {member.relationship} • {member.age} años
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono font-medium mt-0.5">
            Socio Nº {member.socioNumber} • DNI {member.dni}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#0A7E43] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cuota social al día • Habilitado para inscripción</span>
          </div>
        </div>
      </div>

      {/* 4. Sede y Fecha de Inicio */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-[#001D4A] space-y-1.5">
        <div className="flex items-center gap-2 font-black text-xs">
          <MapPin className="w-4 h-4 text-[#0055A4] shrink-0" />
          <span>Sede Polideportivo Vélez Sarsfield (Av. Juan B. Justo 8900)</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-600 pl-6">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Inicio oficial: <strong className="text-slate-800">Lunes 4 de Enero 2027</strong> • Piletas olímpicas, canchas y recreación deportiva</span>
        </div>
      </div>

      {/* 5. Selector de Turno */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
          1. Seleccioná el Turno
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SHIFTS.map((shift) => {
            const isSelected = selectedShift === shift.id;
            return (
              <button
                key={shift.id}
                type="button"
                onClick={() => setSelectedShift(shift.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between active:scale-[0.98] ${
                  isSelected 
                    ? 'border-[#0055A4] bg-[#EBF3FC] ring-2 ring-[#0055A4]/20 shadow-xs' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 block">
                      {shift.name}
                    </span>
                    {shift.recommended && (
                      <span className="text-[9px] font-black bg-[#0055A4] text-white px-1.5 py-0.2 rounded uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-600 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {shift.hours}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    {shift.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 font-mono text-xs font-black text-[#001D4A]">
                  ${shift.basePrice.toLocaleString('es-AR')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Servicio de Comedor / Vianda */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
          2. Servicio de Almuerzo y Merienda
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Opción Comedor CAVS */}
          <button
            type="button"
            onClick={() => setLunchService('comedor')}
            className={`p-3.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
              lunchService === 'comedor'
                ? 'border-[#0055A4] bg-[#EBF3FC] ring-2 ring-[#0055A4]/20 shadow-xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#0055A4]" />
                <span className="text-xs font-black text-slate-900">Menú Oficial CAVS</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#0055A4]">+$28.000</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
              Almuerzo nutricional elaborado por nutricionistas del club + colación y merienda diaria.
            </p>
          </button>

          {/* Opción Vianda Propia */}
          <button
            type="button"
            onClick={() => setLunchService('vianda')}
            className={`p-3.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
              lunchService === 'vianda'
                ? 'border-[#0055A4] bg-[#EBF3FC] ring-2 ring-[#0055A4]/20 shadow-xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-black text-slate-900">Vianda Propia</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">Sin cargo adicional</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
              El menor lleva su vianda refrigerada. Asistencia y refrigeración a cargo del club.
            </p>
          </button>
        </div>
      </div>

      {/* 7. Resumen de Liquidación con Descuento Hermano */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 text-xs">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
          3. Resumen de Liquidación
        </span>

        <div className="flex justify-between items-center text-slate-600">
          <span>Arancel Base ({currentShiftObj.name}):</span>
          <span className="font-mono font-bold text-slate-800">${currentShiftObj.basePrice.toLocaleString('es-AR')}</span>
        </div>

        {lunchCost > 0 && (
          <div className="flex justify-between items-center text-slate-600">
            <span>Servicio de Comedor Nutricional:</span>
            <span className="font-mono font-bold text-slate-800">+${lunchCost.toLocaleString('es-AR')}</span>
          </div>
        )}

        {hasSiblingDiscount && (
          <div className="flex justify-between items-center text-[#0A7E43] font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Descuento Familiar (15% 2° Hermano):</span>
            </span>
            <span className="font-mono">-${discountAmount.toLocaleString('es-AR')}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
          <span className="font-black text-slate-900 text-sm">Total Mensual Colonia:</span>
          <span className="font-mono font-black text-xl text-[#001D4A]">
            ${total.toLocaleString('es-AR')}
          </span>
        </div>
      </div>

      {/* 8. Términos y Condiciones (Área táctil accesible min 44px) */}
      <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors min-h-[44px]">
        <input 
          type="checkbox"
          checked={agreedTerms}
          onChange={(e) => setAgreedTerms(e.target.checked)}
          className="w-5 h-5 mt-0.5 rounded text-[#0055A4] focus:ring-[#0055A4] shrink-0"
        />
        <div className="text-xs text-slate-600 leading-snug">
          <span className="font-bold text-slate-900">Acepto el reglamento y normas de convivencia de la Colonia CAVS.</span>
          <span className="block text-[11px] text-slate-500 mt-0.5">
            Declaro que el menor cuenta con apto médico vigente cargado en el sistema del club.
          </span>
        </div>
      </label>

      {/* 9. Barra Inferior Fija (Sticky Footer z-50) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl flex items-center justify-between z-50">
        <div>
          <span className="text-xs text-slate-500 font-medium block">Total Liquidación:</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#001D4A] font-mono">
              ${total.toLocaleString('es-AR')}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">/mes</span>
          </div>
        </div>

        <button
          onClick={handleEnroll}
          disabled={isSubmitting}
          className="h-12 min-h-[48px] px-6 rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-900/25 flex items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Inscribiendo...</span>
            </>
          ) : (
            <>
              <span>Confirmar e Inscribir</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
