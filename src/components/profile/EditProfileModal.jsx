import React, { useState } from 'react';
import { X, Lock, CheckCircle2, User, Phone, Mail, MapPin, AlertCircle, Save } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, member, onSave }) {
  const [telefono, setTelefono] = useState(member.telefono || '+54 11 4567-8901');
  const [email, setEmail] = useState(member.email || 'martina.greco@velez.com.ar');
  const [domicilio, setDomicilio] = useState(member.domicilio || 'Av. Rivadavia 10540, 4° B');
  const [localidad, setLocalidad] = useState(member.localidad || 'Liniers, CABA');
  const [contactoEmergencia, setContactoEmergencia] = useState(member.contactoEmergencia || 'Carlos Greco (Padre) - 11 5566-7788');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave({
        ...member,
        telefono,
        email,
        domicilio,
        localidad,
        contactoEmergencia
      });
      onClose();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md md:max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] text-slate-800 animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Oficial en Azul Noche con Marca de Agua «V» */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <User className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Ficha de Afiliación CAVS
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                Editar Datos de Contacto
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

        {/* Formulario con Scroll Interno Fluido */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 pb-8 flex-1">
          
          {/* Bloque 1: Campos Oficiales Bloqueados (Read-only) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Datos Oficiales Registrados</span>
              </span>
              <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                Solo Lectura
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-400 block">Nombre Completo</span>
                <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{member.nombre}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-400 block">N° de Socia</span>
                <span className="text-xs font-bold font-mono text-[#0055A4] block mt-0.5">{member.nroSocio}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-400 block">DNI</span>
                <span className="text-xs font-bold font-mono text-slate-800 block mt-0.5">{member.dni}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Para modificar nombre o documento es requisito dirigirse con DNI a la Oficina de Socios del Estadio.</span>
            </p>
          </div>

          {/* Bloque 2: Campos Editables */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Información de Contacto Actualizable
            </span>

            {/* Teléfono / WhatsApp */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Teléfono / WhatsApp de Contacto</span>
              </label>
              <input 
                type="text" 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none transition-all"
                placeholder="+54 11 0000-0000"
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Correo Electrónico Oficial</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none transition-all"
                placeholder="ejemplo@velez.com.ar"
              />
            </div>

            {/* Domicilio y Localidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Domicilio Actual</span>
                </label>
                <input 
                  type="text" 
                  value={domicilio}
                  onChange={(e) => setDomicilio(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none transition-all"
                  placeholder="Calle y número"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Localidad / Barrio
                </label>
                <input 
                  type="text" 
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none transition-all"
                  placeholder="Liniers, CABA"
                />
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Contacto de Emergencia (Nombre y Teléfono)
              </label>
              <input 
                type="text" 
                value={contactoEmergencia}
                onChange={(e) => setContactoEmergencia(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none transition-all"
                placeholder="Nombre, parentesco y teléfono"
              />
            </div>
          </div>

          {/* Botón de Guardar Cambios */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
