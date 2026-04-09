import { useParams, useNavigate } from "react-router-dom";
import jobs from "../data";
import { useState } from "react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id == id);
  const [applied, setApplied] = useState(false);

  return (
    <div className="page">
      <div className="navbar">
        <h2>QuickHire</h2>
        <button className="btn" onClick={() => navigate("/jobs")}>
          Back
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
        <div className="glass" style={{ padding: "30px", width: "400px" }}>
          <h2>💻 {job.title}</h2>
          <h3>🏢 {job.company}</h3>
          <p>💰 {job.salary}</p>
          <p>📍 {job.type}</p>
          <p>{job.description}</p>

          <button className="btn" onClick={() => setApplied(true)}>
            Apply
          </button>

          {applied && <p style={{ marginTop: "10px" }}>✅ Applied Successfully</p>}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;