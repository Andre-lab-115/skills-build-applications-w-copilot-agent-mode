import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts response data:', data);
        const results = Array.isArray(data) ? data : data.results ?? data;
        setWorkouts(results);
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      <p className="text-muted">Fetching from: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {workouts.length === 0 && !error ? (
        <div className="alert alert-info">No workouts found.</div>
      ) : (
        <div className="list-group">
          {workouts.map((workout, index) => (
            <div key={index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(workout, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
