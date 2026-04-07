const Explainability = () => {
  return (
    <div className="card">
      <h2>Explainability</h2>

      <button>Run Explainability</button>

      <div style={{ marginTop: "20px" }}>
        <p>Feature Importance Chart</p>
        <p>SHAP Summary Plot</p>
      </div>
    </div>
  );
};

export default Explainability;