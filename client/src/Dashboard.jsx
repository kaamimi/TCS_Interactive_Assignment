import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          logout();
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then((json) => json && setData(json))
      .catch(() => setError('Failed to load dashboard'));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="center">Loading...</p>;

    if (error) return <div className="center"><p className="error">{error}</p></div>;
  if (!data) return <div className="center"><p className="subtitle">Loading...</p></div>;

  return (
    <div className="page-shell">
      <nav className="navbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-label="Operations dashboard logo">
            <span></span>
          </div>
          <h1 className="page-title">Operations Dashboard</h1>
        </div>

        <div className="nav-right">
          <div className="avatar">{data.user.name[0]}</div>
          <div className="user-meta">
            <span className="user-name">{data.user.name}</span>
            <span className="email">{data.user.email}</span>
          </div>
          <button className="secondary" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard">
        <section className="stats">
          {data.stats.map((s) => (
            <div className="stat" key={s.label}>
              <p className="label">{s.label}</p>
              <p className="value">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="summary-panel">
          <div className="summary-copy">
            <span className="summary-kicker">Overview</span>
            <h2>Current operational health is stable and delivery remains on schedule.</h2>
          </div>
          <div className="summary-metrics">
            <div>
              <span className="metric-label">Delivery</span>
              <strong>92%</strong>
            </div>
            <div>
              <span className="metric-label">Risk level</span>
              <strong>Low</strong>
            </div>
            <div>
              <span className="metric-label">Next review</span>
              <strong>Friday</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}