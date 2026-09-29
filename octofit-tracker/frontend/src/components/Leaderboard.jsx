import { useEffect, useState } from 'react';
import { API_BASE_URL, fetchCollection } from '../api';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/api/leaderboard/`;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then(setEntries)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <p className="loading-state">Loading leaderboard...</p>;
  if (status.error) return <p className="alert alert-danger">{status.error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">September 2026</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} ranked</span></div>
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className={`rank-row rank-${index + 1}`} key={entry._id || entry.id || `${entry.user?._id}-${entry.period}`}>
            <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="avatar small">{(entry.user?.displayName || entry.user?.username || 'A').slice(0, 1).toUpperCase()}</div>
            <div className="rank-name"><strong>{entry.user?.displayName || entry.user?.username || 'Athlete'}</strong><span>{entry.team?.name || 'Independent'}</span></div>
            <strong className="points">{entry.points} <small>PTS</small></strong>
          </article>
        ))}
      </div>
    </section>
  );
}
