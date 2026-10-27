/**
 * Mock Data para Dashboard de Operaciones de Aerolínea Virtual
 * Basado estrictamente en la especificación formal de: data/estructura_datos.md
 * Contiene vuelos operacionales y reservas con pasajeros, asientos, estados y reglas de negocio aplicadas.
 */

export const vuelos = [
  {
    id: "fl-101",
    numeroVuelo: "AV-101",
    origen: "MDE - Medellín (MDE)",
    destino: "BOG - Bogotá (BOG)",
    ruta: "MDE - BOG",
    fechaSalida: "2026-10-26T06:30:00Z",
    fechaLlegada: "2026-10-26T07:25:00Z",
    duracionEstimadaHoras: 0.9,
    estado: "A tiempo",
    capacidadTotal: 150,
    asientosOcupados: 142,
    tasaOcupacion: 94.6,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5342"
    },
    puertaEmbarque: "A04",
    terminal: "T1"
  },
  {
    id: "fl-102",
    numeroVuelo: "AV-102",
    origen: "BOG - Bogotá (BOG)",
    destino: "MIA - Miami (MIA)",
    ruta: "BOG - MIA",
    fechaSalida: "2026-10-26T08:15:00Z",
    fechaLlegada: "2026-10-26T12:45:00Z",
    duracionEstimadaHoras: 4.5,
    estado: "En Vuelo",
    capacidadTotal: 180,
    asientosOcupados: 168,
    tasaOcupacion: 93.3,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Boeing 787-8",
      matricula: "HK-5280"
    },
    puertaEmbarque: "B12",
    terminal: "T2"
  },
  {
    id: "fl-103",
    numeroVuelo: "AV-103",
    origen: "MDE - Medellín (MDE)",
    destino: "CTG - Cartagena (CTG)",
    ruta: "MDE - CTG",
    fechaSalida: "2026-10-26T09:40:00Z",
    fechaLlegada: "2026-10-26T10:45:00Z",
    duracionEstimadaHoras: 1.1,
    estado: "Retrasado",
    capacidadTotal: 150,
    asientosOcupados: 125,
    tasaOcupacion: 83.3,
    retrasoMinutos: 75,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5390"
    },
    puertaEmbarque: "A08",
    terminal: "T1"
  },
  {
    id: "fl-104",
    numeroVuelo: "AV-104",
    origen: "CLO - Cali (CLO)",
    destino: "BOG - Bogotá (BOG)",
    ruta: "CLO - BOG",
    fechaSalida: "2026-10-26T10:00:00Z",
    fechaLlegada: "2026-10-26T11:00:00Z",
    duracionEstimadaHoras: 1.0,
    estado: "A tiempo",
    capacidadTotal: 144,
    asientosOcupados: 130,
    tasaOcupacion: 90.3,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A319",
      matricula: "HK-5112"
    },
    puertaEmbarque: "C03",
    terminal: "T1"
  },
  {
    id: "fl-105",
    numeroVuelo: "AV-105",
    origen: "BOG - Bogotá (BOG)",
    destino: "MAD - Madrid (MAD)",
    ruta: "BOG - MAD",
    fechaSalida: "2026-10-26T13:30:00Z",
    fechaLlegada: "2026-10-27T06:10:00Z",
    duracionEstimadaHoras: 9.7,
    estado: "Programado",
    capacidadTotal: 250,
    asientosOcupados: 238,
    tasaOcupacion: 95.2,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Boeing 787-8",
      matricula: "HK-5421"
    },
    puertaEmbarque: "B18",
    terminal: "T2"
  },
  {
    id: "fl-106",
    numeroVuelo: "AV-106",
    origen: "MDE - Medellín (MDE)",
    destino: "SMR - Santa Marta (SMR)",
    ruta: "MDE - SMR",
    fechaSalida: "2026-10-26T11:20:00Z",
    fechaLlegada: "2026-10-26T12:35:00Z",
    duracionEstimadaHoras: 1.25,
    estado: "Cancelado",
    capacidadTotal: 150,
    asientosOcupados: 110,
    tasaOcupacion: 73.3,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5360"
    },
    puertaEmbarque: "A02",
    terminal: "T1"
  },
  {
    id: "fl-107",
    numeroVuelo: "AV-107",
    origen: "BOG - Bogotá (BOG)",
    destino: "PTY - Ciudad de Panamá (PTY)",
    ruta: "BOG - PTY",
    fechaSalida: "2026-10-26T14:10:00Z",
    fechaLlegada: "2026-10-26T15:55:00Z",
    duracionEstimadaHoras: 1.75,
    estado: "A tiempo",
    capacidadTotal: 160,
    asientosOcupados: 145,
    tasaOcupacion: 90.6,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5310"
    },
    puertaEmbarque: "B06",
    terminal: "T2"
  },
  {
    id: "fl-108",
    numeroVuelo: "AV-108",
    origen: "BAQ - Barranquilla (BAQ)",
    destino: "MDE - Medellín (MDE)",
    ruta: "BAQ - MDE",
    fechaSalida: "2026-10-26T15:00:00Z",
    fechaLlegada: "2026-10-26T16:10:00Z",
    duracionEstimadaHoras: 1.15,
    estado: "Retrasado",
    capacidadTotal: 140,
    asientosOcupados: 98,
    tasaOcupacion: 70.0,
    retrasoMinutos: 185,
    aeronave: {
      modelo: "Airbus A319",
      matricula: "HK-5098"
    },
    puertaEmbarque: "D02",
    terminal: "T1"
  },
  {
    id: "fl-109",
    numeroVuelo: "AV-109",
    origen: "MDE - Medellín (MDE)",
    destino: "MIA - Miami (MIA)",
    ruta: "MDE - MIA",
    fechaSalida: "2026-10-26T16:45:00Z",
    fechaLlegada: "2026-10-26T21:05:00Z",
    duracionEstimadaHoras: 4.3,
    estado: "Programado",
    capacidadTotal: 180,
    asientosOcupados: 162,
    tasaOcupacion: 90.0,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Boeing 787-8",
      matricula: "HK-5275"
    },
    puertaEmbarque: "A14",
    terminal: "T1"
  },
  {
    id: "fl-110",
    numeroVuelo: "AV-110",
    origen: "CLO - Cali (CLO)",
    destino: "CTG - Cartagena (CTG)",
    ruta: "CLO - CTG",
    fechaSalida: "2026-10-26T17:30:00Z",
    fechaLlegada: "2026-10-26T19:00:00Z",
    duracionEstimadaHoras: 1.5,
    estado: "A tiempo",
    capacidadTotal: 150,
    asientosOcupados: 135,
    tasaOcupacion: 90.0,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5385"
    },
    puertaEmbarque: "C07",
    terminal: "T1"
  },
  {
    id: "fl-111",
    numeroVuelo: "AV-111",
    origen: "BOG - Bogotá (BOG)",
    destino: "CLO - Cali (CLO)",
    ruta: "BOG - CLO",
    fechaSalida: "2026-10-26T18:00:00Z",
    fechaLlegada: "2026-10-26T19:00:00Z",
    duracionEstimadaHoras: 1.0,
    estado: "En Vuelo",
    capacidadTotal: 150,
    asientosOcupados: 140,
    tasaOcupacion: 93.3,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5322"
    },
    puertaEmbarque: "B03",
    terminal: "T1"
  },
  {
    id: "fl-112",
    numeroVuelo: "AV-112",
    origen: "CTG - Cartagena (CTG)",
    destino: "BOG - Bogotá (BOG)",
    ruta: "CTG - BOG",
    fechaSalida: "2026-10-26T19:15:00Z",
    fechaLlegada: "2026-10-26T20:45:00Z",
    duracionEstimadaHoras: 1.5,
    estado: "A tiempo",
    capacidadTotal: 160,
    asientosOcupados: 148,
    tasaOcupacion: 92.5,
    retrasoMinutos: 0,
    aeronave: {
      modelo: "Airbus A320neo",
      matricula: "HK-5374"
    },
    puertaEmbarque: "D05",
    terminal: "T1"
  }
];

