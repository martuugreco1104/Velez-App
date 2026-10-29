import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  ArrowRight, 
  Calendar,
  Receipt,
  CreditCard
} from 'lucide-react';

export default function QuotaStatusCard({ user, onPay, onViewReceipt }) {
  const { status, quotaInfo } = user;

  // CASO 1: AL DÍA
  if (status === 'al_dia') {
    return (
      <div id="cuota-social-card" className="relative overflow-hidden rounded-2xl bg-white border border-[#0A7E43]/30 shadow-card-soft p-5 transition-all">
        {/* Marca de agua vectorial de la «V» azulada */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.06] text-[#0055A4]">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Top Header: Category Overline + Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Cuota Social • {user.categoria}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0A7E43]/10 text-[#0A7E43] border border-[#0A7E43]/25">
            <span className="w-2 h-2 rounded-full bg-[#0A7E43]" />
            <span>Al día</span>
          </span>
        </div>

        {/* Main Info */}
        <div className="my-2 relative z-10">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {quotaInfo.periodo} Abonado
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Próximo vencimiento:</span>
            <strong className="text-slate-900 font-bold">{quotaInfo.proximoVencimiento}</strong>
          </div>
        </div>

        {/* Botón Principal: Ver Comprobante */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center relative z-10">
          <button
            onClick={onViewReceipt || (() => alert("Comprobante oficial CAVS descargado en formato PDF."))}
            className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
          >
            <Receipt className="w-4 h-4 shrink-0 text-white" />
            <span>Ver comprobante</span>
          </button>
        </div>
      </div>
    );
  }

  // CASO 2: POR VENCER
  if (status === 'por_vencer') {
    return (
      <div id="cuota-social-card" className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-card-soft p-5 transition-all">
        {/* Marca de agua vectorial de la «V» azulada */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.05] text-[#0055A4]">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Top Header: Badge Ámbar Suave */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Cuota Social • {user.categoria}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200/80">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Por vencer</span>
          </span>
        </div>

        {/* Period & Amount */}
        <div className="my-2 flex items-baseline justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Cuota de {quotaInfo.periodo || 'Noviembre 2026'}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Vence el 10 de Noviembre
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Total</span>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              ${quotaInfo.monto.toLocaleString('es-AR')}
            </div>
          </div>
        </div>

        {/* CTA Button Primario Normalizado */}
        <div className="mt-4 pt-3 border-t border-slate-100 relative z-10">
          <button
            onClick={() => onPay(quotaInfo.monto, `Cuota Social ${quotaInfo.periodo || 'Noviembre 2026'}`)}
            className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
          >
            <CreditCard className="w-4 h-4 shrink-0 text-white" />
            <span>Pagar cuota (${quotaInfo.monto.toLocaleString('es-AR')}) →</span>
          </button>
        </div>
      </div>
    );
  }

  // CASO 3: CON DEUDA (status === 'deuda') - Tono Institucional y Sin Lenguaje Punitivo
  if (status === 'deuda') {
    const cantCuotas = quotaInfo.mesesImpagos ? quotaInfo.mesesImpagos.length : 3;

    return (
      <div id="cuota-social-card" className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-card-soft p-5 transition-all">
        {/* Marca de agua vectorial de la «V» azulada */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.05] text-[#0055A4]">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Top Header: Badge Suave de Saldo Pendiente */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Cuota Social • {user.categoria}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200/80">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Saldo pendiente</span>
          </span>
        </div>

        {/* Unpaid Months & Amount */}
        <div className="my-2 flex items-baseline justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Saldo pendiente
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {cantCuotas} cuotas acumuladas
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Total</span>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              ${quotaInfo.monto.toLocaleString('es-AR')}
            </div>
          </div>
        </div>

        {/* CTA Primary Normalizado */}
        <div className="mt-4 pt-3 border-t border-slate-100 relative z-10">
          <button
            onClick={() => onPay(quotaInfo.monto, `Regularización de Cuotas (${cantCuotas} cuotas acumuladas)`)}
            className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
          >
            <CreditCard className="w-4 h-4 shrink-0 text-white" />
            <span>Regularizar cuotas (${quotaInfo.monto.toLocaleString('es-AR')}) →</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
