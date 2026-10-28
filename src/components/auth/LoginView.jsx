import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Scan, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { socioAlDia, socioAbonado, socioConDeuda } from '../../data/mockUsers';

export default function LoginView({ onLoginSuccess }) {
  const [nroSocio, setNroSocio] = useState('45.965');
  const [email, setEmail] = useState('martina.greco@velez.com.ar');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Estados de escaneo facial
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [faceScanSuccess, setFaceScanSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejo de Login Convencional
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(socioAlDia);
    }, 700);
  };

  // Manejo de Login con Rostro (Face ID)
  const handleFaceIdLogin = () => {
    setIsFaceScanning(true);
    setFaceScanSuccess(false);

    setTimeout(() => {
      setFaceScanSuccess(true);
      setTimeout(() => {
        setIsFaceScanning(false);
        onLoginSuccess(socioAlDia, "¡Bienvenida, Martina! Acceso biométrico verificado.");
      }, 900);
    }, 1500);
  };

  // Pre-llenado rápido para pruebas
  const handleQuickFill = (user) => {
    setNroSocio(user.nroSocio);
    setEmail(user.email || `${user.nombre.toLowerCase().replace(' ', '.')}@velez.com.ar`);
    setPassword('Velez2026!');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-velez-dark via-[#071B33] to-[#041224] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans">
      
      {/* Decorative Background Lighting & Giant 'V' Chevron */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-velez-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <svg viewBox="0 0 100 100" fill="none" className="w-[120%] h-[120%] text-white">
          <path d="M10 20 L50 75 L90 20 L75 20 L50 55 L25 20 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Top Branding Section */}
      <div className="relative z-10 pt-6 text-center">
        
        {/* Shield Oficial Fijo sin animaciones circulares */}
        <div className="relative inline-block mx-auto mb-4">
          <div className="w-24 h-24 rounded-full bg-white/10 p-2 backdrop-blur-md border border-white/25 shadow-2xl flex items-center justify-center">
            <img 
              src="/escudo-velez.png" 
              alt="Club Atlético Vélez Sarsfield" 
              className="w-16 h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" 
            />
          </div>
        </div>

        {/* Official App Title with Gotham Font */}
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center">
          <span>Vélez App</span>
        </h1>
        <p className="text-xs uppercase tracking-widest text-sky-200 mt-1 font-bold">
          Club Atlético Vélez Sarsfield
        </p>
        <span className="text-[10px] text-white/50 tracking-wider uppercase block mt-0.5">
          El primero en ser un gran club
        </span>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 my-auto py-4">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Input 1: Número de Socio */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block mb-1">
              Número de Socio / Socia
            </label>
            <div>
              <input 
                type="text" 
                required
                placeholder="Ej. 45.965"
                value={nroSocio}
                onChange={(e) => setNroSocio(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/15 transition-all backdrop-blur-md text-left"
              />
            </div>
          </div>

          {/* Input 2: Correo Electrónico */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block mb-1">
              Correo Electrónico
            </label>
            <div>
              <input 
                type="email" 
                required
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/15 transition-all backdrop-blur-md text-left"
              />
            </div>
          </div>

          {/* Input 3: Contraseña */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
                Contraseña
              </label>
              <button 
                type="button" 
                onClick={() => alert("Se enviaron las instrucciones a tu casilla de correo registrada.")}
                className="text-[10px] text-sky-300 hover:text-white transition-colors"
              >
                ¿Olvidaste tu clave?
              </button>
            </div>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="Ingresá tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-4 pr-11 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/15 transition-all backdrop-blur-md text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-10 h-10 absolute right-1 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Alternar visibilidad"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Checkbox: Guardar Registro en este Dispositivo */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 text-velez-primary focus:ring-sky-400 bg-white/10 cursor-pointer"
              />
              <span className="text-xs text-blue-100 font-medium">
                Guardar registro en este teléfono
              </span>
            </label>
          </div>

          {/* Botón CTA Primario: Iniciar Sesión */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-2xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-sm font-bold text-white flex items-center justify-center shadow-xl shadow-[#0055A4]/40 border border-sky-400/30 mt-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Ingresar"
            )}
          </button>

          {/* Separador Visual */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">o ingresar con</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Botón Facial: Iniciar con Cara (Face ID) */}
          <button
            type="button"
            onClick={handleFaceIdLogin}
            className="w-full h-12 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition-all border border-white/20 text-xs font-bold text-white flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <Scan className="w-5 h-5 text-sky-300" />
            <span>Ingresar con Reconocimiento Facial (Face ID)</span>
          </button>

        </form>

        {/* Atajos Rápidos de Perfiles para Evaluación */}
        <div className="mt-4 pt-3 border-t border-white/10 text-center">
          <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-2 font-medium">
            Completar con usuario de prueba:
          </span>
          <div className="flex items-center justify-center gap-1.5">
            <button 
              type="button"
              onClick={() => handleQuickFill(socioAlDia)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-emerald-300 border border-emerald-400/30 active:scale-[0.98] transition-all"
            >
              Martina (Al Día)
            </button>
            <button 
              type="button"
              onClick={() => handleQuickFill(socioAbonado)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-sky-300 border border-sky-400/30 active:scale-[0.98] transition-all"
            >
              Camila (Abonada)
            </button>
            <button 
              type="button"
              onClick={() => handleQuickFill(socioConDeuda)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-rose-300 border border-rose-400/30 active:scale-[0.98] transition-all"
            >
              Mateo (Deuda)
            </button>
          </div>
        </div>

      </div>

      {/* Footer Legal */}
      <div className="relative z-10 text-center text-[10px] text-white/40 pb-2">
        <span>Club Atlético Vélez Sarsfield • Sistema Integrado de Socios</span>
      </div>

      {/* Modal / Overlay Animado de Escaneo Facial */}
      {isFaceScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xs bg-slate-900 border border-sky-400/40 rounded-3xl p-6 text-center text-white shadow-2xl relative overflow-hidden animate-slideUp">
            
            {/* Laser Line Scanning Effect */}
            <div className="relative w-36 h-36 mx-auto mb-4 border-2 border-dashed border-sky-400/70 rounded-3xl p-3 flex items-center justify-center overflow-hidden">
              <Scan className="w-24 h-24 text-sky-400 animate-pulse" />
              
              {!faceScanSuccess ? (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#38bdf8] animate-bounce" />
              ) : (
                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center animate-fadeIn">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-scale" />
                </div>
              )}
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">
              {!faceScanSuccess ? 'Escaneando Rostro...' : '¡Identidad Verificada!'}
            </h3>
            <p className="text-xs text-sky-200 mt-1">
              {!faceScanSuccess 
                ? 'Mirá fijamente a la cámara frontal de tu dispositivo' 
                : 'Acceso autorizado para Martina Greco'}
            </p>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Biometría Vélez ID Segura</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
