# Estructura de Datos - Sistema de Operaciones de Aerolínea Virtual

Este documento define formalmente los modelos de datos, esquemas JSON y reglas de negocio para el Dashboard del Administrador de Operaciones y la integración con el agente de IA en n8n.

---

## 1. Modelo de Dominio: Vuelo (`Flight`)

Representa la programación operativa y el estado en tiempo real de cada vuelo de la aerolínea virtual.

### Esquema TypeScript / JSON
```typescript
interface Vuelo {
  id: string;                      // Identificador único (ej: "fl-001")
  numeroVuelo: string;             // Código IATA + número (ej: "AV-102", "AV-305")
  origen: string;                  // Ciudad y código de origen (ej: "MDE - Medellín")
  destino: string;                 // Ciudad y código de destino (ej: "BOG - Bogotá")
  ruta: string;                    // Identificador de ruta corta (ej: "MDE - BOG")
  fechaSalida: string;             // ISO 8601 (ej: "2026-10-26T08:30:00Z")
  fechaLlegada: string;            // ISO 8601 (ej: "2026-10-26T09:25:00Z")
  duracionEstimadaHoras: number;   // Duración en horas (ej: 0.9, 3.5, 5.2)
  estado: EstadoVuelo;             // Estado operacional actual
  capacidadTotal: number;          // Total de asientos disponibles en el avión (ej: 150, 180)
  asientosOcupados: number;        // Cantidad de asientos reservados/confirmados
  tasaOcupacion: number;           // Porcentaje de ocupación calculado (0 - 100)
  retrasoMinutos: number;          // Retraso en minutos (0 si está a tiempo)
  aeronave: {
    modelo: string;                // Ej: "Airbus A320neo", "Boeing 787-8"
    matricula: string;             // Ej: "HK-5342", "HK-5280"
  };
  puertaEmbarque: string;          // Ej: "A12", "B04"
  terminal: string;                // Ej: "T1", "T2"
}

type EstadoVuelo = 
  | 'A tiempo'
  | 'En Vuelo'
  | 'Retrasado'
  | 'Cancelado'
  | 'Programado'
  | 'Aterrizado';
```

---

## 2. Modelo de Dominio: Pasajero (`Passenger`)

Representa el cliente o viajero asociado a una o más reservas.

### Esquema TypeScript / JSON
```typescript
interface Pasajero {
  id: string;                      // Identificador único del pasajero (ej: "pas-101")
  nombre: string;                  // Nombre de pila (ej: "Carlos")
  apellido: string;                // Apellido (ej: "Gómez")
  email: string;                   // Correo electrónico único
  telefono: string;                // Teléfono de contacto
  edad: number;                    // Edad para reglas de negocio (ej: >65 senior, 18-40)
  membershipStatus: NivelMembresia;// Nivel en el programa de lealtad
  puntosLealtad: number;           // Millas/puntos acumulados
  accesoVipLounge: boolean;        // Si tiene acceso a sala VIP
}

type NivelMembresia = 'Basic' | 'Gold' | 'Platinum';
```

---

## 3. Modelo de Dominio: Reserva (`Booking`)

Representa una transacción comercial de boletería realizada por un pasajero para un vuelo específico.

### Esquema TypeScript / JSON
```typescript
interface Reserva {
  id: string;                      // Identificador único (ej: "res-001")
  codigo: string;                  // Código PNR alfanumérico (ej: "AV-RES-9481")
  fechaReserva: string;            // ISO 8601 de emisión (ej: "2026-10-24T14:20:00Z")
  estado: EstadoReserva;           // Estado comercial del billete
  valor: number;                   // Monto total en USD (ej: 185.50)
  vueloId: string;                 // Llave foránea hacia Vuelo.id
  numeroVuelo: string;             // Código de vuelo (ej: "AV-102")
  ruta: string;                    // Resumen de ruta (ej: "MDE - BOG")
  origen: string;                  // Origen del vuelo
  destino: string;                 // Destino del vuelo
  pasajero: Pasajero;              // Objeto embebido o relacional del pasajero
  asiento: {
    numero: string;                // Ej: "12A", "03C"
    clase: ClaseAsiento;           // Categoría de asiento
    esSalidaEmergencia: boolean;   // Si está ubicado en salida de emergencia
  };
  equipajeKg: number;              // Peso en kg para reglas tarifarias
  reglasAplicadas: string[];       // Reglas de negocio Drools activadas para la reserva
}

type EstadoReserva = 'Confirmada' | 'Pendiente' | 'Cancelada';
type ClaseAsiento = 'Económica' | 'Premium Economy' | 'Ejecutiva';
```

