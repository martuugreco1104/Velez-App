import React, { useState } from 'react';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import SideDrawer from './components/layout/SideDrawer';
import Home from './components/home/Home';
import DigitalBadgeModal from './components/carnet/DigitalBadgeModal';
import SportsCatalog from './components/activities/SportsCatalog';
import ActivityDetailView from './components/activities/ActivityDetailView';
import CheckoutModal from './components/payment/CheckoutModal';
import ClubShop from './components/shop/ClubShop';
import UserProfile from './components/profile/UserProfile';

// Módulos de Fútbol, Estadio y Beneficios
import StadiumAccessView from './components/stadium/StadiumAccessView';
import SeasonTicketsView from './components/stadium/SeasonTicketsView';
import StandingsView from './components/football/StandingsView';
import FixtureView from './components/football/FixtureView';
import BenefitsView from './components/benefits/BenefitsView';
import BookingsView from './components/bookings/BookingsView';
import LoginView from './components/auth/LoginView';
import OfficialReceiptModal from './components/home/OfficialReceiptModal';
import NotificationsModal from './components/layout/NotificationsModal';
import FamilyGroupView from './components/family/FamilyGroupView';
import AccountManagementModal from './components/AccountManagementModal';

// Perfiles de prueba
import { 
  socioAlDia, 
  socioAbonado, 
  socioPorVencer, 
  socioConDeuda 
} from './data/mockUsers';

