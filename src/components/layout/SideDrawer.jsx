import React from 'react';
import { 
  X, 
  Receipt, 
  Ticket, 
  Compass,
  CalendarClock, 
  Trophy, 
  Gift, 
  LogOut, 
  ChevronRight, 
  Users
} from 'lucide-react';
import { MOCK_USERS } from '../../data/mockUsers';

export default function SideDrawer({ 
  isOpen, 
  onClose, 
  currentUser,
  onSelectUser,
  onNavigate, 
  onOpenCarnet,
  onLogout,
  pendingChargesCount = 0
}) {
  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'cuenta-corriente',
      label: 'Cuenta Corriente',
      desc: pendingChargesCount > 0 ? `${pendingChargesCount} arancel(es) pendiente(s)` : 'Historial y comprobantes',
      badge: pendingChargesCount > 0 ? `${pendingChargesCount} pendiente${pendingChargesCount > 1 ? 's' : ''}` : null,
      icon: Receipt,
      action: () => { onClose(); onNavigate('cuenta-corriente'); }
    },
    {
      id: 'grupo-familiar',
      label: 'Grupo Familiar',
      desc: 'Hijos, colegio y colonia',
      icon: Users,
      action: () => { onClose(); onNavigate('grupo-familiar'); }
    },
    {
      id: 'abonos-entradas',
      label: 'Abonos y Entradas',
      desc: 'Acceso al Estadio Amalfitani',
      icon: Ticket,
      action: () => { onClose(); onNavigate('abonos-entradas'); }
    },
    {
      id: 'accesos-puertas',
      label: 'Accesos y Puertas',
      desc: 'Mapa e ingresos al Amalfitani',
      icon: Compass,
      action: () => { onClose(); onNavigate('accesos'); }
    },
    {
      id: 'turnos',
      label: 'Turnos Médicos y Canchas',
      desc: 'Apto médico, tenis y polideportivo',
      icon: CalendarClock,
      action: () => { onClose(); onNavigate('turnos'); }
    },
    {
      id: 'fixture-posiciones',
      label: 'Fixture y Posiciones',
      desc: 'Tabla de la Liga Profesional',
      icon: Trophy,
      action: () => { onClose(); onNavigate('fixture'); }
    },
    {
      id: 'beneficios',
      label: 'Beneficios Fortinero Soy!',
      desc: 'Red de comercios adheridos',
      icon: Gift,
      action: () => { onClose(); onNavigate('beneficios'); }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideRight overflow-hidden">
        
        {/* Top Member Header in Dark Navy */}
        <div className="bg-[#001D4A] text-white p-5 relative overflow-hidden border-b border-white/10">
          
          {/* Marca de agua vectorial de la «V» azulada */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.08] text-white">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
              <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
            </svg>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center text-white/90 hover:text-white transition-colors absolute top-4 right-4 z-10"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Member Card Profile */}
          <div className="flex items-center gap-3.5 mt-2 relative z-10">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 bg-white shadow-lg ring-2 ring-white/90 overflow-hidden">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.nombre} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#001D4A] rounded-full p-0.5 border border-white/80 shadow">
                <img src="/escudo-velez.png" alt="CAVS" className="w-4 h-4 object-contain" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 block">
                {currentUser.categoria}
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight mt-0.5">
                {currentUser.nombre}
              </h3>
              <p className="text-xs font-mono text-blue-200 mt-0.5 font-bold">
                Socia Nº {currentUser.nroSocio}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Servicios del Club
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full min-h-[48px] p-3 rounded-2xl hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-velez-primary flex items-center justify-center transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-velez-primary transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[9px] font-bold bg-blue-50 text-velez-primary border border-blue-200 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </button>
            );
          })}

          {/* SIMULADOR DE PERFILES (TESTING) */}
          <div className="mt-4 pt-4 border-t border-slate-200 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5 px-2">
              <Users className="w-3.5 h-3.5 text-velez-primary" />
              <span>Simulador de Perfiles (Testing)</span>
            </span>
            <div className="space-y-1.5">
              {MOCK_USERS.map((u) => {
                const isSelected = currentUser.id === u.id;
                const badgeColor = u.status === 'al_dia' 
                  ? u.seasonTicket 
                    ? 'text-blue-800 bg-blue-100 border-blue-300' 
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                  : u.status === 'por_vencer' 
                  ? 'text-orange-800 bg-orange-100 border-orange-300' 
                  : 'text-rose-800 bg-rose-100 border-rose-300';

                const label = u.id === 'user_al_dia' 
                  ? '1. Socia Al Día' 
                  : u.id === 'user_abonado' 
                  ? '2. Socia Abonada' 
                  : u.id === 'user_por_vencer' 
                  ? '3. Por Vencer' 
                  : u.id === 'user_con_deuda'
                  ? '4. Con Deuda'
                  : '5. Sin Grupo Familiar';

                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u);
                      onClose();
                    }}
                    className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center justify-between border transition-all active:scale-[0.98] ${
                      isSelected 
                        ? 'border-velez-primary bg-blue-50/70 text-velez-primary ring-1 ring-velez-primary/30' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${badgeColor}`}>
                      {u.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer: Sede, Ayuda & Cerrar Sesión */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-1">
          <div className="px-3 py-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Sede Central: Av. J. B. Justo 9200</span>
            <span className="font-mono text-xs font-bold text-velez-primary">4649-9100</span>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onLogout) {
                onLogout();
              }
            }}
            className="w-full h-10 px-3 rounded-xl hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-2 transition-colors active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

      </div>
    </div>
  );
}
