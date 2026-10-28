import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  KeyRound, 
  ScanFace, 
  Smartphone, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export default function SecuritySettingsModal({ isOpen, onClose, onSaveToast }) {
  if (!isOpen) return null;

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  // Toggles de seguridad
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionSaved, setSessionSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSessionSaved(true);
    setTimeout(() => {
      setSessionSaved(false);
      onClose();
      if (onSaveToast) {
        onSaveToast("¡Configuración de seguridad y contraseña guardada con éxito!");
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="w-full max-w-md md:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-velez-dark via-[#091D36] to-velez-primary text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-sky-300" />
            <div>
              <h3 className="text-sm font-bold tracking-tight text-white uppercase">
                Seguridad y Contraseña
              </h3>
              <span className="text-[10px] text-sky-200">Credenciales del Socio CAVS</span>
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
        <form onSubmit={handleSave} className="p-5 pb-8 max-h-[75vh] overflow-y-auto space-y-4">
          
          {/* Sección 1: Cambio de Contraseña */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-velez-primary" />
              <span>Modificar Contraseña de Acceso</span>
            </span>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Contraseña Actual
              </label>
              <input 
                type={showPass ? "text" : "password"}
                placeholder="Ingresá tu clave actual"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-velez-primary/20 focus:border-velez-primary outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Nueva Contraseña
              </label>
              <input 
                type={showPass ? "text" : "password"}
                placeholder="Mínimo 8 caracteres y un número"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-velez-primary/20 focus:border-velez-primary outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium select-none">
                <input 
                  type="checkbox"
                  checked={showPass}
                  onChange={(e) => setShowPass(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-velez-primary"
                />
                <span>Mostrar caracteres</span>
              </label>
            </div>
          </div>

          {/* Sección 2: Métodos Biométricos y 2FA */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Biometría y Autenticación</span>
            </span>

            {/* Toggle 1: Face ID */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <ScanFace className="w-5 h-5 text-[#0055A4]" />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Inicio con Rostro (Face ID)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Ingreso automático mediante sensor biométrico
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFaceIdEnabled(!faceIdEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  faceIdEnabled ? 'bg-[#0055A4]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  faceIdEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 2: Autenticación en 2 Pasos */}
            <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2.5">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Verificación en Dos Pasos (2FA)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Envío de código de seguridad por WhatsApp/SMS
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Sección 3: Dispositivos Activos */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 block">Dispositivo Actual</span>
            <div className="flex items-center justify-between mt-1 text-slate-500 text-[11px]">
              <span>iPhone 15 Pro • Vélez App v2.4</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Sesión Activa
              </span>
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#0055A4]/25"
            >
              {sessionSaved ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Cambios Guardados!</span>
                </>
              ) : (
                <span>Guardar Preferencias de Seguridad</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
