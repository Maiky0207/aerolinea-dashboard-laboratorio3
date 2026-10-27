import React, { useState } from 'react';
import { Plane, AlertTriangle, Clock, ArrowRight, Search } from 'lucide-react';
import { formatTime, formatPercentage } from '../utils/formatters';

export const FlightsTable = ({ vuelos = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVuelos = vuelos.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.numeroVuelo.toLowerCase().includes(term) ||
      v.ruta.toLowerCase().includes(term) ||
      v.origen.toLowerCase().includes(term) ||
      v.destino.toLowerCase().includes(term) ||
      v.estado.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (estado, retrasoMinutos) => {
    switch (estado) {
      case 'A tiempo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ● A tiempo
          </span>
        );
      case 'En Vuelo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
            ✈ En Vuelo
          </span>
        );
      case 'Retrasado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Retraso +{retrasoMinutos}m
          </span>
        );
      case 'Cancelado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            ✕ Cancelado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {estado}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      
      {/* Table Header & Search */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Plane className="w-5 h-5 text-brand-600" />
            Monitoreo Operacional de Vuelos
          </h3>
          <p className="text-xs text-slate-500">
            Estado de itinerario, puntualidad y ocupación por aeronave en tiempo real
          </p>
        </div>
        
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por vuelo o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-3 px-4">Vuelo</th>
              <th className="py-3 px-4">Ruta & Itinerario</th>
              <th className="py-3 px-4">Aeronave</th>
              <th className="py-3 px-4">Ocupación</th>
              <th className="py-3 px-4">Puerta</th>
              <th className="py-3 px-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredVuelos.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No se encontraron vuelos que coincidan con los filtros
                </td>
              </tr>
            ) : (
              filteredVuelos.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Flight Number */}
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-mono text-xs font-bold">
                        {v.numeroVuelo.replace('AV-', '')}
                      </div>
                      <span>{v.numeroVuelo}</span>
                    </div>
                  </td>

                  {/* Route & Times */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <span>{v.ruta}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{formatTime(v.fechaSalida)}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-slate-300" />
                      <span>{formatTime(v.fechaLlegada)}</span>
                    </div>
                  </td>

                  {/* Aircraft */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800">{v.aeronave.modelo}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{v.aeronave.matricula}</p>
                  </td>

                  {/* Occupancy */}
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-700">{formatPercentage(v.tasaOcupacion)}</span>
                      <span className="text-slate-400">{v.asientosOcupados}/{v.capacidadTotal}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          v.tasaOcupacion >= 90
                            ? 'bg-emerald-500'
                            : v.tasaOcupacion >= 75
                            ? 'bg-brand-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${v.tasaOcupacion}%` }}
                      />
                    </div>
                  </td>

                  {/* Gate / Terminal */}
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
                      {v.terminal} • {v.puertaEmbarque}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-right">
                    {getStatusBadge(v.estado, v.retrasoMinutos)}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
