export const FOOTBALL_DATA = {
  currentTournament: "Torneo Clausura 2026",
  nextMatch: {
    round: "Fecha 15",
    tournament: "Torneo Clausura 2026",
    homeTeam: {
      name: "Vélez Sarsfield",
      shortName: "VÉLEZ",
      condition: "LOCAL",
      logo: "/clubs/velez.svg"
    },
    awayTeam: {
      name: "San Lorenzo",
      shortName: "SAN LORENZO",
      condition: "VISITANTE",
      logo: "/clubs/san_lorenzo.svg"
    },
    dateDisplay: "Sábado 31 de Octubre",
    timeDisplay: "19:15 hs",
    stadium: "Estadio José Amalfitani",
    broadcast: "TNT Sports / ESPN Premium",
    accessStatus: "Habilitada con Carnet Digital en Populares y Platea Bianchi Alta"
  },
  recentMatches: [
    {
      round: "Fecha 14",
      date: "25/10/2026",
      opponent: "Central Córdoba (SdE)",
      opponentLogo: "/clubs/central_cordoba.svg",
      condition: "Visitante",
      result: "Victoria",
      score: "0 - 5",
      velezScore: 5,
      opponentScore: 0,
      scorers: "Ronaldo Martínez (x3), Pellegrini, Robertone"
    },
    {
      round: "Fecha 13",
      date: "17/10/2026",
      opponent: "River Plate",
      opponentLogo: "/clubs/river.svg",
      condition: "Local",
      result: "Victoria",
      score: "1 - 0",
      velezScore: 1,
      opponentScore: 0,
      scorers: "Braian Romero"
    },
    {
      round: "Fecha 12",
      date: "12/10/2026",
      opponent: "Lanús",
      opponentLogo: "/clubs/lanus.svg",
      condition: "Visitante",
      result: "Victoria",
      score: "0 - 2",
      velezScore: 2,
      opponentScore: 0,
      scorers: "Aquino, Pizzini"
    }
  ],
  upcomingMatches: [
    {
      round: "Fecha 15",
      date: "Sáb 31/10 - 19:15 hs",
      opponent: "San Lorenzo",
      opponentLogo: "/clubs/san_lorenzo.svg",
      condition: "Local (Amalfitani)",
      status: "Próximo partido"
    },
    {
      round: "Fecha 16",
      date: "Dom 08/11 - 17:00 hs",
      opponent: "Huracán",
      opponentLogo: "/clubs/huracan.svg",
      condition: "Visitante",
      status: "A confirmar"
    },
    {
      round: "Fecha 17",
      date: "Sáb 14/11 - 21:00 hs",
      opponent: "Talleres (C)",
      opponentLogo: "/clubs/talleres.svg",
      condition: "Local (Amalfitani)",
      status: "A confirmar"
    }
  ],
  standings: [
    { pos: 1, team: "Instituto", logo: "/clubs/instituto.png", pts: 32, pj: 14, gol: "21:10", dif: "+11", pg: 10, pe: 2, pp: 2, ultimas: ['V', 'V', 'E', 'V', 'V'], inPlayoffs: true },
    { pos: 2, team: "Vélez", logo: "/clubs/velez.svg", pts: 27, pj: 14, gol: "23:13", dif: "+10", pg: 7, pe: 6, pp: 1, ultimas: ['V', 'V', 'D', 'E', 'V'], isCurrentTeam: true, inPlayoffs: true },
    { pos: 3, team: "Boca Jrs.", logo: "/clubs/boca.svg", pts: 27, pj: 14, gol: "22:14", dif: "+8", pg: 7, pe: 6, pp: 1, ultimas: ['V', 'V', 'E', 'V', 'V'], inPlayoffs: true },
    { pos: 4, team: "Defensa", logo: "/clubs/defensa.svg", pts: 27, pj: 14, gol: "20:13", dif: "+7", pg: 8, pe: 3, pp: 3, ultimas: ['V', 'D', 'V', 'V', 'E'], inPlayoffs: true },
    { pos: 5, team: "Lanús", logo: "/clubs/lanus.svg", pts: 24, pj: 14, gol: "17:10", dif: "+7", pg: 7, pe: 3, pp: 4, ultimas: ['E', 'V', 'V', 'E', 'V'], inPlayoffs: true },
    { pos: 6, team: "Newell's", logo: "/clubs/newells.svg", pts: 21, pj: 14, gol: "13:10", dif: "+3", pg: 5, pe: 6, pp: 3, ultimas: ['E', 'V', 'D', 'E', 'V'], inPlayoffs: true },
    { pos: 7, team: "Gimnasia (M)", logo: "/clubs/gimnasia_mendoza.png", pts: 20, pj: 14, gol: "16:15", dif: "+1", pg: 6, pe: 2, pp: 6, ultimas: ['D', 'D', 'V', 'D', 'E'], inPlayoffs: true },
    { pos: 8, team: "Independiente", logo: "/clubs/independiente.svg", pts: 19, pj: 14, gol: "12:14", dif: "-2", pg: 5, pe: 4, pp: 5, ultimas: ['D', 'E', 'E', 'D', 'V'], inPlayoffs: true },
    { pos: 9, team: "San Lorenzo", logo: "/clubs/san_lorenzo.svg", pts: 18, pj: 14, gol: "7:12", dif: "-5", pg: 5, pe: 3, pp: 6, ultimas: ['E', 'V', 'V', 'D', 'D'], inPlayoffs: false },
    { pos: 10, team: "Unión", logo: "/clubs/union.svg", pts: 17, pj: 14, gol: "21:23", dif: "-2", pg: 5, pe: 2, pp: 7, ultimas: ['V', 'E', 'D', 'D', 'D'], inPlayoffs: false },
    { pos: 11, team: "Estudiantes", logo: "/clubs/estudiantes.svg", pts: 14, pj: 14, gol: "17:18", dif: "-1", pg: 4, pe: 2, pp: 8, ultimas: ['D', 'D', 'E', 'V', 'D'], inPlayoffs: false },
    { pos: 12, team: "Platense", logo: "/clubs/platense.svg", pts: 14, pj: 14, gol: "14:20", dif: "-6", pg: 3, pe: 5, pp: 6, ultimas: ['V', 'D', 'E', 'E', 'D'], inPlayoffs: false },
    { pos: 13, team: "Riestra", logo: "/clubs/riestra.svg", pts: 12, pj: 14, gol: "10:14", dif: "-4", pg: 2, pe: 6, pp: 6, ultimas: ['D', 'E', 'D', 'E', 'E'], inPlayoffs: false },
    { pos: 14, team: "Central Córdoba", logo: "/clubs/central_cordoba.svg", pts: 10, pj: 14, gol: "11:23", dif: "-12", pg: 2, pe: 4, pp: 8, ultimas: ['D', 'D', 'E', 'E', 'E'], inPlayoffs: false },
    { pos: 15, team: "Talleres", logo: "/clubs/talleres.svg", pts: 9, pj: 14, gol: "13:22", dif: "-9", pg: 2, pe: 3, pp: 9, ultimas: ['D', 'D', 'E', 'D', 'D'], inPlayoffs: false }
  ]
};

// Aliases para compatibilidad con componentes existentes
export const NEXT_MATCH = {
  rival: FOOTBALL_DATA.nextMatch.awayTeam.name,
  rivalShort: FOOTBALL_DATA.nextMatch.awayTeam.shortName,
  rivalShield: FOOTBALL_DATA.nextMatch.awayTeam.logo,
  torneo: FOOTBALL_DATA.nextMatch.tournament,
  fechaNro: FOOTBALL_DATA.nextMatch.round,
  fecha: FOOTBALL_DATA.nextMatch.dateDisplay,
  hora: FOOTBALL_DATA.nextMatch.timeDisplay,
  estadio: FOOTBALL_DATA.nextMatch.stadium,
  tv: FOOTBALL_DATA.nextMatch.broadcast,
  esLocal: true,
  accessStatus: FOOTBALL_DATA.nextMatch.accessStatus
};

export const STANDINGS = FOOTBALL_DATA.standings.map(s => ({
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
  isVelez: !!s.isCurrentTeam,
  shield: s.logo,
  logo: s.logo
}));

export const FIXTURES = [
  ...FOOTBALL_DATA.recentMatches.map(m => ({
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
  })),
  ...FOOTBALL_DATA.upcomingMatches.map(m => ({
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
  }))
];
