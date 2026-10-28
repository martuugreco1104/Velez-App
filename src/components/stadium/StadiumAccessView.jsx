import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Compass, QrCode, ShieldCheck } from 'lucide-react';
import { STADIUM_GATES_INFO } from '../../data/abonosData';

export default function StadiumAccessView({ onBack, user, onOpenCarnet }) {
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-16">
      
      {/* 1. Barra de Navegación Superior */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-600 hover:text-[#0055A4] hover:bg-slate-100 flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0055A4] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          ESTADIO JOSÉ AMALFITANI
        </span>
      </div>

      {/* 2. Banner de Cabecera */}
      <div className="rounded-3xl bg-gradient-to-r from-[#001D4A] via-[#091D36] to-[#0055A4] text-white p-5 shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-10 text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
            <Compass className="w-6 h-6 text-sky-200" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              Guía de Ingreso al Estadio
            </span>
            <h2 className="text-xl font-black tracking-tight text-white leading-tight">
              Puertas y Accesos Oficiales
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-0.5">
              Av. Juan B. Justo 9200, Liniers • Apertura 3 horas antes
            </p>
          </div>
        </div>
      </div>

      {/* 3. Ubicación del Socio */}
      {user?.seasonTicket ? (
        <div className="p-4 rounded-2xl bg-blue-50 border-2 border-[#0055A4] text-[#001D4A] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#0055A4] text-white px-2.5 py-0.5 rounded-full">
            Tu Ubicación Asignada
          </span>
          <h3 className="text-base font-black text-slate-900 mt-2">
            {user.seasonTicket.sector}
          </h3>
          <p className="text-xs font-bold text-[#0055A4] mt-0.5">
            Fila {user.seasonTicket.fila} • Butaca {user.seasonTicket.asiento}
          </p>
          <div className="mt-2.5 pt-2 border-t border-blue-200 text-xs text-slate-700 flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-[#0055A4] shrink-0" />
            <span>Ingreso asignado por: <strong>{user.seasonTicket.puerta}</strong></span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#0A7E43] text-white px-2.5 py-0.5 rounded-full">
            Socia Habilitada
          </span>
          <h3 className="text-sm font-black text-slate-900 mt-2">
            Acceso Libre a Populares y Platea Bianchi Alta
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Ingresás con tu Carnet Digital en cualquier molinete habilitado.
          </p>
        </div>
      )}

      {/* 4. Botón Directo al Carnet Digital */}
      <button
        onClick={onOpenCarnet}
        className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
      >
        <QrCode className="w-4 h-4 shrink-0 text-white" />
        <span>Abrir Carnet Digital para Molinete</span>
      </button>

      {/* 5. Listado Oficial de Puertas */}
      <div className="space-y-3 pt-1">
        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
          Directorio de Puertas y Sectores
        </h4>
        
        <div className="space-y-2.5">
          {STADIUM_GATES_INFO.map((g) => (
            <div 
              key={g.id || g.sector}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3.5 hover:border-[#0055A4]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0055A4] font-black text-xs flex items-center justify-center shrink-0">
                CAVS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-black text-slate-900">{g.sector}</h5>
                  <span className="text-[9px] font-bold bg-blue-50 text-[#0055A4] border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                    {g.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0055A4] mt-1">{g.doors}</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{g.description}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{g.openTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