---

## 4. Fórmulas de Cálculo para KPIs Superiores

Los KPIs del dashboard se calculan de manera **100% reactiva y dinámica** sobre el array de reservas y vuelos (respetando los filtros activos):

1. **Total Revenue (Ingresos Totales)**:
   $$\text{Total Revenue} = \sum_{\substack{r \in \text{Reservas} \\ r.\text{estado} = \text{'Confirmada'}}} r.\text{valor}$$

2. **Vuelos Activos / A tiempo**:
   $$\text{Vuelos A Tiempo} = \operatorname{count}(\{v \in \text{Vuelos} \mid v.\text{estado} \in \{\text{'A tiempo'}, \text{'En Vuelo'}\}\})$$
   $$\text{Ratio} = \frac{\text{Vuelos A Tiempo}}{\text{Total Vuelos}} \times 100$$

3. **Tasa de Ocupación Promedio**:
   $$\text{Ocupación Promedio} = \frac{\sum_{v \in \text{Vuelos}} v.\text{asientosOcupados}}{\sum_{v \in \text{Vuelos}} v.\text{capacidadTotal}} \times 100$$

4. **Ticket Promedio**:
   $$\text{Ticket Promedio} = \frac{\text{Total Revenue}}{\operatorname{count}(\{r \in \text{Reservas} \mid r.\text{estado} = \text{'Confirmada'}\})}$$

---

## 5. Especificación de Gráficos (Recharts)

1. **Ingresos por Ruta (Bar Chart)**:
   - Eje X: Código o nombre de ruta (ej: `MDE - BOG`, `BOG - MIA`, `CLO - CTG`).
   - Eje Y: Suma de ingresos confirmados en USD.
   - Tooltip: Moneda formateada (`$#,##0.00 USD`) y número de reservas.
   - Visual: Barras en color Índigo/Azul corporativo `#3b82f6` / `#4f46e5` con bordes redondeados superiores (`radius={[6, 6, 0, 0]}`).

2. **Evolución de Reservas en el Tiempo (Line / Area Chart)**:
   - Eje X: Fecha de reserva (formato `DD/MM` o `YYYY-MM-DD`).
   - Eje Y: Cantidad de reservas emitidas y/o ingresos diarios acumulados.
   - Visual: Gradiente suave bajo la línea, curva suavizada (`type="monotone"`), puntos de dispersión activos al pasar el cursor.

---

## 6. Especificación de Integración con Webhook n8n (Chat Flotante)

El widget flotante se comunica mediante una petición HTTP `POST` hacia la URL configurada de n8n.

### Payload enviado a n8n:
```json
{
  "message": "¿Cuál es el estado del vuelo AV-204?",
  "sessionId": "aero-session-7819",
  "timestamp": "2026-10-26T18:30:00Z",
  "context": {
    "userRole": "Operations Administrator",
    "airline": "AeroVirtual Ops",
    "totalFlightsActive": 18,
    "currentRevenue": 48250.00
  }
}
```

### Respuesta esperada desde n8n:
```json
{
  "reply": "El vuelo AV-204 (MDE - BOG) se encuentra A Tiempo, con salida estimada a las 14:15. Ocupación al 92% con 138/150 pasajeros confirmados.",
  "status": "success",
  "suggestedActions": [
    "Ver lista de pasajeros",
    "Consultar conexiones en BOG"
  ]
}
```
Si el webhook de n8n no está disponible o no se ha configurado una URL personalizada, el widget cuenta con un **asistente inteligente con fallback local** que analiza el dataset actual en tiempo real para responder preguntas sobre vuelos, retrasos, ingresos y pasajeros.
