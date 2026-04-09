import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobs from "../data";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="navbar">
        <h2>QuickHire</h2>
        <button className="btn" onClick={() => navigate("/jobs")}>
          Jobs
        </button>
      </div>

      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <h1 style={{ fontSize: "40px" }}>🚀 Find Your Dream Job</h1>
        <p style={{ opacity: 0.8 }}>
          Discover top companies and opportunities instantly
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px"
        }}
      >
        <div className="glass" style={{ padding: "30px", width: "350px", textAlign: "center" }}>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
          />

          {search && (
            <div style={{ marginTop: "10px", background: "rgba(0,0,0,0.5)", borderRadius: "10px" }}>
              {filtered.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/job/${job.id}`)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {job.title}
                </div>
              ))}
            </div>
          )}

          <button
            className="btn"
            style={{ marginTop: "15px" }}
            onClick={() => navigate(`/jobs?search=${search}`)}
          >
            Search
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "50px",
          flexWrap: "wrap"
        }}
      >
        <div className="glass" style={{ padding: "20px", width: "200px", textAlign: "center" }}>
          <h3>⚡ Fast Search</h3>
          <p>Find jobs instantly</p>
        </div>

        <div className="glass" style={{ padding: "20px", width: "200px", textAlign: "center" }}>
          <h3>🌐 Remote Jobs</h3>
          <p>Work from anywhere</p>
        </div>

        <div className="glass" style={{ padding: "20px", width: "200px", textAlign: "center" }}>
          <h3>💼 Top Companies</h3>
          <p>Trusted employers</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Top Companies</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
            flexWrap: "wrap"
          }}
        >
          {[
            "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
            "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
          ].map((logo, i) => (
            <div
              key={i}
              style={{
                width: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)"
              }}
            >
              <img
                src={logo}
                style={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                  objectFit: "contain",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;