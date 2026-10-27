import React, { useState, useEffect } from 'react';
import { Plane, Radio, RefreshCw, Bell, ShieldCheck, UserCheck } from 'lucide-react';

export const Navbar = ({ totalVuelosActivos, onRefresh, isRefreshing }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-slate-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-100">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans">
                  AeroVirtual<span className="text-brand-600">Ops</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
                  Control Room B2B
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Centro de Operaciones y Analítica en Tiempo Real
              </p>
            </div>
          </div>

          {/* Center Info: Live Operations Status */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-700">Radar Activo:</span>
              <span className="font-bold text-slate-900">{totalVuelosActivos} vuelos en monitoreo</span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5 text-slate-600 font-mono">
              <Radio className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              <span>{formattedTime} UTC-5</span>
            </div>
          </div>

          {/* Right Actions: Refresh, n8n badge, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Recargar datos operativos"
              className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-slate-700 hover:text-brand-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-brand-600' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            {/* n8n Agent Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200/70 rounded-xl text-indigo-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>n8n AI Agent</span>
            </div>

            {/* User Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                OP
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Admin Operaciones</p>
                <p className="text-[11px] text-slate-500">Hub Antioquia</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
