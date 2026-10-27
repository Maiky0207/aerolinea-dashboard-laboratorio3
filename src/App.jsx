import React, { useState, useMemo } from 'react';
import { vuelos as initialVuelos, reservas as initialReservas, rutasDisponibles } from './data/mockData';
import { calculateKpis, aggregateRevenueByRoute, aggregateBookingsTimeline, aggregateFlightStatuses } from './utils/analytics';
import { Navbar } from './components/Navbar';
import { KpiCards } from './components/KpiCards';
import { FilterBar } from './components/FilterBar';
import { RevenueRouteChart } from './components/RevenueRouteChart';
import { BookingTimelineChart } from './components/BookingTimelineChart';
import { FlightStatusDistribution } from './components/FlightStatusDistribution';
import { FlightsTable } from './components/FlightsTable';
import { BookingsTable } from './components/BookingsTable';
import { ChatWidget } from './components/ChatWidget';
import { Plane, Ticket, ShieldAlert, Cpu } from 'lucide-react';

export function App() {
  // Estado de datos base
  const [vuelosList, setVuelosList] = useState(initialVuelos);
  const [reservasList, setReservasList] = useState(initialReservas);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Estados de Filtros
  const [selectedRuta, setSelectedRuta] = useState('ALL');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('vuelos'); // 'vuelos' | 'reservas'

  // Función de refresco con simulación reactiva
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setSelectedRuta('ALL');
    setDateRange({ startDate: '', endDate: '' });
    setStatusFilter('ALL');
  };

  const hasActiveFilters =
    selectedRuta !== 'ALL' ||
    dateRange.startDate !== '' ||
    dateRange.endDate !== '' ||
    statusFilter !== 'ALL';

  // Filtrado reactivo de Vuelos
  const filteredVuelos = useMemo(() => {
    return vuelosList.filter((vuelo) => {
      // Filtro de ruta
      if (selectedRuta !== 'ALL' && vuelo.ruta !== selectedRuta) {
        return false;
      }
      // Filtro de estado
      if (statusFilter !== 'ALL' && vuelo.estado !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [vuelosList, selectedRuta, statusFilter]);

  // Filtrado reactivo de Reservas (incluye filtro por ruta y rango de fecha de reserva)
  const filteredReservas = useMemo(() => {
    return reservasList.filter((reserva) => {
      // Filtro de ruta
      if (selectedRuta !== 'ALL' && reserva.ruta !== selectedRuta) {
        return false;
      }
      // Filtro por rango de fechas (reserva.fechaReserva formato ISO: "YYYY-MM-DDTHH:mm:ssZ")
      if (dateRange.startDate) {
        const reservaDate = reserva.fechaReserva.split('T')[0];
        if (reservaDate < dateRange.startDate) return false;
      }
      if (dateRange.endDate) {
        const reservaDate = reserva.fechaReserva.split('T')[0];
        if (reservaDate > dateRange.endDate) return false;
      }
      return true;
    });
  }, [reservasList, selectedRuta, dateRange]);

  // Cálculos dinámicos de KPIs sobre el conjunto filtrado
  const kpis = useMemo(() => {
    return calculateKpis(filteredVuelos, filteredReservas);
  }, [filteredVuelos, filteredReservas]);

  // Agregaciones dinámicas para gráficos Recharts
  const revenueByRouteData = useMemo(() => {
    return aggregateRevenueByRoute(filteredReservas);
  }, [filteredReservas]);

  const bookingTimelineData = useMemo(() => {
    return aggregateBookingsTimeline(filteredReservas);
  }, [filteredReservas]);

  const flightStatusData = useMemo(() => {
    return aggregateFlightStatuses(filteredVuelos);
  }, [filteredVuelos]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* 1. Header / Navbar */}
      <Navbar
        totalVuelosActivos={kpis.vuelosActivosCount}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Operations Alert Ribbon */}
        {kpis.vuelosRetrasados > 0 && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-3.5 sm:px-5 flex items-center justify-between text-xs text-amber-900 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Atención Operativa:</strong> Se registran <strong>{kpis.vuelosRetrasados} vuelos con retraso</strong> en el sistema. Las reglas de compensación y ascenso Drools se han aplicado automáticamente.
              </span>
            </div>
            <button
              onClick={() => setStatusFilter('Retrasado')}
              className="hidden sm:inline-block font-bold text-amber-800 underline hover:text-amber-950 text-xs shrink-0"
            >
              Ver vuelos afectados
            </button>
          </div>
        )}

        {/* 2. Top KPIs (Cálculos dinámicos) */}
        <section aria-label="Indicadores Clave de Rendimiento">
          <KpiCards kpis={kpis} />
        </section>

        {/* 3. Filtros Interactivos (Ruta, Fecha, Estado) */}
        <section aria-label="Filtros del Tablero">
          <FilterBar
            rutasDisponibles={rutasDisponibles}
            selectedRuta={selectedRuta}
            onSelectRuta={setSelectedRuta}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            totalResultadosReservas={filteredReservas.length}
            totalResultadosVuelos={filteredVuelos.length}
          />
        </section>

        {/* 4. Gráficos Operacionales (Recharts) */}
        <section aria-label="Gráficos de Análisis" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico 1: Barras - Ingresos por Ruta */}
          <RevenueRouteChart data={revenueByRouteData} />

          {/* Gráfico 2: Línea - Evolución de Reservas en el Tiempo */}
          <BookingTimelineChart data={bookingTimelineData} />
        </section>

        {/* 5. Distribución de Flota */}
        <section aria-label="Distribución de Estados de Flota">
          <FlightStatusDistribution
            data={flightStatusData}
            totalVuelos={filteredVuelos.length}
          />
        </section>

        {/* 6. Tablas Operacionales con Selector de Pestaña */}
        <section aria-label="Tablas de Vuelos y Reservas" className="space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('vuelos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vuelos'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Monitoreo de Vuelos ({filteredVuelos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reservas')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'reservas'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>Control de Reservas ({filteredReservas.length})</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-brand-500" />
              <span>Reglas Drools v2.4 sincronizadas</span>
            </div>
          </div>

          {activeTab === 'vuelos' ? (
            <FlightsTable vuelos={filteredVuelos} />
          ) : (
            <BookingsTable reservas={filteredReservas} />
          )}

        </section>

      </main>

      {/* 7. Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200/90 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AeroVirtual Ops</span>
            <span>•</span>
            <span>Dashboard B2B de Administrador de Operaciones</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React + Vite</span>
            <span>Tailwind CSS v3</span>
            <span>Recharts</span>
            <span>n8n Webhook Agent</span>
          </div>
        </div>
      </footer>

      {/* 8. Widget de Chat Flotante con n8n */}
      <ChatWidget
        vuelos={filteredVuelos}
        reservas={filteredReservas}
        kpis={kpis}
      />

    </div>
  );
}

export default App;
