import React from 'react';
import { STANDINGS } from '../../data/footballData';
import { Trophy, ChevronLeft } from 'lucide-react';

export default function StandingsView({ onBack }) {
  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-12">
      
      {/* Top Bar with Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-600 hover:text-[#0055A4] hover:bg-slate-100 flex items-center gap-1 text-xs font-bold transition-colors active:scale-[0.98]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-[#0055A4] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          Torneo Clausura • Grupo A
        </span>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#001D4A] via-[#091D36] to-[#0055A4] text-white p-5 shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-32 h-32 opacity-10 text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 p-2 flex items-center justify-center border border-white/20 shrink-0">
            <Trophy className="w-6 h-6 text-sky-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200">
                Torneo Clausura
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-white/20 text-white px-2 py-0.2 rounded">
                Grupo A
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white mt-0.5">Tabla de Posiciones</h2>
            <p className="text-xs text-blue-100 font-medium">
              Vélez se ubica 2° en zona de clasificación a Octavos de Final
            </p>
          </div>
        </div>
      </div>

      {/* Standings Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        
        {/* Header de Grupo */}
        <div className="px-4 py-3 bg-[#0B2240] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-sky-300">
              GRUPO A
            </span>
            <span className="text-[10px] text-slate-300 font-medium">• 15 Equipos</span>
          </div>
          <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest">
            AFA 2026
          </span>
        </div>

        {/* Tabla con scroll horizontal suave para ver todas las métricas */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider select-none">
                <th className="py-2.5 px-3 text-center w-10">#</th>
                <th className="py-2.5 px-3">Equipos</th>
                <th className="py-2.5 px-2.5 text-center font-black text-slate-900 w-12">PTS</th>
                <th className="py-2.5 px-2 text-center w-9">J</th>
                <th className="py-2.5 px-2 text-center w-14">Gol</th>
                <th className="py-2.5 px-2 text-center w-10">+/-</th>
                <th className="py-2.5 px-2 text-center w-8">G</th>
                <th className="py-2.5 px-2 text-center w-8">E</th>
                <th className="py-2.5 px-2 text-center w-8">P</th>
                <th className="py-2.5 px-3 text-center w-28">Últimas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STANDINGS.map((team) => {
                const isVelez = team.isVelez;
                const inPlayoffs = team.inPlayoffs;

                return (
                  <tr 
                    key={team.pos}
                    className={`transition-colors ${
                      isVelez 
                        ? 'bg-[#EBF3FC] font-bold ring-1 ring-inset ring-[#0055A4]' 
                        : 'hover:bg-slate-50/70 text-slate-700'
                    }`}
                  >
                    {/* # Posición */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-black ${
                        inPlayoffs 
                          ? 'bg-[#0094D8] text-white shadow-xs' 
                          : 'text-slate-400 font-bold'
                      }`}>
                        {team.pos}
                      </span>
                    </td>

                    {/* Escudo + Nombre */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={isVelez ? "/escudo-velez.png" : (team.logo || team.shield)} 
                          alt={team.team} 
                          className="w-5 h-5 object-contain shrink-0" 
                          loading="lazy" 
                        />
                        <span className={`truncate text-xs ${isVelez ? 'font-black text-[#001D4A]' : 'font-semibold text-slate-800'}`}>
                          {team.team}
                        </span>
                        {isVelez && (
                          <span className="text-[8px] bg-[#0055A4] text-white px-1.5 py-0.2 rounded font-black uppercase tracking-wider shrink-0">
                            CAVS
                          </span>
                        )}
                      </div>
                    </td>

                    {/* PTS */}
                    <td className={`py-2.5 px-2.5 text-center font-mono font-black text-sm ${isVelez ? 'text-[#0055A4]' : 'text-slate-900'}`}>
                      {team.pts}
                    </td>

                    {/* J */}
                    <td className="py-2.5 px-2 text-center font-mono text-slate-600 font-medium">
                      {team.pj}
                    </td>

                    {/* Gol (GF:GC) */}
                    <td className="py-2.5 px-2 text-center font-mono text-slate-600 text-[11px] whitespace-nowrap">
                      {team.gol}
                    </td>

                    {/* +/- Diferencia */}
                    <td className={`py-2.5 px-2 text-center font-mono font-bold text-[11px] ${
                      team.dif.startsWith('+') 
                        ? 'text-[#0A7E43]' 
                        : team.dif.startsWith('-') 
                          ? 'text-rose-600' 
                          : 'text-slate-500'
                    }`}>
                      {team.dif}
                    </td>

                    {/* G */}
                    <td className="py-2.5 px-2 text-center font-mono text-slate-600">
                      {team.g}
                    </td>

                    {/* E */}
                    <td className="py-2.5 px-2 text-center font-mono text-slate-600">
                      {team.e}
                    </td>

                    {/* P */}
                    <td className="py-2.5 px-2 text-center font-mono text-slate-600">
                      {team.p}
                    </td>

                    {/* Últimas 5 */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center gap-1">
                        {(team.ultimas || []).map((res, rIdx) => (
                          <span 
                            key={rIdx}
                            className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center text-white shrink-0 ${
                              res === 'V' 
                                ? 'bg-[#0A7E43]' 
                                : res === 'E' 
                                  ? 'bg-[#E5A000]' 
                                  : 'bg-rose-500'
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Referencias al Pie (según imagen) */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0094D8] shrink-0" />
            <span className="font-bold text-slate-800 text-[11px]">
              Octavos de Final (Puestos 1° al 8°)
            </span>
          </div>

          <span className="text-[10px] text-slate-400 font-medium">
            Fecha 14 disputada • Actualización automática
          </span>
        </div>

      </div>

    </div>
  );
}
