import React, { useState } from 'react';
import { 
  X, 
  FileCheck, 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Clock
} from 'lucide-react';

export default function UploadMedicalModal({ isOpen, onClose, currentMedical, onUpdateSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [doctorName, setDoctorName] = useState(currentMedical?.doctor || 'Dra. Silvina Romero');
  const [matricula, setMatricula] = useState('MN 142.890');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile && !currentMedical?.documentUrl) {
      alert("Por favor adjuntá el archivo de tu certificado médico (PDF o Imagen).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const updated = {
        vigente: true,
        vencimiento: 'Octubre 2027',
        doctor: doctorName,
        matricula: matricula,
        statusLabel: 'En proceso de validación (24 a 48 hs)',
        pendingReview: true,
        fileName: selectedFile ? selectedFile.name : 'certificado_medico_2026.pdf'
      };
      onUpdateSuccess(updated);
      onClose();
    }, 1500);
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
        {/* Header Oficial en Azul Noche */}
        <div className="p-4 sm:p-5 bg-[#001D4A] text-white flex items-center justify-between relative overflow-hidden border-b border-white/10 shrink-0">
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <FileCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Departamento Médico CAVS
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                Certificado Médico y Apto Físico
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

        {/* Contenido Scrollable */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 pb-8 flex-1">
          
          {/* Estado Actual */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                Estado en Sistema
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0A7E43]" />
                <span className="text-xs font-bold text-slate-800">
                  {currentMedical?.statusLabel || 'Apto Físico Vigente'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Vence: <strong>{currentMedical?.vencimiento || 'Marzo 2027'}</strong> • Médico: {currentMedical?.doctor || 'Dra. Romero'}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#0A7E43]/10 text-[#0A7E43] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Zona de Carga Drag & Drop */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Subir Nuevo Certificado (PDF o Foto)
            </label>
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                isDragOver 
                  ? 'border-[#0055A4] bg-blue-50/70' 
                  : selectedFile
                  ? 'border-[#0A7E43] bg-emerald-50/40'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
              onClick={() => document.getElementById('medical-file-input')?.click()}
            >
              <input 
                id="medical-file-input"
                type="file" 
                accept="application/pdf,image/*" 
                className="hidden"
                onChange={handleFileChange}
              />
              
              {selectedFile ? (
                <div className="space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0A7E43] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-extrabold text-slate-900 mt-2 truncate max-w-xs">{selectedFile.name}</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Archivo seleccionado • Toca para cambiar</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0055A4] flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2">
                    Arrastrá tu certificado aquí o <span className="text-[#0055A4] underline">examiná tus archivos</span>
                  </p>
                  <p className="text-[11px] text-slate-400">Formatos soportados: PDF, JPG o PNG (Máx 10 MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Campos Complementarios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Nombre y Apellido del Médico
              </label>
              <input 
                type="text" 
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none"
                placeholder="Dr. / Dra. ..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Matrícula Nacional o Provincial (MN/MP)
              </label>
              <input 
                type="text" 
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#0055A4]/20 focus:border-[#0055A4] outline-none"
                placeholder="MN 123456 / MP 98765"
              />
            </div>
          </div>

          {/* Información Institucional */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-[#001D4A] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0055A4]" />
              <span>Tiempo de Auditoría Médica: 24 a 48 hs hábiles</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              El certificado será revisado por los médicos oficiales del club en el Polideportivo para habilitar tu ingreso a piletas, fitness y disciplinas competitivas.
            </p>
          </div>

          {/* Botón de Envío */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 min-h-[48px] rounded-2xl bg-[#0055A4] hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enviando al Departamento Médico...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Enviar para Validación Médica</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
