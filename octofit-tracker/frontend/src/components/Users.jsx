import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection('users')
      .then((data) => setUsers(data))
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <p className="loading-state">Loading members...</p>;
  if (status.error) return <p className="alert alert-danger">{status.error}</p>;

  return (
    <section>
      <div className="section-heading">
        <div><p className="eyebrow">Community</p><h1>Members</h1></div>
        <span className="count-badge">{users.length} active</span>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id || user.id || user.username}>
            <div className="avatar">{(user.displayName || user.username || '?').slice(0, 1).toUpperCase()}</div>
            <div><h2>{user.displayName || user.username}</h2><p>@{user.username}</p></div>
            <strong>{user.points ?? 0} pts</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
