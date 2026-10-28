import React from 'react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Award,
  HeartHandshake,
  QrCode,
  FileCheck
} from 'lucide-react';

export default function ProfileView({ member, onOpenCarnet }) {
  const profileFields = [
    { label: "Nombre Completo", val: member.nombre },
    { label: "Documento (DNI)", val: member.dni },
    { label: "Número de Socio", val: member.nroSocio, mono: true },
    { label: "Categoría Social", val: member.categoria },
    { label: "Fecha de Nacimiento", val: member.fechaNacimiento },
    { label: "Fecha de Ingreso", val: member.socioDesde },
    { label: "Género", val: member.genero },
    { label: "Nacionalidad", val: member.nacionalidad },
    { label: "Estado Civil", val: member.estadoCivil },
    { label: "Apto Físico Médico", val: `${member.aptoFisico.vigente ? 'Vigente hasta ' + member.aptoFisico.vencimiento : 'Pendiente'}` },
  ];

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-velez-navy via-[#002D72] to-velez-blue text-white p-6 rounded-3xl shadow-xl relative overflow-hidden mb-5">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full p-1 bg-white/20 border-2 border-white/60 mb-3 relative">
            <img 
              src={member.avatar} 
              alt={member.nombre} 
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-velez-blue rounded-full p-1 border border-white">
              <img src="/escudo-velez.png" alt="CAVS" className="w-4 h-4 object-contain" />
            </div>
          </div>

          <h2 className="text-xl font-black tracking-tight">{member.nombre}</h2>
          <p className="text-xs text-sky-200 font-semibold">{member.categoria} • Socio #{member.nroSocio}</p>

          <button
            onClick={onOpenCarnet}
            className="mt-4 px-4 py-2 rounded-xl bg-white text-velez-navy text-xs font-bold shadow-md hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-velez-blue" />
            <span>Ver Carnet Digital QR</span>
          </button>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-velez-blue" />
          <span>Datos Personales Oficiales</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profileFields.map((f, i) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                {f.label}
              </span>
              <span className={`text-xs font-bold text-slate-800 mt-0.5 block ${f.mono ? 'font-mono text-velez-blue' : ''}`}>
                {f.val}
              </span>
            </div>
          ))}
        </div>

        {/* Medical Cert Box */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-emerald-900 block">Certificado Médico Registrado</span>
            <p className="text-emerald-700 text-[11px] mt-0.5">{member.aptoFisico.certificado}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
