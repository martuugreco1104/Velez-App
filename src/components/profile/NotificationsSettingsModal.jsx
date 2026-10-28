import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Trophy, 
  Receipt, 
  DoorOpen, 
  ShoppingBag, 
  Check, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';

export default function NotificationsSettingsModal({ isOpen, onClose, onSaveToast }) {
  if (!isOpen) return null;

  // Estados de Partidos
  const [matchReminder, setMatchReminder] = useState(true);
  const [gatesOpen, setGatesOpen] = useState(true);
  const [liveScores, setLiveScores] = useState(true);

  // Estados de Cuotas y Club
  const [feeExpiryReminder, setFeeExpiryReminder] = useState(true);
  const [turnstileStatusAlert, setTurnstileStatusAlert] = useState(true);
  const [shopOffers, setShopOffers] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
      if (onSaveToast) {
        onSaveToast("¡Preferencias de notificaciones actualizadas!");
      }
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-velez-dark via-[#091D36] to-velez-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-sky-300" />
            <div>
              <h3 className="text-sm font-bold tracking-tight text-white uppercase">
                Notificaciones Oficiales
              </h3>
              <span className="text-[10px] text-sky-200">Partidos, Accesos y Cuotas</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center transition-colors text-white"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Bloque 1: Partidos y Estadio José Amalfitani */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-velez-primary" />
              <span>Partidos y Día de Juego</span>
            </span>

            {/* Item 1 */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Apertura de Puertas (2h antes)
                </span>
                <span className="text-[10px] text-slate-500">
                  Horarios y recomendaciones de ingreso al Amalfitani
                </span>
              </div>
              <button
                type="button"
                onClick={() => setGatesOpen(!gatesOpen)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  gatesOpen ? 'bg-[#0055A4]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  gatesOpen ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Recordatorio de Partido
                </span>
                <span className="text-[10px] text-slate-500">
                  Aviso 24 horas antes del encuentro de local o visitante
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMatchReminder(!matchReminder)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  matchReminder ? 'bg-[#0055A4]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  matchReminder ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Goles y Resultado en Vivo
                </span>
                <span className="text-[10px] text-slate-500">
                  Actualización instantánea durante los 90 minutos
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLiveScores(!liveScores)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  liveScores ? 'bg-[#0055A4]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  liveScores ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Bloque 2: Cuotas y Molinetes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Cuota Social y Molinetes</span>
            </span>

            {/* Item 4 */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Vencimiento de Cuota Social
                </span>
                <span className="text-[10px] text-slate-500">
                  Alerta 3 días antes del día 10 de cada mes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFeeExpiryReminder(!feeExpiryReminder)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  feeExpiryReminder ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  feeExpiryReminder ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Item 5 */}
            <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Confirmación de Habilitación de Molinete
                </span>
                <span className="text-[10px] text-slate-500">
                  Notificación previa confirmando carnet apto para ingresar
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTurnstileStatusAlert(!turnstileStatusAlert)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  turnstileStatusAlert ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  turnstileStatusAlert ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Item 6 */}
            <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Descuentos Tienda Oficial (10% OFF)
                </span>
                <span className="text-[10px] text-slate-500">
                  Novedades de indumentaria y preventas de camisetas
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShopOffers(!shopOffers)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  shopOffers ? 'bg-[#0055A4]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  shopOffers ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-12 rounded-2xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#0055A4]/25"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Preferencias Guardadas!</span>
                </>
              ) : (
                <span>Guardar Preferencias de Notificaciones</span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
