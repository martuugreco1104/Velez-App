import React, { useState, useEffect } from 'react';
import { ArrowLeft, Ticket, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { SEASON_TICKETS } from '../../data/abonosData';

export default function SeasonTicketsView({ onBack, onBuyAbono }) {
  const [selectedTicket, setSelectedTicket] = useState(SEASON_TICKETS[0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-32">
      
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
          TORNEO CLAUSURA 2026
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
            <Ticket className="w-6 h-6 text-sky-200" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              Venta Oficial CAVS
            </span>
            <h2 className="text-xl font-black tracking-tight text-white leading-tight">
              Abonos a Plateas Oficiales
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-0.5">
              Estadio José Amalfitani • Butacas Fijas Numeradas
            </p>
          </div>
        </div>
      </div>

      {/* 3. Recordatorio para Socios */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-slate-700 leading-relaxed space-y-1">
        <strong className="text-[#0055A4] block font-black">
          Recordatorio para Socios y Socias:
        </strong>
        <p className="text-slate-600">
          El ingreso a <strong>Populares y Platea Bianchi Alta</strong> es 100% gratuito con tu cuota al día. Los abonos son exclusivos para asegurar tu butaca fija numerada en plateas bajas y palcos techados.
        </p>
      </div>

      {/* 4. Selector de Sectores */}
      <div className="space-y-3">
        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
          Seleccioná tu Sector de Abono:
        </h4>

        <div className="space-y-2.5">
          {SEASON_TICKETS.map((ticket) => {
            const isSelected = selectedTicket.id === ticket.id;

            return (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected 
                    ? 'border-[#0055A4] bg-[#EBF3FC] ring-2 ring-[#0055A4]/20 shadow-xs' 
                    : 'border-slate-200/90 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#0055A4] bg-[#0055A4]' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <h5 className="text-sm font-black text-slate-900">{ticket.sector}</h5>
                  </div>
                  <span className="font-mono text-base font-black text-[#001D4A]">
                    ${ticket.price.toLocaleString('es-AR')}
                  </span>
                </div>

                <div className="mt-2 pl-5.5 text-xs text-slate-600 space-y-1">
                  <p>{ticket.features}</p>
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ticket.door}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Sticky Footer Fijo en la Base */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl flex items-center justify-between z-50">
        <div>
          <span className="text-xs text-slate-500 font-medium block">Total Abono:</span>
          <span className="text-2xl font-black text-[#001D4A] font-mono">
            ${selectedTicket.price.toLocaleString('es-AR')}
          </span>
        </div>

        <button
          onClick={() => onBuyAbono(selectedTicket)}
          className="h-12 min-h-[48px] px-6 rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-black text-sm transition-all shadow-lg shadow-blue-900/25 flex items-center gap-2"
        >
          <span>Adquirir Abono</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
