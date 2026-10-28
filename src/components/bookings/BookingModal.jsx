import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  CalendarPlus, 
  Share2, 
  Receipt,
  Download,
  AlertCircle
} from 'lucide-react';

export default function BookingModal({ isOpen, onClose, booking, onAddToCalendar }) {
  if (!isOpen || !booking) return null;

  const handleCalendar = () => {
    if (onAddToCalendar) {
      onAddToCalendar(booking);
    } else {
      alert(`Turno ${booking.title} agregado a tu calendario del teléfono.`);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Oficial */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Sistema de Reservas CAVS
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                Reserva Confirmada
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

        {/* Contenido del Ticket de Reserva */}
        <div className="p-6 text-center space-y-4">
          
          <div className="w-14 h-14 rounded-full bg-[#0A7E43]/15 text-[#0A7E43] flex items-center justify-center mx-auto shadow-inner ring-4 ring-[#0A7E43]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0A7E43] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Turno Asignado
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-2">
              {booking.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Presentá este código al ingresar en el sector del Polideportivo.
            </p>
          </div>

          {/* Ticket de reserva */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-300">
              <span className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">Código de Reserva</span>
              <span className="font-mono font-black text-sm text-[#0055A4] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {booking.code}
              </span>
            </div>

            <div className="flex items-start gap-2 pt-1 text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-[#0055A4] shrink-0 mt-0.5" />
              <span><strong>Fecha:</strong> {booking.date}</span>
            </div>

            <div className="flex items-start gap-2 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-[#0055A4] shrink-0 mt-0.5" />
              <span><strong>Horario:</strong> {booking.slot} hs</span>
            </div>

            {booking.venue && (
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#0A7E43] shrink-0 mt-0.5" />
                <span><strong>Sede:</strong> {booking.venue}</span>
              </div>
            )}

            {booking.requirements && (
              <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[11px] text-orange-950 mt-2">
                <div className="flex items-center gap-1 font-bold mb-0.5">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                  <span>Requisitos de Asistencia</span>
                </div>
                <span>{booking.requirements}</span>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleCalendar}
              className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-900/20"
            >
              <CalendarPlus className="w-4 h-4 text-white" />
              <span>Agregar a mi Calendario</span>
            </button>

            <button
              onClick={onClose}
              className="w-full h-11 min-h-[44px] rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Entendido y Cerrar</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
