import React from 'react';
import { Home, Compass, CreditCard, User, QrCode } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onOpenCarnet }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-nav-bar">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between relative">
        
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            activeTab === 'inicio' ? 'text-velez-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'inicio' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Inicio</span>
          {activeTab === 'inicio' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-blue mt-0.5"></span>
          )}
        </button>

        {/* Tab 2: Actividades */}
        <button
          onClick={() => onTabChange('actividades')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            activeTab === 'actividades' ? 'text-velez-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${activeTab === 'actividades' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Actividades</span>
          {activeTab === 'actividades' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-blue mt-0.5"></span>
          )}
        </button>

        {/* Tab 3 (CENTER FAB): ACCESO DIRECTO AL CARNET DIGITAL */}
        <div className="flex-1 flex flex-col items-center justify-center relative -mt-6">
          <button
            onClick={onOpenCarnet}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-velez-navy via-[#002D72] to-velez-blue text-white shadow-xl shadow-velez-blue/40 border-[3px] border-white active:scale-95 transition-all hover:scale-105"
            aria-label="Abrir Carnet Digital"
          >
            {/* Animated Glow Halo */}
            <div className="absolute inset-0 rounded-full bg-sky-400 opacity-20 group-hover:opacity-40 blur-md transition-opacity" />
            
            <div className="relative flex flex-col items-center justify-center">
              <img 
                src="/escudo-velez.png" 
                alt="CAVS" 
                className="w-7 h-7 object-contain drop-shadow"
              />
            </div>

            {/* Live QR pulse badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </button>
          <span className="text-[10px] font-extrabold text-velez-navy tracking-tight mt-1">
            CARNET
          </span>
        </div>

        {/* Tab 4: Pagos & Autogestión */}
        <button
          onClick={() => onTabChange('pagos')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            activeTab === 'pagos' ? 'text-velez-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <CreditCard className={`w-5 h-5 transition-transform ${activeTab === 'pagos' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Pagos</span>
          {activeTab === 'pagos' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-blue mt-0.5"></span>
          )}
        </button>

        {/* Tab 5: Mi Perfil */}
        <button
          onClick={() => onTabChange('perfil')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            activeTab === 'perfil' ? 'text-velez-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className={`w-5 h-5 transition-transform ${activeTab === 'perfil' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Mi Perfil</span>
          {activeTab === 'perfil' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-blue mt-0.5"></span>
          )}
        </button>

      </div>
    </nav>
  );
}
