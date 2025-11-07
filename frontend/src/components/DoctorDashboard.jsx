import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function DoctorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');

  // Mock data for appointments (will be replaced with API calls later)
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-01-15',
      time: '10:00 AM',
      reason: 'General Checkup',
      status: 'pending'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-01-15',
      time: '2:30 PM',
      reason: 'Follow-up Consultation',
      status: 'pending'
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      date: '2024-01-16',
      time: '11:00 AM',
      reason: 'Prescription Review',
      status: 'confirmed'
    }
  ]);

  // Mock data for patients (will be replaced with API calls later)
  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      lastVisit: '2024-01-10',
      totalVisits: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      lastVisit: '2024-01-08',
      totalVisits: 3
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
      lastVisit: '2024-01-05',
      totalVisits: 8
    }
  ]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleAppointmentAction = (appointmentId, action) => {
    // TODO: Implement API call to accept/reject appointments
    console.log(`${action} appointment ${appointmentId}`);
    alert(`Appointment ${action} successfully!`);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="container dashboard__header-inner">
          <div className="dashboard__brand">
            <h1>TeleMed</h1>
          </div>
          <nav className="dashboard__nav">
            <span className="dashboard__user">Welcome, Dr. {user?.name}</span>
            <button className="btn btn-text" onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      </header>

      <main className="dashboard__main">
        <div className="container">
          {/* Welcome Section */}
          <section className="dashboard__welcome">
            <h2>Welcome back, Dr. {user?.name}!</h2>
            <p>Manage your appointments, patients, and consultations from one place.</p>
          </section>

          {/* Tabs Navigation */}
          <section className="dashboard__tabs">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'appointments' ? 'tab--active' : ''}`}
                onClick={() => setActiveTab('appointments')}
              >
                📅 Appointment Requests
              </button>
              <button
                className={`tab ${activeTab === 'patients' ? 'tab--active' : ''}`}
                onClick={() => setActiveTab('patients')}
              >
                👥 My Patients
              </button>
              <button
                className={`tab ${activeTab === 'schedule' ? 'tab--active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                📋 My Schedule
              </button>
            </div>
          </section>

          {/* Appointment Requests Tab */}
          {activeTab === 'appointments' && (
            <section className="dashboard__appointments">
              <h3>Appointment Requests</h3>
              <div className="appointments__list">
                {appointments.length === 0 ? (
                  <div className="empty-state">
                    <p>No appointment requests at the moment.</p>
                  </div>
                ) : (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-card">
                      <div className="appointment-card__header">
                        <div>
                          <h4>{appointment.patientName}</h4>
                          <p className="appointment-card__reason">{appointment.reason}</p>
                        </div>
                        <span className={`appointment-card__status appointment-card__status--${appointment.status}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="appointment-card__details">
                        <div className="appointment-card__detail">
                          <span className="detail-icon">📅</span>
                          <span>{appointment.date}</span>
                        </div>
                        <div className="appointment-card__detail">
                          <span className="detail-icon">🕐</span>
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      {appointment.status === 'pending' && (
                        <div className="appointment-card__actions">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* My Patients Tab */}
          {activeTab === 'patients' && (
            <section className="dashboard__patients">
              <h3>My Patients</h3>
              <div className="patients__table-wrapper">
                <table className="patients__table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Last Visit</th>
                      <th>Total Visits</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="empty-state">
                          No patients yet.
                        </td>
                      </tr>
                    ) : (
                      patients.map((patient) => (
                        <tr key={patient.id}>
                          <td>{patient.name}</td>
                          <td>{patient.email}</td>
                          <td>{patient.phone}</td>
                          <td>{patient.lastVisit}</td>
                          <td>{patient.totalVisits}</td>
                          <td>
                            <button className="btn btn-text" style={{ fontSize: '0.85rem' }}>
                              View Records
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* My Schedule Tab */}
          {activeTab === 'schedule' && (
            <section className="dashboard__schedule">
              <h3>My Schedule</h3>
              <div className="schedule__calendar">
                <div className="schedule__day">
                  <h4>Today - {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                  <div className="schedule__slots">
                    {appointments.filter(apt => apt.status === 'confirmed').map((appointment) => (
                      <div key={appointment.id} className="schedule__slot">
                        <span className="schedule__time">{appointment.time}</span>
                        <span className="schedule__patient">{appointment.patientName}</span>
                        <span className="schedule__reason">{appointment.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Doctor Information */}
          <section className="dashboard__info">
            <h3>Your Profile</h3>
            <div className="info__card">
              <div className="info__row">
                <span className="info__label">Name:</span>
                <span className="info__value">Dr. {user?.name}</span>
              </div>
              <div className="info__row">
                <span className="info__label">Email:</span>
                <span className="info__value">{user?.email}</span>
              </div>
              {user?.specialization && (
                <div className="info__row">
                  <span className="info__label">Specialization:</span>
                  <span className="info__value">{user.specialization.charAt(0).toUpperCase() + user.specialization.slice(1)}</span>
                </div>
              )}
              {user?.hospital && (
                <div className="info__row">
                  <span className="info__label">Hospital/Clinic:</span>
                  <span className="info__value">{user.hospital}</span>
                </div>
              )}
              {user?.yearsOfExperience && (
                <div className="info__row">
                  <span className="info__label">Experience:</span>
                  <span className="info__value">{user.yearsOfExperience} years</span>
                </div>
              )}
              {user?.consultationFee && (
                <div className="info__row">
                  <span className="info__label">Consultation Fee:</span>
                  <span className="info__value">${user.consultationFee}</span>
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
                <p>End‑to‑end encrypted sessions keep patient health data safe.</p>
              </div>
              <div className="feature">
                <div className="feature__icon">⚡</div>
                <h4>Fast Access</h4>
                <p>Connect with patients in minutes, 24/7 from any device.</p>
              </div>
              <div className="feature">
                <div className="feature__icon">💊</div>
                <h4>e‑Prescriptions</h4>
                <p>Send prescriptions directly to patient's preferred pharmacy.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DoctorDashboard;

