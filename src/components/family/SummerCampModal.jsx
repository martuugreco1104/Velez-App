import React, { useState } from 'react';
import { X, Sun, CheckCircle2, ShieldCheck, Utensils, Calendar, Users, AlertCircle } from 'lucide-react';

const SHIFTS = [
  { id: 'manana', name: 'Turno Mañana', hours: '09:00 a 13:00 hs', basePrice: 55000 },
  { id: 'tarde', name: 'Turno Tarde', hours: '14:00 a 18:00 hs', basePrice: 55000 },
  { id: 'completo', name: 'Turno Completo', hours: '09:00 a 18:00 hs', basePrice: 85000, recommended: true }
];

export default function SummerCampModal({ isOpen, onClose, member, onConfirm, hasSiblingDiscount = true }) {
  const [selectedShift, setSelectedShift] = useState('completo');
  const [lunchService, setLunchService] = useState('comedor'); // 'comedor' | 'vianda'
  const [agreedTerms, setAgreedTerms] = useState(false);

  if (!isOpen || !member) return null;

  const currentShiftObj = SHIFTS.find(s => s.id === selectedShift) || SHIFTS[2];
  const lunchCost = lunchService === 'comedor' ? 28000 : 0;
  const subtotal = currentShiftObj.basePrice + lunchCost;
  const discountRate = hasSiblingDiscount ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  const handleEnroll = () => {
    if (!agreedTerms) {
      alert("Por favor aceptá los términos y condiciones de la colonia.");
      return;
    }
    const registrationData = {
      memberId: member.id,
      memberName: member.name,
      modality: `Colonia Verano 2027 - ${currentShiftObj.name} (${lunchService === 'comedor' ? 'con Comedor' : 'con Vianda Propia'})`,
      amount: total,
      shift: currentShiftObj.name,
      lunchService
    };
    onConfirm(registrationData);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] text-slate-800 animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Institucional en Azul Noche con Marca de Agua «V» */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden shrink-0 border-b border-white/10">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <Sun className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Temporada Verano CAVS 2027
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                Inscripción a Colonia de Vacaciones
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white relative z-10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido con scroll fluido interno */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 pb-8">
          
          {/* Member Card Resumen */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-slate-900 truncate">{member.name}</h4>
                <span className="text-[10px] font-bold bg-blue-100 text-[#0055A4] px-2 py-0.5 rounded-full shrink-0">
                  {member.relationship} • {member.age} años
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                Socio Nº {member.socioNumber} • DNI {member.dni}
              </p>
            </div>
          </div>

          {/* Sede: Polideportivo */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-[#001D4A] flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#0055A4] shrink-0" />
            <div className="leading-snug">
              <span className="font-bold">Sede Polideportivo Vélez Sarsfield</span> (Av. Juan B. Justo 8900).
              <span className="block text-[11px] text-slate-600">Inicio: 4 de Enero 2027 • Piletas olímpicas, canchas y recreación deportiva.</span>
            </div>
          </div>

          {/* 1. Selector de Turno */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
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
                    className={`min-h-[48px] p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'border-[#0055A4] bg-blue-50/60 ring-2 ring-[#0055A4]/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {shift.recommended && (
                      <span className="absolute -top-2 right-2 bg-[#001D4A] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                        Recomendado
                      </span>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900">{shift.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{shift.hours}</div>
                    </div>
                    <div className="text-sm font-black text-[#001D4A] mt-2">
                      ${shift.basePrice.toLocaleString('es-AR')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Selector de Almuerzo / Comedor */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
              2. Servicio de Comedor / Almuerzo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setLunchService('comedor')}
                className={`min-h-[48px] p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 active:scale-[0.98] ${
                  lunchService === 'comedor'
                    ? 'border-[#0055A4] bg-blue-50/60 ring-2 ring-[#0055A4]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <Utensils className={`w-4 h-4 mt-0.5 shrink-0 ${lunchService === 'comedor' ? 'text-[#0055A4]' : 'text-slate-400'}`} />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Menú Comedor Oficial</div>
                  <div className="text-[10px] text-slate-500">Elaborado por nutricionistas del club (+$28.000/mes)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLunchService('vianda')}
                className={`min-h-[48px] p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 active:scale-[0.98] ${
                  lunchService === 'vianda'
                    ? 'border-[#0055A4] bg-blue-50/60 ring-2 ring-[#0055A4]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${lunchService === 'vianda' ? 'text-[#0055A4]' : 'text-slate-400'}`} />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Trae Vianda Propia</div>
                  <div className="text-[10px] text-slate-500">Refrigeración y asistencia incluida ($0)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Desglose de Liquidación con Descuento por Hermano */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Arancel Colonia ({currentShiftObj.name}):</span>
              <span className="font-mono font-medium">${currentShiftObj.basePrice.toLocaleString('es-AR')}</span>
            </div>
            
            {lunchCost > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Servicio de Comedor Mensual:</span>
                <span className="font-mono font-medium">+${lunchCost.toLocaleString('es-AR')}</span>
              </div>
            )}

            {hasSiblingDiscount && (
              <div className="flex justify-between text-[#0A7E43] font-bold">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Beneficio Familiar (15% OFF 2° Hermano):
                </span>
                <span className="font-mono">-${discountAmount.toLocaleString('es-AR')}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-sm">
              <span className="font-extrabold text-slate-900">Total a Debitar:</span>
              <span className="text-lg font-black text-[#001D4A] font-mono">
                ${total.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          {/* Términos */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none pt-1">
            <input 
              type="checkbox" 
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#0055A4] focus:ring-[#0055A4] border-slate-300"
            />
            <span>
              Acepto el reglamento general de la Colonia de Vacaciones de Vélez y autorizo la inclusión del arancel en el débito automático de la cuenta social.
            </span>
          </label>

          {/* Botón de Confirmación accesible (48px) */}
          <div className="pt-2">
            <button
              onClick={handleEnroll}
              className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Confirmar Inscripción y Debitar (${total.toLocaleString('es-AR')})</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
