import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronDown, 
  CreditCard, 
  Receipt, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Wallet
} from 'lucide-react';

export default function SocialFeeCard({ 
  feeData, 
  onToggleStatus, 
  onPayClick, 
  onOpenDebitoModal 
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isPaid = feeData.estado === 'al_dia';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-velez-navy via-[#002D72] to-velez-blue text-white shadow-xl shadow-velez-blue/20 border border-white/15">
      
      {/* Background Graphic: Subtly embossed 'V' chevron of Vélez */}
      <div className="pointer-events-none absolute -right-8 -bottom-10 w-52 h-52 opacity-10">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          <path d="M10 20 L50 75 L90 20 L75 20 L50 55 L25 20 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-56 h-56 rounded-full bg-velez-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl" />

      {/* Main Content */}
      <div className="relative p-5">
        
        {/* Top Meta: Category & Live State Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-blue-100 border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-velez-cyan animate-pulse"></span>
              Cuota Social • {feeData.categoria}
            </span>
          </div>

          {/* Interactive State Badge (Toggleable for prototype review) */}
          <button
            onClick={onToggleStatus}
            className={`group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
              isPaid
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/30'
                : 'bg-orange-500/25 text-orange-200 border border-orange-400/50 hover:bg-orange-500/35 animate-bounce'
            }`}
            title="Cambiar estado para probar ambas vistas"
          >
            {isPaid ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Al día</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-orange-300" />
                <span>Pago Pendiente</span>
              </>
            )}
            <RefreshCw className="w-2.5 h-2.5 opacity-60 group-hover:rotate-180 transition-transform duration-500 ml-0.5" />
          </button>
        </div>

        {/* Amount & Period Section */}
        <div className="my-2">
          <p className="text-xs uppercase tracking-wider text-blue-200/90 font-medium">
            {isPaid ? 'Período Abonado' : 'Período a Abonar'}
          </p>
          <div className="flex items-baseline justify-between mt-0.5">
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                {feeData.mes}
              </span>
              <p className="text-xs text-blue-100/75 mt-0.5">
                {isPaid ? 'Próximo vencimiento:' : 'Vencimiento límite:'}{' '}
                <strong className="text-white font-semibold">{feeData.vencimiento}</strong>
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-white tracking-tight">
                ${feeData.monto.toLocaleString('es-AR')}
              </div>
              <span className="text-[10px] text-blue-200/80 uppercase font-semibold">
                Importe mensual
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Status Banner Message */}
        <div className={`mt-3.5 p-3 rounded-2xl flex items-start gap-2.5 text-xs transition-colors ${
          isPaid 
            ? 'bg-white/10 border border-white/15 text-blue-50' 
            : 'bg-orange-500/20 border border-orange-400/40 text-orange-100'
        }`}>
          {isPaid ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-semibold text-white">Habilitada para ingresar a la cancha</span>
                <p className="text-[11px] text-blue-200/90 mt-0.5">
                  Tu cuota de Octubre está acreditada. Podés pasar por molinetes con tu Carnet Digital.
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-orange-300 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-semibold text-white">Evitá recargos antes del día 10</span>
                <p className="text-[11px] text-orange-100/90 mt-0.5">
                  Aboná ahora para mantener activo el acceso al José Amalfitani y actividades del club.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Expandable Breakdown Accordion */}
        <div className="mt-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
          >
            <span>{showDetails ? 'Ocultar desglose de conceptos' : 'Ver desglose de conceptos incluidos'}</span>
            {showDetails ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {showDetails && (
            <div className="mt-2 pt-2 border-t border-white/10 space-y-1.5 text-xs animate-fadeIn">
              {feeData.detalles.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-blue-100/90">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-velez-cyan"></span>
                    {item.concepto}
                  </span>
                  <span className="font-mono font-medium">
                    {item.bonificado ? (
                      <span className="text-emerald-300 font-sans text-[11px] font-semibold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        Bonificado
                      </span>
                    ) : (
                      `$${item.monto.toLocaleString('es-AR')}`
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2">
          {isPaid ? (
            <>
              <button 
                onClick={onOpenDebitoModal}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-white/20 backdrop-blur-sm shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5 text-sky-200" />
                <span>Adherir a Débito</span>
              </button>

              <button 
                onClick={() => alert("Descargando comprobante oficial de cuota N° CP-202610-ASPF013333...")}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/15"
                title="Descargar Comprobante Oficial"
              >
                <Receipt className="w-3.5 h-3.5 text-white/80" />
                <span>Comprobante</span>
              </button>
            </>
          ) : (
            <button 
              onClick={onPayClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] transition-all text-xs font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
            >
              <Wallet className="w-4 h-4" />
              <span>Pagar cuota ahora ($18.500)</span>
              <ArrowUpRight className="w-4 h-4 ml-0.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
