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
      localStorage.setItem('token', data.token || 'dummy-token'); // Utilisez le vrai token si renvoyé
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
      <div className="auth-account-page">
        <div className="auth-container">
          <div className="auth-row">
            <div className="auth-col-2">
              <img src="https://via.placeholder.com/300" width="100%" alt="Background" />
            </div>
            <div className="auth-col-2">
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
                    <input
                      type="text"
                      placeholder="Nom d'utilisateur"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? 'Chargement...' : (isLogin ? 'Connexion' : 'S’inscrire')}
                  </button>
                  {isLogin && <a href="#">Mot de passe oublié ?</a>}
                </form>
              </div>
            </div>
          </div>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </div>
    </PageLayout>
  );
};

export default Auth;