import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la requête');
      }

      const data = await response.json();
      localStorage.setItem('token', 'dummy-token');
      alert(data.message);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title={isLogin ? 'Connexion' : 'Inscription'}
      subtitle={isLogin ? 'Connectez-vous' : 'Créez un compte'}
      image="https://i.postimg.cc/nz6YzMPg/background.jpg"
    >
      <div className="auth-container">
        <div className="auth-bg"></div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">{isLogin ? 'Connexion' : 'Inscription'}</h2>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="auth-login-btn" disabled={loading}>
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S’inscrire'}
          </button>
          <p className="auth-register-btn">
            {isLogin ? "Pas de compte ?" : "Déjà un compte ?"} <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "S’inscrire" : "Se connecter"}</span>
          </p>
        </form>
      </div>
    </PageLayout>
  );
};

export default Auth;