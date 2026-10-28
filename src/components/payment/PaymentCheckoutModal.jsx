import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  Download,
  Building,
  Sparkles,
  Receipt,
  RotateCcw
} from 'lucide-react';

export default function PaymentCheckoutModal({ 
  isOpen, 
  onClose, 
  amount = 18500, 
  concept = "Cuota Social CAVS",
  onPaymentSuccess,
  onViewReceipt,
  allowAutoDebit = true
}) {
  const isShopPurchase = concept.toLowerCase().includes('tienda') || allowAutoDebit === false;
  const [selectedMethod, setSelectedMethod] = useState('card'); // 'card' | 'mp' | 'cbu'
  
  // Si es compra de tienda, forzar método que no sea débito automático
  React.useEffect(() => {
    if (isShopPurchase && selectedMethod === 'cbu') {
      setSelectedMethod('card');
    }
  }, [isShopPurchase, selectedMethod]);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('4509 •••• •••• 8812');
  const [cardHolder, setCardHolder] = useState('MARTINA GRECO');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('342');

  // CBU form state
  const [cbuNumber, setCbuNumber] = useState('0140000003509988776655');

  // Transaction processing states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txNumber, setTxNumber] = useState('');

  if (!isOpen) return null;

  // Cálculo de descuento si activa débito automático
  const isAutoDebit = selectedMethod === 'cbu';
  const discountRate = isAutoDebit ? 0.20 : 0;
  const discountAmount = Math.round(amount * discountRate);
  const finalAmount = amount - discountAmount;

  const handleConfirmPay = () => {
    setLoading(true);
    const generatedTx = `CAVS-TX-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxNumber(generatedTx);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Oficial en Azul Noche con Marca de Agua «V» */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Pasarela Oficial CAVS
              </span>
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight">
                {success ? 'Comprobante de Operación' : 'Checkout Seguro Oficial'}
              </h3>
            </div>
          </div>

          <button 
            onClick={success ? handleCloseSuccess : onClose}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white relative z-10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PANTALLA 2: ÉXITO DE PAGO */}
        {success ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-center flex-1 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#0A7E43]/15 text-[#0A7E43] flex items-center justify-center mx-auto shadow-inner ring-4 ring-[#0A7E43]/20 animate-scaleUp">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0A7E43] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Transacción Aprobada
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
                ¡Pago Registrado con Éxito!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tu cuenta social y habilitación en molinetes del José Amalfitani quedaron actualizadas en tiempo real.
              </p>
            </div>

            {/* Ficha Resumen de Transacción */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">N° de Transacción:</span>
                <span className="font-mono font-bold text-slate-900">{txNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Concepto abonado:</span>
                <span className="font-bold text-slate-900">{concept}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Método de pago:</span>
                <span className="font-semibold text-slate-800">
                  {selectedMethod === 'card' ? 'Tarjeta Débito/Crédito' : selectedMethod === 'mp' ? 'Mercado Pago' : 'Débito Automático CBU'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
                <span className="font-extrabold text-slate-900">Total Acreditado:</span>
                <span className="font-mono font-black text-[#001D4A] text-lg">
                  ${finalAmount.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {/* Botones de Acción Posterior */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  alert(`Descargando comprobante oficial ${txNumber} en PDF...`);
                  if (onViewReceipt) onViewReceipt();
                }}
                className="w-full h-12 min-h-[48px] rounded-2xl border-2 border-[#0055A4] text-[#0055A4] hover:bg-blue-50 active:scale-[0.98] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-[#0055A4]" />
                <span>Descargar Comprobante PDF</span>
              </button>

              <button
                onClick={handleCloseSuccess}
                className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-900/20"
              >
                <span>Volver al Inicio</span>
              </button>
            </div>
          </div>
        ) : (
          /* PANTALLA 1: CHECKOUT Y SELECCIÓN DE MÉTODO */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 pb-8 flex-1">
            
            {/* Desglose Oficial del Concepto */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Concepto de facturación:</span>
                <span className="font-bold text-slate-900 text-right">{concept}</span>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs sm:text-sm font-bold text-slate-700">Subtotal a pagar:</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  ${amount.toLocaleString('es-AR')}
                </span>
              </div>

              {isAutoDebit && (
                <div className="flex justify-between items-center text-xs text-[#0A7E43] font-bold pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Beneficio 20% OFF Adhesión Débito:
                  </span>
                  <span className="font-mono">-${discountAmount.toLocaleString('es-AR')}</span>
                </div>
              )}

              {isAutoDebit && (
                <div className="flex justify-between items-baseline pt-1 border-t border-slate-200">
                  <span className="text-xs font-extrabold text-slate-900">Total con Descuento:</span>
                  <span className="text-2xl font-black text-[#0055A4] font-mono">
                    ${finalAmount.toLocaleString('es-AR')}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#0A7E43] shrink-0" />
                <span>Habilitación inmediata de molinetes en el Estadio José Amalfitani</span>
              </div>
            </div>

            {/* Selector de Métodos de Pago */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Seleccioná el Método de Pago
              </label>

              <div className="space-y-2">
                
                {/* 1. Tarjeta de Crédito / Débito */}
                <div 
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedMethod === 'card' 
                      ? 'border-[#0055A4] bg-blue-50/50 ring-2 ring-[#0055A4]/20 shadow-sm' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-sky-300" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Tarjeta de Débito / Crédito</div>
                        <div className="text-[11px] text-slate-500">Visa, Mastercard, Cabal (Hasta 3 cuotas)</div>
                      </div>
                    </div>
                  </div>

                  {/* Formulario desplegable si está seleccionado */}
                  {selectedMethod === 'card' && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80 space-y-2.5 text-xs animate-fadeIn">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">Número de Tarjeta</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-sm focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                          placeholder="•••• •••• •••• ••••"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">Vencimiento</label>
                          <input 
                            type="text" 
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-sm focus:ring-2 focus:ring-[#0055A4]/20 outline-none text-center"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">CVV (Dorso)</label>
                          <input 
                            type="password" 
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-sm focus:ring-2 focus:ring-[#0055A4]/20 outline-none text-center"
                            placeholder="•••"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">Titular como figura en el plástico</label>
                        <input 
                          type="text" 
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold uppercase focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                          placeholder="NOMBRE COMPLETO"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Mercado Pago */}
                <div 
                  onClick={() => setSelectedMethod('mp')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedMethod === 'mp' 
                      ? 'border-[#0055A4] bg-blue-50/50 ring-2 ring-[#0055A4]/20 shadow-sm' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                        MP
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Mercado Pago</div>
                        <div className="text-[11px] text-slate-500">Dinero en cuenta, Débito o Tarjeta guardada</div>
                      </div>
                    </div>
                  </div>
                  {selectedMethod === 'mp' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 animate-fadeIn">
                      Al confirmar serás redirigido para aprobar con 1 toque desde tu app de Mercado Pago.
                    </div>
                  )}
                </div>

                {/* 3. Débito Automático con CBU (No disponible para compras en Tienda Oficial) */}
                {!isShopPurchase && (
                  <div 
                    onClick={() => setSelectedMethod('cbu')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMethod === 'cbu' 
                        ? 'border-[#0A7E43] bg-emerald-50/50 ring-2 ring-[#0A7E43]/20 shadow-sm' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0A7E43] text-white flex items-center justify-center shrink-0">
                          <Building className="w-5 h-5 text-emerald-200" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">
                            Adhesión a Débito Automático con CBU
                          </div>
                          <div className="text-[11px] font-bold text-[#0A7E43] mt-0.5">
                            20% OFF • Bonificación permanente en cuotas y aranceles
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedMethod === 'cbu' && (
                      <div className="mt-3.5 pt-3 border-t border-slate-200/80 space-y-2 text-xs animate-fadeIn">
                        <label className="text-[11px] font-semibold text-slate-600 block">Número de CBU / Alias Bancario</label>
                        <input 
                          type="text" 
                          value={cbuNumber}
                          onChange={(e) => setCbuNumber(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-xs focus:ring-2 focus:ring-[#0A7E43]/20 outline-none"
                          placeholder="22 dígitos de CBU bancaria"
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Botón de Confirmación y Pago */}
            <div className="pt-2">
              <button
                onClick={handleConfirmPay}
                disabled={loading}
                className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-900/25 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando pago seguro con Banco CAVS...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Confirmar y Pagar (${finalAmount.toLocaleString('es-AR')})</span>
                    <ArrowRight className="w-4 h-4 ml-0.5 text-white" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
