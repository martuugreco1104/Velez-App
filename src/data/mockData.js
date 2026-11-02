export const memberData = {
  nombre: "Martina Greco",
  nroSocio: "45.965",
  codigoCarnet: "ASPF013333",
  dni: "42.498.635",
  categoria: "Socia Semipleno",
  socioDesde: "11/12/2008",
  fechaNacimiento: "11/04/2000",
  genero: "Femenino",
  nacionalidad: "Argentina",
  estadoCivil: "Soltera",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  aptoFisico: {
    vigente: true,
    vencimiento: "15/04/2027",
    doctor: "Dr. Carlos Menéndez (MN 87.214)"
  },
  misActividades: [
    {
      id: 'musculacion_fitness',
      name: 'Fitness & Musculación',
      level: 'Pase Libre',
      venue: 'Gimnasio Integral / Aire Libre',
      days: 'LUN, MIE, VIE',
      hours: '08:00 a 11:00 hs',
      status: 'Activo',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'natacion_escuela',
      name: 'Natación (Pileta Libre)',
      level: 'Climatizada 2x semana',
      venue: 'Natatorio Polideportivo',
      days: 'MAR, JUE',
      hours: '18:00 a 19:30 hs',
      status: 'Activo',
      badgeColor: 'bg-blue-100 text-velez-primary'
    }
  ]
};

export const quotaStates = {
  al_dia: {
    type: 'al_dia',
    label: 'Al día',
    badge: 'bg-velez-success/15 text-velez-success border-velez-success/30',
    title: 'Cuota de Octubre Abonada',
    dueDate: '10 de Noviembre, 2026',
    amount: 18500,
    debtDetails: null,
    buttonText: 'Ver Comprobante',
    mesesImpagos: 0
  },
  por_vencer: {
    type: 'por_vencer',
    label: 'Por vencer',
    badge: 'bg-orange-500/15 text-velez-warning border-velez-warning/30',
    title: 'Cuota de Noviembre al Cobro',
    dueDate: 'Vence en 3 días (10 de Noviembre)',
    amount: 18500,
    debtDetails: 'Evitá recargos abonando antes del vencimiento.',
    buttonText: 'Pagar Cuota ($18.500)',
    mesesImpagos: 1
  },
  con_deuda: {
    type: 'con_deuda',
    label: 'Deuda Pendiente',
    badge: 'bg-rose-500/20 text-velez-danger border-velez-danger/40',
    title: 'Regularizá tu Situación Social',
    dueDate: '3 cuotas impagas acumuladas',
    amount: 55500,
    debtDetails: 'Adeuda 3 cuotas: Agosto, Septiembre, Octubre',
    buttonText: 'Pagar Deuda Total ($55.500)',
    mesesImpagos: 3
  }
};

export const nextMatchData = {
  rival: "Unión de Santa Fe",
  rivalShort: "Unión",
  rivalShield: "/clubs/union.svg",
  torneo: "Torneo Clausura 2026",
  fechaNro: "Fecha 16",
  fecha: "Domingo 8 de Noviembre",
  hora: "17:00 hs",
  estadio: "Estadio 15 de Abril (Santa Fe)",
  ubicacion: "Santa Fe",
  tv: "TNT Sports / ESPN Premium",
  plateaDisponible: "No habilitado para público visitante",
  precioDesde: 0,
  esLocal: false
};

export const shopProducts = [
  {
    id: 'cam-titular-2026',
    name: 'Camiseta Oficial Titular Vélez',
    brand: 'CAVS Oficial',
    category: 'Indumentaria Oficial',
    price: 89900,
    discountPrice: 80910,
    image: '/tienda/remera-retro-1996-mujer-blanca-01-.webp',
    tag: 'Nueva Temporada',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'cam-suplente-2026',
    name: 'Remera Retro 1996 Azul Francia',
    brand: 'CAVS Oficial',
    category: 'Indumentaria Oficial',
    price: 84900,
    discountPrice: 76410,
    image: '/tienda/remera-retro-1996-azul-francia-01.webp',
    tag: 'Edición Especial',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'bermuda-retro-cavs',
    name: 'Bermuda Retro CAVS Azul Francia',
    brand: 'CAVS Oficial',
    category: 'Entrenamiento',
    price: 48000,
    discountPrice: 43200,
    image: '/tienda/bermuda-retro-azul-francia-01.webp',
    tag: 'Indumentaria',
    sizes: ['S', 'M', 'L']
  }
];
