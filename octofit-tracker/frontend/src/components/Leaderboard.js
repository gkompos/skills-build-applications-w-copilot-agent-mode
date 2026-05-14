import { useEffect, useState } from 'react';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Leaderboard data:', payload);
        setEntries(getItems(payload));
      } catch (loadError) {
        console.error('Leaderboard fetch error:', loadError);
        setError(loadError.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Leaderboard</h1>
      <p className="text-secondary">REST API endpoint: {endpoint}</p>

      {error ? <div className="alert alert-danger">Unable to load leaderboard: {error}</div> : null}

      <div className="table-responsive">
        <table className="table table-striped align-middle bg-white shadow-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Team</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.team ?? 'N/A'}</td>
                <td>{entry.points ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!error && entries.length === 0 ? (
        <div className="alert alert-light border mt-3 mb-0">No leaderboard entries returned by the API.</div>
      ) : null}
    </section>
  );
}