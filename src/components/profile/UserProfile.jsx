import React, { useState } from 'react';
import { 
  User, 
  FileCheck, 
  Lock,
  ChevronRight,
  Bell,
  Users,
  Edit3,
  UploadCloud
} from 'lucide-react';
import SecuritySettingsModal from './SecuritySettingsModal';
import NotificationsSettingsModal from './NotificationsSettingsModal';
import EditProfileModal from './EditProfileModal';
import UploadMedicalModal from './UploadMedicalModal';

export default function UserProfile({ 
  member, 
  onOpenCarnet, 
  showToast, 
  onOpenFamilyGroup,
  onUpdateMember 
}) {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUploadMedicalOpen, setIsUploadMedicalOpen] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState(member.aptoFisico);

  const handleSaveContact = (updatedMember) => {
    if (onUpdateMember) {
      onUpdateMember(updatedMember);
    }
    if (showToast) {
      showToast("Tus datos de contacto fueron actualizados con éxito");
    }
  };

  const handleUpdateMedical = (updatedMedical) => {
    setMedicalInfo(updatedMedical);
    if (onUpdateMember) {
      onUpdateMember({
        ...member,
        aptoFisico: updatedMedical
      });
    }
    if (showToast) {
      showToast("Certificado médico enviado. En proceso de validación (24 a 48 hs).");
    }
  };

  const fields = [
    { label: "Nombre Completo", value: member.nombre },
    { label: "Número de Socia", value: member.nroSocio, mono: true },
    { label: "Documento (DNI)", value: member.dni, mono: true },
    { label: "Categoría", value: member.categoria },
    { label: "Fecha de Ingreso", value: member.socioDesde },
    { label: "Teléfono", value: member.telefono || '+54 11 4567-8901' },
    { label: "Correo Electrónico", value: member.email || 'martina.greco@velez.com.ar' },
    { label: "Domicilio", value: member.domicilio || 'Av. Rivadavia 10540, 4° B' }
  ];

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-6">
      
      {/* Profile Header: Credencial Institucional de Alta Gama */}
      <div className="bg-[#001D4A] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden text-center border border-white/10">
        
        {/* Marca de agua vectorial de la «V» azulada */}
        <div className="pointer-events-none absolute -right-6 -bottom-8 w-44 h-44 opacity-[0.08] text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Escudo oficial en esquina superior */}
        <div className="absolute top-4 right-4 opacity-40">
          <img src="/escudo-velez.png" alt="CAVS" className="w-8 h-8 object-contain drop-shadow" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Foto formato credencial vertical proporción 3:4 con aro blanco y ribete nítido */}
          <div className="w-20 h-24 rounded-xl p-0.5 bg-white shadow-xl ring-2 ring-white/90 mb-3 relative overflow-hidden">
            <img 
              src={member.avatar} 
              alt={member.nombre} 
              className="w-full h-full object-cover rounded-[10px]"
            />
            <span className="absolute bottom-0 inset-x-0 bg-[#001D4A]/90 text-[8px] font-black uppercase text-white tracking-wider py-0.5">
              SOCIA
            </span>
          </div>

          {/* Categoría Social y Antigüedad */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
              {member.categoria}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[10px] font-bold text-sky-200">
              Desde {member.socioDesde.split('/')[2] || '2008'}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
            {member.nombre}
          </h2>
          
          <p className="text-xs font-mono text-blue-200 font-bold mt-1">
            Socia Nº {member.nroSocio} • DNI {member.dni}
          </p>

          {/* Badge de Antigüedad Fortinera */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white text-[10px] font-bold shadow-sm">
            <span>★</span>
            <span>18 años de fidelidad fortinera</span>
          </div>

        </div>
      </div>

      {/* Apto Físico Status Card (Interactivo) */}
      <div 
        onClick={() => setIsUploadMedicalOpen(true)}
        className="p-4 rounded-2xl bg-[#0A7E43]/10 border border-[#0A7E43]/25 flex items-center justify-between cursor-pointer hover:bg-[#0A7E43]/15 transition-all group active:scale-[0.99]"
      >
        <div className="flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-[#0A7E43] shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0A7E43]">
                {medicalInfo?.statusLabel || 'Apto Físico Vigente'}
              </span>
              <span className="text-[9px] bg-[#0A7E43] text-white px-2 py-0.2 rounded-full font-bold">
                Hasta {medicalInfo?.vencimiento || 'Marzo 2027'}
              </span>
            </div>
            <p className="text-[#0A7E43]/80 text-xs mt-0.5 font-medium">
              Profesional: {medicalInfo?.doctor || 'Dra. Silvina Romero'} {medicalInfo?.matricula ? `(${medicalInfo.matricula})` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#0A7E43] bg-white/70 px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-white transition-colors shrink-0">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Renovar</span>
        </div>
      </div>

      {/* Banner Institucional Grupo Familiar */}
      <div 
        onClick={() => onOpenFamilyGroup && onOpenFamilyGroup()}
        className="p-4 rounded-2xl bg-gradient-to-r from-[#001D4A] to-[#0055A4] text-white shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-white shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5 text-sky-200" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              Vínculo Familiar CAVS
            </span>
            <h4 className="text-sm font-extrabold text-white leading-tight">
              Gestioná tu grupo familiar y colegio acá
            </h4>
            <p className="text-[11px] text-blue-100/80 mt-0.5">
              Hijos a cargo, cuotas del Instituto Vélez y colonia de verano.
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card-soft p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-velez-primary" />
            <span>Ficha de Socia Registrada</span>
          </h3>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="w-9 h-9 min-h-[40px] min-w-[40px] rounded-xl border border-[#0055A4] text-[#0055A4] hover:bg-blue-50 active:scale-95 transition-all flex items-center justify-center shadow-xs"
            aria-label="Editar datos de contacto"
            title="Editar datos de contacto"
          >
            <Edit3 className="w-4 h-4 text-[#0055A4]" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {fields.map((f, i) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                {f.label}
              </span>
              <span className={`text-xs font-bold text-slate-800 mt-0.5 block truncate ${f.mono ? 'font-mono text-velez-primary' : ''}`}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Security & Config Options */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card-soft p-3 space-y-1">
        <button 
          onClick={() => setIsSecurityOpen(true)}
          className="w-full h-11 p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 active:scale-[0.98] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-velez-primary" />
            <span>Seguridad y Contraseña</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>

        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="w-full h-11 p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 active:scale-[0.98] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-velez-primary" />
            <span>Notificaciones de Partidos y Cuotas</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Modal de Edición de Datos de Contacto */}
      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        member={member}
        onSave={handleSaveContact}
      />

      {/* Modal de Carga de Apto Físico */}
      <UploadMedicalModal 
        isOpen={isUploadMedicalOpen}
        onClose={() => setIsUploadMedicalOpen(false)}
        currentMedical={medicalInfo}
        onUpdateSuccess={handleUpdateMedical}
      />

      {/* Modal de Seguridad y Contraseña */}
      <SecuritySettingsModal 
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        onSaveToast={showToast}
      />

      {/* Modal de Notificaciones de Partidos y Cuotas */}
      <NotificationsSettingsModal 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSaveToast={showToast}
      />
    </div>
  );
}