export const reservas = [
  {
    id: "res-001",
    codigo: "AV-RES-9481",
    fechaReserva: "2026-10-20T08:30:00Z",
    estado: "Confirmada",
    valor: 245.50,
    vueloId: "fl-101",
    numeroVuelo: "AV-101",
    ruta: "MDE - BOG",
    origen: "MDE - Medellín",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-01",
      nombre: "Valentina",
      apellido: "Ríos",
      email: "valentina.rios@example.com",
      telefono: "+57 300 293 8472",
      edad: 29,
      membershipStatus: "Platinum",
      puntosLealtad: 12400,
      accesoVipLounge: true
    },
    asiento: {
      numero: "02A",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 8.5,
    reglasAplicadas: [
      "Regla 9: Acceso concedido a Salón VIP para miembro Platinum",
      "Regla 3: Descuento del 10% aplicado por equipaje ligero (<10 kg)"
    ]
  },
  {
    id: "res-002",
    codigo: "AV-RES-9482",
    fechaReserva: "2026-10-20T10:15:00Z",
    estado: "Confirmada",
    valor: 480.00,
    vueloId: "fl-102",
    numeroVuelo: "AV-102",
    ruta: "BOG - MIA",
    origen: "BOG - Bogotá",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-02",
      nombre: "Fernando",
      apellido: "Montoya",
      email: "fernando.montoya@example.com",
      telefono: "+57 312 884 1029",
      edad: 48,
      membershipStatus: "Gold",
      puntosLealtad: 8900,
      accesoVipLounge: true
    },
    asiento: {
      numero: "05B",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 19.0,
    reglasAplicadas: [
      "Regla 7: 500 Puntos de lealtad extra otorgados por vuelo internacional"
    ]
  },
  {
    id: "res-003",
    codigo: "AV-RES-9483",
    fechaReserva: "2026-10-20T14:40:00Z",
    estado: "Confirmada",
    valor: 165.00,
    vueloId: "fl-103",
    numeroVuelo: "AV-103",
    ruta: "MDE - CTG",
    origen: "MDE - Medellín",
    destino: "CTG - Cartagena",
    pasajero: {
      id: "pas-03",
      nombre: "Camila",
      apellido: "Herrera",
      email: "camila.herrera@example.com",
      telefono: "+57 315 720 4491",
      edad: 26,
      membershipStatus: "Gold",
      puntosLealtad: 5300,
      accesoVipLounge: false
    },
    asiento: {
      numero: "03C",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 12.0,
    reglasAplicadas: [
      "Regla 1: Ascenso a Clase Ejecutiva por retraso superior a 60 min"
    ]
  },
  {
    id: "res-004",
    codigo: "AV-RES-9484",
    fechaReserva: "2026-10-21T09:20:00Z",
    estado: "Confirmada",
    valor: 135.00,
    vueloId: "fl-104",
    numeroVuelo: "AV-104",
    ruta: "CLO - BOG",
    origen: "CLO - Cali",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-04",
      nombre: "Alberto",
      apellido: "Zuluaga",
      email: "alberto.zuluaga@example.com",
      telefono: "+57 320 661 9382",
      edad: 68,
      membershipStatus: "Basic",
      puntosLealtad: 1200,
      accesoVipLounge: false
    },
    asiento: {
      numero: "08D",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 14.5,
    reglasAplicadas: [
      "Regla 2: Check-in prioritario activado para adulto mayor (>65 años)"
    ]
  },
  {
    id: "res-005",
    codigo: "AV-RES-9485",
    fechaReserva: "2026-10-21T11:45:00Z",
    estado: "Confirmada",
    valor: 720.00,
    vueloId: "fl-105",
    numeroVuelo: "AV-105",
    ruta: "BOG - MAD",
    origen: "BOG - Bogotá",
    destino: "MAD - Madrid",
    pasajero: {
      id: "pas-05",
      nombre: "Lucía",
      apellido: "Vargas",
      email: "lucia.vargas@example.com",
      telefono: "+57 311 940 2231",
      edad: 34,
      membershipStatus: "Platinum",
      puntosLealtad: 18700,
      accesoVipLounge: true
    },
    asiento: {
      numero: "01K",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 21.0,
    reglasAplicadas: [
      "Regla 9: Acceso VIP Lounge",
      "Regla 7: 500 Puntos extra por vuelo largo (>5 horas)"
    ]
  },
  {
    id: "res-006",
    codigo: "AV-RES-9486",
    fechaReserva: "2026-10-21T16:10:00Z",
    estado: "Cancelada",
    valor: 155.00,
    vueloId: "fl-106",
    numeroVuelo: "AV-106",
    ruta: "MDE - SMR",
    origen: "MDE - Medellín",
    destino: "SMR - Santa Marta",
    pasajero: {
      id: "pas-06",
      nombre: "Andrés",
      apellido: "Mejía",
      email: "andres.mejia@example.com",
      telefono: "+57 301 445 1209",
      edad: 31,
      membershipStatus: "Basic",
      puntosLealtad: 800,
      accesoVipLounge: false
    },
    asiento: {
      numero: "14B",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 15.0,
    reglasAplicadas: [
      "Vuelo cancelado: Reembolso solicitado y procesado"
    ]
  },
  {
    id: "res-007",
    codigo: "AV-RES-9487",
    fechaReserva: "2026-10-22T08:00:00Z",
    estado: "Confirmada",
    valor: 310.00,
    vueloId: "fl-107",
    numeroVuelo: "AV-107",
    ruta: "BOG - PTY",
    origen: "BOG - Bogotá",
    destino: "PTY - Ciudad de Panamá",
    pasajero: {
      id: "pas-07",
      nombre: "Mariana",
      apellido: "Ospina",
      email: "mariana.ospina@example.com",
      telefono: "+57 318 203 7194",
      edad: 24,
      membershipStatus: "Basic",
      puntosLealtad: 1500,
      accesoVipLounge: false
    },
    asiento: {
      numero: "11A",
      clase: "Económica",
      esSalidaEmergencia: true
    },
    equipajeKg: 7.8,
    reglasAplicadas: [
      "Regla 5: Asignado asiento de salida de emergencia a adulto joven (18-40 años)",
      "Regla 3: Descuento 10% por equipaje ligero"
    ]
  },
  {
    id: "res-008",
    codigo: "AV-RES-9488",
    fechaReserva: "2026-10-22T10:30:00Z",
    estado: "Confirmada",
    valor: 190.00,
    vueloId: "fl-108",
    numeroVuelo: "AV-108",
    ruta: "BAQ - MDE",
    origen: "BAQ - Barranquilla",
    destino: "MDE - Medellín",
    pasajero: {
      id: "pas-08",
      nombre: "Jorge",
      apellido: "Restrepo",
      email: "jorge.restrepo@example.com",
      telefono: "+57 314 559 8123",
      edad: 42,
      membershipStatus: "Gold",
      puntosLealtad: 6200,
      accesoVipLounge: false
    },
    asiento: {
      numero: "06E",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 16.5,
    reglasAplicadas: [
      "Regla 6: Compensación de $200 asignada por retraso extremo (>180 min)"
    ]
  },
  {
    id: "res-009",
    codigo: "AV-RES-9489",
    fechaReserva: "2026-10-22T13:20:00Z",
    estado: "Confirmada",
    valor: 520.00,
    vueloId: "fl-109",
    numeroVuelo: "AV-109",
    ruta: "MDE - MIA",
    origen: "MDE - Medellín",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-09",
      nombre: "Patricia",
      apellido: "Castrillón",
      email: "patricia.c@example.com",
      telefono: "+57 310 994 3321",
      edad: 52,
      membershipStatus: "Platinum",
      puntosLealtad: 21300,
      accesoVipLounge: true
    },
    asiento: {
      numero: "02J",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 20.0,
    reglasAplicadas: [
      "Regla 9: Acceso VIP Lounge",
      "Regla 7: 500 Puntos de lealtad extra"
    ]
  },
  {
    id: "res-010",
    codigo: "AV-RES-9490",
    fechaReserva: "2026-10-22T17:05:00Z",
    estado: "Confirmada",
    valor: 180.00,
    vueloId: "fl-110",
    numeroVuelo: "AV-110",
    ruta: "CLO - CTG",
    origen: "CLO - Cali",
    destino: "CTG - Cartagena",
    pasajero: {
      id: "pas-10",
      nombre: "Guillermo",
      apellido: "Duque",
      email: "guillermo.d@example.com",
      telefono: "+57 316 441 0983",
      edad: 37,
      membershipStatus: "Basic",
      puntosLealtad: 950,
      accesoVipLounge: false
    },
    asiento: {
      numero: "09A",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 9.0,
    reglasAplicadas: [
      "Regla 3: Descuento del 10% aplicado por equipaje ligero (<10 kg)"
    ]
  },
  {
    id: "res-011",
    codigo: "AV-RES-9491",
    fechaReserva: "2026-10-23T07:45:00Z",
    estado: "Confirmada",
    valor: 140.00,
    vueloId: "fl-111",
    numeroVuelo: "AV-111",
    ruta: "BOG - CLO",
    origen: "BOG - Bogotá",
    destino: "CLO - Cali",
    pasajero: {
      id: "pas-11",
      nombre: "Daniela",
      apellido: "Pérez",
      email: "daniela.perez@example.com",
      telefono: "+57 305 882 1190",
      edad: 28,
      membershipStatus: "Basic",
      puntosLealtad: 400,
      accesoVipLounge: false
    },
    asiento: {
      numero: "12F",
      clase: "Económica",
      esSalidaEmergencia: true
    },
    equipajeKg: 11.0,
    reglasAplicadas: [
      "Regla 5: Asignado asiento de salida de emergencia"
    ]
  },
  {
    id: "res-012",
    codigo: "AV-RES-9492",
    fechaReserva: "2026-10-23T09:15:00Z",
    estado: "Confirmada",
    valor: 175.00,
    vueloId: "fl-112",
    numeroVuelo: "AV-112",
    ruta: "CTG - BOG",
    origen: "CTG - Cartagena",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-12",
      nombre: "Samuel",
      apellido: "Castro",
      email: "samuel.c@example.com",
      telefono: "+57 317 239 0081",
      edad: 71,
      membershipStatus: "Basic",
      puntosLealtad: 1800,
      accesoVipLounge: false
    },
    asiento: {
      numero: "04C",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 13.0,
    reglasAplicadas: [
      "Regla 2: Check-in prioritario activado para adulto mayor (>65 años)"
    ]
  },
  {
    id: "res-013",
    codigo: "AV-RES-9493",
    fechaReserva: "2026-10-23T11:30:00Z",
    estado: "Pendiente",
    valor: 210.00,
    vueloId: "fl-101",
    numeroVuelo: "AV-101",
    ruta: "MDE - BOG",
    origen: "MDE - Medellín",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-13",
      nombre: "Felipe",
      apellido: "García",
      email: "felipe.garcia@example.com",
      telefono: "+57 319 443 2810",
      edad: 33,
      membershipStatus: "Basic",
      puntosLealtad: 750,
      accesoVipLounge: false
    },
    asiento: {
      numero: "15C",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 18.0,
    reglasAplicadas: []
  },
  {
    id: "res-014",
    codigo: "AV-RES-9494",
    fechaReserva: "2026-10-23T15:00:00Z",
    estado: "Confirmada",
    valor: 510.00,
    vueloId: "fl-102",
    numeroVuelo: "AV-102",
    ruta: "BOG - MIA",
    origen: "BOG - Bogotá",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-14",
      nombre: "Sara",
      apellido: "Molina",
      email: "sara.molina@example.com",
      telefono: "+57 313 772 9012",
      edad: 30,
      membershipStatus: "Gold",
      puntosLealtad: 7600,
      accesoVipLounge: false
    },
    asiento: {
      numero: "04A",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 14.0,
    reglasAplicadas: [
      "Regla 7: 500 Puntos extra por vuelo internacional"
    ]
  },
  {
    id: "res-015",
    codigo: "AV-RES-9495",
    fechaReserva: "2026-10-23T18:20:00Z",
    estado: "Confirmada",
    valor: 160.00,
    vueloId: "fl-103",
    numeroVuelo: "AV-103",
    ruta: "MDE - CTG",
    origen: "MDE - Medellín",
    destino: "CTG - Cartagena",
    pasajero: {
      id: "pas-15",
      nombre: "Esteban",
      apellido: "Valencia",
      email: "esteban.v@example.com",
      telefono: "+57 302 991 3827",
      edad: 39,
      membershipStatus: "Basic",
      puntosLealtad: 600,
      accesoVipLounge: false
    },
    asiento: {
      numero: "16D",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 24.5,
    reglasAplicadas: [
      "Regla 4: No elegible para ascenso por equipaje pesado (>23 kg)"
    ]
  },
  {
    id: "res-016",
    codigo: "AV-RES-9496",
    fechaReserva: "2026-10-24T08:10:00Z",
    estado: "Confirmada",
    valor: 690.00,
    vueloId: "fl-105",
    numeroVuelo: "AV-105",
    ruta: "BOG - MAD",
    origen: "BOG - Bogotá",
    destino: "MAD - Madrid",
    pasajero: {
      id: "pas-16",
      nombre: "Mateo",
      apellido: "Bedoya",
      email: "mateo.bedoya@example.com",
      telefono: "+57 312 301 4482",
      edad: 45,
      membershipStatus: "Gold",
      puntosLealtad: 9200,
      accesoVipLounge: false
    },
    asiento: {
      numero: "07A",
      clase: "Premium Economy",
      esSalidaEmergencia: false
    },
    equipajeKg: 22.0,
    reglasAplicadas: [
      "Regla 7: 500 Puntos extra por vuelo largo (>5 horas)"
    ]
  },
  {
    id: "res-017",
    codigo: "AV-RES-9497",
    fechaReserva: "2026-10-24T10:40:00Z",
    estado: "Cancelada",
    valor: 130.00,
    vueloId: "fl-104",
    numeroVuelo: "AV-104",
    ruta: "CLO - BOG",
    origen: "CLO - Cali",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-17",
      nombre: "Gloria",
      apellido: "Cardona",
      email: "gloria.cardona@example.com",
      telefono: "+57 321 884 9910",
      edad: 61,
      membershipStatus: "Basic",
      puntosLealtad: 1100,
      accesoVipLounge: false
    },
    asiento: {
      numero: "18A",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 15.0,
    reglasAplicadas: [
      "Reserva anulada por el usuario"
    ]
  },
  {
    id: "res-018",
    codigo: "AV-RES-9498",
    fechaReserva: "2026-10-24T13:00:00Z",
    estado: "Confirmada",
    valor: 320.00,
    vueloId: "fl-107",
    numeroVuelo: "AV-107",
    ruta: "BOG - PTY",
    origen: "BOG - Bogotá",
    destino: "PTY - Ciudad de Panamá",
    pasajero: {
      id: "pas-18",
      nombre: "Alejandro",
      apellido: "Saldarriaga",
      email: "alejandro.s@example.com",
      telefono: "+57 315 229 8814",
      edad: 36,
      membershipStatus: "Platinum",
      puntosLealtad: 15400,
      accesoVipLounge: true
    },
    asiento: {
      numero: "02B",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 17.0,
    reglasAplicadas: [
      "Regla 9: Acceso concedido a Salón VIP para miembro Platinum"
    ]
  },
  {
    id: "res-019",
    codigo: "AV-RES-9499",
    fechaReserva: "2026-10-24T16:25:00Z",
    estado: "Confirmada",
    valor: 495.00,
    vueloId: "fl-109",
    numeroVuelo: "AV-109",
    ruta: "MDE - MIA",
    origen: "MDE - Medellín",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-19",
      nombre: "Diana",
      apellido: "Suárez",
      email: "diana.suarez@example.com",
      telefono: "+57 318 640 1192",
      edad: 27,
      membershipStatus: "Basic",
      puntosLealtad: 500,
      accesoVipLounge: false
    },
    asiento: {
      numero: "12C",
      clase: "Económica",
      esSalidaEmergencia: true
    },
    equipajeKg: 8.0,
    reglasAplicadas: [
      "Regla 5: Asignado asiento de salida de emergencia a adulto joven",
      "Regla 3: Descuento del 10% por equipaje ligero"
    ]
  },
  {
    id: "res-020",
    codigo: "AV-RES-9500",
    fechaReserva: "2026-10-24T19:50:00Z",
    estado: "Confirmada",
    valor: 185.00,
    vueloId: "fl-110",
    numeroVuelo: "AV-110",
    ruta: "CLO - CTG",
    origen: "CLO - Cali",
    destino: "CTG - Cartagena",
    pasajero: {
      id: "pas-20",
      nombre: "Sebastián",
      apellido: "Tobón",
      email: "sebastian.t@example.com",
      telefono: "+57 300 481 9923",
      edad: 32,
      membershipStatus: "Basic",
      puntosLealtad: 850,
      accesoVipLounge: false
    },
    asiento: {
      numero: "10E",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 14.0,
    reglasAplicadas: []
  },
  {
    id: "res-021",
    codigo: "AV-RES-9501",
    fechaReserva: "2026-10-25T07:15:00Z",
    estado: "Confirmada",
    valor: 260.00,
    vueloId: "fl-101",
    numeroVuelo: "AV-101",
    ruta: "MDE - BOG",
    origen: "MDE - Medellín",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-21",
      nombre: "Natalia",
      apellido: "Cifuentes",
      email: "natalia.c@example.com",
      telefono: "+57 310 771 2289",
      edad: 38,
      membershipStatus: "Gold",
      puntosLealtad: 8100,
      accesoVipLounge: false
    },
    asiento: {
      numero: "03A",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 12.5,
    reglasAplicadas: [
      "Ascenso prioritario por fidelidad Gold"
    ]
  },
  {
    id: "res-022",
    codigo: "AV-RES-9502",
    fechaReserva: "2026-10-25T09:30:00Z",
    estado: "Confirmada",
    valor: 170.00,
    vueloId: "fl-112",
    numeroVuelo: "AV-112",
    ruta: "CTG - BOG",
    origen: "CTG - Cartagena",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-22",
      nombre: "Rodrigo",
      apellido: "Morales",
      email: "rodrigo.m@example.com",
      telefono: "+57 314 883 1920",
      edad: 46,
      membershipStatus: "Basic",
      puntosLealtad: 1350,
      accesoVipLounge: false
    },
    asiento: {
      numero: "14F",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 9.5,
    reglasAplicadas: [
      "Regla 3: Descuento del 10% por equipaje ligero"
    ]
  },
  {
    id: "res-023",
    codigo: "AV-RES-9503",
    fechaReserva: "2026-10-25T11:00:00Z",
    estado: "Confirmada",
    valor: 475.00,
    vueloId: "fl-102",
    numeroVuelo: "AV-102",
    ruta: "BOG - MIA",
    origen: "BOG - Bogotá",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-23",
      nombre: "Isabella",
      apellido: "Jaramillo",
      email: "isabella.j@example.com",
      telefono: "+57 320 192 8471",
      edad: 25,
      membershipStatus: "Basic",
      puntosLealtad: 600,
      accesoVipLounge: false
    },
    asiento: {
      numero: "11E",
      clase: "Económica",
      esSalidaEmergencia: true
    },
    equipajeKg: 13.0,
    reglasAplicadas: [
      "Regla 5: Asignado asiento de salida de emergencia a adulto joven"
    ]
  },
  {
    id: "res-024",
    codigo: "AV-RES-9504",
    fechaReserva: "2026-10-25T14:15:00Z",
    estado: "Confirmada",
    valor: 145.00,
    vueloId: "fl-111",
    numeroVuelo: "AV-111",
    ruta: "BOG - CLO",
    origen: "BOG - Bogotá",
    destino: "CLO - Cali",
    pasajero: {
      id: "pas-24",
      nombre: "Mauricio",
      apellido: "Guzmán",
      email: "mauricio.g@example.com",
      telefono: "+57 311 445 9018",
      edad: 55,
      membershipStatus: "Gold",
      puntosLealtad: 7900,
      accesoVipLounge: false
    },
    asiento: {
      numero: "05D",
      clase: "Premium Economy",
      esSalidaEmergencia: false
    },
    equipajeKg: 16.0,
    reglasAplicadas: []
  },
  {
    id: "res-025",
    codigo: "AV-RES-9505",
    fechaReserva: "2026-10-25T17:40:00Z",
    estado: "Confirmada",
    valor: 750.00,
    vueloId: "fl-105",
    numeroVuelo: "AV-105",
    ruta: "BOG - MAD",
    origen: "BOG - Bogotá",
    destino: "MAD - Madrid",
    pasajero: {
      id: "pas-25",
      nombre: "Emilia",
      apellido: "Londoño",
      email: "emilia.londono@example.com",
      telefono: "+57 304 612 8890",
      edad: 41,
      membershipStatus: "Platinum",
      puntosLealtad: 26000,
      accesoVipLounge: true
    },
    asiento: {
      numero: "02K",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 22.5,
    reglasAplicadas: [
      "Regla 9: Acceso Salón VIP",
      "Regla 7: 500 Puntos lealtad extra por vuelo transcontinental"
    ]
  },
  {
    id: "res-026",
    codigo: "AV-RES-9506",
    fechaReserva: "2026-10-26T06:45:00Z",
    estado: "Confirmada",
    valor: 230.00,
    vueloId: "fl-101",
    numeroVuelo: "AV-101",
    ruta: "MDE - BOG",
    origen: "MDE - Medellín",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-26",
      nombre: "Álvaro",
      apellido: "Uribe",
      email: "alvaro.u@example.com",
      telefono: "+57 315 892 0041",
      edad: 69,
      membershipStatus: "Platinum",
      puntosLealtad: 19800,
      accesoVipLounge: true
    },
    asiento: {
      numero: "01A",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 10.0,
    reglasAplicadas: [
      "Regla 2: Check-in prioritario (>65 años)",
      "Regla 9: Acceso VIP Lounge Platinum"
    ]
  },
  {
    id: "res-027",
    codigo: "AV-RES-9507",
    fechaReserva: "2026-10-26T08:20:00Z",
    estado: "Confirmada",
    valor: 160.00,
    vueloId: "fl-103",
    numeroVuelo: "AV-103",
    ruta: "MDE - CTG",
    origen: "MDE - Medellín",
    destino: "CTG - Cartagena",
    pasajero: {
      id: "pas-27",
      nombre: "Manuela",
      apellido: "Beltrán",
      email: "manuela.b@example.com",
      telefono: "+57 312 409 7781",
      edad: 23,
      membershipStatus: "Basic",
      puntosLealtad: 300,
      accesoVipLounge: false
    },
    asiento: {
      numero: "12A",
      clase: "Económica",
      esSalidaEmergencia: true
    },
    equipajeKg: 7.5,
    reglasAplicadas: [
      "Regla 5: Asignado asiento de salida de emergencia",
      "Regla 3: Descuento del 10% por equipaje ligero"
    ]
  },
  {
    id: "res-028",
    codigo: "AV-RES-9508",
    fechaReserva: "2026-10-26T09:50:00Z",
    estado: "Pendiente",
    valor: 540.00,
    vueloId: "fl-109",
    numeroVuelo: "AV-109",
    ruta: "MDE - MIA",
    origen: "MDE - Medellín",
    destino: "MIA - Miami",
    pasajero: {
      id: "pas-28",
      nombre: "Gonzalo",
      apellido: "Jiménez",
      email: "gonzalo.j@example.com",
      telefono: "+57 317 619 4480",
      edad: 50,
      membershipStatus: "Basic",
      puntosLealtad: 900,
      accesoVipLounge: false
    },
    asiento: {
      numero: "08C",
      clase: "Premium Economy",
      esSalidaEmergencia: false
    },
    equipajeKg: 20.0,
    reglasAplicadas: []
  },
  {
    id: "res-029",
    codigo: "AV-RES-9509",
    fechaReserva: "2026-10-26T11:15:00Z",
    estado: "Confirmada",
    valor: 295.00,
    vueloId: "fl-107",
    numeroVuelo: "AV-107",
    ruta: "BOG - PTY",
    origen: "BOG - Bogotá",
    destino: "PTY - Ciudad de Panamá",
    pasajero: {
      id: "pas-29",
      nombre: "Clara",
      apellido: "Rendón",
      email: "clara.rendon@example.com",
      telefono: "+57 318 440 2938",
      edad: 35,
      membershipStatus: "Gold",
      puntosLealtad: 8400,
      accesoVipLounge: false
    },
    asiento: {
      numero: "04C",
      clase: "Premium Economy",
      esSalidaEmergencia: false
    },
    equipajeKg: 15.5,
    reglasAplicadas: []
  },
  {
    id: "res-030",
    codigo: "AV-RES-9510",
    fechaReserva: "2026-10-26T12:40:00Z",
    estado: "Confirmada",
    valor: 140.00,
    vueloId: "fl-104",
    numeroVuelo: "AV-104",
    ruta: "CLO - BOG",
    origen: "CLO - Cali",
    destino: "BOG - Bogotá",
    pasajero: {
      id: "pas-30",
      nombre: "Nicolás",
      apellido: "Salazar",
      email: "nicolas.s@example.com",
      telefono: "+57 313 881 2093",
      edad: 29,
      membershipStatus: "Basic",
      puntosLealtad: 1200,
      accesoVipLounge: false
    },
    asiento: {
      numero: "14E",
      clase: "Económica",
      esSalidaEmergencia: false
    },
    equipajeKg: 9.0,
    reglasAplicadas: [
      "Regla 3: Descuento del 10% por equipaje ligero"
    ]
  },
  {
    id: "res-031",
    codigo: "AV-RES-9511",
    fechaReserva: "2026-10-26T14:10:00Z",
    estado: "Confirmada",
    valor: 200.00,
    vueloId: "fl-108",
    numeroVuelo: "AV-108",
    ruta: "BAQ - MDE",
    origen: "BAQ - Barranquilla",
    destino: "MDE - Medellín",
    pasajero: {
      id: "pas-31",
      nombre: "Tatiana",
      apellido: "Correa",
      email: "tatiana.correa@example.com",
      telefono: "+57 319 722 0184",
      edad: 33,
      membershipStatus: "Gold",
      puntosLealtad: 7100,
      accesoVipLounge: false
    },
    asiento: {
      numero: "05C",
      clase: "Premium Economy",
      esSalidaEmergencia: false
    },
    equipajeKg: 13.0,
    reglasAplicadas: [
      "Regla 6: Compensación de $200 asignada por retraso extremo (>180 min)"
    ]
  },
  {
    id: "res-032",
    codigo: "AV-RES-9512",
    fechaReserva: "2026-10-26T15:30:00Z",
    estado: "Confirmada",
    valor: 710.00,
    vueloId: "fl-105",
    numeroVuelo: "AV-105",
    ruta: "BOG - MAD",
    origen: "BOG - Bogotá",
    destino: "MAD - Madrid",
    pasajero: {
      id: "pas-32",
      nombre: "Joaquín",
      apellido: "Ochoa",
      email: "joaquin.o@example.com",
      telefono: "+57 316 990 4125",
      edad: 67,
      membershipStatus: "Platinum",
      puntosLealtad: 31200,
      accesoVipLounge: true
    },
    asiento: {
      numero: "01B",
      clase: "Ejecutiva",
      esSalidaEmergencia: false
    },
    equipajeKg: 20.0,
    reglasAplicadas: [
      "Regla 2: Check-in prioritario (>65 años)",
      "Regla 9: Acceso Sala VIP Platinum",
      "Regla 7: 500 Puntos lealtad extra por vuelo transcontinental"
    ]
  }
];

// Opciones únicas auxiliares para filtros y analítica
export const rutasDisponibles = Array.from(
  new Set(vuelos.map((v) => v.ruta))
).sort();

export const destinosDisponibles = Array.from(
  new Set(vuelos.map((v) => v.destino))
).sort();

export const estadosVuelo = [
  "Todos",
  "A tiempo",
  "En Vuelo",
  "Retrasado",
  "Cancelado",
  "Programado"
];
