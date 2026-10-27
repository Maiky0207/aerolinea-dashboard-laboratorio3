import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Compass, AlertCircle } from 'lucide-react';

export const FlightStatusDistribution = ({ data = [], totalVuelos = 0 }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-600" />
            Distribución de Flota
          </h3>
          <p className="text-xs text-slate-500">
            Estado de puntualidad y operaciones activas
          </p>
        </div>
      </div>

      {/* Donut Chart & Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-2">
        
        {/* Pie Canvas */}
        <div className="h-[180px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} vuelos`, name]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item) => {
            const pct = totalVuelos > 0 ? ((item.value / totalVuelos) * 100).toFixed(0) : 0;
            return (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-slate-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.value}</span>
                  <span className="text-[11px] text-slate-400 w-8 text-right">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-slate-600">
          <AlertCircle className="w-3.5 h-3.5 text-brand-500" />
          Actualización automática de radar
        </span>
        <span className="font-semibold text-slate-800">{totalVuelos} Vuelos Totales</span>
      </div>

    </div>
  );
};
