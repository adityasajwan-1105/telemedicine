import React from 'react';
import { useAuth } from '../context/AuthContext';

function PatientDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="container dashboard__header-inner">
          <div className="dashboard__brand">
            <h1>TeleMed</h1>
          </div>
          <nav className="dashboard__nav">
            <span className="dashboard__user">Welcome, {user?.name}</span>
            <button className="btn btn-text" onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      </header>

      <main className="dashboard__main">
        <div className="container">
          {/* Welcome Section */}
          <section className="dashboard__welcome">
            <h2>Welcome back, {user?.name}!</h2>
            <p>Your health is our priority. Book appointments, view prescriptions, and manage your health records.</p>
          </section>

          {/* Quick Actions */}
          <section className="dashboard__actions">
            <h3>Quick Actions</h3>
            <div className="actions__grid">
              <div className="action-card">
                <div className="action-card__icon">👨‍⚕️</div>
                <h4>Find a Doctor</h4>
                <p>Search and book appointments with licensed physicians</p>
                <button className="btn btn-primary">Browse Doctors</button>
              </div>
              <div className="action-card">
                <div className="action-card__icon">📅</div>
                <h4>My Appointments</h4>
                <p>View and manage your upcoming appointments</p>
                <button className="btn btn-outline">View Appointments</button>
              </div>
              <div className="action-card">
                <div className="action-card__icon">💊</div>
                <h4>Prescriptions</h4>
                <p>Access your e-prescriptions and medication history</p>
                <button className="btn btn-outline">View Prescriptions</button>
              </div>
              <div className="action-card">
                <div className="action-card__icon">📋</div>
                <h4>Health Records</h4>
                <p>View your medical history and health records</p>
                <button className="btn btn-outline">View Records</button>
              </div>
            </div>
          </section>

          {/* User Information */}
          <section className="dashboard__info">
            <h3>Your Information</h3>
            <div className="info__card">
              <div className="info__row">
                <span className="info__label">Name:</span>
                <span className="info__value">{user?.name}</span>
              </div>
              <div className="info__row">
                <span className="info__label">Email:</span>
                <span className="info__value">{user?.email}</span>
              </div>
              {user?.phone && (
                <div className="info__row">
                  <span className="info__label">Phone:</span>
                  <span className="info__value">{user.phone}</span>
                </div>
              )}
              {user?.address && (
                <div className="info__row">
                  <span className="info__label">Address:</span>
                  <span className="info__value">{user.address}</span>
                </div>
              )}
              {user?.gender && (
                <div className="info__row">
                  <span className="info__label">Gender:</span>
                  <span className="info__value">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span>
                </div>
              )}
            </div>
          </section>

          {/* Features from Landing Page */}
          <section className="dashboard__features">
            <h3>Why Choose TeleMed?</h3>
            <div className="features__grid">
              <div className="feature">
                <div className="feature__icon">🔒</div>
                <h4>Private & Secure</h4>
                <p>End‑to‑end encrypted sessions keep your health data safe.</p>
              </div>
              <div className="feature">
                <div className="feature__icon">⚡</div>
                <h4>Fast Access</h4>
                <p>Connect with a doctor in minutes, 24/7 from any device.</p>
              </div>
              <div className="feature">
                <div className="feature__icon">💊</div>
                <h4>e‑Prescriptions</h4>
                <p>Get prescriptions sent directly to your preferred pharmacy.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;

