export const ACTIVITY_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'pelota', label: 'Deportes de Pelota' },
  { id: 'fitness', label: 'Fitness & Gimnasia' },
  { id: 'raqueta_pista', label: 'Pista & Patín' },
  { id: 'marciales', label: 'Artes Marciales' },
  { id: 'cultura', label: 'Cultura' }
];

// Helper para consolidar días de todas las ramas y categorías
export function getConsolidatedDays(activity) {
  if (activity.daysSummary) return activity.daysSummary;

  const dayOrder = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
  const dayLabels = {
    LUN: 'Lunes',
    MAR: 'Martes',
    MIE: 'Miércoles',
    JUE: 'Jueves',
    VIE: 'Viernes',
    SAB: 'Sábados',
    DOM: 'Domingos'
  };

  const daysSet = new Set();
  if (activity.branches) {
    activity.branches.forEach(b => {
      if (b.categories) {
        b.categories.forEach(c => {
          if (c.days) c.days.forEach(d => daysSet.add(d));
        });
      }
    });
  }

  if (daysSet.size === 0 && activity.availableDays) {
    activity.availableDays.forEach(d => daysSet.add(d));
  }

  const sorted = dayOrder.filter(d => daysSet.has(d));
  if (sorted.length === 0) return 'Lunes a Viernes';

  if (sorted.length === 6 && sorted[0] === 'LUN' && sorted[5] === 'SAB') {
    return 'Lunes a Sábados';
  }
  if (sorted.length === 5 && sorted[0] === 'LUN' && sorted[4] === 'VIE') {
    return 'Lunes a Viernes';
  }
  if (sorted.length === 7) {
    return 'Lunes a Domingos';
  }

  const names = sorted.map(d => dayLabels[d] || d);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

export const ACTIVITIES = [
  // 1. BÁSQUET
  {
    id: 'basquet',
    name: 'Básquet',
    type: 'team_sport',
    category: 'pelota',
    venue: '4to Piso / Canchas Auxiliares y Patio 4',
    schedule: 'Lunes a Sábados según división y categoría',
    daysSummary: 'Lunes a Sábados',
    priceOffice: 42000,
    priceAutoDebit: 33600,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: true,
    description: 'Formativo y competitivo en todas las categorías de FeBAMBA y Liga Federal en el 4to piso de la sede.',
    levels: [
      'U11 Caballeros A', 'U11 Categoría B', 'U13 Caballeros A', 'U13 Categoría B', 
      'U15 Caballeros A', 'U15 Caballeros B', 'U17 Caballeros B', 'U21 Caballeros B', 
      'U21 / Primera Caballeros A', 'U9 Caballeros A', 'U7 Damas A', 'U9 Damas A', 
      'U11 Damas A', 'U11 Damas B', 'U13 Damas B', 'U15 Damas A', 'U15 Damas B', 
      'U17 Damas A', 'U21 / Primera Damas A', 'Mosquitos'
    ],
    branches: [
      {
        name: 'Masculino',
        categories: [
          {
            name: 'U11 Caballeros A',
            schedule: 'Lunes de 19 a 20:30 h, Miércoles de 19 a 20:15 h y Viernes de 19:15 a 20:30 h',
            venue: '4to piso - Cancha Principal',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: 'U11 Categoría B',
            schedule: 'Lunes de 18:30 a 19:30 h, Miércoles de 18 a 19:15 h y Viernes de 18:15 a 19:15 h',
            venue: '4to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'U13 Caballeros A',
            schedule: 'Lunes de 16 a 17:30 h, Miércoles de 16 a 17 h y Viernes de 16 a 17:15 h',
            venue: '4to piso - Cancha Auxiliar',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: 'U13 Categoría B',
            schedule: 'Lunes de 19:30 a 20:30 h, Miércoles de 19:15 a 20:30 h y Viernes de 18 a 19:30 h',
            venue: '4to piso - Cancha Auxiliar',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'U15 Caballeros A',
            schedule: 'Lunes de 19 a 20:30 h, Miércoles y Viernes de 17 a 18:30 h',
            venue: '4to piso - Cancha Principal',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: 'U15 Caballeros B',
            schedule: 'Lunes de 18 a 19:30 h, Miércoles y Viernes de 18 a 19:30 h',
            venue: '4to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'U17 Caballeros B',
            schedule: 'Lunes de 19 a 20 h, Miércoles y Viernes de 20:15 a 22 h',
            venue: '4to piso - Cancha Auxiliar',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          },
          {
            name: 'U21 Caballeros B',
            schedule: 'Lunes de 19 a 20 h, Miércoles y Viernes de 20:15 a 22 h',
            venue: '4to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 46000,
            priceAutoDebit: 36800
          },
          {
            name: 'U21 / Primera Caballeros A',
            schedule: 'Lunes de 20:30 a 22 h, Miércoles y Viernes de 21 a 22:30 h',
            venue: '4to piso - Cancha Principal',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 48000,
            priceAutoDebit: 38400
          },
          {
            name: 'U9 Caballeros A',
            schedule: 'Lunes de 17:30 a 19 h y Miércoles de 17:45 a 19 h',
            venue: '4to piso - Cancha Auxiliar',
            days: ['LUN', 'MIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          }
        ]
      },
      {
        name: 'Femenino',
        categories: [
          {
            name: 'U7 Damas A',
            schedule: 'Martes y Jueves de 17 a 18 h y Sábados de 11 a 12 h',
            venue: '4to piso - Sede Central',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'U9 Damas A',
            schedule: 'Martes y Jueves de 17 a 18 h y Sábados de 11 a 12 h',
            venue: '4to piso - Cancha Auxiliar',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'U11 Damas A',
            schedule: 'Martes y Jueves de 18 a 19 h y Sábados de 10 a 11 h',
            venue: '4to piso - Cancha Principal',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'U11 Damas B',
            schedule: 'Martes y Jueves de 17:30 a 18:45 h',
            venue: 'Patio deportivo N° 4 - Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'U13 Damas B',
            schedule: 'Martes y Jueves de 18 a 19:15 h',
            venue: 'Patio deportivo N° 4 - Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'U15 Damas A',
            schedule: 'Martes y Jueves de 17:15 a 18:30 h y Sábados de 9:15 a 11:30 h',
            venue: '4to piso - Cancha Principal',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: 'U15 Damas B',
            schedule: 'Martes y Jueves de 19:15 a 20:30 h',
            venue: 'Patio deportivo N° 4 - Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'U17 Damas A',
            schedule: 'Martes y Jueves de 18:30 a 20 h y Sábados de 9:15 a 11:30 h',
            venue: '4to piso - Cancha Principal',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          },
          {
            name: 'U21 / Primera Damas A',
            schedule: 'Martes y Jueves de 20 a 21:45 h y Miércoles de 14 a 16 h',
            venue: '4to piso - Cancha Principal',
            days: ['MIE', 'MAR', 'JUE'],
            priceOffice: 48000,
            priceAutoDebit: 38400
          }
        ]
      },
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Mosquitos (Formativo)',
            schedule: 'Lunes de 16:45 a 17:30 h, Miércoles de 17 a 17:45 h y Viernes de 17:15 a 18 h',
            venue: '4to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          }
        ]
      }
    ]
  },

  // 2. VÓLEY
  {
    id: 'voley',
    name: 'Vóley',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Anexo de Vóley / Estadio Oficial / Patio 3',
    schedule: 'Lunes a Viernes según división y nivel',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 40000,
    priceAutoDebit: 32000,
    availableDays: ['MAR', 'JUE', 'VIE'],
    requiresMedical: true,
    description: 'Tradición y competencia al más alto nivel en Federación Metropolitana y División de Honor.',
    levels: [
      'División de Honor Damas', 'Sub 15/16/18/21 Damas A', 'Sub 16 Damas B', 
      'Sub 18 Damas B', 'Sub 15 Damas B', 'Sub 15/16/18/21 Damas C', 'Escuela / Mini Voley Damas', 
      'Escuela Recreativa Damas', 'Liga Damas', 'Escuela / Sub 11/12/13 Caballeros A', 
      'Caballeros Sub 21 Caballeros B', 'Caballeros Liga Caballeros'
    ],
    branches: [
      {
        name: 'Femenino',
        categories: [
          {
            name: 'División de Honor Damas',
            schedule: 'Lunes, Martes, Miércoles, Jueves y Viernes de 20 a 22 h',
            venue: 'Estadio Oficial - Sede Central',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'],
            priceOffice: 48000,
            priceAutoDebit: 38400
          },
          {
            name: 'Sub 15/16/18/21 Damas A',
            schedule: 'Martes y Jueves de 14:30 a 16:30 h y Viernes de 16:30 a 18 h',
            venue: 'Anexo de Vóley',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: 'Sub 16 Damas B',
            schedule: 'Lunes, Martes y Jueves de 18 a 19:30 h',
            venue: 'Anexo de Vóley',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: 'Sub 18 Damas B',
            schedule: 'Martes, Jueves y Viernes de 19 a 20:30 h',
            venue: 'Anexo de Vóley',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: 'Sub 15 Damas B',
            schedule: 'Martes y Jueves de 14:30 a 16 h y Viernes de 16 a 18 h',
            venue: 'Anexo de Vóley',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Sub 15/16/18/21 Damas C',
            schedule: 'Lunes de 19:30 a 21 h, Miércoles y Viernes de 19 a 20:30 h',
            venue: 'Anexo de Vóley',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Escuela / Mini Voley Damas',
            schedule: 'Martes y Jueves de 18 a 19:30 h',
            venue: 'Patio Deportivo 3',
            days: ['MAR', 'JUE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          },
          {
            name: 'Escuela Recreativa Damas',
            schedule: 'Lunes, Miércoles y Viernes de 18 a 19 h',
            venue: 'Patio Deportivo 3',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'Liga Damas',
            schedule: 'Martes y Jueves de 15 a 16:30 h',
            venue: 'Patio Deportivo 3',
            days: ['MAR', 'JUE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          }
        ]
      },
      {
        name: 'Masculino',
        categories: [
          {
            name: 'Escuela / Sub 11/12/13 Caballeros A',
            schedule: 'Lunes, Martes y Jueves de 17 a 18:30 h',
            venue: 'Anexo de Vóley',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Caballeros Sub 21 Caballeros B',
            schedule: 'Lunes de 18:30 a 20 h, Miércoles de 19 a 22 h y Viernes de 19:30 a 22 h',
            venue: 'Anexo de Vóley',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: 'Caballeros Liga Caballeros',
            schedule: 'Martes y Jueves de 18:30 a 20 h y Miércoles de 15:30 a 17 h',
            venue: 'Patio Deportivo 3',
            days: ['MIE', 'MAR', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          }
        ]
      }
    ]
  },

  // 3. HANDBALL
  {
    id: 'handball',
    name: 'Handball',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Multifunción 2 y Cancha Descubierta',
    schedule: 'Lunes a Viernes según división y rama',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 39000,
    priceAutoDebit: 31200,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: true,
    description: 'Afiliados a FeMeBal en torneos metropolitanos y ligas de honor de alto rendimiento.',
    levels: [
      'Infantiles Caballeros', 'Menores Caballeros', 'Cadetes Caballeros', 'Liga de Honor Oro Caballeros',
      'Infantiles Damas A', 'Infantiles Damas B', 'Juveniles Damas A', 'Juveniles Damas B', 
      'Liga de Honor Plata Damas', 'Segunda Damas', 'Escuela 11 a 14 años'
    ],
    branches: [
      {
        name: 'Masculino',
        categories: [
          {
            name: 'Infantiles Caballeros',
            schedule: 'Lunes, Martes y Jueves de 17:30 a 18:30 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Menores Caballeros',
            schedule: 'Lunes, Miércoles y Viernes de 17:30 a 19 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'Cadetes Caballeros',
            schedule: 'Lunes, Miércoles y Viernes de 19 a 20:30 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'Liga de Honor Oro Caballeros',
            schedule: 'Lunes, Miércoles y Viernes de 20:30 a 22:30 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          }
        ]
      },
      {
        name: 'Femenino',
        categories: [
          {
            name: 'Infantiles Damas A',
            schedule: 'Martes, Jueves y Viernes de 18 a 19 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Infantiles Damas B',
            schedule: 'Martes, Jueves y Viernes de 18:30 a 19:30 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Juveniles Damas A',
            schedule: 'Lunes, Martes y Jueves de 19:30 a 21 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: 'Juveniles Damas B',
            schedule: 'Martes, Jueves y Viernes de 18:30 a 20 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Liga de Honor Plata Damas',
            schedule: 'Lunes, Miércoles y Viernes de 20:30 a 22:30 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          },
          {
            name: 'Segunda Damas',
            schedule: 'Martes, Jueves y Viernes de 20:30 a 22 h',
            venue: 'Multifunción 2 y Cancha Descubierta',
            days: ['MAR', 'JUE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          }
        ]
      },
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Escuela 11 a 14 años',
            schedule: 'Martes y Jueves de 18:30 a 19:30 h',
            venue: 'Cancha descubierta y Patio Deportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 35000,
            priceAutoDebit: 28000
          }
        ]
      }
    ]
  },

  // 4. HOCKEY SOBRE CÉSPED
  {
    id: 'hockey_cesped',
    name: 'Hockey sobre Césped',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Cancha de Hockey Sintético de Agua',
    schedule: 'Lunes a Viernes según división y línea',
    daysSummary: 'Lunes a Sábados',
    priceOffice: 46000,
    priceAutoDebit: 36800,
    availableDays: ['LUN', 'MAR', 'JUE'],
    requiresMedical: true,
    description: 'Entrenamientos en césped sintético de agua de primer nivel competitivo en AHBA.',
    levels: [
      '1° Damas A', '1° Damas B', 'Intermedia Damas A', 'Intermedia Damas B', '5° Damas A', 
      '5° Damas B', '5° Damas C', '6° Damas A', '6° Damas B', '7° Damas C', '8° Damas A', 
      '8° Damas B', '8° Damas C', '9° Damas A', '9° Damas B', '10° Damas A', 'Escuela Femenina',
      '1° Caballeros', 'Intermedia Caballeros', '6° Caballeros', '9° Caballeros'
    ],
    branches: [
      {
        name: 'Femenino',
        categories: [
          {
            name: '1° Damas A',
            schedule: 'Lunes, Martes y Jueves de 20:30 a 22:30 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 52000,
            priceAutoDebit: 41600
          },
          {
            name: '1° Damas B',
            schedule: 'Lunes, Martes y Jueves de 19 a 21 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 48000,
            priceAutoDebit: 38400
          },
          {
            name: 'Intermedia Damas A',
            schedule: 'Lunes, Martes y Jueves de 20:30 a 22:30 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 48000,
            priceAutoDebit: 38400
          },
          {
            name: 'Intermedia Damas B',
            schedule: 'Lunes, Martes y Jueves de 19 a 21 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 46000,
            priceAutoDebit: 36800
          },
          {
            name: '5° Damas A',
            schedule: 'Lunes, Martes y Jueves de 19 a 21 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 46000,
            priceAutoDebit: 36800
          },
          {
            name: '5° Damas B',
            schedule: 'Lunes, Martes y Jueves de 18 a 20 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          },
          {
            name: '5° Damas C',
            schedule: 'Miércoles y Viernes de 18 a 20 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MIE', 'VIE'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: '6° Damas A',
            schedule: 'Lunes, Martes y Jueves de 18 a 20 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          },
          {
            name: '6° Damas B',
            schedule: 'Lunes, Martes y Jueves de 18 a 20 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 44000,
            priceAutoDebit: 35200
          },
          {
            name: '7° Damas C',
            schedule: 'Miércoles y Viernes de 17 a 18:30 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MIE', 'VIE'],
            priceOffice: 43000,
            priceAutoDebit: 34400
          },
          {
            name: '8° Damas A',
            schedule: 'Lunes, Martes y Jueves de 17 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 43000,
            priceAutoDebit: 34400
          },
          {
            name: '8° Damas B',
            schedule: 'Lunes, Martes y Jueves de 17 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: '8° Damas C',
            schedule: 'Miércoles y Viernes de 17 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MIE', 'VIE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          },
          {
            name: '9° Damas A',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MAR', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: '9° Damas B',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MAR', 'JUE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: '10° Damas A',
            schedule: 'Martes y Jueves de 17 a 19 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MAR', 'JUE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'Escuela Femenina',
            schedule: 'Martes y Jueves de 17 a 18 h',
            venue: 'Patio N° 1 - Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          }
        ]
      },
      {
        name: 'Masculino',
        categories: [
          {
            name: '1° Caballeros',
            schedule: 'Martes de 7 a 9 h, Miércoles y Viernes de 21 a 23 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MAR', 'MIE', 'VIE'],
            priceOffice: 50000,
            priceAutoDebit: 40000
          },
          {
            name: 'Intermedia Caballeros',
            schedule: 'Martes de 7 a 9 h, Miércoles y Viernes de 20:30 a 22:30 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MAR', 'MIE', 'VIE'],
            priceOffice: 47000,
            priceAutoDebit: 37600
          },
          {
            name: '6° Caballeros',
            schedule: 'Lunes de 20 a 22 h, Miércoles y Viernes de 18 a 20 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 43000,
            priceAutoDebit: 34400
          },
          {
            name: '9° Caballeros',
            schedule: 'Miércoles y Viernes de 18 a 19:30 h',
            venue: 'Cancha de Hockey Sintético',
            days: ['MIE', 'VIE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          }
        ]
      }
    ]
  },

  // 5. HOCKEY SOBRE PATINES
  {
    id: 'hockey_patines',
    name: 'Hockey sobre Patines',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Gimnasio HSP',
    schedule: 'Lunes a Viernes de 18 a 23 hs según división',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 41000,
    priceAutoDebit: 32800,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: true,
    description: 'Deporte histórico con pista techada reglamentaria en el Polideportivo.',
    levels: [
      'Infantil Masculino', 'Junior Masculino', 'Juvenil Masculino', 'Promo Masculino', 'Primera Masculina',
      'Infantil Femenino', 'Junior Femenino', 'Promo Femenino', 'Reserva Femenina'
    ],
    branches: [
      {
        name: 'Masculino',
        categories: [
          {
            name: 'Infantil Masculino',
            schedule: 'Lunes, Miércoles y Viernes de 19 a 20:30 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'Junior Masculino',
            schedule: 'Lunes, Miércoles y Viernes de 20:30 a 22 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'Juvenil Masculino',
            schedule: 'Lunes, Miércoles y Viernes de 20:30 a 22 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'Promo Masculino',
            schedule: 'Lunes y Miércoles de 18 a 19 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MIE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Primera Masculina',
            schedule: 'Lunes, Martes y Jueves de 21:30 a 23 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 45000,
            priceAutoDebit: 36000
          }
        ]
      },
      {
        name: 'Femenino',
        categories: [
          {
            name: 'Infantil Femenino',
            schedule: 'Martes y Jueves de 19 a 20:30 h',
            venue: 'Gimnasio HSP',
            days: ['MAR', 'JUE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'Junior Femenino',
            schedule: 'Lunes, Miércoles y Viernes de 19 a 20:30 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'Promo Femenino',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: 'Gimnasio HSP',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Reserva Femenina',
            schedule: 'Lunes, Martes y Jueves de 20 a 21:30 h',
            venue: 'Gimnasio HSP',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 43000,
            priceAutoDebit: 34400
          }
        ]
      }
    ]
  },

  // 6. FÚTBOL FORMATIVO Y COMPETITIVO
  {
    id: 'futbol_formativo',
    name: 'Fútbol Formativo y Competitivo',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Canchas Polideportivo / Sede Social',
    schedule: 'Lunes a Viernes según división y categoría',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 40000,
    priceAutoDebit: 32000,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: true,
    description: 'La cuna del fútbol argentino: formación integral técnica, táctica y en valores.',
    levels: [
      'T1 Cat 2015', 'T1 Cat 2016', 'T1 Cat 2017', 'T2 Cat 2016', 'T2 Cat 2017', 'T2 Cat 2018',
      'T1 Cat 2018', 'T1 Cat 2019', 'T1 Cat 2020', 'T1 Cat 2021', 'T1 Cat 2022 y 2023', 'T2 Cat 2020',
      'Fem. Sub 12', 'Fem. Sub 14', 'Fem. Sub 16', 'Fem. Sub 18', 
      'Arqueros Futsal 1x', 'Arqueros Futsal 2x'
    ],
    branches: [
      {
        name: 'Masculino',
        categories: [
          {
            name: 'T1 Cat 2015',
            schedule: 'Lunes y Jueves de 17:30 a 19 h',
            venue: 'C1 & C2 Bajo Autopista (BA)',
            days: ['LUN', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'T1 Cat 2016',
            schedule: 'Martes y Viernes de 17:30 a 19 h',
            venue: 'C1 & C2 Bajo Autopista (BA)',
            days: ['MAR', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'T1 Cat 2017',
            schedule: 'Martes y Viernes de 19 a 20:30 h',
            venue: 'C1 & C2 Bajo Autopista (BA)',
            days: ['MAR', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'T2 Cat 2016',
            schedule: 'Lunes y Miércoles de 19 a 20:30 h',
            venue: 'C2 & C3 Bajo Autopista (BA)',
            days: ['LUN', 'MIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'T2 Cat 2017',
            schedule: 'Lunes y Miércoles de 19 a 20:30 h',
            venue: 'C1 & C2 Bajo Autopista (BA)',
            days: ['LUN', 'MIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'T2 Cat 2018',
            schedule: 'Lunes y Miércoles de 17:30 a 19 h',
            venue: 'C3 & C4 Bajo Autopista (BA)',
            days: ['LUN', 'MIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          }
        ]
      },
      {
        name: 'Mixto',
        categories: [
          {
            name: 'T1 Cat 2018 (Mixto)',
            schedule: 'Martes y Jueves de 17:30 a 19 h',
            venue: 'C3 & C4 Bajo Autopista (BA)',
            days: ['MAR', 'JUE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'T1 Cat 2019 (Mixto)',
            schedule: 'Miércoles y Viernes de 17:30 a 19 h',
            venue: 'C3 & C4 Bajo Autopista (BA)',
            days: ['MIE', 'VIE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'T1 Cat 2020 (Mixto)',
            schedule: 'Martes y Jueves de 17:30 a 18:30 h',
            venue: 'C5 Bajo Autopista (BA)',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'T1 Cat 2021 (Mixto)',
            schedule: 'Martes y Jueves de 17:30 a 18:30 h',
            venue: 'C5 Bajo Autopista (BA)',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'T1 Cat 2022 y 2023 (Iniciación)',
            schedule: 'Viernes de 17:30 a 18:30 h',
            venue: 'C5 Bajo Autopista (BA)',
            days: ['VIE'],
            priceOffice: 32000,
            priceAutoDebit: 25600
          },
          {
            name: 'T2 Cat 2020 (Mixto)',
            schedule: 'Martes y Jueves de 18:30 a 19:30 h',
            venue: 'C5 Bajo Autopista (BA)',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          }
        ]
      },
      {
        name: 'Femenino',
        categories: [
          {
            name: 'Fem. Sub 12 (No AFA)',
            schedule: 'Martes y Jueves de 17 a 19 h',
            venue: 'C3 y 4 Canchas Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'Fem. Sub 14 (No AFA)',
            schedule: 'Martes y Jueves de 17:30 a 19:30 h',
            venue: 'C3 y 4 Canchas Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 39000,
            priceAutoDebit: 31200
          },
          {
            name: 'Fem. Sub 16 (No AFA)',
            schedule: 'Martes y Jueves de 19 a 20:30 h',
            venue: 'C3 y 4 Canchas Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Fem. Sub 18 (No AFA)',
            schedule: 'Martes y Jueves de 20 a 21:30 h',
            venue: 'C3 y 4 Canchas Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 41000,
            priceAutoDebit: 32800
          },
          {
            name: 'Arqueros Futsal (1 vez por semana)',
            schedule: 'Viernes de 19 a 20 h',
            venue: 'Sede Social - Juan B. Justo',
            days: ['VIE'],
            priceOffice: 30000,
            priceAutoDebit: 24000
          },
          {
            name: 'Arqueros Futsal (2 veces por semana)',
            schedule: 'Martes y Jueves de 19 a 20 h',
            venue: 'Sede Social - Juan B. Justo',
            days: ['MAR', 'JUE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          }
        ]
      }
    ]
  },

  // 7. CESTOBALL
  {
    id: 'cestoball',
    name: 'Cestoball',
    type: 'team_sport',
    category: 'pelota',
    venue: 'Gimnasio de Cestoball',
    schedule: 'Lunes a Viernes según categoría',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 36000,
    priceAutoDebit: 28800,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: true,
    description: 'Pioneros en la disciplina nacional con múltiples títulos metropolitanos y argentinos.',
    levels: [
      'Sub-10', 'Sub-12', 'Sub-14', 'Sub-17 A', 'Maxi-30 A', 'Maxi-30 B', 'Primera Masculino'
    ],
    branches: [
      {
        name: 'Femenino',
        categories: [
          {
            name: 'Sub-10',
            schedule: 'Lunes, Martes y Jueves de 17:30 a 19 h',
            venue: 'Gimnasio de Cestoball',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 34000,
            priceAutoDebit: 27200
          },
          {
            name: 'Sub-12',
            schedule: 'Lunes, Martes y Jueves de 17:30 a 19 h',
            venue: 'Gimnasio de Cestoball',
            days: ['LUN', 'MAR', 'JUE'],
            priceOffice: 34000,
            priceAutoDebit: 27200
          },
          {
            name: 'Sub-14',
            schedule: 'Lunes, Miércoles y Viernes de 18 a 20 h',
            venue: 'Gimnasio de Cestoball',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          },
          {
            name: 'Sub-17 A',
            schedule: 'Lunes, Miércoles y Viernes de 18 a 20 h',
            venue: 'Gimnasio de Cestoball',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'Maxi-30 A',
            schedule: 'Martes y Jueves de 20 a 22 h',
            venue: 'Gimnasio de Cestoball',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          },
          {
            name: 'Maxi-30 B',
            schedule: 'Martes y Jueves de 20 a 22 h',
            venue: 'Gimnasio de Cestoball',
            days: ['MAR', 'JUE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          }
        ]
      },
      {
        name: 'Masculino',
        categories: [
          {
            name: 'Primera Masculino',
            schedule: 'Lunes, Miércoles y Viernes de 20 a 22 h',
            venue: 'Gimnasio de Cestoball',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          }
        ]
      }
    ]
  },

  // 8. ATLETISMO Y PATÍN
  {
    id: 'atletismo',
    name: 'Atletismo',
    type: 'frequency',
    category: 'raqueta_pista',
    venue: 'Pista de Atletismo Polideportivo',
    schedule: 'Lunes a Viernes de 17 a 21 h',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 35000,
    priceAutoDebit: 28000,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: true,
    description: 'Pista de atletismo oficial con saltómetro, fosa y lanzamientos en el Polideportivo.',
    levels: [
      'Escuela 6 a 9 años', 'Escuela 10 a 13 años', 'Escuela 14 años en adelante',
      'Escuela Mayores y Avanzados', 'Federados'
    ],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Escuela 6 a 9 años',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: 'Pista de Atletismo',
            days: ['MAR', 'JUE'],
            priceOffice: 32000,
            priceAutoDebit: 25600
          },
          {
            name: 'Escuela 10 a 13 años',
            schedule: 'Martes y Jueves de 19 a 20 h',
            venue: 'Pista de Atletismo',
            days: ['MAR', 'JUE'],
            priceOffice: 33000,
            priceAutoDebit: 26400
          },
          {
            name: 'Escuela 14 años en adelante',
            schedule: 'Miércoles y Viernes de 18 a 19 h',
            venue: 'Pista de Atletismo',
            days: ['MIE', 'VIE'],
            priceOffice: 35000,
            priceAutoDebit: 28000
          },
          {
            name: 'Escuela Mayores y Avanzados',
            schedule: 'Lunes a Viernes de 18 a 20:30 h',
            venue: 'Pista de Atletismo',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'Federados',
            schedule: 'Lunes a Viernes de 17 a 21 h',
            venue: 'Pista de Atletismo',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          }
        ]
      }
    ]
  },
  {
    id: 'patin_carrera',
    name: 'Patín Carrera',
    type: 'team_sport',
    category: 'raqueta_pista',
    venue: 'Patinódromo Polideportivo',
    schedule: 'Lunes a Jueves según nivel',
    daysSummary: 'Lunes a Jueves',
    priceOffice: 36000,
    priceAutoDebit: 28800,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: true,
    description: 'Patinódromo peraltado oficial en el Polideportivo para velocidad y fondo.',
    levels: [
      'Escuela Formativa Inicial >13', 'Escuela Formativa Nivel 2 mayores', 'Federados'
    ],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Escuela Formativa Inicial mayores de 13 años',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: 'Patinódromo',
            days: ['MAR', 'JUE'],
            priceOffice: 34000,
            priceAutoDebit: 27200
          },
          {
            name: 'Escuela Formativa Nivel 2 mayores',
            schedule: 'Martes y Jueves de 19 a 20:15 h',
            venue: 'Patinódromo',
            days: ['MAR', 'JUE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          },
          {
            name: 'Federados',
            schedule: 'Martes y Jueves de 20 a 21:30 h / Lunes y Miércoles de 17 a 19 h',
            venue: 'Patinódromo',
            days: ['LUN', 'MAR', 'MIE', 'JUE'],
            priceOffice: 42000,
            priceAutoDebit: 33600
          }
        ]
      }
    ]
  },
  {
    id: 'patin_artistico',
    name: 'Patín Artístico',
    type: 'frequency',
    category: 'raqueta_pista',
    venue: 'Salón Alto Sur',
    schedule: 'Lunes y Miércoles de 18 a 21:30 h',
    daysSummary: 'Lunes y Miércoles',
    priceOffice: 38000,
    priceAutoDebit: 30400,
    availableDays: ['LUN', 'MIE'],
    requiresMedical: true,
    description: 'Danza, figuras y saltos sobre patines con profesoras de renombre internacional.',
    levels: [
      'Escuela Recreativo 1 (4 a 7 años)', 'Escuela Recreativo 2 (8 a 12 años)', 'Escuela Recreativo 3 (Mayores de 13)'
    ],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Escuela Recreativo 1 (4 a 7 años)',
            schedule: 'Lunes y Miércoles de 18 a 19 h',
            venue: 'Salón Alto Sur',
            days: ['LUN', 'MIE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          },
          {
            name: 'Escuela Recreativo 2 (8 a 12 años)',
            schedule: 'Lunes y Miércoles de 19 a 20 h',
            venue: 'Salón Alto Sur',
            days: ['LUN', 'MIE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: 'Escuela Recreativo 3 (Mayores de 13 años)',
            schedule: 'Lunes y Miércoles de 20 a 21:30 h',
            venue: 'Salón Alto Sur',
            days: ['LUN', 'MIE'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          }
        ]
      }
    ]
  },

  // 9. ARTES MARCIALES Y COMBATE
  {
    id: 'boxeo',
    name: 'Boxeo',
    type: 'frequency',
    category: 'marciales',
    venue: 'Sector Boxeo - Polideportivo',
    schedule: 'Lunes, Miércoles y Viernes de 18 a 21 h',
    daysSummary: 'Lunes, Miércoles y Viernes',
    priceOffice: 36000,
    priceAutoDebit: 28800,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: true,
    description: 'Entrenamiento técnico, físico y recreativo con ring oficial y equipamiento profesional.',
    levels: ['Frecuencia 3 veces por semana'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Frecuencia 3 veces por semana',
            schedule: 'Lunes, Miércoles y Viernes de 18 a 19 h / 19 a 21 h',
            venue: 'Sector Boxeo - Polideportivo',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 36000,
            priceAutoDebit: 28800
          }
        ]
      }
    ]
  },
  {
    id: 'taekwondo',
    name: 'Taekwondo',
    type: 'frequency',
    category: 'marciales',
    venue: 'Salón de Artes Marciales',
    schedule: 'Martes y Jueves de 19 a 21 h',
    daysSummary: 'Martes y Jueves',
    priceOffice: 35000,
    priceAutoDebit: 28000,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: true,
    description: 'Defensa personal, disciplina, formas y combate deportivo en el dojang del club.',
    levels: ['Escuela Formativa (Opción 1)', 'Escuela Formativa (Opción 2)'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Escuela Formativa (Opción 1 - 20 a 21 h)',
            schedule: 'Martes y Jueves de 20 a 21 h',
            venue: 'Salón de Artes Marciales',
            days: ['MAR', 'JUE'],
            priceOffice: 35000,
            priceAutoDebit: 28000
          },
          {
            name: 'Escuela Formativa (Opción 2 - 19 a 20 h)',
            schedule: 'Martes y Jueves de 19 a 20 h',
            venue: 'Salón de Artes Marciales',
            days: ['MAR', 'JUE'],
            priceOffice: 35000,
            priceAutoDebit: 28000
          }
        ]
      }
    ]
  },
  {
    id: 'karate',
    name: 'Karate',
    type: 'frequency',
    category: 'marciales',
    venue: 'Salón de Artes Marciales',
    schedule: 'Lunes, Miércoles y Viernes de 20 a 22 h',
    daysSummary: 'Lunes, Miércoles y Viernes',
    priceOffice: 37000,
    priceAutoDebit: 29600,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: true,
    description: 'Estilo tradicional Shotokan: katas, kumite y graduación oficial.',
    levels: ['Cinturón Negro'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Cinturón Negro y Avanzados',
            schedule: 'Lunes, Miércoles y Viernes de 20 a 22 h',
            venue: 'Salón de Artes Marciales',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 37000,
            priceAutoDebit: 29600
          }
        ]
      }
    ]
  },

  // 10. FITNESS, MUSCULACIÓN Y COMBOS (TIPO PASS)
  {
    id: 'fitness',
    name: 'Fitness & Musculación',
    type: 'pass',
    category: 'fitness',
    venue: 'Gimnasio de Musculación / Sala de Fitness (Sede y Polideportivo)',
    schedule: 'Lunes a Viernes de 8:00 a 22:00 hs | Sábados de 9:00 a 19:00 hs',
    daysSummary: 'Lunes a Sábados',
    priceOffice: 42000,
    priceAutoDebit: 34000,
    availableDays: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
    requiresMedical: true,
    description: 'Acceso integral a salas de musculación, cardio y clases grupales en Sede Central y Polideportivo.',
    levels: [
      'Pase Libre Musculación',
      'Fitness de Salón (Spinning, GAP, Funcional)',
      'Running Team',
      'Combo Plata: Musculación + Salón + Running',
      'Combo Oro: Acceso Total + Pileta Libre'
    ],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Pase Libre Musculación',
            schedule: 'Lunes a Viernes de 8:00 a 22:00 hs | Sábados de 9:00 a 19:00 hs',
            venue: 'Gimnasio de Musculación (Sede y Polideportivo)',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
            priceOffice: 42000,
            priceAutoDebit: 34000
          },
          {
            name: 'Fitness de Salón (Spinning, GAP, Funcional)',
            schedule: 'Lunes a Viernes de 8:00 a 21:00 hs | Sábados de 9:00 a 14:00 hs',
            venue: 'Salas de Fitness y Aeróbica (Sede)',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
            priceOffice: 40000,
            priceAutoDebit: 32000
          },
          {
            name: 'Running Team',
            schedule: 'Martes y Jueves 19:00 hs | Sábados 9:00 hs',
            venue: 'Pista de Atletismo - Polideportivo',
            days: ['MAR', 'JUE', 'SAB'],
            priceOffice: 35000,
            priceAutoDebit: 28000
          },
          {
            name: 'Combo Plata: Musculación + Salón + Running',
            schedule: 'Lunes a Viernes de 8:00 a 22:00 hs | Sábados de 9:00 a 19:00 hs',
            venue: 'Gimnasio de Musculación, Salas de Fitness y Pista',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
            priceOffice: 54000,
            priceAutoDebit: 44000
          },
          {
            name: 'Combo Oro: Acceso Total + Pileta Libre',
            schedule: 'Lunes a Viernes de 8:00 a 22:00 hs | Sábados de 9:00 a 19:00 hs',
            venue: 'Todas las instalaciones + Natatorio Climatizado',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
            priceOffice: 91000,
            priceAutoDebit: 76000
          }
        ]
      }
    ]
  },
  {
    id: 'natacion',
    name: 'Natación y Escuela de Agua',
    type: 'frequency',
    category: 'fitness',
    venue: 'Natatorio Olímpico Climatizado - Polideportivo',
    schedule: 'Lunes a Sábados según frecuencia y nivel',
    daysSummary: 'Lunes a Sábados',
    priceOffice: 45000,
    priceAutoDebit: 36000,
    availableDays: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
    requiresMedical: true,
    description: 'Natatorio olímpico climatizado para escuela infantil, adultos, perfeccionamiento y pileta libre.',
    levels: [
      '1 clase por semana',
      '2 clases por semana',
      '3 clases por semana',
      'Pase Libre Pileta'
    ],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: '1 clase por semana',
            schedule: 'Turnos y horarios a convenir con el profesor',
            venue: 'Natatorio Climatizado - Polideportivo',
            days: ['SAB'],
            priceOffice: 28000,
            priceAutoDebit: 22400
          },
          {
            name: '2 clases por semana',
            schedule: 'Martes y Jueves (Turno Tarde / Noche)',
            venue: 'Natatorio Climatizado - Polideportivo',
            days: ['MAR', 'JUE'],
            priceOffice: 38000,
            priceAutoDebit: 30400
          },
          {
            name: '3 clases por semana',
            schedule: 'Lunes, Miércoles y Viernes',
            venue: 'Natatorio Climatizado - Polideportivo',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 46000,
            priceAutoDebit: 36800
          },
          {
            name: 'Pase Libre Pileta',
            schedule: 'Lunes a Viernes de 7:00 a 21:00 hs | Sábados de 8:00 a 18:00 hs',
            venue: 'Natatorio Climatizado - Polideportivo',
            days: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
            priceOffice: 54000,
            priceAutoDebit: 43200
          }
        ]
      }
    ]
  },
  {
    id: 'yoga',
    name: 'Yoga',
    type: 'frequency',
    category: 'fitness',
    venue: '6to Piso - Sede Central',
    schedule: 'Lunes a Viernes según modalidad',
    daysSummary: 'Lunes a Viernes',
    priceOffice: 28000,
    priceAutoDebit: 22400,
    availableDays: ['LUN', 'MIE', 'VIE'],
    requiresMedical: false,
    description: 'Respiración, flexibilidad, armonía y bienestar integral en el 6to piso de la sede.',
    levels: ['Hatha 1', 'Hatha 2', 'Integral 1', 'Integral 2'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Hatha 1',
            schedule: 'Lunes, Miércoles y Viernes de 18 a 19 h',
            venue: '6to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 28000,
            priceAutoDebit: 22400
          },
          {
            name: 'Hatha 2',
            schedule: 'Lunes, Miércoles y Viernes de 19 a 20 h',
            venue: '6to piso - Sede Central',
            days: ['LUN', 'MIE', 'VIE'],
            priceOffice: 28000,
            priceAutoDebit: 22400
          },
          {
            name: 'Integral 1',
            schedule: 'Martes y Jueves de 17 a 18 h',
            venue: '6to piso - Sede Central',
            days: ['MAR', 'JUE'],
            priceOffice: 26000,
            priceAutoDebit: 20800
          },
          {
            name: 'Integral 2',
            schedule: 'Martes y Jueves de 18 a 19 h',
            venue: '6to piso - Sede Central',
            days: ['MAR', 'JUE'],
            priceOffice: 26000,
            priceAutoDebit: 20800
          }
        ]
      }
    ]
  },
  // 11. CULTURA OFICIAL CAVS (5 DISCIPLINAS INDEPENDIENTES)
  // 11.1 AJEDREZ
  {
    id: 'ajedrez',
    name: 'Ajedrez',
    type: 'workshop',
    category: 'cultura',
    venue: '3er Piso - Sede Central',
    schedule: 'Martes y Jueves de 19 a 21 h',
    daysSummary: 'Martes y Jueves',
    priceOffice: 22000,
    priceAutoDebit: 17600,
    availableDays: ['MAR', 'JUE'],
    requiresMedical: false,
    description: 'Ajedrez formativo, recreativo y de competencia federada en el 3er piso de la Sede Central.',
    levels: ['Principiante', 'Avanzado'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Principiante',
            schedule: 'Martes y Jueves de 19 a 20 h',
            venue: '3er piso - Sede Central',
            days: ['MAR', 'JUE'],
            priceOffice: 22000,
            priceAutoDebit: 17600
          },
          {
            name: 'Avanzado',
            schedule: 'Martes y Jueves de 20 a 21 h',
            venue: '3er piso - Sede Central',
            days: ['MAR', 'JUE'],
            priceOffice: 22000,
            priceAutoDebit: 17600
          }
        ]
      }
    ]
  },

  // 11.2 IDIOMAS Y COMUNICACIÓN
  {
    id: 'idiomas_comunicacion',
    name: 'Idiomas y Comunicación',
    type: 'workshop',
    category: 'cultura',
    venue: '3er Piso - Sede Central',
    schedule: 'Miércoles y Viernes por la tarde',
    daysSummary: 'Miércoles y Viernes',
    priceOffice: 25000,
    priceAutoDebit: 20000,
    availableDays: ['MIE', 'VIE'],
    requiresMedical: false,
    description: 'Cursos oficiales de idiomas y comunicación del club: Italiano (IT1 e IT2) y Lengua de Señas Argentina.',
    levels: ['Italiano IT1', 'Italiano IT2', 'Lengua de Señas'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Italiano IT1',
            schedule: 'Viernes de 16:30 a 18:20 h',
            venue: '3er piso - Sede Central',
            days: ['VIE'],
            priceOffice: 25000,
            priceAutoDebit: 20000
          },
          {
            name: 'Italiano IT2',
            schedule: 'Viernes de 18:30 a 20:20 h',
            venue: '3er piso - Sede Central',
            days: ['VIE'],
            priceOffice: 25000,
            priceAutoDebit: 20000
          },
          {
            name: 'Lengua de Señas',
            schedule: 'Miércoles de 19:30 a 21 h',
            venue: '3er piso - Sede Central',
            days: ['MIE'],
            priceOffice: 23000,
            priceAutoDebit: 18400
          }
        ]
      }
    ]
  },

  // 11.3 TEATRO Y EXPRESIÓN CORPORAL
  {
    id: 'teatro_expresion',
    name: 'Teatro y Expresión Corporal',
    type: 'workshop',
    category: 'cultura',
    venue: 'Salón Bajo Oeste y Quincho Cultura',
    schedule: 'Martes, Miércoles y Viernes',
    daysSummary: 'Martes, Miércoles y Viernes',
    priceOffice: 24000,
    priceAutoDebit: 19200,
    availableDays: ['MAR', 'MIE', 'VIE'],
    requiresMedical: false,
    description: 'Disciplinas artísticas y de movimiento escénico: Taller de Teatro, Tango social y Danza Fusión infantil.',
    levels: ['Teatro', 'Tango', 'Danza Fusión'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Teatro',
            schedule: 'Miércoles de 18:30 a 20:30 h',
            venue: 'Salón Bajo Oeste',
            days: ['MIE'],
            priceOffice: 24000,
            priceAutoDebit: 19200
          },
          {
            name: 'Tango',
            schedule: 'Martes de 20:30 a 22 h',
            venue: 'Quincho Cultura',
            days: ['MAR'],
            priceOffice: 24000,
            priceAutoDebit: 19200
          },
          {
            name: 'Danza Fusión',
            schedule: 'Viernes de 17 a 18 h',
            venue: 'Quincho Cultura',
            days: ['VIE'],
            priceOffice: 22000,
            priceAutoDebit: 17600
          }
        ]
      }
    ]
  },

  // 11.4 TALLERES CREATIVOS
  {
    id: 'talleres_creativos',
    name: 'Talleres Creativos',
    type: 'workshop',
    category: 'cultura',
    venue: '3er Piso y Quinchos',
    schedule: 'Miércoles y Jueves por la tarde',
    daysSummary: 'Miércoles y Jueves',
    priceOffice: 24000,
    priceAutoDebit: 19200,
    availableDays: ['MIE', 'JUE'],
    requiresMedical: false,
    description: 'Talleres creativos de escritura, artes plásticas y tejido solidario del Departamento de Cultura.',
    levels: ['Taller Literario', 'Arte Adolescentes', 'Arte Adultos', 'Vélez Teje'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Taller Literario',
            schedule: 'Miércoles de 17:30 a 19:30 h',
            venue: '3er piso - Sede Central',
            days: ['MIE'],
            priceOffice: 21000,
            priceAutoDebit: 16800
          },
          {
            name: 'Arte Adolescentes',
            schedule: 'Jueves de 17 a 20 h',
            venue: '3er piso - Sede Central',
            days: ['JUE'],
            priceOffice: 24000,
            priceAutoDebit: 19200
          },
          {
            name: 'Arte Adultos',
            schedule: 'Jueves de 17 a 20 h',
            venue: '3er piso - Sede Central',
            days: ['JUE'],
            priceOffice: 24000,
            priceAutoDebit: 19200
          },
          {
            name: 'Vélez Teje',
            schedule: '1er y 3er Miércoles de cada mes desde las 14 h',
            venue: 'Quinchos de Cultura',
            days: ['MIE'],
            priceOffice: 15000,
            priceAutoDebit: 12000
          }
        ]
      }
    ]
  },

  // 11.5 TAI CHI CHUAN
  {
    id: 'tai_chi',
    name: 'Tai Chi Chuan',
    type: 'workshop',
    category: 'cultura',
    venue: 'Quincho Cultura',
    schedule: 'Martes de 18 a 19 h y Sábados de 16 a 17 h',
    daysSummary: 'Martes y Sábados',
    priceOffice: 24000,
    priceAutoDebit: 19200,
    availableDays: ['MAR', 'SAB'],
    requiresMedical: false,
    description: 'Práctica milenaria de armonía, respiración consciente y bienestar en el Quincho de Cultura.',
    levels: ['Práctica Regular (Martes y Sábados)'],
    branches: [
      {
        name: 'Mixto',
        categories: [
          {
            name: 'Práctica Regular',
            schedule: 'Martes de 18 a 19 h y Sábados de 16 a 17 h',
            venue: 'Quincho Cultura',
            days: ['MAR', 'SAB'],
            priceOffice: 24000,
            priceAutoDebit: 19200
          }
        ]
      }
    ]
  }
];
