import React from 'react';
import { Menu, Bell } from 'lucide-react';

export default function Header({ 
  member, 
  onOpenDrawer, 
  notificationCount = 0,
  onOpenNotifications,
  activeTab
}) {
  const isProfile = activeTab === 'perfil';

  return (
    <header className="sticky top-0 z-40 bg-[#001D4A] text-white border-b border-white/10 shadow-lg relative overflow-hidden font-sans">
      
      {/* Marca de agua vectorial de la «V» institucional */}
      <div className="pointer-events-none absolute -right-6 -top-10 w-52 h-40 opacity-[0.08] text-white z-0">
        <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
          <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4 py-3 relative z-10">
        
        {/* Top Bar: Drawer Trigger + Member Badge + Notifications */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Drawer Button + Member Identity */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={onOpenDrawer}
              className="w-10 h-10 min-h-[44px] min-w-[44px] -ml-1 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-transform duration-150 flex items-center justify-center text-white border border-white/15"
              aria-label="Abrir menú de servicios"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>

            {isProfile ? (
              <div>
                <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-widest block leading-tight">
                  Oficina Virtual CAVS
                </span>
                <h1 className="text-base font-black text-white tracking-tight leading-tight mt-0.5">
                  Mi Perfil
                </h1>
              </div>
            ) : (
              <>
                {/* Clickable Avatar con aro blanco nítido y escudo oficial */}
                <div 
                  onClick={onOpenDrawer}
                  className="relative cursor-pointer group shrink-0 active:scale-[0.98] transition-transform duration-150"
                  title="Ver menú del socio"
                >
                  <div className="w-11 h-11 rounded-full p-0.5 bg-white shadow-md ring-2 ring-white/90 overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.nombre} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#001D4A] rounded-full p-0.5 border border-white/80 shadow">
                    <img src="/escudo-velez.png" alt="CAVS" className="w-3.5 h-3.5 object-contain" />
                  </div>
                </div>

                {/* Member Identity Typography */}
                <div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block leading-tight flex items-center gap-1">
                    <span>C. A. Vélez Sarsfield</span>
                  </span>
                  <h1 className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                    Hola, {member.nombre.split(' ')[0]}
                  </h1>
                </div>
              </>
            )}
          </div>

          {/* Right: Notifications Button */}
          <button 
            onClick={onOpenNotifications || (() => alert("Notificaciones del club"))}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-transform duration-150 flex items-center justify-center text-white border border-white/15 relative"
            aria-label="Notificaciones del club"
          >
            <Bell className="w-4 h-4 text-sky-100" />
            {notificationCount > 0 && (
              <>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-velez-warning ring-2 ring-[#001D4A] animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-velez-warning ring-2 ring-[#001D4A]" />
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
