const TrainingMonitor = () => {
  return (
    <div>
      <h2>Training Monitor</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div className="card">Total Clients: 5</div>
        <div className="card">Submitted: 2</div>
        <div className="card">Round: 1</div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h4>Progress</h4>
        <progress value="2" max="5"></progress>
      </div>

      <table className="card">
        <thead>
          <tr>
            <th>Client</th>
            <th>Status</th>
            <th>Samples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Client 1</td>
            <td>Submitted</td>
            <td>1200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainingMonitor;