import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  CheckCircle2, 
  Sparkles,
  Stethoscope,
  Flame,
  Activity,
  ArrowRight,
  UploadCloud
} from 'lucide-react';
import BookingModal from './BookingModal';
import UploadMedicalModal from '../profile/UploadMedicalModal';

export default function BookingsView({ onBack, currentUser, showToast }) {
  const [activeTab, setActiveTab] = useState('canchas'); // 'canchas' | 'quinchos' | 'medicos'
  const [isUploadMedicalOpen, setIsUploadMedicalOpen] = useState(false);

  // Fechas disponibles próximas (7 días)
  const availableDates = [
    { label: 'Hoy', day: '27 Oct', full: 'Martes 27 de Octubre' },
    { label: 'Mañana', day: '28 Oct', full: 'Miércoles 28 de Octubre' },
    { label: 'Jueves', day: '29 Oct', full: 'Jueves 29 de Octubre' },
    { label: 'Viernes', day: '30 Oct', full: 'Viernes 30 de Octubre' },
    { label: 'Sábado', day: '31 Oct', full: 'Sábado 31 de Octubre' },
    { label: 'Domingo', day: '01 Nov', full: 'Domingo 1 de Noviembre' },
    { label: 'Lunes', day: '02 Nov', full: 'Lunes 2 de Noviembre' }
  ];

  const [selectedDate, setSelectedDate] = useState(availableDates[1]); // Mañana por defecto

  // Estado de selección de horarios por ítem
  const [selectedSlots, setSelectedSlots] = useState({
    padel: '18:00',
    futbol: '19:00',
    tenis: '16:00',
    quincho_familiar: '11:00 a 17:00 (Almuerzo)',
    parrilla_individual: '12:00 a 18:00',
    apto_competitivo: '10:15',
    apto_pileta: '11:30',
    clinica_general: '15:20'
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSelectSlot = (itemId, slot) => {
    setSelectedSlots(prev => ({ ...prev, [itemId]: slot }));
  };

  const handleBook = (item, slot) => {
    const booking = {
      title: item.title,
      venue: item.venue,
      date: selectedDate.full,
      slot: slot,
      requirements: item.requirements || 'Presentarse 15 minutos antes con DNI y carnet de socio en recepción.',
      code: `RES-${item.id.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setConfirmedBooking(booking);
    if (showToast) {
      showToast(`¡Reserva confirmada para ${item.title}!`);
    }
  };

  const CANCHAS = [
    {
      id: 'padel',
      title: 'Canchas de Pádel Panorámicas',
      subtitle: 'Pistas de blindex con césped sintético e iluminación LED',
      venue: 'Polideportivo CAVS - Sector Pádel',
      slots: ['15:00', '16:30', '18:00', '19:30', '21:00'],
      duration: '90 min',
      price: 8500,
      priceLabel: 'por turno'
    },
    {
      id: 'futbol',
      title: 'Fútbol Sintético 5 / 8',
      subtitle: 'Canchas Bajo Autopista con césped sintético de alta densidad',
      venue: 'Polideportivo CAVS - Bajo Autopista',
      slots: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      duration: '60 min',
      price: 14000,
      priceLabel: 'por hora'
    },
    {
      id: 'tenis',
      title: 'Tenis Polvo de Ladrillo',
      subtitle: 'Canchas 1 a 6 con mantenimiento profesional de superficie',
      venue: 'Polideportivo CAVS - Sector Tenis',
      slots: ['08:30', '10:00', '11:30', '14:30', '16:00', '17:30', '19:00'],
      duration: '60 min',
      price: 7200,
      priceLabel: 'por hora'
    }
  ];

  const QUINCHOS = [
    {
      id: 'quincho_familiar',
      title: 'Quincho Familiar Nº 3 Techado',
      subtitle: 'Capacidad para 30 personas con parrilla doble, mesadas y heladera',
      venue: 'Polideportivo CAVS - Sector Arboleda',
      slots: ['11:00 a 17:00 (Almuerzo)', '19:00 a 01:00 (Cena)'],
      duration: '6 horas',
      price: 22000,
      priceLabel: 'por turno'
    },
    {
      id: 'parrilla_individual',
      title: 'Parrilla Individual con Mesa y Banco',
      subtitle: 'Sector pícnic y sombra natural para hasta 8 personas',
      venue: 'Polideportivo CAVS - Sector Parque',
      slots: ['11:00 a 16:00', '12:00 a 18:00', '17:00 a 22:00'],
      duration: 'Turno diurno',
      price: 0,
      priceLabel: 'Gratuito socios al día'
    }
  ];

  const MEDICOS = [
    {
      id: 'apto_competitivo',
      title: 'Apto Físico Competitivo',
      subtitle: 'Ergometría, auscultación cardíaca y validación oficial para disciplinas competitivas',
      venue: 'Departamento Médico - Polideportivo CAVS',
      doctor: 'Dr. Horacio Lezcano (Medicina del Deporte)',
      requirements: 'Presentarse 15 min antes con DNI, ropa deportiva y 3 hs de ayuno.',
      slots: ['09:00', '09:30', '10:15', '11:00', '15:00', '16:30', '17:30'],
      duration: '25 min',
      price: 0,
      priceLabel: 'Sin cargo socios CAVS',
      badge: 'Válido por 1 año'
    },
    {
      id: 'apto_pileta',
      title: 'Apto Pileta y Natatorio',
      subtitle: 'Revisación médica dermatológica y micótica para natatorio olímpico',
      venue: 'Consultorio Natatorio - Polideportivo',
      doctor: 'Dra. Silvina Romero',
      requirements: 'Presentarse con carnet social al día y traje de baño.',
      slots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'],
      duration: '15 min',
      price: 0,
      priceLabel: 'Gratuito socios al día',
      badge: 'Válido por 30 días'
    },
    {
      id: 'clinica_general',
      title: 'Clínica General Polideportivo',
      subtitle: 'Control general de salud deportiva, certificados y consultas médicas',
      venue: 'Consultorios 2do Piso - Polideportivo',
      doctor: 'Dr. Fernando Rossi y equipo',
      requirements: 'Presentarse 15 min antes con DNI.',
      slots: ['14:00', '14:40', '15:20', '16:40', '18:00'],
      duration: '20 min',
      price: 0,
      priceLabel: 'Sin cargo socios'
    }
  ];

  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-8">
      
      {/* Top Navigation Bar with Back Arrow */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 hover:bg-slate-50 flex items-center justify-center text-slate-700 active:scale-[0.98] transition-all shadow-sm"
          aria-label="Volver al inicio"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Turnos y Reservas
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Instalaciones del Polideportivo y Servicios Médicos
          </p>
        </div>
      </div>

      {/* Selector de Pestañas Superiores (3 Tabs) */}
      <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center gap-1 border border-slate-300/60">
        <button
          onClick={() => setActiveTab('canchas')}
          className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
            activeTab === 'canchas'
              ? 'bg-[#0055A4] text-white shadow-md shadow-[#0055A4]/25'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Canchas</span>
        </button>

        <button
          onClick={() => setActiveTab('quinchos')}
          className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
            activeTab === 'quinchos'
              ? 'bg-[#0055A4] text-white shadow-md shadow-[#0055A4]/25'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Quinchos</span>
        </button>

        <button
          onClick={() => setActiveTab('medicos')}
          className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
            activeTab === 'medicos'
              ? 'bg-[#0055A4] text-white shadow-md shadow-[#0055A4]/25'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Médicos</span>
        </button>
      </div>

      {/* Selector Horizontal de Fechas */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0055A4]" />
            <span>Seleccioná la Fecha de Reserva:</span>
          </span>
          <span className="text-[11px] font-bold text-slate-800">
            {selectedDate.full}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {availableDates.map((d) => {
            const isSelected = selectedDate.day === d.day;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => setSelectedDate(d)}
                className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl border text-center transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#0055A4] bg-blue-50/80 text-[#0055A4] ring-2 ring-[#0055A4]/20 shadow-sm font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] uppercase block font-semibold">{d.label}</span>
                <span className="text-xs font-extrabold block mt-0.5">{d.day}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Listado de Cards según Pestaña Activa */}
      <div className="space-y-3.5">
        
        {/* PESTAÑA 1: CANCHAS */}
        {activeTab === 'canchas' && (
          CANCHAS.map((item) => {
            const currentSlot = selectedSlots[item.id] || item.slots[0];
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft p-4 space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md shrink-0 ml-2">
                      {item.duration}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0055A4]" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                {/* Horarios Disponibles */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Horarios Disponibles para {selectedDate.day}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.slots.map((s) => {
                      const isSlotSelected = currentSlot === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSelectSlot(item.id, s)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border active:scale-[0.98] ${
                            isSlotSelected
                              ? 'bg-[#0055A4] border-[#0055A4] text-white shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {s} hs
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer y CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">
                      ${item.price.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {item.priceLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBook(item, currentSlot)}
                    className="h-11 px-4 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-[#0055A4]/25"
                  >
                    <span>Reservar Cancha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* PESTAÑA 2: QUINCHOS */}
        {activeTab === 'quinchos' && (
          QUINCHOS.map((item) => {
            const currentSlot = selectedSlots[item.id] || item.slots[0];
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft p-4 space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0055A4]" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                {/* Turnos Disponibles */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Turnos Disponibles para {selectedDate.day}:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {item.slots.map((s) => {
                      const isSlotSelected = currentSlot === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSelectSlot(item.id, s)}
                          className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between active:scale-[0.98] ${
                            isSlotSelected
                              ? 'bg-blue-50/80 border-[#0055A4] text-[#0055A4] ring-1 ring-[#0055A4]'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{s}</span>
                          {isSlotSelected && <Check className="w-4 h-4 text-[#0055A4]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer y CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {item.price > 0 ? (
                      <>
                        <span className="text-base font-extrabold text-slate-900">
                          ${item.price.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          {item.priceLabel}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-extrabold text-emerald-600 block">
                          Sin Cargo
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          {item.priceLabel}
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handleBook(item, currentSlot)}
                    className="h-11 px-4 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-[#0055A4]/25"
                  >
                    <span>Reservar Quincho</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* PESTAÑA 3: TURNOS MÉDICOS */}
        {activeTab === 'medicos' && (
          <div className="space-y-3.5">
            {/* Banner Carga Certificado Externo */}
            <div 
              onClick={() => setIsUploadMedicalOpen(true)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#001D4A] to-[#0055A4] text-white shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <UploadCloud className="w-4 h-4 text-sky-200" />
                </div>
                <div>
                  <span className="text-xs font-bold block">¿Ya tenés certificado médico externo?</span>
                  <span className="text-[10px] text-blue-200">Subí el PDF o foto directamente para validación sin sacar turno.</span>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-white text-[#001D4A] px-2.5 py-1 rounded-xl shrink-0">
                Subir ahora
              </span>
            </div>

            {MEDICOS.map((item) => {
              const currentSlot = selectedSlots[item.id] || item.slots[0];
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft p-4 space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="inline-block mt-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <p className="text-xs text-slate-500 mt-1 leading-snug">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1 text-[#0055A4] font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>{item.doctor}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Horarios de Turno */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Horarios de Consulta para {selectedDate.day}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.slots.map((s) => {
                        const isSlotSelected = currentSlot === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSelectSlot(item.id, s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border active:scale-[0.98] ${
                              isSlotSelected
                                ? 'bg-[#0055A4] border-[#0055A4] text-white shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {s} hs
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer y CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {item.price > 0 ? (
                        <>
                          <span className="text-base font-extrabold text-slate-900">
                            ${item.price.toLocaleString('es-AR')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            {item.priceLabel}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-extrabold text-emerald-600 block">
                            Bonificado
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            {item.priceLabel}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => handleBook(item, currentSlot)}
                      className="h-11 px-4 rounded-xl bg-[#0055A4] hover:bg-[#004282] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-[#0055A4]/25"
                    >
                      <span>Solicitar Turno</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal de Confirmación de Turno / Reserva */}
      <BookingModal 
        isOpen={!!confirmedBooking}
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onAddToCalendar={(b) => showToast && showToast(`¡Turno ${b.title} agregado a tu calendario!`)}
      />

      {/* Modal de Carga de Apto Médico */}
      <UploadMedicalModal 
        isOpen={isUploadMedicalOpen}
        onClose={() => setIsUploadMedicalOpen(false)}
        currentMedical={currentUser?.aptoFisico}
        onUpdateSuccess={(med) => showToast && showToast("Certificado médico enviado. En proceso de validación (24 a 48 hs).")}
      />

    </div>
  );
}
