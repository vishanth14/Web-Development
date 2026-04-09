import jobs from "../data";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Jobs() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialSearch = query.get("search") || "";

  const [search, setSearch] = useState(initialSearch.toLowerCase());
  const [filter, setFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const t = filter === "All" || job.type === filter;
    const s = job.title.toLowerCase().includes(search);
    return t && s;
  });

  return (
    <div className="page">
      <div className="navbar">
        <h2>QuickHire</h2>
        <button className="btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div style={{ padding: "30px" }}>
        <h1 style={{ textAlign: "center" }}>💼 Jobs</h1>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="🔍 Live search..."
            style={{ width: "250px" }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {["All", "Remote", "Full-Time"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className="btn"
              style={{
                margin: "5px",
                background: filter === type ? "#00ffd5" : "#444",
                color: filter === type ? "black" : "white"
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {filteredJobs.map((job) => (
            <div key={job.id} className="glass" style={{ padding: "20px" }}>
              <h3>💻 {job.title}</h3>
              <p>🏢 {job.company}</p>
              <p>💰 {job.salary}</p>

              <Link to={`/job/${job.id}`} style={{ color: "#00ffd5" }}>
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;