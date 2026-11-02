// Datos oficiales LPF - Torneo Clausura 2026 (actualizado tras la Fecha 15)
// Los equipos sin escudo guardado en /public/clubs usan logo: null (se muestran sus iniciales).

const L = {
  velez: "/clubs/velez.svg",
  boca: "/clubs/boca.svg",
  instituto: "/clubs/instituto.png",
  defensa: "/clubs/defensa.svg",
  lanus: "/clubs/lanus.svg",
  newells: "/clubs/newells.svg",
  gimnasiaM: "/clubs/gimnasia_mendoza.png",
  independiente: "/clubs/independiente.svg",
  sanLorenzo: "/clubs/san_lorenzo.svg",
  union: "/clubs/union.svg",
  estudiantes: "/clubs/estudiantes.svg",
  platense: "/clubs/platense.svg",
  talleres: "/clubs/talleres.svg",
  riestra: "/clubs/riestra.svg",
  centralCordoba: "/clubs/central_cordoba.svg",
  river: "/clubs/river.svg",
  huracan: "/clubs/huracan.svg",
  racing: "/clubs/racing.svg"
};

export const FOOTBALL_DATA = {
  currentTournament: "Torneo Clausura 2026",
  nextMatch: {
    round: "Fecha 16",
    tournament: "Torneo Clausura 2026",
    homeTeam: { name: "Unión de Santa Fe", shortName: "UNIÓN (SF)", condition: "LOCAL", logo: L.union },
    awayTeam: { name: "Vélez Sarsfield", shortName: "VÉLEZ", condition: "VISITANTE", logo: L.velez },
    dateDisplay: "Domingo 8 de Noviembre",
    timeDisplay: "17:00 hs",
    stadium: "Estadio 15 de Abril (Santa Fe)",
    broadcast: "TNT Sports / ESPN Premium",
    accessStatus: "Partido de Visitante • No habilitado para público visitante"
  },
  recentMatches: [
    {
      round: "Fecha 15", date: "31/10/2026", opponent: "San Lorenzo", opponentLogo: L.sanLorenzo,
      condition: "Local", result: "Empate", score: "2 - 2", velezScore: 2, opponentScore: 2,
      scorers: "Policella, Pellegrini (VÉL) / Cuello, Auzmendi (SLO)"
    },
    {
      round: "Fecha 14", date: "25/10/2026", opponent: "Central Córdoba (SdE)", opponentLogo: L.centralCordoba,
      condition: "Visitante", result: "Victoria", score: "0 - 5", velezScore: 5, opponentScore: 0,
      scorers: "Ronaldo Martínez (x3), Pellegrini, Robertone"
    },
    {
      round: "Fecha 13", date: "17/10/2026", opponent: "River Plate", opponentLogo: L.river,
      condition: "Local", result: "Victoria", score: "1 - 0", velezScore: 1, opponentScore: 0,
      scorers: "Braian Romero"
    }
  ],
  upcomingMatches: [
    {
      round: "Fecha 16", date: "Dom 08/11 - 17:00 hs", opponent: "Unión de Santa Fe", opponentLogo: L.union,
      condition: "Visitante (Estadio 15 de Abril)", status: "Próximo partido"
    },
    {
      round: "Fecha 17", date: "Sáb 14/11 - 21:00 hs", opponent: "Talleres (C)", opponentLogo: L.talleres,
      condition: "Local (Amalfitani)", status: "A confirmar"
    }
  ],

  // CLAUSURA - GRUPO A (puestos 1 a 8 clasifican a Octavos de Final)
  standings: [
    { pos: 1, team: "Instituto", logo: L.instituto, pts: 33, pj: 15, gol: "24:13", dif: "+11", pg: 10, pe: 3, pp: 2, ultimas: ['E', 'V', 'V', 'E', 'V'], inPlayoffs: true },
    { pos: 2, team: "Boca Jrs.", logo: L.boca, pts: 30, pj: 15, gol: "23:14", dif: "+9", pg: 8, pe: 6, pp: 1, ultimas: ['V', 'V', 'V', 'E', 'V'], inPlayoffs: true },
    { pos: 3, team: "Vélez", logo: L.velez, pts: 28, pj: 15, gol: "25:15", dif: "+10", pg: 7, pe: 7, pp: 1, ultimas: ['E', 'V', 'V', 'D', 'E'], isCurrentTeam: true, inPlayoffs: true },
    { pos: 4, team: "Defensa", logo: L.defensa, pts: 27, pj: 14, gol: "20:13", dif: "+7", pg: 8, pe: 3, pp: 3, ultimas: ['V', 'D', 'V', 'V', 'E'], inPlayoffs: true },
    { pos: 5, team: "Lanús", logo: L.lanus, pts: 25, pj: 15, gol: "18:11", dif: "+7", pg: 7, pe: 4, pp: 4, ultimas: ['E', 'E', 'V', 'V', 'E'], inPlayoffs: true },
    { pos: 6, team: "Newell's", logo: L.newells, pts: 22, pj: 15, gol: "14:11", dif: "+3", pg: 5, pe: 7, pp: 3, ultimas: ['E', 'E', 'V', 'D', 'E'], inPlayoffs: true },
    { pos: 7, team: "Gimnasia (M)", logo: L.gimnasiaM, pts: 21, pj: 15, gol: "17:16", dif: "+1", pg: 6, pe: 3, pp: 6, ultimas: ['E', 'D', 'D', 'V', 'D'], inPlayoffs: true },
    { pos: 8, team: "Independiente", logo: L.independiente, pts: 19, pj: 14, gol: "12:14", dif: "-2", pg: 5, pe: 4, pp: 5, ultimas: ['D', 'E', 'E', 'D', 'V'], inPlayoffs: true },
    { pos: 9, team: "San Lorenzo", logo: L.sanLorenzo, pts: 19, pj: 15, gol: "9:14", dif: "-5", pg: 5, pe: 4, pp: 6, ultimas: ['E', 'E', 'V', 'V', 'D'], inPlayoffs: false },
    { pos: 10, team: "Unión", logo: L.union, pts: 18, pj: 15, gol: "22:24", dif: "-2", pg: 5, pe: 3, pp: 7, ultimas: ['E', 'V', 'E', 'D', 'D'], inPlayoffs: false },
    { pos: 11, team: "Estudiantes", logo: L.estudiantes, pts: 15, pj: 15, gol: "20:21", dif: "-1", pg: 4, pe: 3, pp: 8, ultimas: ['E', 'D', 'D', 'E', 'V'], inPlayoffs: false },
    { pos: 12, team: "Platense", logo: L.platense, pts: 14, pj: 14, gol: "14:20", dif: "-6", pg: 3, pe: 5, pp: 6, ultimas: ['V', 'D', 'E', 'E', 'D'], inPlayoffs: false },
    { pos: 13, team: "Talleres", logo: L.talleres, pts: 12, pj: 15, gol: "16:22", dif: "-6", pg: 3, pe: 3, pp: 9, ultimas: ['V', 'D', 'D', 'E', 'D'], inPlayoffs: false },
    { pos: 14, team: "Riestra", logo: L.riestra, pts: 12, pj: 15, gol: "10:17", dif: "-7", pg: 2, pe: 6, pp: 7, ultimas: ['D', 'D', 'E', 'D', 'E'], inPlayoffs: false },
    { pos: 15, team: "Central Córdoba", logo: L.centralCordoba, pts: 10, pj: 14, gol: "11:23", dif: "-12", pg: 2, pe: 4, pp: 8, ultimas: ['D', 'D', 'E', 'E', 'E'], inPlayoffs: false }
  ],

  // CLAUSURA - GRUPO B
  standingsGrupoB: [
    { pos: 1, team: "Central", logo: null, pts: 31, pj: 15, gol: "24:12", dif: "+12", pg: 9, pe: 4, pp: 2, ultimas: ['V', 'V', 'V', 'V', 'E'], inPlayoffs: true },
    { pos: 2, team: "Argentinos", logo: null, pts: 28, pj: 14, gol: "18:11", dif: "+7", pg: 8, pe: 4, pp: 2, ultimas: ['V', 'V', 'E', 'V', 'D'], inPlayoffs: true },
    { pos: 3, team: "Gimnasia", logo: null, pts: 28, pj: 15, gol: "23:19", dif: "+4", pg: 8, pe: 4, pp: 3, ultimas: ['V', 'V', 'V', 'E', 'E'], inPlayoffs: true },
    { pos: 4, team: "River", logo: L.river, pts: 23, pj: 15, gol: "19:14", dif: "+5", pg: 7, pe: 2, pp: 6, ultimas: ['D', 'V', 'V', 'E', 'V'], inPlayoffs: true },
    { pos: 5, team: "Belgrano", logo: null, pts: 23, pj: 15, gol: "16:13", dif: "+3", pg: 6, pe: 5, pp: 4, ultimas: ['E', 'D', 'D', 'V', 'V'], inPlayoffs: true },
    { pos: 6, team: "Barracas", logo: null, pts: 23, pj: 15, gol: "15:13", dif: "+2", pg: 6, pe: 5, pp: 4, ultimas: ['E', 'V', 'E', 'V', 'V'], inPlayoffs: true },
    { pos: 7, team: "Sarmiento", logo: null, pts: 21, pj: 15, gol: "23:23", dif: "0", pg: 6, pe: 3, pp: 6, ultimas: ['D', 'D', 'E', 'E', 'V'], inPlayoffs: true },
    { pos: 8, team: "Huracán", logo: L.huracan, pts: 19, pj: 15, gol: "12:16", dif: "-4", pg: 5, pe: 4, pp: 6, ultimas: ['D', 'D', 'D', 'D', 'V'], inPlayoffs: true },
    { pos: 9, team: "Independiente Riv.", logo: null, pts: 19, pj: 14, gol: "17:22", dif: "-5", pg: 5, pe: 4, pp: 5, ultimas: ['D', 'E', 'D', 'E', 'V'], inPlayoffs: false },
    { pos: 10, team: "Atl. Tucumán", logo: null, pts: 17, pj: 15, gol: "13:13", dif: "0", pg: 4, pe: 5, pp: 5, ultimas: ['V', 'D', 'E', 'D', 'D'], inPlayoffs: false },
    { pos: 11, team: "Tigre", logo: null, pts: 16, pj: 15, gol: "15:16", dif: "-1", pg: 4, pe: 4, pp: 7, ultimas: ['V', 'D', 'E', 'D', 'D'], inPlayoffs: false },
    { pos: 12, team: "Racing", logo: L.racing, pts: 15, pj: 15, gol: "16:22", dif: "-6", pg: 4, pe: 3, pp: 8, ultimas: ['V', 'D', 'E', 'D', 'V'], inPlayoffs: false },
    { pos: 13, team: "Banfield", logo: null, pts: 14, pj: 14, gol: "15:20", dif: "-5", pg: 3, pe: 5, pp: 6, ultimas: ['E', 'D', 'V', 'E', 'E'], inPlayoffs: false },
    { pos: 14, team: "Aldosivi", logo: null, pts: 11, pj: 15, gol: "16:24", dif: "-8", pg: 3, pe: 2, pp: 10, ultimas: ['D', 'V', 'D', 'D', 'D'], inPlayoffs: false },
    { pos: 15, team: "Estudiantes RC", logo: null, pts: 9, pj: 15, gol: "10:21", dif: "-11", pg: 2, pe: 3, pp: 10, ultimas: ['D', 'D', 'V', 'D', 'D'], inPlayoffs: false }
  ],

  // TABLA ANUAL 2026 (1° a 3° Copa Libertadores • 4° a 9° Copa Sudamericana)
  // Puestos 1 a 21 según la tabla oficial. Puestos 22 a 30: estimados (no figuraban en la captura).
  annualStandings: [
    { pos: 1, team: "Boca Jrs.", logo: L.boca, pts: 60, pj: 31, gol: "45:23", dif: "+22", pg: 16, pe: 12, pp: 3, copa: 'Libertadores' },
    { pos: 2, team: "Central", logo: null, pts: 59, pj: 31, gol: "44:28", dif: "+16", pg: 17, pe: 8, pp: 6, copa: 'Libertadores' },
    { pos: 3, team: "Argentinos", logo: null, pts: 57, pj: 30, gol: "35:24", dif: "+11", pg: 16, pe: 9, pp: 5, copa: 'Libertadores' },
    { pos: 4, team: "Vélez", logo: L.velez, pts: 56, pj: 31, gol: "43:27", dif: "+16", pg: 14, pe: 14, pp: 3, isCurrentTeam: true, copa: 'Sudamericana' },
    { pos: 5, team: "Instituto", logo: L.instituto, pts: 54, pj: 31, gol: "41:30", dif: "+11", pg: 16, pe: 6, pp: 9, copa: 'Sudamericana' },
    { pos: 6, team: "Gimnasia", logo: null, pts: 54, pj: 31, gol: "42:38", dif: "+4", pg: 16, pe: 6, pp: 9, copa: 'Sudamericana' },
    { pos: 7, team: "Independiente Riv.", logo: null, pts: 53, pj: 30, gol: "46:37", dif: "+9", pg: 15, pe: 8, pp: 7, copa: 'Sudamericana' },
    { pos: 8, team: "River", logo: L.river, pts: 52, pj: 31, gol: "41:26", dif: "+15", pg: 16, pe: 4, pp: 11, copa: 'Sudamericana' },
    { pos: 9, team: "Lanús", logo: L.lanus, pts: 49, pj: 31, gol: "36:26", dif: "+10", pg: 13, pe: 10, pp: 8, copa: 'Sudamericana' },
    { pos: 10, team: "Belgrano", logo: null, pts: 49, pj: 31, gol: "33:26", dif: "+7", pg: 13, pe: 10, pp: 8 },
    { pos: 11, team: "Estudiantes", logo: L.estudiantes, pts: 46, pj: 31, gol: "39:28", dif: "+11", pg: 13, pe: 7, pp: 11 },
    { pos: 12, team: "Defensa", logo: L.defensa, pts: 46, pj: 30, gol: "38:34", dif: "+4", pg: 12, pe: 10, pp: 8 },
    { pos: 13, team: "Barracas", logo: null, pts: 44, pj: 31, gol: "30:28", dif: "+2", pg: 11, pe: 11, pp: 9 },
    { pos: 14, team: "Independiente", logo: L.independiente, pts: 43, pj: 30, gol: "36:34", dif: "+2", pg: 11, pe: 10, pp: 9 },
    { pos: 15, team: "Huracán", logo: L.huracan, pts: 41, pj: 31, gol: "29:29", dif: "0", pg: 10, pe: 11, pp: 10 },
    { pos: 16, team: "San Lorenzo", logo: L.sanLorenzo, pts: 41, pj: 31, gol: "23:28", dif: "-5", pg: 10, pe: 11, pp: 10 },
    { pos: 17, team: "Sarmiento", logo: null, pts: 40, pj: 31, gol: "36:43", dif: "-7", pg: 12, pe: 4, pp: 15 },
    { pos: 18, team: "Gimnasia (M)", logo: L.gimnasiaM, pts: 40, pj: 31, gol: "31:38", dif: "-7", pg: 11, pe: 7, pp: 13 },
    { pos: 19, team: "Unión", logo: L.union, pts: 39, pj: 31, gol: "46:44", dif: "+2", pg: 10, pe: 9, pp: 12 },
    { pos: 20, team: "Talleres", logo: L.talleres, pts: 38, pj: 31, gol: "33:35", dif: "-2", pg: 10, pe: 8, pp: 13 },
    { pos: 21, team: "Newell's", logo: L.newells, pts: 37, pj: 31, gol: "29:38", dif: "-9", pg: 8, pe: 13, pp: 10 },
    { pos: 22, team: "Racing", logo: L.racing, pts: 33, pj: 31, gol: "31:36", dif: "-5", pg: 8, pe: 9, pp: 14 },
    { pos: 23, team: "Tigre", logo: null, pts: 33, pj: 31, gol: "31:31", dif: "0", pg: 7, pe: 12, pp: 12 },
    { pos: 24, team: "Banfield", logo: null, pts: 32, pj: 30, gol: "32:39", dif: "-7", pg: 8, pe: 8, pp: 14 },
    { pos: 25, team: "Atl. Tucumán", logo: null, pts: 31, pj: 31, gol: "28:33", dif: "-5", pg: 7, pe: 10, pp: 14 },
    { pos: 26, team: "Platense", logo: L.platense, pts: 30, pj: 30, gol: "24:35", dif: "-11", pg: 6, pe: 12, pp: 12 },
    { pos: 27, team: "Central Córdoba", logo: L.centralCordoba, pts: 26, pj: 30, gol: "22:44", dif: "-22", pg: 6, pe: 8, pp: 16 },
    { pos: 28, team: "Riestra", logo: L.riestra, pts: 23, pj: 31, gol: "15:27", dif: "-12", pg: 3, pe: 14, pp: 14 },
    { pos: 29, team: "Aldosivi", logo: null, pts: 19, pj: 31, gol: "21:42", dif: "-21", pg: 3, pe: 10, pp: 18 },
    { pos: 30, team: "Estudiantes RC", logo: null, pts: 14, pj: 31, gol: "14:44", dif: "-30", pg: 3, pe: 5, pp: 23 }
  ]
};

