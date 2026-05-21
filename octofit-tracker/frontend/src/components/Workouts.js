import React, { useCallback, useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const fetchWorkouts = useCallback(() => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const filteredWorkouts = workouts.filter((workout) =>
    JSON.stringify(workout).toLowerCase().includes(filterText.toLowerCase())
  );

  const tableHeaders = filteredWorkouts.length ? Object.keys(filteredWorkouts[0]) : [];

  return (
    <div className="card shadow-sm card-section">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="h4">Workouts</h2>
            <p className="text-muted mb-0">Endpoint: <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">{endpoint}</a></p>
          </div>
          <button className="btn btn-primary" onClick={fetchWorkouts} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <form className="row g-2 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label htmlFor="workoutSearch" className="form-label visually-hidden">
              Search workouts
            </label>
            <input
              id="workoutSearch"
              type="search"
              className="form-control"
              placeholder="Search workouts..."
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-secondary" onClick={() => setFilterText('')}>
              Clear
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {filteredWorkouts.length === 0 && !error ? (
          <div className="alert alert-info">No workouts found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  {tableHeaders.map((header) => (
                    <th scope="col" key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map((workout, index) => (
                  <tr key={index} className="table-row-clickable" onClick={() => setSelectedWorkout(workout)}>
                    <th scope="row">{index + 1}</th>
                    {tableHeaders.map((header) => (
                      <td key={`${index}-${header}`}>
                        {typeof workout[header] === 'object' ? JSON.stringify(workout[header]) : workout[header] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedWorkout && (
          <div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true" role="dialog">
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Workout Details</h5>
                    <button type="button" className="btn-close" onClick={() => setSelectedWorkout(null)} aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <pre>{JSON.stringify(selectedWorkout, null, 2)}</pre>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedWorkout(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
