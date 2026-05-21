import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

import "./styles.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">
            <button>🏠 Home</button>
          </Link>

          <Link to="/dashboard">
            <button>📊 Dashboard</button>
          </Link>

          <Link to="/history">
            <button>📈 Analytics</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;