import React from 'react';
import QuotaStatusCard from './QuotaStatusCard';
import NextMatchCard from './NextMatchCard';
import MyActivitiesCard from './MyActivitiesCard';
import { nextMatchData } from '../../data/mockData';

export default function Home({ 
  user, 
  onPay, 
  onViewReceipt, 
  onExploreActivities, 
  onSelectActivity,
  onOpenGatesModal,
  onOpenSeasonTickets,
  onOpenStandings,
  onOpenFixture
}) {
  return (
    <div className="space-y-4 animate-fadeIn font-sans">
      {/* 1. Card de Estado de Cuota Estática y Condicional */}
      <QuotaStatusCard 
        user={user} 
        onPay={onPay}
        onViewReceipt={onViewReceipt}
      />

      {/* 2. Próximo Partido en el Estadio José Amalfitani (Condicional según cuota y abonos) */}
      <NextMatchCard 
        match={nextMatchData}
        user={user}
        onOpenGatesModal={onOpenGatesModal}
        onOpenSeasonTickets={onOpenSeasonTickets}
        onPayDebt={() => onPay(user.quotaInfo.monto, `Regularización Total de Deuda (${user.quotaInfo.periodo})`)}
        onOpenStandings={onOpenStandings}
        onOpenFixture={onOpenFixture}
      />

      {/* 3. Mis Disciplinas Activas del Polideportivo */}
      <MyActivitiesCard 
        activities={user.misActividades || []}
        onExploreMore={onExploreActivities}
        onSelectActivity={onSelectActivity}
      />
    </div>
  );
}
