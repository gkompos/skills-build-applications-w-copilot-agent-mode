import { useEffect, useState } from 'react';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Users data:', payload);
        setUsers(getItems(payload));
      } catch (loadError) {
        console.error('Users fetch error:', loadError);
        setError(loadError.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Users</h1>
      <p className="text-secondary">REST API endpoint: {endpoint}</p>

      {error ? <div className="alert alert-danger">Unable to load users: {error}</div> : null}

      <div className="row g-3">
        {users.map((user) => (
          <div className="col-12 col-lg-6" key={user.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 card-title mb-3">{user.username || user.email || `User ${user.id}`}</h2>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Email</dt>
                  <dd className="col-sm-8">{user.email || 'N/A'}</dd>
                  <dt className="col-sm-4">Team</dt>
                  <dd className="col-sm-8">{user.team ?? 'N/A'}</dd>
                  <dt className="col-sm-4">First name</dt>
                  <dd className="col-sm-8">{user.first_name || 'N/A'}</dd>
                  <dt className="col-sm-4">Last name</dt>
                  <dd className="col-sm-8">{user.last_name || 'N/A'}</dd>
                </dl>
              </div>
            </article>
          </div>
        ))}
      </div>

      {!error && users.length === 0 ? (
        <div className="alert alert-light border mt-3 mb-0">No users returned by the API.</div>
      ) : null}
    </section>
  );
}