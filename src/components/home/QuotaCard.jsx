import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  CreditCard, 
  Receipt, 
  ChevronRight, 
  ArrowRight,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function QuotaCard({ 
  currentStatus, 
  quotaData, 
  onChangeStatus, 
  onPayClick,
  onViewReceipt 
}) {
  const isPaid = currentStatus === 'al_dia';
  const isPending = currentStatus === 'por_vencer';
  const isDebt = currentStatus === 'con_deuda';

  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-300 border shadow-lg ${
      isPaid 
        ? 'bg-gradient-to-br from-velez-dark via-[#092244] to-velez-primary text-white border-emerald-500/30 shadow-velez-primary/20'
        : isPending
        ? 'bg-gradient-to-br from-[#1C1917] via-[#292524] to-orange-950/90 text-white border-orange-500/40 shadow-orange-950/20'
        : 'bg-gradient-to-br from-[#200B0B] via-[#330F0F] to-rose-900/90 text-white border-rose-500/50 shadow-rose-900/20'
    }`}>
      
      {/* Background Graphic: Subtly embossed 'V' chevron */}
      <div className="pointer-events-none absolute -right-6 -bottom-10 w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          <path d="M10 20 L50 75 L90 20 L75 20 L50 55 L25 20 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="p-5 relative z-10">
        
        {/* Header: Title + Testing Toggle Switcher */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-sky-200/90 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              isPaid ? 'bg-velez-success animate-pulse' : isPending ? 'bg-velez-warning animate-ping' : 'bg-velez-danger animate-ping'
            }`} />
            Cuota Social • Semipleno
          </span>

          {/* Interactive State Toggle Pills for Testing */}
          <div className="flex items-center bg-black/30 p-0.5 rounded-full border border-white/10 text-[9px] font-bold">
            <button
              onClick={() => onChangeStatus('al_dia')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                isPaid ? 'bg-velez-success text-white shadow' : 'text-white/60 hover:text-white'
              }`}
              title="Probar estado Al Día"
            >
              Al Día
            </button>
            <button
              onClick={() => onChangeStatus('por_vencer')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                isPending ? 'bg-velez-warning text-white shadow' : 'text-white/60 hover:text-white'
              }`}
              title="Probar estado Por Vencer"
            >
              Por Vencer
            </button>
            <button
              onClick={() => onChangeStatus('con_deuda')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                isDebt ? 'bg-velez-danger text-white shadow' : 'text-white/60 hover:text-white'
              }`}
              title="Probar estado Con Deuda"
            >
              Deuda
            </button>
          </div>
        </div>

        {/* Dynamic Status Title and Due Info */}
        <div className="my-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                {quotaData.title}
              </h2>
              <p className="text-xs text-blue-100/80 mt-0.5">
                {isPaid ? 'Próximo vencimiento:' : 'Fecha de vencimiento:'}{' '}
                <strong className="text-white font-semibold">{quotaData.dueDate}</strong>
              </p>
            </div>

            {/* Total Amount */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-white/60 block">
                {isDebt ? 'Total Adeudado' : 'Importe Cuota'}
              </span>
              <div className="text-2xl font-black text-white tracking-tight">
                ${quotaData.amount.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        {/* Informative Banner Box based on state */}
        <div className={`mt-3 p-3 rounded-2xl flex items-start gap-2.5 text-xs border ${
          isPaid 
            ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-100'
            : isPending
            ? 'bg-orange-500/20 border-orange-400/40 text-orange-100'
            : 'bg-rose-500/25 border-rose-400/50 text-rose-100'
        }`}>
          {isPaid && (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Acceso Habilitado al Estadio</span>
                <p className="text-[11px] text-emerald-200/90 mt-0.5">
                  Podés ingresar al José Amalfitani con tu Carnet Digital QR por molinetes.
                </p>
              </div>
            </>
          )}

          {isPending && (
            <>
              <AlertTriangle className="w-4 h-4 text-orange-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Vencimiento Próximo</span>
                <p className="text-[11px] text-orange-200/90 mt-0.5">
                  Aboná antes del 10 de Noviembre para evitar recargos administrativos.
                </p>
              </div>
            </>
          )}

          {isDebt && (
            <>
              <AlertOctagon className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">¡Atención! Carnet Inhabilitado</span>
                <p className="text-[11px] text-rose-200/95 font-semibold mt-0.5">
                  {quotaData.debtDetails}
                </p>
                <p className="text-[10px] text-rose-300/80 mt-0.5">
                  Regularizá tu saldo para habilitar molinetes y disciplinas del polideportivo.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Action Buttons */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2">
          {isPaid ? (
            <>
              <button
                onClick={onViewReceipt}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-98 transition-all text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-white/20 backdrop-blur-sm shadow-sm"
              >
                <Receipt className="w-4 h-4 text-sky-200" />
                <span>Ver Comprobante</span>
              </button>

              <button
                onClick={() => alert("Tu cuenta ya cuenta con adhesión a débito automático recomendada.")}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-98 transition-all text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/15"
              >
                <CreditCard className="w-4 h-4 text-sky-200" />
                <span>Débito Auto</span>
              </button>
            </>
          ) : isPending ? (
            <button
              onClick={() => onPayClick(quotaData.amount, "Cuota Social Noviembre")}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-velez-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-98 transition-all text-xs font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <CreditCard className="w-4 h-4" />
              <span>{quotaData.buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => onPayClick(quotaData.amount, "Regularización de Deuda (3 cuotas)")}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-velez-danger to-rose-700 hover:from-rose-700 hover:to-rose-800 active:scale-95 transition-all text-xs font-black text-white flex items-center justify-center gap-2 shadow-xl shadow-rose-600/40 animate-pulse hover:animate-none"
            >
              <CreditCard className="w-4 h-4" />
              <span>{quotaData.buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
