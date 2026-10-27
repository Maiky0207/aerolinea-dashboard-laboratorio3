import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Settings2, 
  Sparkles, 
  HelpCircle,
  ExternalLink,
  Check,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const DEFAULT_WEBHOOK_URL = 'https://maiky07.app.n8n.cloud/webhook/37fd4c73-e328-47f0-af12-d523ae3dacbf';

export const ChatWidget = ({ vuelos = [], reservas = [], kpis = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: '¡Hola! Soy tu Copiloto de Operaciones IA. Puedo responder preguntas sobre vuelos activos, retrasos, ingresos por ruta y reglas Drools. ¿En qué te puedo apoyar?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    const saved = localStorage.getItem('n8n_webhook_url');
    if (!saved || saved.includes('primary-production-c225')) {
      return DEFAULT_WEBHOOK_URL;
    }
    return saved;
  });
  const [webhookStatus, setWebhookStatus] = useState('idle'); // 'idle' | 'success' | 'fallback'

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSaveWebhook = (url) => {
    setWebhookUrl(url);
    localStorage.setItem('n8n_webhook_url', url);
    setShowSettings(false);
  };

  // Asistente de contingencia inteligente con análisis en memoria sobre el dataset
  const generateLocalOperationsResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Preguntas sobre retrasos
    if (q.includes('retraso') || q.includes('demora') || q.includes('tarde')) {
      const retrasados = vuelos.filter((v) => v.estado === 'Retrasado');
      if (retrasados.length === 0) {
        return '✈️ ¡Excelente noticia! No hay vuelos retrasados en este momento. Todos los itinerarios operan a tiempo.';
      }
      const vuelosInfo = retrasados
        .map((v) => `• **${v.numeroVuelo}** (${v.ruta}): Retraso de **${v.retrasoMinutos} min** (Puerta ${v.puertaEmbarque})`)
        .join('\n');
      return `⚠️ Se registran **${retrasados.length} vuelos con retraso** actualmente:\n\n${vuelosInfo}\n\n*Nota: Los pasajeros afectados en vuelos con >60 min han recibido ascenso a Ejecutiva según la Regla 1 de Drools.*`;
    }

    // 2. Preguntas sobre ingresos o facturación
    if (q.includes('ingreso') || q.includes('revenue') || q.includes('dinero') || q.includes('ventas') || q.includes('facturacion')) {
      return `💰 **Resumen Financiero Operacional**:\n• Total Revenue (Confirmado): **${formatCurrency(kpis.totalRevenue)}**\n• Ticket Promedio: **${formatCurrency(kpis.ticketPromedio)}**\n• Reservas Confirmadas: **${kpis.reservasConfirmadasCount}** de un total de ${kpis.totalReservas}.`;
    }

    // 3. Preguntas sobre ocupación
    if (q.includes('ocupacion') || q.includes('asientos') || q.includes('capacidad')) {
      const topVuelo = [...vuelos].sort((a, b) => b.tasaOcupacion - a.tasaOcupacion)[0];
      return `👥 **Tasa de Ocupación Promedio**: **${formatPercentage(kpis.tasaOcupacionPromedio)}**.\nEl vuelo con mayor factor de ocupación es el **${topVuelo?.numeroVuelo}** (${topVuelo?.ruta}) con **${formatPercentage(topVuelo?.tasaOcupacion)}** (${topVuelo?.asientosOcupados}/${topVuelo?.capacidadTotal} asientos).`;
    }

    // 4. Preguntas sobre cancelaciones
    if (q.includes('cancelad') || q.includes('anulad')) {
      const cancelados = vuelos.filter((v) => v.estado === 'Cancelado');
      if (cancelados.length === 0) {
        return '✅ No hay vuelos cancelados en el sistema hoy.';
      }
      const info = cancelados.map((v) => `• **${v.numeroVuelo}** (${v.ruta})`).join('\n');
      return `❌ Vuelos cancelados registrados (${cancelados.length}):\n${info}\nSe han notificado a los pasajeros y procesado los protocolos de reubicación y reembolso.`;
    }

    // 5. Preguntas sobre rutas más rentables
    if (q.includes('ruta') || q.includes('destino')) {
      return `🗺️ Las rutas con mayor demanda son **BOG - MAD** (Madrid) y **BOG - MIA** (Miami), aportando más del 40% del ingreso operacional total.`;
    }

    // 6. Preguntas sobre reglas o Drools
    if (q.includes('drool') || q.includes('regla') || q.includes('beneficio')) {
      return `⚙️ **Motor de Reglas Drools**: Evalúa en tiempo real 10 reglas clave:\n1. Ascenso a Ejecutiva por retraso >60 min\n2. Check-in prioritario (>65 años)\n3. Descuento 10% por equipaje ligero (<10 kg)\n5. Asignación salida de emergencia a adultos jóvenes\n9. Acceso a Salón VIP para miembros Platinum.`;
    }

    // 7. Respuesta genérica analítica
    return `📊 **Estado General de Operaciones**:\n• Vuelos activos/a tiempo: **${kpis.vuelosActivosCount}/${kpis.totalVuelos}** (${formatPercentage(kpis.ratioVuelosActivos)})\n• Total Revenue: **${formatCurrency(kpis.totalRevenue)}**\n• Ocupación promedio: **${formatPercentage(kpis.tasaOcupacionPromedio)}**\n¿Deseas consultar el estado de algún vuelo específico o detalle de pasajeros?`;
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    const payload = {
      message: userMsg.text,
      sessionId: `aero-ops-${Date.now()}`,
      timestamp: new Date().toISOString(),
      context: {
        totalRevenue: kpis.totalRevenue,
        vuelosActivos: kpis.vuelosActivosCount,
        totalVuelos: kpis.totalVuelos,
        tasaOcupacion: kpis.tasaOcupacionPromedio,
        ticketPromedio: kpis.ticketPromedio,
        vuelosRetrasados: kpis.vuelosRetrasados,
        vuelosCancelados: kpis.vuelosCancelados
      }
    };

    try {
      // Intento de llamada al Webhook de n8n
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      let replyText = '';

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          if (Array.isArray(data) && data.length > 0) {
            const firstItem = data[0];
            replyText =
              firstItem.response ||
              firstItem.output ||
              firstItem.reply ||
              firstItem.text ||
              firstItem.message ||
              (typeof firstItem === 'string' ? firstItem : JSON.stringify(firstItem));
          } else if (typeof data === 'object' && data !== null) {
            replyText =
              data.response ||
              data.reply ||
              data.output ||
              data.text ||
              data.message ||
              JSON.stringify(data);
          } else {
            replyText = String(data);
          }
        } catch {
          replyText = responseText;
        }
      } else {
        // Soporte de recuperación si n8n tiene el body puesto en el campo 'Response/Status Code'
        try {
          const errObj = JSON.parse(responseText);
          if (errObj.message && errObj.message.includes('Invalid status code:')) {
            const match = errObj.message.match(/Invalid status code:\s*"([\s\S]*)"\.\s*Status code/);
            if (match && match[1]) {
              const unescaped = match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
              try {
                const inner = JSON.parse(unescaped);
                replyText = inner.response || inner.reply || inner.output || inner.text || unescaped;
              } catch {
                replyText = unescaped;
              }
            }
          }
        } catch {
          // Ignorar si no se puede extraer
        }

        if (!replyText) {
          throw new Error(`n8n HTTP ${response.status}`);
        }
      }

      if (!replyText || !replyText.trim()) {
        replyText = 'Mensaje procesado exitosamente por el agente de n8n.';
      }

      // Limpieza de asteriscos solicitada
      const sanitizedReply = typeof replyText === 'string' ? replyText.replaceAll('*', '') : String(replyText);

      setWebhookStatus('success');
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: sanitizedReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'n8n'
        }
      ]);
    } catch (err) {
      // Fallback amigable y analítico si n8n no está accesible en esta red
      setWebhookStatus('fallback');
      const fallbackReply = generateLocalOperationsResponse(userMsg.text).replaceAll('*', '');

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'local-copilot'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    '¿Cuál es el vuelo con mayor retraso?',
    '¿Cuáles son los ingresos totales hoy?',
    '¿Cuál es la tasa de ocupación?',
    '¿Qué reglas Drools están activas?'
  ];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 text-white shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group animate-pulse-glow"
          aria-label="Abrir asistente de operaciones con IA n8n"
        >
          <div className="relative">
            <Bot className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <p className="text-xs font-bold leading-tight">Copiloto IA</p>
            <p className="text-[10px] text-brand-100 font-medium">n8n Ops Agent</p>
          </div>
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Modal Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600/40 border border-brand-400/40 flex items-center justify-center text-brand-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">Copiloto de Operaciones</h4>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    ● En Línea
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Integración n8n Webhook • IA B2B
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Configurar Webhook n8n"
                className={`p-2 rounded-xl transition-colors ${
                  showSettings ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Drawer (Webhook URL Config) */}
          {showSettings && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 animate-fade-in text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-brand-600" />
                  Configuración del Webhook n8n
                </span>
                <span className="text-[10px] text-slate-500 font-mono">POST Request</span>
              </div>
              <p className="text-slate-500 text-[11px] mb-2 leading-relaxed">
                Ingresa la URL del nodo Webhook en tu flujo de n8n para procesar las consultas operativas.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  defaultValue={webhookUrl}
                  id="webhook-input"
                  placeholder="https://maiky07.app.n8n.cloud/webhook/..."
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('webhook-input');
                    if (el) handleSaveWebhook(el.value);
                  }}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Guardar
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                <AlertCircle className="w-3 h-3 text-brand-500" />
                <span>Si el webhook no responde, se activa automáticamente el motor analítico local.</span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-white border border-slate-200 text-brand-700 shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">
                    {msg.text}
                  </div>
                  <div
                    className={`text-[9px] mt-1.5 flex items-center justify-between gap-2 ${
                      msg.sender === 'user' ? 'text-brand-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.source && (
                      <span className="font-mono text-[8px] uppercase tracking-wider opacity-80">
                        {msg.source === 'n8n' ? 'via n8n' : 'ia local'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2 max-w-[80%] items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 text-brand-600 flex items-center justify-center shadow-sm">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-500 ml-1">Consultando webhook n8n...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 shrink-0">Sugerencias:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200/80 transition-colors whitespace-nowrap active:scale-95 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregunta a la IA sobre vuelos o métricas..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white transition-all shadow-sm active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
