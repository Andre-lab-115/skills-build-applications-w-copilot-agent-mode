import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams response data:', data);
        const results = Array.isArray(data) ? data : data.results ?? data;
        setTeams(results);
      })
      .catch((fetchError) => {
        console.error('Teams fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      <p className="text-muted">Fetching from: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {teams.length === 0 && !error ? (
        <div className="alert alert-info">No teams found.</div>
      ) : (
        <div className="list-group">
          {teams.map((team, index) => (
            <div key={index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(team, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
