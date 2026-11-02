import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertOctagon, 
  Ticket, 
  ArrowRight, 
  Trophy, 
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function NextMatchCard({ 
  match, 
  user, 
  onOpenGatesModal, 
  onOpenSeasonTickets, 
  onPayDebt,
  onOpenStandings,
  onOpenFixture
}) {
  const isDebt = user.status === 'deuda';
  const hasSeasonTicket = Boolean(user.seasonTicket);
  const isAway = match.esLocal === false;

  const velezSide = { name: 'VÉLEZ', logo: '/escudo-velez.png', label: isAway ? 'Visitante' : 'Local', isVelez: true };
  const rivalSide = { name: (match.rivalShort || match.rival || '').toUpperCase(), logo: match.rivalShield, label: isAway ? 'Local' : 'Visitante', isVelez: false };
  const teams = isAway ? [rivalSide, velezSide] : [velezSide, rivalSide];

  const renderTeam = (t) => (
    <div className="flex flex-col items-center flex-1 text-center min-w-0">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shadow-xs">
        <img src={t.logo} alt={t.name} className="w-12 h-12 object-contain drop-shadow-sm" loading="lazy" />
      </div>
      <span className="text-xs font-bold text-slate-900 mt-1.5 tracking-tight whitespace-nowrap">{t.name}</span>
      <span className={`text-[10px] uppercase ${t.isVelez ? 'font-bold text-[#0055A4]' : 'font-medium text-slate-400'}`}>{t.label}</span>
    </div>
  );

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-card-soft overflow-hidden p-5 transition-all font-sans">
      
      {/* Marca de agua sutil de la «V» azulada */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.04] text-[#0055A4]">
        <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
          <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Top Header: Torneo Clausura 2026 como título + Badge Fecha 15 arriba de Posiciones/Fixture */}
      <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
        <div className="min-w-0 pr-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-tight">
            Próximo Partido
          </span>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
            Torneo Clausura 2026
          </h3>
        </div>

        {/* Columna Derecha: Fecha 15 arriba y Posiciones/Fixture abajo (Nunca 2 líneas) */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="whitespace-nowrap text-xs font-black uppercase tracking-wider text-[#0055A4] bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full shadow-sm select-none inline-block">
            {match.fechaNro || "Fecha 15"}
          </span>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 whitespace-nowrap mt-0.5">
            <button 
              onClick={onOpenStandings}
              className="hover:text-velez-primary flex items-center gap-1 transition-colors active:scale-[0.98]"
              title="Ver tabla de posiciones"
            >
              <Trophy className="w-3.5 h-3.5 text-velez-primary" />
              <span>Posiciones</span>
            </button>
            <span>•</span>
            <button 
              onClick={onOpenFixture}
              className="hover:text-velez-primary transition-colors active:scale-[0.98]"
              title="Ver fixture oficial"
            >
              Fixture
            </button>
          </div>
        </div>
      </div>

      {/* Face-off Teams Row */}
      <div className="flex items-center justify-between py-2 border-y border-slate-100/90 my-2 relative z-10">
        {/* Equipo local */}
        {renderTeam(teams[0])}

        {/* VS / Schedule */}
        <div className="flex flex-col items-center px-3 text-center">
          <span className="text-[11px] font-black text-slate-300 tracking-widest">VS</span>
          <div className="mt-1 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold tracking-tight whitespace-nowrap">
            {match.timeDisplay || match.hora}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 font-medium whitespace-nowrap">
            {match.broadcast || match.tv || "TNT Sports / ESPN Premium"}
          </span>
        </div>

        {/* Equipo visitante */}
        {renderTeam(teams[1])}
      </div>

      {/* Match Date and Stadium */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 relative z-10">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-[#0055A4]" />
          <span>{match.fecha}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 font-medium min-w-0">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{match.estadio || 'Estadio José Amalfitani'}</span>
        </div>
      </div>

      {/* CONDITIONAL STATUS BANNER & BUTTONS */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 relative z-10">

        {/* CASO V: Partido de visitante (no hay acceso para socios) */}
        {!isDebt && isAway && (
          <>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                <span className="font-bold text-xs truncate">Partido de visitante</span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap shrink-0">
                Sin público visitante
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenFixture}
              className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
            >
              <Calendar className="w-4 h-4 shrink-0 text-white" />
              <span>Ver fixture completo</span>
            </button>
          </>
        )}

        {/* CASO A: Socio Al Día SIN Abono (Acceso libre gratuito con Carnet Digital) */}
        {!isDebt && !isAway && !hasSeasonTicket && (
          <>
            <div className="p-3 rounded-xl bg-[#0A7E43]/10 border border-[#0A7E43]/25 flex items-center justify-between gap-2 text-xs text-[#0A7E43]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#0A7E43] shrink-0" />
                <span className="font-bold text-xs truncate">
                  Ingreso libre con Carnet Digital
                </span>
              </div>
              <span className="text-[11px] text-[#0A7E43] font-semibold whitespace-nowrap shrink-0">
                Populares y Plateas
              </span>
            </div>

            <div className="space-y-2">
              {/* Botón Principal: Ver accesos y puertas */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenGatesModal) onOpenGatesModal();
                  const mainEl = document.querySelector('main');
                  if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
              >
                <Compass className="w-4 h-4 shrink-0 text-white" />
                <span>Ver accesos y puertas</span>
              </button>

              {/* Botón Secundario: Adquirí abono */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenSeasonTickets) onOpenSeasonTickets();
                  const mainEl = document.querySelector('main');
                  if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full h-11 bg-white hover:bg-slate-50 text-[#0055A4] border border-[#0055A4]/40 font-semibold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] leading-none"
              >
                <Ticket className="w-4 h-4 shrink-0 text-[#0055A4]" />
                <span>Adquirí abono</span>
              </button>
            </div>
          </>
        )}

        {/* CASO B: Socio con Abono Activo */}
        {!isDebt && !isAway && hasSeasonTicket && (
          <>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-velez-primary">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-velez-primary shrink-0" />
                <div>
                  <span className="font-bold text-xs block">
                    Abonado — {user.seasonTicket.sector}
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Fila {user.seasonTicket.fila}, Butaca {user.seasonTicket.asiento} • {user.seasonTicket.puerta}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenGatesModal) onOpenGatesModal();
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
            >
              <Compass className="w-4 h-4 shrink-0 text-white" />
              <span>Ver accesos y puertas</span>
            </button>
          </>
        )}

        {/* CASO C: Socio Con Deuda */}
        {isDebt && (
          <>
            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center gap-2 text-xs text-orange-900">
              <AlertOctagon className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-bold text-xs">
                3 cuotas acumuladas • Regularizá para ingresar al Amalfitani
              </span>
            </div>

            <button
              type="button"
              onClick={onPayDebt}
              className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
            >
              <span>Regularizar cuotas (${user.quotaInfo.monto.toLocaleString('es-AR')}) →</span>
            </button>
          </>
        )}

      </div>

    </div>
  );
}
