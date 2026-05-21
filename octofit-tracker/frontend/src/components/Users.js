import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users response data:', data);
        const results = Array.isArray(data) ? data : data.results ?? data;
        setUsers(results);
      })
      .catch((fetchError) => {
        console.error('Users fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      <p className="text-muted">Fetching from: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length === 0 && !error ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <div className="list-group">
          {users.map((user, index) => (
            <div key={index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(user, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
