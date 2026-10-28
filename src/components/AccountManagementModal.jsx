import React, { useState } from 'react';
import { X, CreditCard, ReceiptText, Ticket, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle, Building } from 'lucide-react';

export default function AccountManagementModal({ 
  isOpen, 
  onClose, 
  initialTab = 'cuenta-corriente', 
  currentUser,
  pendingCharges = [],
  onPay
}) {
  const [tab, setTab] = useState(initialTab);
  const [debitoActive, setDebitoActive] = useState(true);

  if (!isOpen) return null;

  // Calcular conceptos pendientes
  const allPendingItems = [];

  // 1. Cuota social si está en deuda o por vencer
  if (currentUser?.status === 'deuda') {
    (currentUser.quotaInfo?.mesesImpagos || ['Agosto 2026', 'Septiembre 2026', 'Octubre 2026']).forEach((mes, idx) => {
      allPendingItems.push({
        id: `quota_deuda_${idx}`,
        concept: `Cuota Social ${mes}`,
        amount: Math.round((currentUser.quotaInfo?.monto || 55500) / (currentUser.quotaInfo?.mesesImpagos?.length || 3)),
        date: mes,
        type: 'quota'
      });
    });
  } else if (currentUser?.status === 'por_vencer') {
    allPendingItems.push({
      id: 'quota_por_vencer',
      concept: `Cuota Social ${currentUser.quotaInfo?.periodo || 'Noviembre 2026'}`,
      amount: currentUser.quotaInfo?.monto || 18500,
      date: 'Vence en 3 días',
      type: 'quota'
    });
  }

  // 2. Cargos de actividades inscritas que no se pagaron en el momento
  pendingCharges.forEach((charge) => {
    allPendingItems.push({
      id: charge.id,
      concept: charge.concept,
      amount: charge.amount,
      date: charge.date || 'Octubre 2026',
      type: 'activity'
    });
  });

  const totalPendingAmount = allPendingItems.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePayAll = () => {
    if (onPay) {
      onClose();
      onPay(
        totalPendingAmount, 
        `Cuenta Corriente CAVS (${allPendingItems.length} concepto${allPendingItems.length > 1 ? 's' : ''})`
      );
    }
  };

  const handlePaySingleItem = (item) => {
    if (onPay) {
      onClose();
      onPay(item.amount, item.concept);
    }
  };

  const historial = [
    { id: 'h1', mes: 'Cuota Social Octubre 2026', fecha: '05/10/2026', monto: 18500, canal: 'Débito Automático CBU', estado: 'Aprobado' },
    { id: 'h2', mes: 'Cuota Social Septiembre 2026', fecha: '05/09/2026', monto: 18500, canal: 'Débito Automático CBU', estado: 'Aprobado' },
    { id: 'h3', mes: 'Arancel Natación Adultos', fecha: '12/08/2026', monto: 35000, canal: 'Mercado Pago Online', estado: 'Aprobado' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header en Azul Noche Institucional */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ReceiptText className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 block">
                Oficina Virtual CAVS
              </span>
              <h3 className="text-base font-black tracking-tight text-white leading-tight">
                Cuenta Corriente y Pagos
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

        {/* Selector de Pestañas Internas */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold shrink-0">
          <button
            onClick={() => setTab('cuenta-corriente')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'cuenta-corriente' 
                ? 'border-[#0055A4] text-[#0055A4] bg-white font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Cuenta Corriente</span>
            {allPendingItems.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            )}
          </button>
          <button
            onClick={() => setTab('debito-automatico')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'debito-automatico' 
                ? 'border-[#0055A4] text-[#0055A4] bg-white font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Débito Automático
          </button>
          <button
            onClick={() => setTab('mis-tickets')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'mis-tickets' 
                ? 'border-[#0055A4] text-[#0055A4] bg-white font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Historial
          </button>
        </div>

        {/* CUERPO DEL MODAL */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: CUENTA CORRIENTE */}
          {tab === 'cuenta-corriente' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Tarjeta Resumen de Saldo */}
              <div className={`p-4 rounded-2xl border transition-all ${
                totalPendingAmount > 0 
                  ? 'bg-orange-50/60 border-orange-200' 
                  : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Estado de Cuenta
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    totalPendingAmount > 0 
                      ? 'bg-orange-100 text-orange-800 border-orange-300' 
                      : 'bg-emerald-100 text-[#0A7E43] border-emerald-300'
                  }`}>
                    {totalPendingAmount > 0 ? 'Saldo a Pagar' : 'Al Día'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-2">
                  <span className={`text-2xl font-black font-mono ${
                    totalPendingAmount > 0 ? 'text-[#001D4A]' : 'text-[#0A7E43]'
                  }`}>
                    ${totalPendingAmount.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {totalPendingAmount > 0 
                      ? `${allPendingItems.length} concepto(s) pendiente(s)` 
                      : 'Sin deudas registradas'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 mt-1">
                  {totalPendingAmount > 0 
                    ? 'Los aranceles de actividades y cuotas sociales pendientes impactan en la habilitación de accesos.' 
                    : 'Tu carnet digital se encuentra completamente habilitado para todos los sectores.'}
                </p>
              </div>

              {/* LISTADO DE CONCEPTOS PENDIENTES */}
              {allPendingItems.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Conceptos Pendientes de Pago</span>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      Total: ${totalPendingAmount.toLocaleString('es-AR')}
                    </span>
                  </h4>

                  <div className="space-y-2">
                    {allPendingItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                              item.type === 'quota' ? 'bg-orange-500' : 'bg-[#0055A4]'
                            }`} />
                            <h5 className="text-xs font-black text-slate-900 truncate">
                              {item.concept}
                            </h5>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block mt-0.5 pl-4">
                            Período: {item.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs font-black text-slate-900">
                            ${item.amount.toLocaleString('es-AR')}
                          </span>
                          <button
                            onClick={() => handlePaySingleItem(item)}
                            className="h-8 px-2.5 rounded-lg bg-blue-50 hover:bg-[#0055A4] text-[#0055A4] hover:text-white font-bold text-[11px] active:scale-95 transition-all"
                          >
                            Pagar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón Pagar Todo el Saldo */}
                  <div className="pt-2">
                    <button
                      onClick={handlePayAll}
                      className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-black text-xs transition-all shadow-lg shadow-blue-900/25 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Abonar Total Pendiente (${totalPendingAmount.toLocaleString('es-AR')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#0A7E43] mx-auto" />
                  <h4 className="text-xs font-black text-slate-900 uppercase">Sin Cargos Pendientes</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Si te inscribís a una actividad y elegís "Cargar a Cta. Cte.", el concepto aparecerá listado acá para abonarlo antes de su vencimiento.
                  </p>
                </div>
              )}

              {/* Historial Reciente Rápido */}
              <div className="pt-2">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Últimos Pagos Acreditados
                </h4>
                <div className="space-y-2">
                  {historial.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{p.mes}</div>
                        <div className="text-[10px] text-slate-400">{p.fecha} • {p.canal}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-black text-slate-900">${p.monto.toLocaleString('es-AR')}</div>
                        <span className="text-[10px] font-bold text-[#0A7E43] flex items-center gap-0.5 justify-end">
                          <CheckCircle2 className="w-3 h-3" />
                          {p.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DÉBITO AUTOMÁTICO */}
          {tab === 'debito-automatico' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#001D4A]">
                <div className="flex items-start gap-2.5">
                  <CreditCard className="w-5 h-5 text-[#0055A4] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Adhesión al Débito Automático (20% OFF)</h4>
                    <p className="text-slate-600 mt-1 leading-snug">
                      Tus cuotas y aranceles de actividades se debitan automáticamente a fin de mes con 20% de bonificación permanente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 block">Estado del Débito</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {debitoActive ? 'Activo en CBU Santander **** 4912' : 'No adherida actualmente'}
                    </span>
                  </div>
                  <button
                    onClick={() => setDebitoActive(!debitoActive)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      debitoActive 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : 'bg-[#0055A4] text-white shadow-sm'
                    }`}
                  >
                    {debitoActive ? 'Desvincular' : 'Adherirme'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORIAL COMPLETO */}
          {tab === 'mis-tickets' && (
            <div className="space-y-3 animate-fadeIn">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Comprobantes Fiscales Oficiales CAVS
              </h4>
              <div className="space-y-2">
                {historial.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#0055A4] font-bold block">REC-{p.id.toUpperCase()}-2026</span>
                      <div className="font-black text-slate-900 mt-0.5">{p.mes}</div>
                      <div className="text-[10px] text-slate-400">{p.fecha} • {p.canal}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-slate-900 text-sm">${p.monto.toLocaleString('es-AR')}</div>
                      <button 
                        onClick={() => alert(`Descargando comprobante oficial de ${p.mes}...`)}
                        className="text-[10px] font-bold text-[#0055A4] hover:underline block mt-0.5"
                      >
                        Descargar PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
