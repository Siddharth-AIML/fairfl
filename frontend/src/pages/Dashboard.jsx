import Card from "../components/Card";

const Dashboard = () => {
  const totalClients = 5;
  const submitted = 3;
  const round = 1;
  const status = "Running";

  const clients = [
    { id: "Client 1", status: "Submitted", samples: 1200 },
    { id: "Client 2", status: "Submitted", samples: 900 },
    { id: "Client 3", status: "Pending", samples: "-" },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Dashboard Overview</h2>

      {/* 🔹 Global Controls (From your screenshot) */}
      <div className="card controls-card">
        <h3>Global Controls</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Fairness Threshold</label>
            <input type="text" placeholder="e.g. 0.1" />
          </div>
          <div className="form-group">
            <label>Rounds</label>
            <input type="number" placeholder="10" />
          </div>
        </div>
        <div className="btn-group">
          <button className="primary-btn">Start Training</button>
          <button className="secondary-btn">Stop</button>
        </div>
      </div>

      {/* 🔹 Top Metric Grid */}
      <div className="metrics-grid">
        <Card title="Total Clients" value={totalClients} icon="👥" />
        <Card title="Submitted" value={submitted} icon="✅" />
        <Card title="Round" value={round} icon="🔄" />
        <Card title="Status" value={status} variant="success" />
      </div>

      <div className="dashboard-main-grid">
        {/* 🔹 Client Activity Table */}
        <div className="card table-card">
          <h3>Client Activity</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Status</th>
                  <th>Samples</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr key={i}>
                    <td>{c.id}</td>
                    <td>
                      <span className={`badge ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.samples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔹 Training Progress */}
        <div className="card progress-card">
          <h3>Training Progress</h3>
          <div className="progress-info">
            <span>Client Submissions</span>
            <span>{submitted} / {totalClients}</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-fill" 
              style={{ width: `${(submitted / totalClients) * 100}%` }}
            ></div>
          </div>
          <div className="snapshot-box">
             <h4>Fairness Snapshot</h4>
             <p>Global DP: <strong>0.82</strong></p>
             <p className="warning-text">⚠ Worst: Client 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;