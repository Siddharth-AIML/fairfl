import { useState } from "react";

const ClientSubmission = () => {
  const [form, setForm] = useState({
    clientId: "",
    samples: "",
    dp: "",
    group0Acc: "",
    group1Acc: ""
  });

  const handleSubmit = () => {
    console.log("Submitting:", form);
  };

  return (
    <div className="card submission-card">
      <h2>Client Submission</h2>

      <div className="form-group">
        <label>Client ID</label>
        <input
          placeholder="Enter Client ID"
          onChange={(e) => setForm({...form, clientId: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Model File (.pt)</label>
        <input type="file" accept=".pt" className="file-input" />
      </div>

      <div className="form-group">
        <label>Number of Samples</label>
        <input
          type="number"
          placeholder="e.g. 1000"
          onChange={(e) => setForm({...form, samples: e.target.value})}
        />
      </div>

      <h3 className="section-title">Fairness Metrics</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Demographic Parity</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            onChange={(e) => setForm({...form, dp: e.target.value})}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Group 0 Accuracy</label>
          <input placeholder="0.00" />
        </div>
        <div className="form-group">
          <label>Group 1 Accuracy</label>
          <input placeholder="0.00" />
        </div>
      </div>

      <button className="primary-btn" onClick={handleSubmit}>Submit Data</button>
    </div>
  );
};

export default ClientSubmission;