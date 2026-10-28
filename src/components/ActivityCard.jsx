import React from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Ticket,
  Users
} from 'lucide-react';

export default function ActivityCard({ activity, onSelect, userAptoValid }) {
  const isAbono = activity.categoria === 'abonos';

  return (
    <article 
      onClick={() => onSelect(activity)}
      className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md overflow-hidden ${
        activity.destacado 
          ? 'border-blue-400/80 ring-2 ring-blue-500/10' 
          : 'border-slate-200/90 hover:border-blue-300'
      }`}
    >
      {/* Top Banner if highlighted or standard category banner */}
      {activity.destacado && (
        <div className="bg-gradient-to-r from-velez-navy via-velez-blue to-velez-cyan px-4 py-1.5 flex items-center justify-between text-white text-xs font-bold tracking-wide">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
            Lanzamiento Oficial 2026
          </span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">
            Prioridad Socios
          </span>
        </div>
      )}

      <div className="p-4 sm:p-5">
        
        {/* Header: Category tag & Availability */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            activity.categoria === 'inclusion' 
              ? 'bg-purple-100 text-purple-700 border border-purple-200'
              : activity.categoria === 'natatorio'
              ? 'bg-sky-100 text-sky-800 border border-sky-200'
              : activity.categoria === 'abonos'
              ? 'bg-blue-100 text-velez-blue border border-blue-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {activity.tag}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Disponible
          </span>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-velez-blue transition-colors tracking-tight">
            {activity.titulo}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
            {activity.subtitulo}
          </p>
        </div>

        {/* Info Grid: Place, Schedule, Frequency */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span className="font-medium text-slate-700">{activity.lugar}</span>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600">{activity.horario}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">{activity.frecuencia}</span>
          </div>
        </div>

        {/* Requirements: Apto Físico Indicator */}
        <div className="mt-3 flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-slate-500 font-medium">Apto Médico:</span>
          {activity.aptoRequerido ? (
            userAptoValid ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                Vigente (Aprobado)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-orange-600">
                <ShieldAlert className="w-3.5 h-3.5" />
                Obligatorio
              </span>
            )
          ) : (
            <span className="text-slate-500 font-medium">No requerido</span>
          )}
        </div>

        {/* Price & Inscription Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isAbono ? 'Abono Socio' : 'Arancel Mensual'}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 tracking-tight">
                ${activity.precioCuota.toLocaleString('es-AR')}
              </span>
              {!isAbono && <span className="text-[11px] text-slate-400">/mes</span>}
            </div>
            {activity.inscripcion > 0 ? (
              <div className="text-[10px] text-slate-500 font-medium">
                Inscripción: ${activity.inscripcion.toLocaleString('es-AR')}
              </div>
            ) : (
              <div className="text-[10px] text-emerald-600 font-semibold">
                Sin costo de matrícula
              </div>
            )}
          </div>

          {/* Action CTA */}
          <button 
            type="button"
            className="px-3.5 py-2 rounded-xl bg-velez-blue group-hover:bg-velez-navy text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shadow-blue-900/20 active:scale-95"
          >
            <span>{isAbono ? 'Adquirir' : 'Inscribirse'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </article>
  );
}
