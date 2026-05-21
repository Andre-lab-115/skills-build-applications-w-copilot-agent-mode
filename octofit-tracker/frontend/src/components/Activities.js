import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities response data:', data);
        const results = Array.isArray(data) ? data : data.results ?? data;
        setActivities(results);
      })
      .catch((fetchError) => {
        console.error('Activities fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <p className="text-muted">Fetching from: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {activities.length === 0 && !error ? (
        <div className="alert alert-info">No activities found.</div>
      ) : (
        <div className="list-group">
          {activities.map((activity, index) => (
            <div key={index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(activity, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
