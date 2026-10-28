import React from 'react';
import { X, MapPin, Clock, Compass, QrCode } from 'lucide-react';
import { STADIUM_GATES_INFO } from '../../data/abonosData';

export default function StadiumAccessModal({ isOpen, onClose, user, onOpenCarnet }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-sans" onClick={onClose}>
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header en Azul Noche con Marca de Agua «V» */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex items-center gap-2.5 relative z-10">
            <Compass className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-base font-bold tracking-tight">Accesos Estadio José Amalfitani</h3>
              <p className="text-[10px] text-sky-200">Av. Juan B. Justo 9200, Liniers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center transition-colors text-white relative z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 pb-8 max-h-[75vh] overflow-y-auto space-y-4">

          {/* User's Specific Access Banner */}
          {user.seasonTicket ? (
            <div className="p-4 rounded-2xl bg-blue-50 border-2 border-velez-primary text-velez-primary">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-velez-primary text-white px-2 py-0.5 rounded">
                Tu Ubicación Asignada
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                {user.seasonTicket.sector}
              </h4>
              <p className="text-xs font-bold text-velez-primary mt-0.5">
                Fila {user.seasonTicket.fila} • Butaca {user.seasonTicket.asiento}
              </p>
              <div className="mt-2.5 pt-2 border-t border-blue-200 text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-velez-primary shrink-0" />
                <span>Ingreso exclusivo por: <strong>{user.seasonTicket.puerta}</strong></span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
                Socia con Cuota al Día
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                Ingreso Libre y Gratuito
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed font-medium">
                Tenés acceso habilitado directamente con tu Carnet Digital a <strong>Populares Este y Oeste</strong> y a la <strong>Platea Carlos Bianchi Alta</strong>.
              </p>
            </div>
          )}

          {/* Quick Stadium Tips */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-velez-primary" />
              <span>Horarios y Recomendaciones:</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside leading-relaxed">
              <li>Apertura de molinetes: <strong>3 horas antes</strong> del partido.</li>
              <li>Llegar con al menos <strong>45 minutos de anticipación</strong>.</li>
              <li>Presentar <strong>DNI físico</strong> junto al <strong>Carnet Digital con QR dinámico</strong>.</li>
            </ul>
          </div>

          {/* Gates Directory */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
              Guía de Sectores y Puertas
            </h4>
            <div className="space-y-2.5">
              {STADIUM_GATES_INFO.map((gate) => (
                <div key={gate.id} className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900">{gate.sector}</h5>
                    <span className="text-[10px] font-bold bg-blue-50 text-velez-primary border border-blue-200 px-2 py-0.5 rounded-full">
                      {gate.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-velez-primary mt-1">
                    {gate.doors}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {gate.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA: Open Carnet */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenCarnet();
              }}
              className="w-full h-12 px-4 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md shadow-[#0055A4]/25"
            >
              <QrCode className="w-4 h-4 text-white" />
              <span>Abrir mi Carnet Digital para Molinete</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
