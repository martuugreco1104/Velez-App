import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  GraduationCap, 
  Sun, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  UserPlus,
  Plus,
  X
} from 'lucide-react';
import { FAMILY_GROUP_MOCK } from '../../data/familyGroupData';
import SummerCampView from './SummerCampView';

export default function FamilyGroupView({ onBack, onPay, showToast, currentUser }) {
  const [familyData, setFamilyData] = useState(() => {
    try {
      const saved = localStorage.getItem('velez_family_group');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    if (currentUser?.hasFamilyGroup === false) {
      return {
        titular: {
          name: currentUser.nombre,
          role: "Titular / Administradora",
          sociaNumber: currentUser.nroSocio,
          dni: currentUser.dni,
          quotaStatus: currentUser.status
        },
        members: []
      };
    }
    return FAMILY_GROUP_MOCK;
  });

  const saveFamilyData = (newData) => {
    setFamilyData(newData);
    try {
      localStorage.setItem('velez_family_group', JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
  };

  const [selectedMemberForCamp, setSelectedMemberForCamp] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario de nuevo menor con máscara de 5 dígitos (XX.XXX)
  const [newMemberName, setNewMemberName] = useState('Lucas Greco');
  const [newMemberRel, setNewMemberRel] = useState('Hijo');
  const [newMemberAge, setNewMemberAge] = useState('9');
  const [newMemberDni, setNewMemberDni] = useState('54.891.203');
  const [newMemberSocio, setNewMemberSocio] = useState('84.105');
  const [newMemberSchool, setNewMemberSchool] = useState(true);

  // Helper para máscara estricta de 5 dígitos con punto (XX.XXX)
  const formatSocioMask = (val) => {
    const digits = String(val).replace(/\D/g, '').slice(0, 5);
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}`;
    }
    return digits;
  };

  // Sincronizar si cambia el usuario simulado sin sobrescribir si ya hay datos
  useEffect(() => {
    if (currentUser?.hasFamilyGroup === false) {
      const emptyGroup = {
        titular: {
          name: currentUser.nombre,
          role: "Titular / Administradora",
          sociaNumber: currentUser.nroSocio,
          dni: currentUser.dni,
          quotaStatus: currentUser.status
        },
        members: []
      };
      setFamilyData(emptyGroup);
    }
  }, [currentUser]);

  // Calcular conceptos pendientes unificados
  const pendingItems = [];

  familyData.members.forEach(m => {
    if (m.quotaStatus !== 'al_dia') {
      pendingItems.push({
        id: `quota_${m.id}`,
        memberId: m.id,
        memberName: m.name,
        type: 'quota',
        concept: `Cuota Social ${m.name}`,
        amount: m.quotaAmount
      });
    }

    if (m.institute && m.institute.enrolled && m.institute.status !== 'al_dia') {
      pendingItems.push({
        id: `school_${m.id}`,
        memberId: m.id,
        memberName: m.name,
        type: 'school',
        concept: `Arancel Colegio ${m.name} (${m.institute.currentMonth})`,
        amount: m.institute.tuitionAmount
      });
    }
  });

  const totalPendingAmount = pendingItems.reduce((acc, curr) => acc + curr.amount, 0);

  // Manejar pago unificado: actualiza de inmediato el estado en localStorage y recalcula a $0
  const handlePayUnified = () => {
    if (pendingItems.length === 0) return;
    const count = pendingItems.length;

    // Actualizar todos los miembros a 'al_dia'
    const updatedMembers = familyData.members.map(m => ({
      ...m,
      quotaStatus: 'al_dia',
      institute: m.institute ? {
        ...m.institute,
        status: 'al_dia'
      } : m.institute
    }));

    const updatedData = {
      ...familyData,
      members: updatedMembers
    };

    saveFamilyData(updatedData);

    onPay(
      totalPendingAmount, 
      `Pago Unificado Grupo Familiar (${count} conceptos: Cuota/Colegio)`
    );
  };

  // Manejar pago individual: actualiza de inmediato el estado en localStorage
  const handlePaySingle = (memberId, type, amount, concept) => {
    const updatedMembers = familyData.members.map(m => {
      if (m.id === memberId) {
        if (type === 'quota') {
          return { ...m, quotaStatus: 'al_dia' };
        } else if (type === 'school' && m.institute) {
          return { ...m, institute: { ...m.institute, status: 'al_dia' } };
        }
      }
      return m;
    });

    const updatedData = {
      ...familyData,
      members: updatedMembers
    };

    saveFamilyData(updatedData);
    onPay(amount, concept);
  };

  // Confirmar inscripción a colonia
  const handleConfirmSummerCamp = (registrationData) => {
    const updatedData = {
      ...familyData,
      members: familyData.members.map(m => {
        if (m.id === registrationData.memberId) {
          return {
            ...m,
            summerCamp: {
              enrolled: true,
              modality: registrationData.modality,
              amount: registrationData.amount,
              status: 'al_dia'
            }
          };
        }
        return m;
      })
    };

    saveFamilyData(updatedData);
    setSelectedMemberForCamp(null);
    if (showToast) {
      showToast(`¡Inscripción confirmada para ${registrationData.memberName} en la Colonia 2027!`);
    }
  };

  // Agregar nuevo familiar con máscara oficial de 5 dígitos (XX.XXX)
  const handleAddNewMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) {
      alert("Por favor ingresá el nombre y apellido del menor.");
      return;
    }

    const createdMember = {
      id: `fam_${Date.now()}`,
      name: newMemberName.trim(),
      relationship: newMemberRel,
      age: parseInt(newMemberAge) || 9,
      socioNumber: formatSocioMask(newMemberSocio) || "84.105",
      dni: newMemberDni.trim() || "54.891.203",
      avatar: newMemberRel === 'Hija' 
        ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80",
      quotaStatus: 'al_dia',
      quotaAmount: 22000,
      institute: {
        enrolled: newMemberSchool,
        level: newMemberSchool ? "Nivel Primario Instituto Vélez" : "No matriculado",
        currentMonth: "Octubre 2026",
        tuitionAmount: 115000,
        status: 'al_dia'
      },
      summerCamp: {
        enrolled: false,
        eligible: true
      }
    };

    const updatedData = {
      ...familyData,
      members: [createdMember, ...familyData.members]
    };

    saveFamilyData(updatedData);
    setIsAddModalOpen(false);
    if (showToast) {
      showToast(`¡${createdMember.name} fue vinculado con éxito a tu Grupo Familiar CAVS!`);
    }
  };

  // Si hay un menor seleccionado para colonia, mostrar vista dedicada
  if (selectedMemberForCamp) {
    const hasSiblingDiscount = familyData.members.some(
      m => m.id !== selectedMemberForCamp.id && m.summerCamp?.enrolled
    );
    return (
      <SummerCampView 
        member={selectedMemberForCamp}
        onBack={() => setSelectedMemberForCamp(null)}
        onConfirm={handleConfirmSummerCamp}
        hasSiblingDiscount={hasSiblingDiscount}
      />
    );
  }

  return (
    <div className="space-y-4 font-sans animate-fadeIn pb-12">
      
      {/* 1. Header de Sección con Identidad Vélez */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={onBack}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0055A4] hover:border-[#0055A4]/40 active:scale-95 transition-all shrink-0 mt-0.5"
            aria-label="Volver a la pantalla anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0055A4] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                Vínculo Familiar CAVS
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Grupo Familiar CAVS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              Administrá cuotas, aranceles escolares y actividades de tus hijos desde un solo lugar
            </p>
          </div>
        </div>

        {/* Botón Agregar Familiar */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-10 min-h-[40px] px-3 rounded-xl bg-blue-50 hover:bg-[#0055A4] text-[#0055A4] hover:text-white border border-blue-200 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-xs shrink-0 mt-0.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar Familiar</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>

      {/* 2. Banner Resumen Global & Pago Total Unificado */}
      <div className="rounded-2xl bg-gradient-to-br from-[#001D4A] via-[#00275C] to-[#001433] text-white p-4 sm:p-5 shadow-lg relative overflow-hidden border border-white/10">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Titular: {familyData.titular.name}
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-medium">
                Socia Nº {familyData.titular.sociaNumber}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {familyData.members.length + 1} Integrantes Registrados
            </h3>
            <p className="text-xs text-blue-100/90 mt-0.5">
              {familyData.members.length === 0
                ? 'No tenés menores vinculados. Presioná el botón de abajo para agregar un familiar.'
                : pendingItems.length > 0 
                  ? `Hay ${pendingItems.length} concepto(s) con vencimiento o pendientes en el grupo familiar.`
                  : 'Todas las cuotas y colegiaturas del grupo familiar se encuentran al día.'}
            </p>
          </div>

          {pendingItems.length > 0 ? (
            <div className="shrink-0">
              <button
                onClick={handlePayUnified}
                className="w-full sm:w-auto h-12 min-h-[48px] px-5 rounded-xl bg-white hover:bg-slate-50 text-[#001D4A] font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 border border-white leading-none"
              >
                <CreditCard className="w-4 h-4 shrink-0 text-[#0055A4]" />
                <span>Pagar total unificado (${totalPendingAmount.toLocaleString('es-AR')}) →</span>
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A7E43]/30 border border-[#0A7E43]/60 text-emerald-200 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cuentas al Día</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Empty State si no tiene integrantes */}
      {familyData.members.length === 0 ? (
        <div className="p-8 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 my-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0055A4] flex items-center justify-center mx-auto border border-blue-200">
            <Users className="w-8 h-8" />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="text-base font-black text-slate-900">Aún no tenés familiares vinculados</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Vinculá a tus hijos a cargo para gestionar centralizadamente sus cuotas sociales, aranceles escolares del Instituto Vélez y la inscripción a la colonia de vacaciones.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-12 min-h-[48px] px-6 rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-95 text-white font-black text-xs transition-all shadow-md shadow-blue-900/25 inline-flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Vincular Hijo / Familiar a Cargo</span>
          </button>
        </div>
      ) : (
        /* 4. Fichas de Integrantes (Cards) */
        <div className="space-y-4">
          {familyData.members.map((member) => {
            const isMemberQuotaPaid = member.quotaStatus === 'al_dia';
            const isSchoolPaid = member.institute?.status === 'al_dia';
            const isCampEnrolled = member.summerCamp?.enrolled;

            return (
              <div 
                key={member.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-card-soft overflow-hidden transition-all hover:border-[#0055A4]/40"
              >
                {/* Cabecera del Integrante: Ordenada y sin badges dispersos */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">{member.name}</h3>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                          {member.relationship} • {member.age} años
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                        Socio Nº {member.socioNumber} • DNI {member.dni}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                      isMemberQuotaPaid && (!member.institute?.enrolled || isSchoolPaid)
                        ? 'bg-emerald-50 text-[#0A7E43] border-emerald-200' 
                        : 'bg-orange-50 text-orange-800 border-orange-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isMemberQuotaPaid && (!member.institute?.enrolled || isSchoolPaid)
                          ? 'bg-[#0A7E43]' 
                          : 'bg-orange-500'
                      }`} />
                      <span>
                        {isMemberQuotaPaid && (!member.institute?.enrolled || isSchoolPaid)
                          ? 'Al día' 
                          : 'Pendiente'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  
                  {/* Fila Cuota Social Menor */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Cuota Social Menor Semipleno</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Octubre 2026 • ${member.quotaAmount.toLocaleString('es-AR')}
                      </span>
                    </div>

                    {!isMemberQuotaPaid ? (
                      <button
                        onClick={() => handlePaySingle(member.id, 'quota', member.quotaAmount, `Cuota Social ${member.name} (Octubre 2026)`)}
                        className="h-9 min-h-[40px] px-3.5 rounded-xl bg-[#0055A4] hover:bg-blue-700 text-white text-xs font-bold active:scale-95 transition-all shadow-xs"
                      >
                        Abonar
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-[#0A7E43] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Abonada</span>
                      </span>
                    )}
                  </div>

                  {/* Fila Colegio Instituto Vélez */}
                  {member.institute?.enrolled && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0055A4] flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#001D4A] block">Instituto Dr. Dalmacio Vélez Sarsfield</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {member.institute.level} • ${member.institute.tuitionAmount.toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>

                      <div>
                        {!isSchoolPaid ? (
                          <button
                            onClick={() => handlePaySingle(member.id, 'school', member.institute.tuitionAmount, `Arancel Colegio ${member.name} (${member.institute.level})`)}
                            className="h-9 min-h-[40px] px-3.5 rounded-xl bg-[#0055A4] hover:bg-blue-700 text-white text-xs font-bold active:scale-95 transition-all shadow-xs"
                          >
                            Pagar Arancel
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-[#0A7E43] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Al día</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fila Colonia de Verano */}
                  {isCampEnrolled ? (
                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0A7E43] flex items-center justify-center shrink-0">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-emerald-950 block">Inscripto a Colonia Verano 2027</span>
                          <span className="text-[11px] text-[#0A7E43] font-medium">{member.summerCamp.modality}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0A7E43] bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-xs">
                        Habilitado
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0055A4] flex items-center justify-center shrink-0 mt-0.5">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Colonia de Verano 2027</span>
                          <span className="text-[11px] text-slate-500">
                            Piletas, deportes y recreación en el Polideportivo
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedMemberForCamp(member)}
                        className="h-9 min-h-[40px] px-3.5 rounded-xl bg-[#0055A4] hover:bg-blue-700 text-white text-xs font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Inscribir</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: AGREGAR FAMILIAR / MENOR A CARGO */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideUp flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <UserPlus className="w-5 h-5 text-sky-200" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 block">
                    Vínculo Familiar CAVS
                  </span>
                  <h3 className="text-base font-black tracking-tight text-white leading-tight">
                    Vincular Familiar a Cargo
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 min-h-[40px] min-w-[40px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleAddNewMember} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre y Apellido</label>
                <input 
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ej: Lucas Greco"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parentesco</label>
                  <select
                    value={newMemberRel}
                    onChange={(e) => setNewMemberRel(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                  >
                    <option value="Hijo">Hijo</option>
                    <option value="Hija">Hija</option>
                    <option value="Menor a Cargo">Menor a Cargo</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Edad</label>
                  <input 
                    type="number"
                    min="1"
                    max="17"
                    required
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0055A4]/20 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">DNI del Menor</label>
                  <input 
                    type="text"
                    required
                    value={newMemberDni}
                    onChange={(e) => setNewMemberDni(e.target.value)}
                    placeholder="54.891.203"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nº Socio (Opcional - XX.XXX)</label>
                  <input 
                    type="text"
                    value={newMemberSocio}
                    onChange={(e) => setNewMemberSocio(formatSocioMask(e.target.value))}
                    placeholder="84.105"
                    maxLength={6}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-[#0055A4]/20 outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-200 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={newMemberSchool}
                  onChange={(e) => setNewMemberSchool(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0055A4] focus:ring-[#0055A4]"
                />
                <span className="text-[11px] text-slate-700 font-medium">
                  Alumno/a matriculado en el <strong className="text-[#001D4A]">Instituto Dr. Dalmacio Vélez Sarsfield</strong>
                </span>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-95 text-white font-black text-xs transition-all shadow-lg shadow-blue-900/25 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Confirmar y Vincular al Grupo Familiar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