import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    let savedActivities = null;
    try {
      const stored = localStorage.getItem('velez_user_activities');
      if (stored) savedActivities = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      ...socioAlDia,
      misActividades: savedActivities || socioAlDia.misActividades
    };
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCarnetOpen, setIsCarnetOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [pendingAccountCharges, setPendingAccountCharges] = useState([]);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(18500);
  const [checkoutConcept, setCheckoutConcept] = useState('Cuota Social');
  const [pendingAbono, setPendingAbono] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Selector de perfiles para testing
  const handleSelectUser = (userProfile) => {
    let savedActivities = null;
    try {
      const stored = localStorage.getItem('velez_user_activities');
      if (stored) savedActivities = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser({
      ...userProfile,
      misActividades: savedActivities || userProfile.misActividades
    });
    const messages = {
      al_dia: userProfile.seasonTicket 
        ? "Perfil: Socia Abonada (Platea Norte Baja)" 
        : "Perfil: Socia 'Al Día' (Ingreso libre a Populares y Bianchi Alta)",
      por_vencer: "Perfil: Socia 'Por Vencer' (Vence en 3 días)",
      deuda: "Perfil: Socia 'Con Deuda' (Molinete Suspendido)"
    };
    showToast(messages[userProfile.status]);
  };

  // Apertura de Checkout
  const handleOpenPay = (amount, concept, abonoObj = null) => {
    setCheckoutAmount(amount);
    setCheckoutConcept(concept);
    setPendingAbono(abonoObj);
    setIsCheckoutOpen(true);
  };

  // Pago exitoso
  const handlePaymentSuccess = () => {
    if (pendingAbono) {
      setCurrentUser(prev => ({
        ...prev,
        seasonTicket: {
          sector: pendingAbono.sector,
          fila: 8,
          asiento: 22,
          puerta: pendingAbono.door,
          vigencia: 'Torneo Clausura 2026'
        }
      }));
      setPendingAbono(null);
      setActiveTab('inicio');
      showToast(`¡Abono a ${pendingAbono.sector} adquirido con éxito!`);
    } else {
      setPendingAccountCharges([]);
      setCurrentUser(prev => ({
        ...prev,
        status: 'al_dia',
        quotaInfo: {
          ...prev.quotaInfo,
          proximoVencimiento: '10 de Diciembre, 2026',
          periodo: 'Noviembre 2026',
          mesesImpagos: []
        }
      }));
      showToast("¡Pago procesado con éxito! Tu cuenta quedó al día y el molinete habilitado.");
    }
  };

  // Inscripción a disciplina (con opción de pagar en el momento o cargar a cuenta corriente)
  const handleConfirmInscription = (actInfo, payNow = false) => {
    const newAct = {
      id: actInfo.id,
      name: actInfo.name,
      level: actInfo.chosenLevel || 'General',
      venue: actInfo.venue,
      days: (actInfo.chosenDays || []).join(', '),
      hours: actInfo.schedule ? actInfo.schedule.split('/')[0] : 'Horarios oficiales',
      status: payNow ? 'Al día' : 'Pendiente',
      finalPrice: actInfo.finalPrice
    };

    setCurrentUser(prev => {
      const updatedList = [newAct, ...(prev.misActividades || []).filter(a => a.id !== actInfo.id)];
      try {
        localStorage.setItem('velez_user_activities', JSON.stringify(updatedList));
      } catch (e) {
        console.error(e);
      }
      return {
        ...prev,
        misActividades: updatedList
      };
    });

    if (payNow) {
      handleOpenPay(
        actInfo.finalPrice, 
        `Arancel Inscripción - ${actInfo.name} (${actInfo.chosenLevel || 'General'})`
      );
      showToast(`¡Inscripción a ${actInfo.name}! Abriendo pasarela de pago...`);
    } else {
      const newCharge = {
        id: `charge_${Date.now()}`,
        concept: `Arancel ${actInfo.name} (${actInfo.chosenLevel || 'General'})`,
        amount: actInfo.finalPrice,
        date: 'Octubre 2026',
        category: 'Actividades',
        status: 'pendiente'
      };
      setPendingAccountCharges(prev => [newCharge, ...prev]);
      showToast(`¡Inscripción confirmada! El arancel ($${actInfo.finalPrice.toLocaleString('es-AR')}) se sumó a tu Cuenta Corriente en el menú.`);
    }
  };

  // Navegación desde Drawer / Notificaciones
  const handleDrawerNavigate = (route) => {
    if (route === 'home-quota') {
      setActiveTab('inicio');
      setTimeout(() => {
        const el = document.getElementById('cuota-social-card');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } else if (route === 'cuenta-corriente') {
      setIsAccountModalOpen(true);
    } else if (route === 'grupo-familiar') {
      setActiveTab('grupo-familiar');
    } else if (route === 'abonos-entradas') {
      setActiveTab('abonos');
    } else if (route === 'accesos') {
      setActiveTab('accesos');
    } else if (route === 'turnos') {
      setActiveTab('turnos');
    } else if (route === 'fixture') {
      setActiveTab('fixture');
    } else if (route === 'beneficios') {
      setActiveTab('beneficios');
    }
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Pantalla de Login / Auth si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex justify-center font-sans antialiased selection:bg-[#0055A4] selection:text-white">
        <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl min-h-screen shadow-2xl relative flex flex-col border-x border-slate-200">
          <LoginView 
            onLoginSuccess={(user, welcomeMsg) => {
              setCurrentUser(user);
              setIsAuthenticated(true);
              showToast(welcomeMsg || `¡Bienvenida a Vélez App, ${user.nombre.split(' ')[0]}!`);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center text-slate-800 font-sans antialiased selection:bg-[#0055A4] selection:text-white">
      {/* Mobile-First Adaptable Container: Full-width en mobile, max-w centrado en tablet/desktop */}
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl min-h-screen flex flex-col bg-white shadow-xl relative pb-24 overflow-x-hidden border-x border-slate-200/80">
        
        {/* Sticky Header */}
        <Header 
          member={currentUser}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenCarnet={() => setIsCarnetOpen(true)}
          notificationCount={unreadNotifications}
          activeTab={activeTab}
          onOpenNotifications={() => {
            setIsNotificationsOpen(true);
            setUnreadNotifications(0);
          }}
        />


        {/* Dynamic Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0B2240]/95 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-white/20 backdrop-blur-md flex items-center gap-2 animate-toastSlideDown max-w-[90%] text-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* Main Scrollable Viewport: Uniform 8pt padding */}
        <main className="flex-1 px-4 py-4 pb-28 overflow-y-auto">
          
          {/* 1. VIEW: INICIO */}
          {activeTab === 'inicio' && (
            <Home 
              user={currentUser}
              onPay={handleOpenPay}
              onViewReceipt={() => setIsReceiptOpen(true)}
              onExploreActivities={() => {
                setActiveTab('actividades');
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onSelectActivity={(act) => {
                setActiveTab('actividades');
                setSelectedActivity(act);
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onOpenGatesModal={() => {
                setActiveTab('accesos');
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onOpenSeasonTickets={() => {
                setActiveTab('abonos');
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              onOpenStandings={() => setActiveTab('standings')}
              onOpenFixture={() => setActiveTab('fixture')}
            />
          )}

          {/* 2. VIEW: TIENDA OFICIAL VÉLEZ */}
          {activeTab === 'tienda' && (
            <ClubShop 
              user={currentUser}
              onAddToCart={(item) => showToast(`Agregaste "${item.name}" (Talle ${item.chosenSize}) al carrito.`)}
              onOpenPay={handleOpenPay}
              showToast={showToast}
              onProductDetailToggle={setIsProductDetailOpen}
            />
          )}

          {/* 3. VIEW: DIRECTORIO O PANTALLA COMPLETA DEDICADA DE INSCRIPCIÓN */}
          {activeTab === 'actividades' && (
            selectedActivity ? (
              <ActivityDetailView 
                activity={selectedActivity}
                userAptoValid={currentUser.aptoFisico.vigente}
                onBack={() => setSelectedActivity(null)}
                onConfirmInscription={handleConfirmInscription}
              />
            ) : (
              <SportsCatalog 
                userAptoValid={currentUser.aptoFisico.vigente}
                externalSearchQuery={searchQuery}
                onSelectActivity={(act) => {
                  setSelectedActivity(act);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )
          )}

          {/* 4. VIEW: TABLA DE POSICIONES LIGA PROFESIONAL */}
          {activeTab === 'standings' && (
            <StandingsView onBack={() => setActiveTab('inicio')} />
          )}

          {/* 5. VIEW: FIXTURE OFICIAL */}
          {activeTab === 'fixture' && (
            <FixtureView onBack={() => setActiveTab('inicio')} />
          )}

          {/* 6. VIEW: FORTINERO SOY! BENEFICIOS */}
          {activeTab === 'beneficios' && (
            <BenefitsView onBack={() => setActiveTab('inicio')} />
          )}

          {/* 7. VIEW: MI PERFIL Y CONFIGURACIÓN */}
          {activeTab === 'perfil' && (
            <UserProfile 
              member={currentUser}
              onOpenCarnet={() => setIsCarnetOpen(true)}
              onOpenFamilyGroup={() => setActiveTab('grupo-familiar')}
              onUpdateMember={(updated) => setCurrentUser(prev => ({ ...prev, ...updated }))}
              showToast={showToast}
            />
          )}

          {/* 8. VIEW: RESERVAS Y TURNOS (CANCHAS, QUINCHOS, MÉDICOS) */}
          {activeTab === 'turnos' && (
            <BookingsView 
              onBack={() => setActiveTab('inicio')} 
              currentUser={currentUser}
              showToast={showToast}
            />
          )}

          {/* 9. VIEW: GRUPO FAMILIAR (HIJOS, COLEGIO, COLONIA) */}
          {activeTab === 'grupo-familiar' && (
            <FamilyGroupView 
              onBack={() => setActiveTab('inicio')} 
              onPay={handleOpenPay}
              showToast={showToast}
              currentUser={currentUser}
            />
          )}

          {/* 10. VIEW: ACCESOS Y PUERTAS AL ESTADIO */}
          {activeTab === 'accesos' && (
            <StadiumAccessView 
              user={currentUser}
              onBack={() => setActiveTab('inicio')}
              onOpenCarnet={() => setIsCarnetOpen(true)}
            />
          )}

          {/* 11. VIEW: ABONOS Y PLATEAS */}
          {activeTab === 'abonos' && (
            <SeasonTicketsView 
              onBack={() => setActiveTab('inicio')}
              onBuyAbono={(abono) => handleOpenPay(abono.price, `Abono de Temporada (${abono.sector} - ${abono.category})`, abono)}
            />
          )}

        </main>

        {/* BOTTOM NAVIGATION BAR (Oculto durante inscripción, detalle de producto y abonos en pantalla completa) */}
        {!selectedActivity && activeTab !== 'abonos' && !isProductDetailOpen && (
          <BottomNav 
            activeTab={['standings', 'fixture', 'beneficios', 'turnos', 'grupo-familiar', 'accesos', 'abonos'].includes(activeTab) ? 'inicio' : activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSearchQuery('');
              setSelectedActivity(null);
              setIsProductDetailOpen(false);
              const mainEl = document.querySelector('main');
              if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onOpenCarnet={() => setIsCarnetOpen(true)}
          />
        )}

        {/* SIDE DRAWER */}
        <SideDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          currentUser={currentUser}
          onSelectUser={handleSelectUser}
          onNavigate={handleDrawerNavigate}
          onOpenCarnet={() => setIsCarnetOpen(true)}
          pendingChargesCount={pendingAccountCharges.length}
          onLogout={() => {
            setIsAuthenticated(false);
            showToast("Sesión cerrada. Hasta pronto.");
          }}
        />

        {/* CARNET DIGITAL OFICIAL (POP-UP EXCLUSIVO) */}
        <DigitalBadgeModal 
          isOpen={isCarnetOpen}
          onClose={() => setIsCarnetOpen(false)}
          user={currentUser}
        />

        {/* CHECKOUT MODAL TRANSACCIONAL UNIFICADO */}
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          amount={checkoutAmount}
          concept={checkoutConcept}
          onClose={() => {
            setIsCheckoutOpen(false);
            setPendingAbono(null);
          }}
          onPaymentSuccess={handlePaymentSuccess}
          onViewReceipt={() => setIsReceiptOpen(true)}
        />

        {/* MODAL DE COMPROBANTE OFICIAL DE PAGO */}
        <OfficialReceiptModal 
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          user={currentUser}
          showToast={showToast}
        />

        {/* MODAL DE BANDEJA DE NOTIFICACIONES */}
        <NotificationsModal 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onNavigate={handleDrawerNavigate}
          onClearBadge={() => setUnreadNotifications(0)}
        />

        {/* MODAL OFICIAL DE CUENTA CORRIENTE Y AUTOGESTIÓN */}
        <AccountManagementModal 
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          currentUser={currentUser}
          pendingCharges={pendingAccountCharges}
          onPay={(amount, concept) => handleOpenPay(amount, concept)}
        />

      </div>
    </div>
  );
}
