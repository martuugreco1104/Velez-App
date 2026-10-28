import React from 'react';
import { 
  ReceiptText, 
  CreditCard, 
  Ticket, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function QuickActions({ onSelectAction }) {
  const actions = [
    {
      id: 'cuenta-corriente',
      title: 'Cuenta Corriente',
      desc: 'Saldos y facturación',
      icon: ReceiptText,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      badge: 'Al día',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'debito-automatico',
      title: 'Débito Automático',
      desc: 'Olvidate de vencimientos',
      icon: CreditCard,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      badge: 'Recomendado',
      badgeClass: 'bg-blue-100 text-velez-blue'
    },
    {
      id: 'mis-tickets',
      title: 'Tickets y Abonos',
      desc: 'Entradas al Amalfitani',
      icon: Ticket,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
      badge: 'Clausura 2026',
      badgeClass: 'bg-blue-100 text-velez-blue'
    },
    {
      id: 'apto-fisico',
      title: 'Apto Físico',
      desc: 'Certificado de salud',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Vigente',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    }
  ];

  return (
    <section className="my-5">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Gestión Rápida del Socio
        </h2>
        <span className="text-[11px] text-velez-blue font-semibold hover:underline cursor-pointer">
          Ver todo
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onSelectAction(act.id)}
              className="group text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between active:scale-[0.98]"
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${act.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.badgeClass}`}>
                  {act.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-velez-blue transition-colors leading-tight">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
