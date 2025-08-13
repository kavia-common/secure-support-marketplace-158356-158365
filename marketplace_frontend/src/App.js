import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import PrivacyOverlay from './components/common/PrivacyOverlay';
import ConsentModal from './components/common/ConsentModal';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import VerifyIdentity from './pages/auth/VerifyIdentity';
import Consent from './pages/auth/Consent';

import Marketplace from './pages/marketplace/Marketplace';
import ListenerProfile from './pages/marketplace/ListenerProfile';
import Booking from './pages/booking/Booking';
import Messaging from './pages/messaging/Messaging';

import DashboardUser from './pages/dashboards/DashboardUser';
import DashboardListener from './pages/dashboards/DashboardListener';
import OnboardingApply from './pages/onboarding/OnboardingApply';
import OnboardingTraining from './pages/onboarding/OnboardingTraining';

import Payments from './pages/payments/Payments';
import NotFound from './pages/NotFound';

import { useAuth } from './context/AuthContext';

// PUBLIC_INTERFACE
function App() {
  /** Main application component that configures global layout and routes. */
  const { consentSigned } = useAuth();
  const [showPrivacy, setShowPrivacy] = React.useState(false);

  React.useEffect(() => {
    const accepted = localStorage.getItem('privacyAccepted') === 'true';
    if (!accepted) setShowPrivacy(true);
  }, []);

  const onDismissPrivacy = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setShowPrivacy(false);
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        {!consentSigned && (
          <ConsentModal />
        )}
        {showPrivacy && (
          <PrivacyOverlay onDismiss={onDismissPrivacy} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<ProtectedRoute><VerifyIdentity /></ProtectedRoute>} />
          <Route path="/consent" element={<ProtectedRoute><Consent /></ProtectedRoute>} />

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/listener/:id" element={<ListenerProfile />} />
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />

          <Route path="/messages" element={<ProtectedRoute><Messaging /></ProtectedRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardUser /></ProtectedRoute>} />
          <Route path="/listener/dashboard" element={<ProtectedRoute requireListener><DashboardListener /></ProtectedRoute>} />

          <Route path="/onboarding/apply" element={<ProtectedRoute><OnboardingApply /></ProtectedRoute>} />
          <Route path="/onboarding/training" element={<ProtectedRoute><OnboardingTraining /></ProtectedRoute>} />

          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <small className="muted">© {new Date().getFullYear()} Secure Support Marketplace</small>
            {/* Keep link for default CRA test */}
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
