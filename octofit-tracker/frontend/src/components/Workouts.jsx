import { useEffect, useState } from 'react';
import { API_BASE_URL, fetchCollection } from '../api';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/api/workouts/`;

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then(setWorkouts)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <p className="loading-state">Loading workouts...</p>;
  if (status.error) return <p className="alert alert-danger">{status.error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      <div className="workout-grid">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout._id || workout.id || workout.title}>
            <div className="workout-top"><span className={`category ${workout.category}`}>{workout.category}</span><span>{workout.intensity} intensity</span></div>
            <h2>{workout.title}</h2><p>{workout.description}</p>
            <footer><strong>{workout.durationMinutes} min</strong><span>Start plan <span aria-hidden="true">↗</span></span></footer>
          </article>
        ))}
      </div>
    </section>
  );
}
