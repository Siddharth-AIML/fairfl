const FairnessAnalysis = () => {
  return (
    <div>
      <h2>Fairness Analysis</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div className="card">Global DP: 0.82</div>
        <div className="card">Worst Client: Client 3</div>
        <div className="card">Avg Accuracy: 91%</div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        ⚠ Client 3 has highest bias
      </div>

      <button>Open Bias Debug</button>
    </div>
  );
};

export default FairnessAnalysis;