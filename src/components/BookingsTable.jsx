import React, { useState } from 'react';
import { Ticket, Sparkles, Shield, User, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export const BookingsTable = ({ reservas = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservaRules, setSelectedReservaRules] = useState(null);

  const filteredReservas = reservas.filter((r) => {
    const term = searchTerm.toLowerCase();
    const pasajeroNombre = `${r.pasajero.nombre} ${r.pasajero.apellido}`.toLowerCase();
    return (
      r.codigo.toLowerCase().includes(term) ||
      r.numeroVuelo.toLowerCase().includes(term) ||
      r.ruta.toLowerCase().includes(term) ||
      pasajeroNombre.includes(term) ||
      r.estado.toLowerCase().includes(term)
    );
  });

  const getMembershipBadge = (status) => {
    switch (status) {
      case 'Platinum':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-purple-200 border border-purple-500/30">
            ★ Platinum
          </span>
        );
      case 'Gold':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
            ✦ Gold
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
            Basic
          </span>
        );
    }
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmada
          </span>
        );
      case 'Pendiente':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </span>
        );
      case 'Cancelada':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelada
          </span>
        );
      default:
        return <span>{estado}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      
      {/* Table Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Ticket className="w-5 h-5 text-indigo-600" />
            Control de Reservas & Pasajeros
          </h3>
          <p className="text-xs text-slate-500">
            Registro de emisión, cabinas, fidelidad y reglas de negocio Drools aplicadas
          </p>
        </div>
        
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por código PNR o pasajero..."
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
              <th className="py-3 px-4">Código PNR</th>
              <th className="py-3 px-4">Pasajero & Membresía</th>
              <th className="py-3 px-4">Vuelo & Ruta</th>
              <th className="py-3 px-4">Asiento / Cabina</th>
              <th className="py-3 px-4">Valor Ticket</th>
              <th className="py-3 px-4">Reglas Drools</th>
              <th className="py-3 px-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReservas.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400">
                  No se encontraron reservas con los criterios aplicados
                </td>
              </tr>
            ) : (
              filteredReservas.slice(0, 15).map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* PNR Code */}
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                      {r.codigo}
                    </span>
                  </td>

                  {/* Passenger */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {r.pasajero.nombre} {r.pasajero.apellido}
                      </span>
                      {getMembershipBadge(r.pasajero.membershipStatus)}
                    </div>
                    <p className="text-[11px] text-slate-400">{r.pasajero.email}</p>
                  </td>

                  {/* Flight & Route */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{r.numeroVuelo}</span>
                    <span className="text-slate-400 mx-1">•</span>
                    <span className="text-slate-600 font-medium">{r.ruta}</span>
                  </td>

                  {/* Seat & Class */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                        {r.asiento.numero}
                      </span>
                      <span className="text-slate-600">{r.asiento.clase}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {formatCurrency(r.valor)}
                  </td>

                  {/* Drools Rules */}
                  <td className="py-3 px-4">
                    {r.reglasAplicadas && r.reglasAplicadas.length > 0 ? (
                      <button
                        onClick={() => setSelectedReservaRules(r)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>{r.reglasAplicadas.length} regla(s)</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Estándar</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-right">
                    {getStatusBadge(r.estado)}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Showing count footnote */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
        <span>Mostrando hasta 15 de {filteredReservas.length} reservas registradas</span>
        <span className="font-medium text-slate-600">Base de datos de reservas sincronizada</span>
      </div>

      {/* Rules modal / drawer if clicked */}
      {selectedReservaRules && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-slate-900">Reglas Drools Aplicadas</h4>
              </div>
              <button
                onClick={() => setSelectedReservaRules(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="py-4 space-y-2">
              <p className="text-xs text-slate-500">
                Reserva: <strong className="text-slate-800">{selectedReservaRules.codigo}</strong> • Pasajero: <strong className="text-slate-800">{selectedReservaRules.pasajero.nombre} {selectedReservaRules.pasajero.apellido}</strong>
              </p>
              <div className="space-y-2 mt-3">
                {selectedReservaRules.reglasAplicadas.map((rule, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 font-medium">
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedReservaRules(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
