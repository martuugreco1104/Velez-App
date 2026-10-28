import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  CheckCircle2
} from 'lucide-react';

export default function DigitalBadgeModal({ 
  isOpen, 
  onClose, 
  user 
}) {
  const [walletAdded, setWalletAdded] = useState(false);
  const isPaid = user.status === 'al_dia';
  const isDebt = user.status === 'deuda';

  if (!isOpen) return null;

  const handleAddToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn font-sans" onClick={onClose}>
      <div 
        className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-[#001D4A] border border-white/20 shadow-2xl p-4 sm:p-5 text-white overflow-hidden animate-slideUp max-h-[95vh] overflow-y-auto pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <img src="/escudo-velez.png" alt="Vélez" className="w-6 h-6 object-contain drop-shadow" />
            <div>
              <span className="text-xs font-bold tracking-tight text-white uppercase block">
                Carnet Digital Oficial
              </span>
              <span className="text-[10px] text-blue-200 font-semibold">Club Atlético Vélez Sarsfield</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar carnet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vertical Credential Card */}
        <div 
          className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#001D4A] via-[#002B66] to-[#001433] border border-white/30 shadow-2xl p-5"
          style={{ minHeight: '430px' }}
        >
          {/* Marca de agua vectorial de la «V» azulada institucional */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-52 h-52 opacity-[0.12] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Top Card Header: Sleek, non-redundant credential header */}
          <div className="flex items-center justify-between relative z-10 pb-2 border-b border-white/10">
            <span className="text-[10px] font-black tracking-widest text-blue-200 uppercase">
              CREDENCIAL OFICIAL
            </span>
            <span className="text-[10px] font-mono text-white/80 font-bold">
              TEMPORADA 2026
            </span>
          </div>

          {/* Member Photo & Identification: Credencial 3:4 */}
          <div className="mt-4 flex items-center gap-3.5 relative z-10">
            <div className="relative shrink-0">
              <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-white/90 shadow-md ring-1 ring-white/60">
                <img 
                  src={user.avatar} 
                  alt={user.nombre} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#0055A4] text-[8px] font-bold text-white px-1.5 py-0.2 rounded border border-white/60">
                SOCIA
              </span>
            </div>

            {/* Bloque Monolítico Institucional */}
            <div className="flex-1">
              <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                Socia Nº {user.nroSocio}
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight uppercase leading-tight mt-0.5">
                {user.nombre}
              </h3>
              <div className="text-xs text-blue-100 font-mono mt-0.5 font-bold">
                DNI {user.dni}
              </div>
              <div className="text-[10px] text-white/90 font-medium mt-0.5">
                {user.categoria} • Desde {user.socioDesde.split('/')[2] || '2008'}
              </div>
            </div>
          </div>

          {/* Center Dynamic QR Code */}
          <div className="my-3 flex flex-col items-center justify-center relative z-10">
            <div className="p-3 bg-white rounded-2xl shadow-2xl border-2 border-blue-400/30 relative">
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#0B2240" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#0055A4" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="#0B2240" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#0055A4" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="#0B2240" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#0055A4" />

                <rect x="36" y="8" width="5" height="5" fill="#0055A4" />
                <rect x="46" y="8" width="8" height="5" fill="#0055A4" />
                <rect x="58" y="8" width="5" height="8" fill="#0055A4" />
                <rect x="36" y="18" width="12" height="5" fill="#0055A4" />
                <rect x="52" y="18" width="5" height="5" fill="#0055A4" />
                <rect x="8" y="36" width="5" height="8" fill="#0055A4" />
                <rect x="18" y="36" width="10" height="5" fill="#0055A4" />
                
                <rect x="36" y="36" width="28" height="28" rx="6" fill="#001D4A" />
                <rect x="40" y="40" width="20" height="20" rx="4" fill="white" />
                <image href="/escudo-velez.png" x="43" y="43" width="14" height="14" />

                <rect x="70" y="36" width="12" height="6" fill="#0055A4" />
                <rect x="86" y="36" width="6" height="12" fill="#0055A4" />
                <rect x="36" y="70" width="8" height="6" fill="#0055A4" />
                <rect x="50" y="70" width="12" height="6" fill="#0055A4" />
                <rect x="68" y="70" width="6" height="18" fill="#0055A4" />
                <rect x="80" y="76" width="12" height="6" fill="#0055A4" />
                <rect x="36" y="84" width="16" height="8" fill="#0055A4" />
                <rect x="58" y="84" width="6" height="8" fill="#0055A4" />
              </svg>
            </div>
            <span className="text-[10px] text-sky-200 mt-1.5 font-mono">
              Código QR dinámico de acceso
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-blue-100 relative z-10">
            <div>
              <span className="text-white/60 text-[9px] uppercase block font-medium">Socia Desde</span>
              <strong className="text-white font-mono">{user.socioDesde}</strong>
            </div>

            <div className="text-right">
              <span className="text-white/60 text-[9px] uppercase block font-medium">Último Pago</span>
              <strong className={`font-mono font-bold ${!isDebt ? 'text-emerald-300' : 'text-rose-300'}`}>
                {user.quotaInfo.ultimoPago || '05/10/2026'}
              </strong>
            </div>
          </div>
        </div>

        {/* Action Button: Añadir a Wallet Full Width */}
        <div className="mt-4">
          <button
            onClick={handleAddToWallet}
            className={`w-full h-12 px-4 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all active:scale-[0.98] ${
              walletAdded 
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/30' 
                : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
            }`}
          >
            {walletAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>¡Carnet Añadido a tu Wallet!</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-sky-300" />
                <span>Añadir a Apple / Google Wallet</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
