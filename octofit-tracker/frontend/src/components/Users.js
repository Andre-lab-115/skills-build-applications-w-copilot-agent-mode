import React, { useCallback, useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const fetchUsers = useCallback(() => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    JSON.stringify(user).toLowerCase().includes(filterText.toLowerCase())
  );

  const tableHeaders = filteredUsers.length ? Object.keys(filteredUsers[0]) : [];

  return (
    <div className="card shadow-sm card-section">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="h4">Users</h2>
            <p className="text-muted mb-0">Endpoint: <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">{endpoint}</a></p>
          </div>
          <button className="btn btn-primary" onClick={fetchUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <form className="row g-2 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label htmlFor="userSearch" className="form-label visually-hidden">
              Search users
            </label>
            <input
              id="userSearch"
              type="search"
              className="form-control"
              placeholder="Search users..."
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

        {filteredUsers.length === 0 && !error ? (
          <div className="alert alert-info">No users found.</div>
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
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="table-row-clickable" onClick={() => setSelectedUser(user)}>
                    <th scope="row">{index + 1}</th>
                    {tableHeaders.map((header) => (
                      <td key={`${index}-${header}`}>
                        {typeof user[header] === 'object' ? JSON.stringify(user[header]) : user[header] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedUser && (
          <div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true" role="dialog">
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">User Details</h5>
                    <button type="button" className="btn-close" onClick={() => setSelectedUser(null)} aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
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

export default Users;
