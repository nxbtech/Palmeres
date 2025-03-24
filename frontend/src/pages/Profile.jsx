import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) throw new Error('Vous devez être connecté');
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération du profil');
        const data = await response.json();
        setUser(data.user);
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  if (loading) return <div className="profile-loading">Chargement...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <PageLayout
      title="Mon Tableau de Bord"
      subtitle={`Bienvenue, ${user?.username || 'Utilisateur'}`}
      image="https://i.postimg.cc/nz6YzMPg/background.jpg"
    >
      <div className="profile-dashboard">
        {/* Section de bienvenue */}
        <section className="dashboard-welcome">
          <h1>Bonjour, {user?.username || 'Utilisateur'} !</h1>
          <p>Gérez vos informations et suivez vos activités ici.</p>
        </section>

        {/* Section Informations personnelles */}
        <section className="dashboard-section">
          <h2>Informations Personnelles</h2>
          <div className="dashboard-card">
            <div className="dashboard-info-item">
              <span className="dashboard-label">Email :</span>
              <span className="dashboard-value">{user?.email || 'Non défini'}</span>
            </div>
            <div className="dashboard-info-item">
              <span className="dashboard-label">Nom d'utilisateur :</span>
              <span className="dashboard-value">{user?.username || 'Non défini'}</span>
            </div>
            <button className="dashboard-btn dashboard-edit-btn">Modifier le profil</button>
          </div>
        </section>

        {/* Section Historique des commandes */}
        <section className="dashboard-section">
          <h2>Historique des Commandes</h2>
          {orders.length === 0 ? (
            <p className="dashboard-no-data">Aucune commande pour le moment.</p>
          ) : (
            <div className="dashboard-orders-grid">
              {orders.map((order, index) => (
                <div key={index} className="dashboard-order-card">
                  <p><strong>Article :</strong> {order.itemName}</p>
                  <p><strong>Prix :</strong> {order.price} €</p>
                  <p><strong>Date :</strong> {new Date(order.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section Actions */}
        <section className="dashboard-actions">
          <button className="dashboard-btn dashboard-logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </section>
      </div>
    </PageLayout>
  );
};

export default Profile;