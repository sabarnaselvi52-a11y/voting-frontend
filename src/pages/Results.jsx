import { useEffect, useState } from "react";
import api from "../api/api";
import "./Results.css";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results").then((res) => setResults(res.data));
  }, []);

  if (!results.length) {
    return <p className="loading">Loading results...</p>;
  }

  // Find winner
  const maxVotes = Math.max(...results.map(r => r[1]));
  const winner = results.find(r => r[1] === maxVotes);

  return (
    <div className="results-page">
      <div className="results-card">
        <h2>Election Results</h2>

        <div className="results-grid">
          {results.map((r, i) => (
            <div
              key={i}
              className={`result-box ${r[1] === maxVotes ? "winner" : ""}`}
            >
              <h3>{r[0]}</h3>
              <p className="votes">{r[1]} Votes</p>

              {r[1] === maxVotes && (
                <span className="winner-badge">🏆 Leading</span>
              )}
            </div>
          ))}
        </div>

        <div className="summary">
          <strong>Leading Party:</strong> {winner[0]} ({winner[1]} votes)
        </div>
      </div>
    </div>
  );
}
