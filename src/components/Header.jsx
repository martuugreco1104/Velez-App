import React from 'react';
import { Bell, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Header({ member, feeState, onToggleFeeStatus, onOpenCarnet }) {
  const isPaid = feeState.estado === 'al_dia';

  return (
    <header className="sticky top-0 z-40 bg-velez-navy/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand & User Greeting */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenCarnet}
            className="relative cursor-pointer group"
            title="Ver Carnet Digital"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-velez-cyan via-white to-velez-blue shadow-md transition-transform group-hover:scale-105">
              <img 
                src={member.avatar} 
                alt={member.nombre} 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-velez-blue rounded-full p-0.5 border border-white">
              <img src="/escudo-velez.png" alt="CAVS" className="w-4 h-4 object-contain" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-sky-200 tracking-wider uppercase">Club Atlético Vélez Sarsfield</span>
            </div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              Hola, Martina
              <span className="inline-block text-sm animate-pulse">👋</span>
            </h1>
            <p className="text-[11px] text-blue-200/80 font-medium">
              Socia Semipleno • <span className="font-mono text-white/90">#{member.nroSocio}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Simulation Toggle */}
        <div className="flex items-center gap-2">
          {/* Status Simulator Pill */}
          <button
            onClick={onToggleFeeStatus}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all border flex items-center gap-1 shadow-sm ${
              isPaid 
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25' 
                : 'bg-orange-500/20 border-orange-400/50 text-orange-200 hover:bg-orange-500/30 animate-pulse'
            }`}
            title="Hacé clic para alternar entre cuota Al Día y Pendiente"
          >
            {isPaid ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Al día</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3 h-3 text-orange-400" />
                <span>Pendiente</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button 
            className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-velez-cyan ring-2 ring-velez-navy animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-velez-cyan ring-2 ring-velez-navy"></span>
          </button>
        </div>

      </div>
    </header>
  );
}
