import { useEffect, useState } from 'react';
import { API_BASE_URL, fetchCollection } from '../api';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/api/teams/`;

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(teamsEndpoint)
      .then(setTeams)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <p className="loading-state">Loading teams...</p>;
  if (status.error) return <p className="alert alert-danger">{status.error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Find your pace</p><h1>Teams</h1></div><span className="count-badge">{teams.length} squads</span></div>
      <div className="data-grid team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team._id || team.id || team.name}>
            <div className="team-mark">{(team.name || 'T').slice(0, 2).toUpperCase()}</div>
            <h2>{team.name}</h2><p>{team.members?.length ?? 0} members</p>
            <div className="member-stack">{(team.members || []).slice(0, 5).map((member, index) => <span key={member._id || member.id || index}>{(member.displayName || member.username || '?').slice(0, 1)}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
