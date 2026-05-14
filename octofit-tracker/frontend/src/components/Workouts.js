import { useEffect, useState } from 'react';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Workouts data:', payload);
        setWorkouts(getItems(payload));
      } catch (loadError) {
        console.error('Workouts fetch error:', loadError);
        setError(loadError.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Workouts</h1>
      <p className="text-secondary">REST API endpoint: {endpoint}</p>

      {error ? <div className="alert alert-danger">Unable to load workouts: {error}</div> : null}

      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-12 col-lg-6" key={workout.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h4 card-title mb-3">{workout.name || `Workout ${workout.id}`}</h2>
                <p className="card-text mb-0">{workout.description || 'No description available.'}</p>
              </div>
            </article>
          </div>
        ))}
      </div>

      {!error && workouts.length === 0 ? (
        <div className="alert alert-light border mt-3 mb-0">No workouts returned by the API.</div>
      ) : null}
    </section>
  );
}