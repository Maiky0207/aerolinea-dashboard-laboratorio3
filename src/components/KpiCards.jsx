import React from 'react';
import { 
  DollarSign, 
  Plane, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export const KpiCards = ({ kpis }) => {
  const {
    totalRevenue,
    reservasConfirmadasCount,
    vuelosActivosCount,
    totalVuelos,
    ratioVuelosActivos,
    tasaOcupacionPromedio,
    ticketPromedio,
    vuelosRetrasados,
    vuelosCancelados
  } = kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      {/* 1. Total Revenue Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-100/40 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Revenue
          </span>
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(totalRevenue)}
          </h3>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              +12.8%
            </span>
            <span className="text-slate-500">
              {reservasConfirmadasCount} reservas confirmadas
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Solo reservas confirmadas</span>
          <span className="font-semibold text-brand-600">En tiempo real</span>
        </div>
      </div>

      {/* 2. Vuelos Activos / A tiempo */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Vuelos A Tiempo / Activos
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Plane className="w-5 h-5 transform -rotate-45" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {vuelosActivosCount}
            </h3>
            <span className="text-sm font-semibold text-slate-400">
              de {totalVuelos} vuelos
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-semibold border ${
              ratioVuelosActivos >= 80 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <CheckCircle2 className="w-3 h-3 mr-0.5" />
              {formatPercentage(ratioVuelosActivos)} puntualidad
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            {vuelosRetrasados} retrasados
          </span>
          {vuelosCancelados > 0 && (
            <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
              {vuelosCancelados} cancelados
            </span>
          )}
        </div>
      </div>

      {/* 3. Tasa de Ocupación Promedio */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tasa de Ocupación Promedio
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatPercentage(tasaOcupacionPromedio)}
          </h3>
          <p className="text-xs text-slate-500">
            Capacidad total de asientos ocupados
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, tasaOcupacionPromedio))}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400">
            <span>Objetivo: 85%</span>
            <span className="font-bold text-slate-700">Meta superada</span>
          </div>
        </div>
      </div>

      {/* 4. Ticket Promedio */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-100/40 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ticket Promedio
          </span>
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(ticketPromedio)}
          </h3>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              +5.4%
            </span>
            <span className="text-slate-500">Por reserva confirmada</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Rango: $130 - $750</span>
          <span className="font-semibold text-slate-700">Mix de cabinas</span>
        </div>
      </div>

    </div>
  );
};
