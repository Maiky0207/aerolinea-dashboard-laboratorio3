import React from 'react';
import { Filter, Calendar, MapPin, X, RotateCcw, SlidersHorizontal } from 'lucide-react';

export const FilterBar = ({
  rutasDisponibles = [],
  selectedRuta,
  onSelectRuta,
  dateRange,
  onDateRangeChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
  hasActiveFilters,
  totalResultadosReservas,
  totalResultadosVuelos
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Filtros:</span>
          </div>

          {/* 1. Ruta / Destino Filter */}
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedRuta}
              onChange={(e) => onSelectRuta(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors cursor-pointer appearance-none"
            >
              <option value="ALL">Todas las rutas y destinos</option>
              {rutasDisponibles.map((ruta) => (
                <option key={ruta} value={ruta}>
                  Ruta: {ruta}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* 2. Date Range Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-semibold text-slate-400">Desde:</span>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => onDateRangeChange('startDate', e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              />
              <span className="text-slate-300">-</span>
              <span className="text-[11px] font-semibold text-slate-400">Hasta:</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => onDateRangeChange('endDate', e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Flight Status Quick Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors cursor-pointer"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="A tiempo">Solo A tiempo</option>
            <option value="En Vuelo">Solo En Vuelo</option>
            <option value="Retrasado">Solo Retrasados</option>
            <option value="Cancelado">Solo Cancelados</option>
          </select>

          {/* Reset button if filters active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-xl transition-colors active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}

        </div>

        {/* Right: Results Count Badge */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 self-end lg:self-center shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            {totalResultadosVuelos} vuelos
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            {totalResultadosReservas} reservas
          </span>
        </div>

      </div>
    </div>
  );
};
