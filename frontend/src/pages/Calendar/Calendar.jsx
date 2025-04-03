// frontend/src/pages/Calendar/Calendar.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CalendarModule from '../../modules/CalendarModule/CalendarModule';

const Calendar = () => (
  <PageLayout
    title="Calendrier des Événements"
    subtitle="Découvrez tous les événements à venir à Platja d’Aro"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
  >
    <CalendarModule />
  </PageLayout>
);

export default Calendar;