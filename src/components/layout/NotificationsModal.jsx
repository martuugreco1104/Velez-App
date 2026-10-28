import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Trophy, 
  CheckCircle2, 
  CreditCard,
  Sun,
  ChevronRight
} from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose, onNavigate, onClearBadge }) {
  if (!isOpen) return null;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'DÍA DE PARTIDO',
      title: 'Vélez vs. San Lorenzo - Sábado 31/10 19:15 hs',
      desc: 'Populares y Platea Bianchi habilitadas para tu carnet digital. Apertura de puertas a las 17:15 hs.',
      time: 'Hace 1 hora',
      read: false,
      type: 'match',
      icon: Trophy,
      iconColor: 'text-[#0055A4]'
    },
    {
      id: 2,
      category: 'CUOTA SOCIAL',
      title: 'Recordatorio de Vencimiento de Cuota',
      desc: 'Tu cuota de Octubre vence el día 10. Aboná a tiempo para mantener tu molinete habilitado.',
      time: 'Hace 4 horas',
      read: false,
      type: 'quota',
      icon: CreditCard,
      iconColor: 'text-orange-500'
    },
    {
      id: 3,
      category: 'POLIDEPORTIVO',
      title: 'Colonia de Vacaciones de Verano 2027',
      desc: 'Inscripciones abiertas para la Colonia de Verano 2027 en el Polideportivo para menores y grupo familiar.',
      time: 'Ayer',
      read: false,
      type: 'camp',
      icon: Sun,
      iconColor: 'text-sky-500'
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    if (onClearBadge) {
      onClearBadge();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header en Azul Noche con Marca de Agua */}
        <div className="p-4 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <Bell className="w-4 h-4 text-white" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Notificaciones del Club
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center text-white relative z-10"
            aria-label="Cerrar notificaciones"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-500">
            {notifications.filter(n => !n.read).length} no leídas
          </span>
          <button
            onClick={markAllRead}
            className="text-velez-primary hover:text-velez-dark font-bold flex items-center gap-1 active:scale-[0.98]"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar todas como leídas</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-2">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all text-xs ${
                  item.read 
                    ? 'bg-white border-slate-100 text-slate-600' 
                    : 'bg-blue-50/50 border-blue-200 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 shrink-0 ${item.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#0055A4] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60">
                        {item.category}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium ml-1">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold active:scale-[0.98] transition-all"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