// Aliases para compatibilidad con componentes existentes
const velezIsHome = FOOTBALL_DATA.nextMatch.homeTeam.name.includes('Vélez');
const rivalTeam = velezIsHome ? FOOTBALL_DATA.nextMatch.awayTeam : FOOTBALL_DATA.nextMatch.homeTeam;

export const NEXT_MATCH = {
  rival: rivalTeam.name,
  rivalShort: rivalTeam.shortName,
  rivalShield: rivalTeam.logo,
  torneo: FOOTBALL_DATA.nextMatch.tournament,
  fechaNro: FOOTBALL_DATA.nextMatch.round,
  fecha: FOOTBALL_DATA.nextMatch.dateDisplay,
  hora: FOOTBALL_DATA.nextMatch.timeDisplay,
  estadio: FOOTBALL_DATA.nextMatch.stadium,
  tv: FOOTBALL_DATA.nextMatch.broadcast,
  esLocal: velezIsHome,
  accessStatus: FOOTBALL_DATA.nextMatch.accessStatus
};

const mapStanding = (s) => ({
  pos: s.pos,
  team: s.team,
  pj: s.pj,
  g: s.pg,
  e: s.pe,
  p: s.pp,
  gf: parseInt(s.gol.split(':')[0]) || 0,
  gc: parseInt(s.gol.split(':')[1]) || 0,
  gol: s.gol,
  dif: s.dif,
  pts: s.pts,
  ultimas: s.ultimas,
  inPlayoffs: s.inPlayoffs,
  copa: s.copa,
  isVelez: !!s.isCurrentTeam,
  shield: s.logo,
  logo: s.logo
});

