import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/Jobdetails.js";
import "./App.css";
function App() {
  return (
    <>
      <div className="bg-animated"></div>
      <div className="glow1"></div>
      <div className="glow2"></div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;