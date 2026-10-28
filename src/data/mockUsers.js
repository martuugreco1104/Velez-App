export const socioAlDia = {
  id: 'user_al_dia',
  nombre: 'Martina Greco',
  nroSocio: '45.965',
  codigoCarnet: 'ASPF013333',
  dni: '42.498.635',
  categoria: 'Socia Semipleno',
  socioDesde: '11/12/2008',
  fechaNacimiento: '11/04/2000',
  genero: 'Femenino',
  nacionalidad: 'Argentina',
  estadoCivil: 'Soltera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  status: 'al_dia', // 'al_dia' | 'por_vencer' | 'deuda'
  seasonTicket: null, // Acceso libre gratuito a Populares y Platea Bianchi Alta
  quotaInfo: {
    periodo: 'Octubre 2026',
    proximoVencimiento: '10 de Noviembre, 2026',
    monto: 18500,
    ultimoPago: '05/10/2026'
  },
  aptoFisico: {
    vigente: true,
    vencimiento: '15/04/2027',
    doctor: 'Dr. Carlos Menéndez (MN 87.214)'
  },
  misActividades: [
    {
      id: 'musculacion_fitness',
      name: 'Fitness & Musculación',
      level: 'Pase Libre',
      venue: 'Gimnasio Integral / Aire Libre',
      days: 'LUN, MIE, VIE',
      hours: '08:00 a 11:00 hs',
      status: 'Activo'
    },
    {
      id: 'natacion_escuela',
      name: 'Natación (Pileta Libre)',
      level: 'Climatizada 2x semana',
      venue: 'Natatorio Polideportivo',
      days: 'MAR, JUE',
      hours: '18:00 a 19:30 hs',
      status: 'Activo'
    }
  ]
};

export const socioPorVencer = {
  id: 'user_por_vencer',
  nombre: 'Martina Greco',
  nroSocio: '45.965',
  codigoCarnet: 'ASPF013333',
  dni: '42.498.635',
  categoria: 'Socia Semipleno',
  socioDesde: '11/12/2008',
  fechaNacimiento: '11/04/2000',
  genero: 'Femenino',
  nacionalidad: 'Argentina',
  estadoCivil: 'Soltera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  status: 'por_vencer',
  seasonTicket: null,
  quotaInfo: {
    periodo: 'Noviembre 2026',
    proximoVencimiento: '10 de Noviembre, 2026 (Vence en 3 días)',
    monto: 18500,
    ultimoPago: '04/10/2026'
  },
  aptoFisico: {
    vigente: true,
    vencimiento: '15/04/2027',
    doctor: 'Dr. Carlos Menéndez (MN 87.214)'
  },
  misActividades: [
    {
      id: 'musculacion_fitness',
      name: 'Fitness & Musculación',
      level: 'Pase Libre',
      venue: 'Gimnasio Integral / Aire Libre',
      days: 'LUN, MIE, VIE',
      hours: '08:00 a 11:00 hs',
      status: 'Activo'
    }
  ]
};

export const socioConDeuda = {
  id: 'user_con_deuda',
  nombre: 'Martina Greco',
  nroSocio: '45.965',
  codigoCarnet: 'ASPF013333',
  dni: '42.498.635',
  categoria: 'Socia Semipleno',
  socioDesde: '11/12/2008',
  fechaNacimiento: '11/04/2000',
  genero: 'Femenino',
  nacionalidad: 'Argentina',
  estadoCivil: 'Soltera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  status: 'deuda',
  seasonTicket: null,
  quotaInfo: {
    periodo: 'Agosto, Septiembre y Octubre 2026',
    proximoVencimiento: 'Vencido — Molinete Bloqueado',
    monto: 55500,
    mesesImpagos: ['Agosto 2026', 'Septiembre 2026', 'Octubre 2026'],
    ultimoPago: '08/07/2026'
  },
  aptoFisico: {
    vigente: true,
    vencimiento: '15/04/2027',
    doctor: 'Dr. Carlos Menéndez (MN 87.214)'
  },
  misActividades: [
    {
      id: 'musculacion_fitness',
      name: 'Fitness & Musculación',
      level: 'Pase Libre',
      venue: 'Gimnasio Integral',
      days: 'LUN, MIE, VIE',
      hours: '08:00 a 11:00 hs',
      status: 'Suspendido por deuda'
    }
  ]
};

export const socioAbonado = {
  id: 'user_abonado',
  nombre: 'Martina Greco',
  nroSocio: '45.965',
  codigoCarnet: 'ASPF013333',
  dni: '42.498.635',
  categoria: 'Socia Semipleno',
  socioDesde: '11/12/2008',
  fechaNacimiento: '11/04/2000',
  genero: 'Femenino',
  nacionalidad: 'Argentina',
  estadoCivil: 'Soltera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  status: 'al_dia',
  seasonTicket: {
    sector: 'Platea Norte Baja',
    fila: 12,
    asiento: 45,
    puerta: 'Puerta 3 (Av. Juan B. Justo)',
    vigencia: 'Torneo Clausura 2026'
  },
  quotaInfo: {
    periodo: 'Octubre 2026',
    proximoVencimiento: '10 de Noviembre, 2026',
    monto: 18500,
    ultimoPago: '05/10/2026'
  },
  aptoFisico: {
    vigente: true,
    vencimiento: '15/04/2027',
    doctor: 'Dr. Carlos Menéndez (MN 87.214)'
  },
  misActividades: [
    {
      id: 'musculacion_fitness',
      name: 'Fitness & Musculación',
      level: 'Pase Libre',
      venue: 'Gimnasio Integral',
      days: 'LUN, MIE, VIE',
      hours: '08:00 a 11:00 hs',
      status: 'Activo'
    }
  ]
};

export const socioSinFamilia = {
  id: 'user_sin_familia',
  nombre: 'Martina Greco',
  nroSocio: '45.965',
  codigoCarnet: 'ASPF013333',
  dni: '42.498.635',
  categoria: 'Socia Semipleno',
  socioDesde: '11/12/2008',
  fechaNacimiento: '11/04/2000',
  genero: 'Femenino',
  nacionalidad: 'Argentina',
  estadoCivil: 'Soltera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  status: 'al_dia',
  hasFamilyGroup: false,
  seasonTicket: null,
  quotaInfo: {
    periodo: 'Octubre 2026',
    proximoVencimiento: '10 de Noviembre, 2026',
    monto: 18500,
    ultimoPago: '05/10/2026'
  },
  aptoFisico: {
    vigente: true,
    vencimiento: '15/04/2027',
    doctor: 'Dr. Carlos Menéndez (MN 87.214)'
  },
  misActividades: []
};

export const MOCK_USERS = [socioAlDia, socioAbonado, socioPorVencer, socioConDeuda, socioSinFamilia];
