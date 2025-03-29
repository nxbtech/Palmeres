import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const body = isLogin ? { email, password } : { username, email, password };
      const response = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la requête');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token || 'dummy-token');
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
      subtitle={isLogin ? 'Connectez-vous à votre compte' : 'Rejoignez la communauté'}
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937679/banniere-connexion_owosrk.jpg"
    >
      <div className="auth-account-page">
        <div className="auth-container">
          <div className="auth-row">
            <div className="auth-col auth-info">
              <h3 className="auth-info-title">Pourquoi nous rejoindre ?</h3>
              <ul className="auth-info-list">
                <li>
                  <i className="fas fa-check-circle"></i> Accès exclusif au forum
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Offres spéciales à Platja d’Aro
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Communauté francophone active
                </li>
              </ul>
              <button
                className="auth-support-btn"
                onClick={() => alert('Contacter le support')}
              >
                <i className="fas fa-headset"></i> Besoin d’aide ?
              </button>
            </div>
            <div className="auth-col auth-form-col">
              <div className="auth-form-container">
                <div className="auth-form-btn">
                  <span
                    className={isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(true)}
                  >
                    Connexion
                  </span>
                  <span
                    className={!isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(false)}
                  >
                    Inscription
                  </span>
                  <hr id="auth-indicator" className={isLogin ? 'login' : 'register'} />
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <div className="form-group">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="pri-btn" disabled={loading}>
                    {loading ? 'Chargement...' : (isLogin ? 'Connexion' : 'S’inscrire')}
                  </button>
                  {isLogin && (
                    <a href="#" className="auth-forgot-link">
                      Mot de passe oublié ?
                    </a>
                  )}
                </form>
                {error && <p className="auth-error">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Auth;