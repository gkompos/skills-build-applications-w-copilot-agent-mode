import { useEffect, useState } from 'react';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Teams data:', payload);
        setTeams(getItems(payload));
      } catch (loadError) {
        console.error('Teams fetch error:', loadError);
        setError(loadError.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Teams</h1>
      <p className="text-secondary">REST API endpoint: {endpoint}</p>

      {error ? <div className="alert alert-danger">Unable to load teams: {error}</div> : null}

      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-12 col-md-6 col-xl-4" key={team.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h4 card-title mb-2">{team.name || 'Unnamed team'}</h2>
                <p className="text-secondary mb-0">Team ID: {team.id}</p>
              </div>
            </article>
          </div>
        ))}
      </div>

      {!error && teams.length === 0 ? (
        <div className="alert alert-light border mt-3 mb-0">No teams returned by the API.</div>
      ) : null}
    </section>
  );
}