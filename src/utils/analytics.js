/**
 * Lógica Analítica y Cálculos Dinámicos de Operaciones
 * Según las reglas formales de data/estructura_datos.md
 */

export const calculateKpis = (vuelos = [], reservas = []) => {
  // 1. Total Revenue: Suma de reservas con estado 'Confirmada'
  const reservasConfirmadas = reservas.filter((r) => r.estado === 'Confirmada');
  const totalRevenue = reservasConfirmadas.reduce((sum, r) => sum + (Number(r.valor) || 0), 0);

  // 2. Vuelos Activos / A tiempo:
  const vuelosActivos = vuelos.filter(
    (v) => v.estado === 'A tiempo' || v.estado === 'En Vuelo'
  );
  const totalVuelos = vuelos.length;
  const ratioVuelosActivos = totalVuelos > 0 ? (vuelosActivos.length / totalVuelos) * 100 : 0;

  // 3. Tasa de Ocupación Promedio:
  const capacidadTotal = vuelos.reduce((sum, v) => sum + (v.capacidadTotal || 0), 0);
  const asientosOcupados = vuelos.reduce((sum, v) => sum + (v.asientosOcupados || 0), 0);
  const tasaOcupacionPromedio = capacidadTotal > 0 ? (asientosOcupados / capacidadTotal) * 100 : 0;

  // 4. Ticket Promedio:
  const ticketPromedio =
    reservasConfirmadas.length > 0 ? totalRevenue / reservasConfirmadas.length : 0;

  // Métricas adicionales para el Administrador de Operaciones
  const vuelosRetrasados = vuelos.filter((v) => v.estado === 'Retrasado').length;
  const vuelosCancelados = vuelos.filter((v) => v.estado === 'Cancelado').length;
  const totalPasajeros = reservas.length;

  return {
    totalRevenue,
    reservasConfirmadasCount: reservasConfirmadas.length,
    vuelosActivosCount: vuelosActivos.length,
    totalVuelos,
    ratioVuelosActivos,
    tasaOcupacionPromedio,
    ticketPromedio,
    vuelosRetrasados,
    vuelosCancelados,
    totalPasajeros,
    totalReservas: reservas.length
  };
};

export const aggregateRevenueByRoute = (reservas = []) => {
  const routeMap = new Map();

  reservas.forEach((r) => {
    const key = r.ruta || 'Otras';
    if (!routeMap.has(key)) {
      routeMap.set(key, {
        ruta: key,
        ingresos: 0,
        reservasTotal: 0,
        confirmadas: 0
      });
    }

    const item = routeMap.get(key);
    item.reservasTotal += 1;
    if (r.estado === 'Confirmada') {
      item.ingresos += Number(r.valor) || 0;
      item.confirmadas += 1;
    }
  });

  return Array.from(routeMap.values()).sort((a, b) => b.ingresos - a.ingresos);
};

export const aggregateBookingsTimeline = (reservas = []) => {
  const dateMap = new Map();

  reservas.forEach((r) => {
    if (!r.fechaReserva) return;
    const dateKey = r.fechaReserva.split('T')[0]; // "YYYY-MM-DD"

    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, {
        fecha: dateKey,
        reservas: 0,
        ingresos: 0,
        confirmadas: 0,
        canceladas: 0
      });
    }

    const item = dateMap.get(dateKey);
    item.reservas += 1;
    if (r.estado === 'Confirmada') {
      item.ingresos += Number(r.valor) || 0;
      item.confirmadas += 1;
    } else if (r.estado === 'Cancelada') {
      item.canceladas += 1;
    }
  });

  return Array.from(dateMap.values())
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .map((item) => {
      // Formatear fecha para etiqueta corta del eje X
      const [y, m, d] = item.fecha.split('-');
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const mesNombre = meses[parseInt(m, 10) - 1] || m;
      return {
        ...item,
        label: `${d} ${mesNombre}`
      };
    });
};

export const aggregateFlightStatuses = (vuelos = []) => {
  const statusCounts = {
    'A tiempo': 0,
    'En Vuelo': 0,
    'Retrasado': 0,
    'Cancelado': 0,
    'Programado': 0
  };

  vuelos.forEach((v) => {
    if (statusCounts[v.estado] !== undefined) {
      statusCounts[v.estado] += 1;
    } else {
      statusCounts[v.estado] = 1;
    }
  });

  const colors = {
    'A tiempo': '#10b981', // green-500
    'En Vuelo': '#3b82f6', // blue-500
    'Retrasado': '#f59e0b', // amber-500
    'Cancelado': '#ef4444', // red-500
    'Programado': '#6366f1' // indigo-500
  };

  return Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: colors[name] || '#94a3b8'
    }));
};
