export const FAMILY_GROUP_MOCK = {
  titular: {
    name: "Martina Greco",
    role: "Titular / Administradora",
    sociaNumber: "45.965",
    dni: "34.567.890",
    quotaStatus: "al_dia"
  },
  members: [
    {
      id: "fam_1",
      name: "Lucas Greco",
      relationship: "Hijo",
      age: 9,
      socioNumber: "78.210",
      dni: "54.891.203",
      avatar: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80",
      quotaStatus: "al_dia",
      quotaAmount: 22000,
      institute: {
        enrolled: true,
        level: "Primario (4° Grado B)",
        currentMonth: "Octubre 2026",
        tuitionAmount: 115000,
        status: "pendiente" // 'al_dia' | 'pendiente'
      },
      summerCamp: {
        enrolled: false,
        eligible: true
      }
    },
    {
      id: "fam_2",
      name: "Valentina Greco",
      relationship: "Hija",
      age: 5,
      socioNumber: "84.105",
      dni: "58.120.449",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      quotaStatus: "por_vencer",
      quotaAmount: 18500,
      institute: {
        enrolled: true,
        level: "Nivel Inicial (Sala de 5)",
        currentMonth: "Octubre 2026",
        tuitionAmount: 98000,
        status: "al_dia"
      },
      summerCamp: {
        enrolled: true,
        modality: "Colonia Verano 2027 - Turno Completo (con almuerzo)",
        amount: 85000,
        status: "al_dia"
      }
    }
  ]
};
