import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Vote.css";

export default function Vote() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);

  const constituency = "Chennai Central";

  const parties = [
    { name: "Party A", color: "blue" },
    { name: "Party B", color: "green" },
    { name: "Party C", color: "orange" }
  ];

  const vote = async (party) => {
    try {
      await api.post("/vote/cast", null, {
        params: {
          token,
          candidate: party,
          constituency,
        },
      });

      setVoted(true);

      // ✅ Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/thank-you");
      }, 1500);

    } catch {
      alert("You have already voted or token is invalid");
    }
  };

  return (
    <div className="vote-page">
      <div className="vote-card">
        <h2>Cast Your Vote</h2>

        <p className="warning">
          You can vote only once. This action cannot be undone.
        </p>

        <div className="party-list">
          {parties.map((p) => (
            <button
              key={p.name}
              className={`party-btn ${p.color}`}
              onClick={() => vote(p.name)}
              disabled={voted}
            >
              {p.name}
            </button>
          ))}
        </div>

        {voted && (
          <p className="success">
            ✅ Your vote has been recorded successfully.
          </p>
        )}
      </div>
    </div>
  );
}
