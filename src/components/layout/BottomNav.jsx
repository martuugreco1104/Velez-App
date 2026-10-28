import React from 'react';
import { Home, ShoppingBag, Compass, User, QrCode } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onOpenCarnet }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-nav-bar">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4 py-2 flex items-center justify-between relative">
        
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center flex-1 h-12 min-h-[48px] min-w-[48px] transition-all active:scale-[0.98] ${
            activeTab === 'inicio' ? 'text-velez-primary font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
          aria-label="Pestaña Inicio"
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'inicio' ? 'scale-110 text-velez-primary stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Inicio</span>
          {activeTab === 'inicio' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-primary mt-0.5 animate-fadeIn" />
          )}
        </button>

        {/* Tab 2: Tienda */}
        <button
          onClick={() => onTabChange('tienda')}
          className={`flex flex-col items-center justify-center flex-1 h-12 min-h-[48px] min-w-[48px] transition-all active:scale-[0.98] ${
            activeTab === 'tienda' ? 'text-velez-primary font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
          aria-label="Pestaña Tienda Oficial"
        >
          <ShoppingBag className={`w-5 h-5 transition-transform ${activeTab === 'tienda' ? 'scale-110 text-velez-primary stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Tienda</span>
          {activeTab === 'tienda' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-primary mt-0.5 animate-fadeIn" />
          )}
        </button>

        {/* CENTER ELEVATED BUTTON: CARNET DIGITAL (Escudo oficial CAVS + referencia QR sin estrellas) */}
        <div className="flex-1 flex flex-col items-center justify-center relative -mt-7">
          <button
            onClick={onOpenCarnet}
            className="group relative flex items-center justify-center w-[58px] h-[58px] rounded-full bg-[#001D4A] text-white shadow-[0_8px_25px_-4px_rgba(0,29,74,0.35)] border-[3px] border-white active:scale-90 transition-transform duration-150 hover:scale-105"
            aria-label="Abrir Carnet Digital Oficial"
          >
            <img 
              src="/escudo-velez.png" 
              alt="CAVS" 
              className="w-8 h-8 object-contain drop-shadow" 
            />
            {/* Referencia táctica de QR */}
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#0055A4] text-white p-1 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
              <QrCode className="w-2.5 h-2.5" />
            </div>
          </button>
          <span className="text-[9px] font-black tracking-wider text-[#001D4A] uppercase mt-1">
            Carnet
          </span>
        </div>

        {/* Tab 3: Actividades */}
        <button
          onClick={() => onTabChange('actividades')}
          className={`flex flex-col items-center justify-center flex-1 h-12 min-h-[48px] min-w-[48px] transition-all active:scale-[0.98] ${
            activeTab === 'actividades' ? 'text-velez-primary font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
          aria-label="Pestaña Actividades y Deportes"
        >
          <Compass className={`w-5 h-5 transition-transform ${activeTab === 'actividades' ? 'scale-110 text-velez-primary stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Actividades</span>
          {activeTab === 'actividades' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-primary mt-0.5 animate-fadeIn" />
          )}
        </button>

        {/* Tab 4: Perfil */}
        <button
          onClick={() => onTabChange('perfil')}
          className={`flex flex-col items-center justify-center flex-1 h-12 min-h-[48px] min-w-[48px] transition-all active:scale-[0.98] ${
            activeTab === 'perfil' ? 'text-velez-primary font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
          aria-label="Pestaña Mi Perfil"
        >
          <User className={`w-5 h-5 transition-transform ${activeTab === 'perfil' ? 'scale-110 text-velez-primary stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight">Perfil</span>
          {activeTab === 'perfil' && (
            <span className="w-1.5 h-1.5 rounded-full bg-velez-primary mt-0.5 animate-fadeIn" />
          )}
        </button>

      </div>
    </nav>
  );
}
