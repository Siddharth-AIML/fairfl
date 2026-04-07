const Topbar = () => {
  return (
    <div className="card topbar">
      <h3>Global Controls</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Fairness Threshold</label>
          <input type="number" step="0.1" min="0" max="1" />
        </div>

        <div className="form-group">
          <label>Rounds</label>
          <input type="number" />
        </div>
      </div>

      <div className="btn-group">
        <button>Start Training</button>
        <button className="secondary">Stop</button>
      </div>
    </div>
  );
};

export default Topbar;