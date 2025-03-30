import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SubMenu from './components/SubMenu/SubMenu';
import SubMenuTabletMobile from './components/SubMenuTabletMobile/SubMenuTabletMobile';
import HolidaySection from './components/HolidaySection/HolidaySection';
import DestinationsSection from './components/DestinationsSection/DestinationsSection';
import NextHolidaySection from './components/NextHolidaySection/NextHolidaySection';
import ToursSection from './components/ToursSection/ToursSection';
import DiscoverSection from './components/DiscoverSection/DiscoverSection';
import PromotionSection from './components/PromotionSection/PromotionSection';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import CoupDeCoeur from './pages/CoupDeCoeur';
import Boutique from './pages/Boutique';
import Guides from './pages/Guides';
import Forum from './pages/Forum';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Reserver from './pages/Reserver';
import Donate from './pages/Donate';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import SuccessCancel from './pages/SuccessCancel';
import ErrorPage from './pages/ErrorPage';
import Cart from './pages/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import Profile from './pages/Profile';
import CoupDeCoeurDetailPage from './pages/CoupDeCoeurDetailPage'; // Import ajouté
import './App.scss';
import CookieConsent from './components/CookieConsent/CookieConsent';
// import BonsPlans from './pages/BonsPlans'; // Commenté pour le lancement initial
import Calendar from './pages/Calendar'; // Ajustez le chemin

const App = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(localStorage.getItem('cookiesAccepted') === 'true');

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setAcceptedCookies(true);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <SubMenu />
        <SubMenuTabletMobile />
        <main className="home-container">
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HolidaySection />
                    <DestinationsSection />
                    <NextHolidaySection />
                    <ToursSection />
                    <DiscoverSection />
                    <PromotionSection />
                    <Home />
                  </>
                }
              />
              <Route path="/coup-de-coeur" element={<CoupDeCoeur />} />
              <Route path="/coup-de-coeur/:id" element={<CoupDeCoeurDetailPage />} /> {/* Route ajoutée */}
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reserver" element={<Reserver />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<SuccessCancel />} />
              <Route path="/cancel" element={<SuccessCancel />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/profile" element={<Profile />} />
              {!acceptedCookies && <Route path="*" element={<Navigate to="/cookie-consent" />} />}
              <Route path="/cookie-consent" element={<CookieConsent onAccept={handleAcceptCookies} />} />
              {/* <Route path="/bons-plans" element={<BonsPlans />} /> */} {/* Commenté pour le lancement initial */}
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      {!acceptedCookies && <CookieConsent onAccept={handleAcceptCookies} />}
    </Router>
  );
};

export default App;