export const SEASON_TICKETS = [
  {
    id: 'platea_bianchi_baja',
    sector: 'Platea Carlos Bianchi Baja',
    category: 'Adulto',
    price: 150000,
    benefits: 'Butaca numerada por toda la temporada, acceso exclusivo puerta sur',
    available: true,
    door: 'Puertas 7 y 8 (Calle Reservistas Argentinos)',
    gateRecommendation: 'Acceso directo sin filas por molinetes Sur'
  },
  {
    id: 'platea_bianchi_baja_menor',
    sector: 'Platea Carlos Bianchi Baja',
    category: 'Menor (hasta 11 años)',
    price: 90000,
    benefits: 'Butaca numerada junto al adulto responsable',
    available: true,
    door: 'Puertas 7 y 8 (Calle Reservistas Argentinos)',
    gateRecommendation: 'Acompañado por el titular'
  },
  {
    id: 'platea_norte_baja',
    sector: 'Platea Norte Baja',
    category: 'Adulto',
    price: 490000,
    benefits: 'Sector techado preferencial, butaca numerada central',
    available: true,
    door: 'Puerta 3 (Av. Juan B. Justo 9200)',
    gateRecommendation: 'Vista al banco de suplentes de Vélez'
  },
  {
    id: 'platea_norte_baja_menor',
    sector: 'Platea Norte Baja',
    category: 'Menor (hasta 11 años)',
    price: 140000,
    benefits: 'Sector techado preferencial junto al titular',
    available: true,
    door: 'Puerta 3 (Av. Juan B. Justo 9200)',
    gateRecommendation: 'Ubicación contigua al adulto'
  },
  {
    id: 'palco_lateral',
    sector: 'Palco Lateral VIP',
    category: 'Exclusivo Socios',
    price: 750000,
    benefits: 'Catering, estacionamiento incluido y vista panorámica',
    available: true,
    door: 'Hall Central Puerta 1 VIP (Av. Juan B. Justo)',
    gateRecommendation: 'Ascensores exclusivos a palcos'
  }
];

export const STADIUM_GATES_INFO = [
  {
    id: 'populares',
    sector: 'Populares Este y Oeste (Tribunas Generales)',
    price: 'Acceso Gratuito',
    badge: 'Libre con Carnet',
    doors: 'Puertas 4, 5 (Este) / Puertas 9, 10, 11 (Oeste)',
    description: 'Acceso irrestricto para todos los socios con cuota al día por cualquier molinete de populares.',
    openTime: 'Apertura 3 horas antes del pitazo inicial'
  },
  {
    id: 'bianchi_alta',
    sector: 'Platea Carlos Bianchi Alta',
    price: 'Acceso Gratuito',
    badge: 'Libre con Carnet',
    doors: 'Puerta 6 (Acceso por pasaje Reservistas)',
    description: 'Platea alta libre de costo para todos los asociados de todas las categorías activas.',
    openTime: 'Capacidad por orden de llegada con carnet digital'
  },
  {
    id: 'bianchi_baja',
    sector: 'Platea Carlos Bianchi Baja',
    price: 'Abono de Temporada',
    badge: 'Abonados',
    doors: 'Puertas 7 y 8',
    description: 'Ubicaciones numeradas con butaca fija para toda la Liga Profesional.',
    openTime: 'Molinete preferencial sin demoras'
  },
  {
    id: 'norte_baja',
    sector: 'Platea Norte Baja y Alta',
    price: 'Abono de Temporada',
    badge: 'Abonados',
    doors: 'Puertas 1, 2 y 3 (Sobre Av. Juan B. Justo)',
    description: 'Sector techado histórico del José Amalfitani con butacas acolchonadas.',
    openTime: 'Acceso rápido sobre avenida principal'
  }
];
