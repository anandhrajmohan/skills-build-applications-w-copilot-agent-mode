import { useEffect, useState } from 'react';
import { API_BASE_URL, fetchCollection } from '../api';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${API_BASE_URL}/api/activities/`;

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then(setActivities)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <p className="loading-state">Loading activity feed...</p>;
  if (status.error) return <p className="alert alert-danger">{status.error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Move more</p><h1>Activity feed</h1></div><span className="count-badge">{activities.length} logged</span></div>
      <div className="table-wrap"><table><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Energy</th><th>Date</th></tr></thead><tbody>
        {activities.map((activity) => (
          <tr key={activity._id || activity.id || `${activity.activityType}-${activity.performedAt}`}>
            <td><span className="activity-dot" />{activity.activityType}</td>
            <td>{activity.user?.displayName || activity.user?.username || 'Athlete'}</td>
            <td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned} kcal</td>
            <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : 'Recent'}</td>
          </tr>
        ))}
      </tbody></table></div>
    </section>
  );
}
