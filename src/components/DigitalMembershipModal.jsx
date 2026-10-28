import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCw, 
  Share2, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Smartphone,
  CheckCircle2,
  Calendar,
  CreditCard,
  QrCode
} from 'lucide-react';

export default function DigitalMembershipModal({ isOpen, onClose, member, feeState }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isPaid = feeState.estado === 'al_dia';

  // Live timer for security validation at stadium turnstiles
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const formattedTime = currentTime.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-white/20 shadow-2xl p-4 sm:p-5 text-white overflow-hidden">
        
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <img src="/escudo-velez.png" alt="Vélez" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold tracking-tight text-white">Carnet Digital Oficial</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Card Container */}
        <div 
          className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#001D4A] via-[#002B7F] to-[#001333] border-2 border-white/25 shadow-2xl p-5"
          style={{ minHeight: '430px' }}
        >
          {/* Authentic Vélez Watermark Background */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 w-64 h-64 opacity-15">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              <path d="M10 20 L50 75 L90 20 L75 20 L50 55 L25 20 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Holographic Sheen overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

          {/* Top Bar of Credential */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <img src="/escudo-velez.png" alt="CAVS" className="w-8 h-8 object-contain drop-shadow" />
              <div>
                <h4 className="text-[11px] font-black tracking-widest text-white uppercase">C. A. Vélez Sarsfield</h4>
                <p className="text-[9px] text-sky-200 tracking-wider">EL PRIMERO EN SER UN GRAN CLUB</p>
              </div>
            </div>
            
            {/* Live Turnstile Anti-Fraud Clock */}
            <div className="text-right">
              <div className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                {formattedTime}
              </div>
              <span className="text-[8px] text-white/60 block mt-0.5">Molinete En Vivo</span>
            </div>
          </div>

          {/* Socio Photo & Main ID */}
          <div className="mt-4 flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <img 
                src={member.avatar} 
                alt={member.nombre} 
                className="w-16 h-16 rounded-xl object-cover border-2 border-white/80 shadow-md"
              />
              <span className="absolute -bottom-1.5 -right-1 bg-velez-blue text-[8px] font-bold text-white px-1.5 py-0.2 rounded border border-white">
                SOCIA
              </span>
            </div>

            <div className="flex-1">
              <div className="text-[10px] text-sky-200 font-semibold tracking-wider uppercase">
                Número de Socia
              </div>
              <div className="text-lg font-black font-mono text-white tracking-wide">
                {member.nroSocio}
              </div>
              <div className="text-sm font-bold text-white tracking-tight uppercase">
                {member.nombre}
              </div>
              <div className="text-xs text-blue-100/90 font-mono">
                DNI {member.dni}
              </div>
            </div>
          </div>

          {/* Category Chip */}
          <div className="mt-3 py-1 px-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-between relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              {member.categoria}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              isPaid ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50' : 'bg-orange-500/30 text-orange-200 border border-orange-400/50'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
              {isPaid ? 'Habilitada al Estadio' : 'Regularizar Pago'}
            </span>
          </div>

          {/* Center Dynamic QR Code */}
          <div className="my-4 flex flex-col items-center justify-center relative z-10">
            <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-blue-400/30 relative group">
              {/* SVG QR Code Simulation */}
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* QR Pattern Corners */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#001D4A" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#003882" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="#001D4A" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#003882" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="#001D4A" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#003882" />

                {/* Data dots */}
                <rect x="36" y="8" width="5" height="5" fill="#002D72" />
                <rect x="46" y="8" width="8" height="5" fill="#002D72" />
                <rect x="58" y="8" width="5" height="8" fill="#002D72" />
                <rect x="36" y="18" width="12" height="5" fill="#002D72" />
                <rect x="52" y="18" width="5" height="5" fill="#002D72" />
                <rect x="8" y="36" width="5" height="8" fill="#002D72" />
                <rect x="18" y="36" width="10" height="5" fill="#002D72" />
                <rect x="36" y="36" width="28" height="28" rx="6" fill="#001D4A" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="white" />
                {/* Micro CAVS crest inside QR */}
                <polygon points="50,45 52,49 57,49 53,52 54,56 50,53 46,56 47,52 43,49 48,49" fill="#0055A4" />
                <text x="50" y="54" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#003882">CAVS</text>

                <rect x="70" y="36" width="12" height="6" fill="#002D72" />
                <rect x="86" y="36" width="6" height="12" fill="#002D72" />
                <rect x="36" y="70" width="8" height="6" fill="#002D72" />
                <rect x="50" y="70" width="12" height="6" fill="#002D72" />
                <rect x="68" y="70" width="6" height="18" fill="#002D72" />
                <rect x="80" y="76" width="12" height="6" fill="#002D72" />
                <rect x="36" y="84" width="16" height="8" fill="#002D72" />
                <rect x="58" y="84" width="6" height="8" fill="#002D72" />
              </svg>
            </div>
            <span className="text-[10px] text-blue-200 mt-2 font-mono">
              Código dinámico anti-captura
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-100/80 relative z-10">
            <div>
              <span className="text-white/60 text-[9px] block">Socia Desde</span>
              <strong className="text-white font-mono">{member.socioDesde}</strong>
            </div>

            <div className="text-right">
              <span className="text-white/60 text-[9px] block">Último Mes Pago</span>
              <strong className="text-emerald-400 font-mono">{feeState.mes} ({feeState.ultimoMesPago || '10/2026'})</strong>
            </div>
          </div>
        </div>

        {/* External Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <button 
            onClick={() => alert("Credencial agregada exitosamente a Apple Wallet / Google Wallet.")}
            className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-300" />
            <span>Añadir a Wallet</span>
          </button>

          <button 
            onClick={() => alert("Enlace de verificación generado y copiado al portapapeles.")}
            className="py-2.5 px-3 rounded-xl bg-velez-blue hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir</span>
          </button>
        </div>

      </div>
    </div>
  );
}