export const STANDINGS = FOOTBALL_DATA.standings.map(mapStanding);
export const STANDINGS_GRUPO_B = FOOTBALL_DATA.standingsGrupoB.map(mapStanding);
export const ANNUAL_STANDINGS = FOOTBALL_DATA.annualStandings.map(mapStanding);

export const PAST_FIXTURES = FOOTBALL_DATA.recentMatches.map(m => ({
  id: `m_${m.round}`,
  fechaNro: m.round,
  torneo: FOOTBALL_DATA.currentTournament,
  fecha: m.date,
  hora: 'Finalizado',
  local: m.condition === 'Local' ? 'Vélez Sarsfield' : m.opponent,
  visitante: m.condition === 'Local' ? m.opponent : 'Vélez Sarsfield',
  opponentLogo: m.opponentLogo,
  golesLocal: m.condition === 'Local' ? m.velezScore : m.opponentScore,
  golesVisitante: m.condition === 'Local' ? m.opponentScore : m.velezScore,
  estado: 'finalizado',
  resultadoTexto: `${m.result} ${m.score}`,
  scorers: m.scorers
}));

export const UPCOMING_FIXTURES = FOOTBALL_DATA.upcomingMatches.map(m => ({
  id: `m_${m.round}`,
  fechaNro: m.round,
  torneo: FOOTBALL_DATA.currentTournament,
  fecha: m.date,
  hora: m.date.includes('-') ? m.date.split('-')[1].trim() : '19:15 hs',
  local: m.condition.includes('Local') ? 'Vélez Sarsfield' : m.opponent,
  visitante: m.condition.includes('Local') ? m.opponent : 'Vélez Sarsfield',
  opponentLogo: m.opponentLogo,
  estado: m.status === 'Próximo partido' ? 'proximo' : 'confirmar',
  resultadoTexto: m.status
}));

export const FIXTURES = [
  ...UPCOMING_FIXTURES,
  ...PAST_FIXTURES
];
