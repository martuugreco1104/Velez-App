import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calendar,
  FileText
} from 'lucide-react';

export default function OfficialReceiptModal({ isOpen, onClose, user, showToast }) {
  if (!isOpen) return null;

  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onClose();
      if (showToast) {
        showToast("¡Comprobante Oficial CAVS descargado en PDF!");
      }
    }, 1200);
  };

  const receiptNumber = `CAVS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[90vh] overflow-y-auto pb-6">
        
        {/* Header Oficial en Azul Noche del Amalfitani con Marca de Agua «V» */}
        <div className="p-4 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <img src="/escudo-velez.png" alt="CAVS" className="w-7 h-7 object-contain" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Comprobante de Pago Oficial
              </span>
              <h3 className="text-xs font-bold text-white">
                Club Atlético Vélez Sarsfield
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center text-white relative z-10"
            aria-label="Cerrar comprobante"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Receipt Body: Formato Factura Oficial */}
        <div className="p-5 space-y-4">
          
          <div className="text-center pb-3 border-b border-dashed border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Recibo Oficial Nº {receiptNumber}
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              ${user.quotaInfo.monto.toLocaleString('es-AR')}
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Abonado y Acreditado</span>
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Concepto:</span>
              <strong className="text-slate-800">Cuota Social {user.quotaInfo.periodo}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Socia:</span>
              <strong className="text-slate-800">{user.nombre}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Nº de Socia:</span>
              <strong className="font-mono text-velez-primary font-bold">{user.nroSocio}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">DNI:</span>
              <strong className="font-mono text-slate-800">{user.dni}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Fecha de Pago:</span>
              <strong className="text-slate-800">{user.quotaInfo.ultimoPago || '05/10/2026'}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Medio de Pago:</span>
              <strong className="text-slate-800">Débito Automático / Tarjeta</strong>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">Estado de Molinete:</span>
              <strong className="text-emerald-700 font-bold">Habilitado José Amalfitani</strong>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#0055A4] shrink-0" />
            <span>Documento emitido electrónicamente con validez legal ante el club.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full h-11 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md shadow-[#0055A4]/25"
            >
              {downloading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar Comprobante PDF</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
