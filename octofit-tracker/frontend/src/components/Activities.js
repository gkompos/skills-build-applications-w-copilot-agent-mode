import { useEffect, useState } from 'react';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Activities data:', payload);
        setActivities(getItems(payload));
      } catch (loadError) {
        console.error('Activities fetch error:', loadError);
        setError(loadError.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Activities</h1>
      <p className="text-secondary">REST API endpoint: {endpoint}</p>

      {error ? <div className="alert alert-danger">Unable to load activities: {error}</div> : null}

      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-12 col-lg-6" key={activity.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 card-title mb-3">{activity.type || 'Activity'}</h2>
                <dl className="row mb-0">
                  <dt className="col-sm-4">User</dt>
                  <dd className="col-sm-8">{activity.user ?? 'N/A'}</dd>
                  <dt className="col-sm-4">Duration</dt>
                  <dd className="col-sm-8">{activity.duration ?? 'N/A'} min</dd>
                  <dt className="col-sm-4">Distance</dt>
                  <dd className="col-sm-8">{activity.distance ?? 'N/A'} km</dd>
                  <dt className="col-sm-4">Timestamp</dt>
                  <dd className="col-sm-8">{activity.timestamp || 'N/A'}</dd>
                </dl>
              </div>
            </article>
          </div>
        ))}
      </div>

      {!error && activities.length === 0 ? (
        <div className="alert alert-light border mt-3 mb-0">No activities returned by the API.</div>
      ) : null}
    </section>
  );
}