import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { LineChart as LineChartIcon } from 'lucide-react';

const CustomTimelineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs">
        <p className="font-bold text-sm text-brand-300 mb-1">
          {data.label || label} ({data.fecha})
        </p>
        <div className="space-y-1 mt-2">
          <p className="flex justify-between gap-4">
            <span className="text-slate-400">Total Reservas:</span>
            <span className="font-bold text-white">{data.reservas}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-slate-400">Ingresos Generados:</span>
            <span className="font-bold text-emerald-400">{formatCurrency(data.ingresos)}</span>
          </p>
          {data.canceladas > 0 && (
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Cancelaciones:</span>
              <span className="font-semibold text-rose-400">{data.canceladas}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const BookingTimelineChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft h-[360px] flex flex-col items-center justify-center text-slate-400">
        <LineChartIcon className="w-10 h-10 mb-2 opacity-50" />
        <p className="text-sm font-medium">No hay registros cronológicos para el rango seleccionado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            Evolución de Reservas en el Tiempo
          </h3>
          <p className="text-xs text-slate-500">
            Tendencia cronológica diaria del volumen de emisiones y demanda de asientos
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
          Recharts Area
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTimelineTooltip />} />
            <Area
              type="monotone"
              dataKey="reservas"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorReservas)"
              activeDot={{ r: 6, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
