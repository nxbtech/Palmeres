import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée :', error, errorInfo); // Utilise 'error' pour logging
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/error" replace />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;