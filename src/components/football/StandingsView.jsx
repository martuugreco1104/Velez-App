import React, { useState } from 'react';
import { STANDINGS, STANDINGS_GRUPO_B, ANNUAL_STANDINGS } from '../../data/footballData';
import { Trophy, ChevronLeft, Award } from 'lucide-react';

export default function StandingsView({ onBack }) {
  const [standingsSubTab, setStandingsSubTab] = useState('clausura'); // 'clausura' | 'annual'
  const [clausuraGroup, setClausuraGroup] = useState('A'); // 'A' | 'B'

  const activeTeamsList = standingsSubTab === 'annual' 
    ? ANNUAL_STANDINGS 
    : clausuraGroup === 'A' 
      ? STANDINGS 
      : STANDINGS_GRUPO_B;

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
          {standingsSubTab === 'clausura' ? `Torneo Clausura • Grupo ${clausuraGroup}` : 'Tabla Anual Acumulada 2026'}
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
            {standingsSubTab === 'clausura' ? (
              <Trophy className="w-6 h-6 text-sky-200" />
            ) : (
              <Award className="w-6 h-6 text-sky-200" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200">
                {standingsSubTab === 'clausura' ? 'Torneo Clausura' : 'Clasificación a Copas'}
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-white/20 text-white px-2 py-0.2 rounded">
                {standingsSubTab === 'clausura' ? `Grupo ${clausuraGroup}` : 'Anual 2026'}
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white mt-0.5">Tabla de Posiciones</h2>
            <p className="text-xs text-blue-100 font-medium">
              {standingsSubTab === 'clausura'
                ? (clausuraGroup === 'A' 
                    ? 'Vélez se ubica 3° en zona de clasificación a Octavos de Final' 
                    : 'Central y Argentinos lideran el Grupo B')
                : 'Vélez se ubica 4° en Tabla Anual, en zona de Copa Sudamericana'}
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tabs Selector: Clausura vs Anual */}
      <div className="flex gap-2 p-1 bg-white rounded-xl border border-slate-200 text-xs font-bold">
        <button
          onClick={() => setStandingsSubTab('clausura')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            standingsSubTab === 'clausura'
              ? 'bg-blue-50 text-[#0055A4] border border-blue-200 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Torneo Clausura</span>
        </button>

        <button
          onClick={() => setStandingsSubTab('annual')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            standingsSubTab === 'annual'
              ? 'bg-blue-50 text-[#0055A4] border border-blue-200 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-[#0055A4]" />
          <span>Tabla Anual 2026 (Copas)</span>
        </button>
      </div>

      {/* Selector de Grupo A / Grupo B si está en Clausura */}
      {standingsSubTab === 'clausura' && (
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setClausuraGroup('A')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              clausuraGroup === 'A'
                ? 'bg-[#0055A4] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Grupo A (Vélez Sarsfield)</span>
          </button>
          <button
            onClick={() => setClausuraGroup('B')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              clausuraGroup === 'B'
                ? 'bg-[#0055A4] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Grupo B</span>
          </button>
        </div>
      )}

      {/* Standings Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        
        {/* Header de Grupo */}
        <div className="px-4 py-3 bg-[#0B2240] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-sky-300">
              {standingsSubTab === 'clausura' 
                ? `GRUPO ${clausuraGroup} • 15 EQUIPOS` 
                : 'TABLA ANUAL ACUMULADA 2026 • 30 EQUIPOS'}
            </span>
            <span className="text-[10px] text-slate-300 font-medium">
              {standingsSubTab === 'clausura' ? '• Torneo Clausura' : '• Clasificación Internacional'}
            </span>
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
                {standingsSubTab === 'annual' ? (
                  <th className="py-2.5 px-3 text-center w-28">Clasificación</th>
                ) : (
                  <th className="py-2.5 px-3 text-center w-28">Últimas</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTeamsList.map((team) => {
                const isVelez = team.isVelez;
                const inPlayoffs = team.inPlayoffs;
                const isLibertadores = standingsSubTab === 'annual' && team.copa === 'Libertadores';
                const isSudamericana = standingsSubTab === 'annual' && team.copa === 'Sudamericana';

                return (
                  <tr 
                    key={`${team.pos}_${team.team}`}
                    className={`transition-colors ${
                      isVelez 
                        ? 'bg-[#EBF3FC] font-bold ring-1 ring-inset ring-[#0055A4]' 
                        : 'hover:bg-slate-50/70 text-slate-700'
                    }`}
                  >
                    {/* # Posición */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-black ${
                        standingsSubTab === 'clausura'
                          ? inPlayoffs ? 'bg-[#0094D8] text-white shadow-xs' : 'text-slate-400 font-bold'
                          : isLibertadores
                            ? 'bg-[#0094D8] text-white shadow-xs'
                            : isSudamericana
                              ? 'bg-[#E5A000] text-white shadow-xs'
                              : 'text-slate-400 font-bold'
                      }`}>
                        {team.pos}
                      </span>
                    </td>

                    {/* Escudo + Nombre */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        {(isVelez || team.logo) ? (
                        <img 
                          src={isVelez ? "/escudo-velez.png" : team.logo} 
                          alt={team.team} 
                          className="w-5 h-5 object-contain shrink-0" 
                          loading="lazy" 
                        />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-[8px] font-black text-slate-500 flex items-center justify-center shrink-0">
                            {team.team.slice(0, 2).toUpperCase()}
                          </span>
                        )}
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

                    {/* Columna Derecha: Clasificación en Anual o Racha en Clausura */}
                    {standingsSubTab === 'annual' ? (
                      <td className="py-2.5 px-3 text-center">
                        {isLibertadores ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-[#0094D8]/10 text-[#0094D8] px-2 py-0.5 rounded-md border border-[#0094D8]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0094D8]" />
                            <span>Libertadores</span>
                          </span>
                        ) : isSudamericana ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-amber-50 text-[#E5A000] px-2 py-0.5 rounded-md border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A000]" />
                            <span>Sudamericana</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">—</span>
                        )}
                      </td>
                    ) : (
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {team.ultimas?.map((res, i) => (
                            <span 
                              key={i}
                              className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center text-white ${
                                res === 'V' 
                                  ? 'bg-[#0A7E43]' 
                                  : res === 'E' 
                                    ? 'bg-[#E5A000]' 
                                    : 'bg-rose-600'
                              }`}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / Referencias */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium text-slate-500">
          {standingsSubTab === 'clausura' ? (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0094D8] inline-block shadow-xs" />
              <span>Puestos 1 al 8 clasifican a Octavos de Final</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0094D8] inline-block shadow-xs" />
                <span className="text-slate-700 font-bold">1° al 3° Copa Libertadores</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A000] inline-block shadow-xs" />
                <span className="text-slate-700 font-bold">4° al 9° Copa Sudamericana</span>
              </div>
            </div>
          )}
          <span className="text-slate-400 font-mono">Actualizado Fecha 15</span>
        </div>
      </div>

    </div>
  );
}
