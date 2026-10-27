import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs">
        <p className="font-bold text-sm text-brand-300 mb-1 flex items-center gap-1.5">
          <span>Ruta:</span>
          <span>{label}</span>
        </p>
        <div className="space-y-1 mt-2">
          <p className="flex justify-between gap-4">
            <span className="text-slate-400">Ingresos Totales:</span>
            <span className="font-bold text-emerald-400">{formatCurrency(data.ingresos)}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-slate-400">Reservas Confirmadas:</span>
            <span className="font-semibold text-white">{data.confirmadas}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-slate-400">Total Reservas:</span>
            <span className="font-semibold text-slate-300">{data.reservasTotal}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const RevenueRouteChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft h-[360px] flex flex-col items-center justify-center text-slate-400">
        <BarChart3 className="w-10 h-10 mb-2 opacity-50" />
        <p className="text-sm font-medium">No hay datos de ingresos para los filtros seleccionados</p>
      </div>
    );
  }

  // Preciosos colores en degradado para las barras principales
  const barColors = [
    '#3b82f6', // blue-500
    '#4f46e5', // indigo-600
    '#6366f1', // indigo-500
    '#2563eb', // blue-600
    '#0ea5e9', // sky-500
    '#8b5cf6', // violet-500
    '#1d4ed8'  // blue-700
  ];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
            Ingresos por Ruta Operativa
          </h3>
          <p className="text-xs text-slate-500">
            Comparativa de volumen de facturación generado por cada corredor aéreo
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/70">
          Recharts Bar
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="ruta"
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              angle={-20}
              textAnchor="end"
              height={40}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.8 }} />
            <Bar
              dataKey="ingresos"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={barColors[index % barColors.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
