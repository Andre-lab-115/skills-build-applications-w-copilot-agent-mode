import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard response data:', data);
        const results = Array.isArray(data) ? data : data.results ?? data;
        setEntries(results);
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">Fetching from: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {entries.length === 0 && !error ? (
        <div className="alert alert-info">No leaderboard entries found.</div>
      ) : (
        <div className="list-group">
          {entries.map((entry, index) => (
            <div key={index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(entry, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
