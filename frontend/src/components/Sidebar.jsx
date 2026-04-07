import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>FairFL</h2>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/submit">Client Submission</Link></li>
        <li><Link to="/training">Training Monitor</Link></li>
        <li><Link to="/fairness">Fairness Analysis</Link></li>
        <li><Link to="/explain">Explainability</Link></li>

        {/* External redirect */}
        <li>
          <a href="http://localhost:8501" target="_blank">
            Bias Debug
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;