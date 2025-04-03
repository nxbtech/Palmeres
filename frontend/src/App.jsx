// frontend/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import CoupDeCoeur from './pages/CoupDeCoeur/CoupDeCoeur';
import Boutique from './pages/Boutique/Boutique';
import Guides from './pages/Guides/Guides';
import Forum from './pages/Forum/Forum';
import Articles from './pages/Articles/Articles';
import Contact from './pages/Contact/Contact';
import Donate from './pages/Donate/Donate';
import Auth from './pages/Auth/Auth';
import Checkout from './pages/Checkout/Checkout';
import SuccessCancel from './pages/SuccessCancel/SuccessCancel';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Cart from './pages/Cart/Cart';
import ProductDetail from './pages/ProductDetailPage/ProductDetailPage';
import CoupDeCoeurDetailPage from './pages/CoupDeCoeurDetailPage/CoupDeCoeurDetailPage';
import CookieConsent from './components/CookieConsent/CookieConsent';
import Calendar from './pages/Calendar/Calendar';
import Paiement from './pages/Paiement/Paiement';
import Panier from './pages/Panier/Panier';
import './styles/App.scss';

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
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coup-de-coeur" element={<CoupDeCoeur />} />
            <Route path="/coup-de-coeur/:id" element={<CoupDeCoeurDetailPage />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<SuccessCancel />} />
            <Route path="/cancel" element={<SuccessCancel />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/cookie-consent" element={<CookieConsent onAccept={handleAcceptCookies} />} />
            {!acceptedCookies && <Route path="*" element={<Navigate to="/cookie-consent" />} />}
          </Routes>
        </main>
        <Footer />
        {!acceptedCookies && <CookieConsent onAccept={handleAcceptCookies} />}
      </div>
    </Router>
  );
};

export default App;