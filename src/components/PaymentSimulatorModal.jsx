import React, { useState } from 'react';
import { X, Check, CreditCard, Wallet, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PaymentSimulatorModal({ isOpen, onClose, feeData, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('mp');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setPaid(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-velez-navy to-velez-blue text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-sky-300" />
            <h3 className="text-base font-bold tracking-tight">Pagar Cuota Social</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-5">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
              <span>Período a cancelar:</span>
              <span className="font-semibold text-slate-800">{feeData.mes}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-800">Total a pagar:</span>
              <span className="text-2xl font-black text-velez-blue">
                ${feeData.monto.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Acreditación instantánea en molinetes del club</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2 mb-5">
            <span className="text-xs font-bold text-slate-700 block mb-1">Elegí tu medio de pago:</span>

            {/* Mercado Pago */}
            <label 
              onClick={() => setSelectedMethod('mp')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'mp'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                  MP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Mercado Pago</h4>
                  <p className="text-[11px] text-slate-400">Dinero en cuenta o débito directo</p>
                </div>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={selectedMethod === 'mp'} 
                onChange={() => setSelectedMethod('mp')}
                className="w-4 h-4 text-velez-blue" 
              />
            </label>

            {/* Tarjeta de Crédito / Débito */}
            <label 
              onClick={() => setSelectedMethod('card')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'card'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Tarjeta de Crédito / Débito</h4>
                  <p className="text-[11px] text-slate-400">Visa, Mastercard, Cabal</p>
                </div>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={selectedMethod === 'card'} 
                onChange={() => setSelectedMethod('card')}
                className="w-4 h-4 text-velez-blue" 
              />
            </label>

            {/* Transferencia bancaria */}
            <label 
              onClick={() => setSelectedMethod('transfer')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'transfer'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Transferencia Bancaria (Alias / CBU)</h4>
                  <p className="text-[11px] text-slate-400">club.velez.oficial</p>
                </div>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={selectedMethod === 'transfer'} 
                onChange={() => setSelectedMethod('transfer')}
                className="w-4 h-4 text-velez-blue" 
              />
            </label>
          </div>

          {/* Action Button */}
          {paid ? (
            <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 text-white font-bold text-center flex items-center justify-center gap-2 animate-pulse">
              <Check className="w-5 h-5" />
              <span>¡Pago Aprobado Exitosamente!</span>
            </div>
          ) : (
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-3.5 px-4 rounded-2xl bg-velez-blue hover:bg-velez-navy text-white text-sm font-black transition-all shadow-lg shadow-blue-900/25 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <span>Procesando pago seguro...</span>
              ) : (
                <>
                  <span>Confirmar Pago de ${feeData.monto.toLocaleString('es-AR')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
