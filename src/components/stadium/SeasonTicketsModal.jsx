import React, { useState } from 'react';
import { X, Ticket, ArrowRight, MapPin } from 'lucide-react';
import { SEASON_TICKETS } from '../../data/abonosData';

export default function SeasonTicketsModal({ isOpen, onClose, onBuyAbono }) {
  const [selectedTicket, setSelectedTicket] = useState(SEASON_TICKETS[0]);

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
            <Ticket className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-base font-bold tracking-tight">Abonos a Plateas Oficiales</h3>
              <p className="text-[10px] text-sky-200">Torneo Clausura 2026 • Butacas Numeradas</p>
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

        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
          
          {/* Informative Header Note */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-slate-700 leading-relaxed">
            <strong className="text-velez-primary block font-bold mb-0.5">
              Recordatorio para Socios de Vélez:
            </strong>
            El ingreso a <strong>Populares y Platea Bianchi Alta</strong> es 100% gratuito con cuota al día. Los abonos son exclusivos para asegurar tu butaca fija numerada en plateas bajas y palcos techados.
          </div>

          {/* Ticket Options List */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Seleccioná tu Sector de Abono:
            </span>

            {SEASON_TICKETS.map((ticket) => {
              const isSelected = selectedTicket.id === ticket.id;

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'border-[#0055A4] bg-blue-50/60 shadow-sm ring-2 ring-[#0055A4]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900">{ticket.sector}</h4>
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                          {ticket.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {ticket.benefits}
                      </p>
                      <div className="mt-2 text-[10px] text-velez-primary font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ticket.door}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold text-slate-900">
                        ${ticket.price.toLocaleString('es-AR')}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Temporada
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTA: 48px height */}
          <div className="pt-2">
            <button
              onClick={() => onBuyAbono(selectedTicket)}
              className="w-full h-12 px-4 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#0055A4]/25"
            >
              <Ticket className="w-4 h-4 text-white" />
              <span>
                Adquirir {selectedTicket.sector} (${selectedTicket.price.toLocaleString('es-AR')})
              </span>
              <ArrowRight className="w-4 h-4 ml-1 text-white" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
