import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CitizenStatus.css";

export default function CitizenStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const epic = localStorage.getItem("epic");
  const navigate = useNavigate();

  useEffect(() => {
    if (!epic) {
      setError("EPIC not found. Please submit SIR form first.");
      return;
    }

    api
      .get(`/citizen/status/${epic}`)
      .then((res) => {
        setData(res.data);
        if (res.data.status === "APPROVED") {
          localStorage.setItem("token", res.data.votingToken);
        }
      })
      .catch(() => {
        setError("No SIR record found for this EPIC");
      });
  }, [epic]);

  if (error) {
    return (
      <div className="status-page">
        <div className="status-card error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="status-page">
        <div className="status-card">
          <p className="loading">Loading status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-page">
      <div className="status-card">
        <h2>Application Status</h2>

        <div className={`status-badge ${data.status.toLowerCase()}`}>
          {data.status}
        </div>

        {data.status === "PENDING" && (
          <p className="status-text">
            Your application is under verification.<br />
            Please wait for VAO approval.
          </p>
        )}

        {data.status === "REJECTED" && (
          <p className="status-text rejected">
            Your application has been rejected.
          </p>
        )}

        {data.status === "APPROVED" && (
          <>
            <p className="status-text approved">
              Your application is approved.
            </p>

            <div className="token-box">
              <span>Voting Token</span>
              <strong>{data.votingToken}</strong>
            </div>

            <button
              className="vote-btn"
              onClick={() => navigate("/vote")}
            >
              Proceed to Vote
            </button>
          </>
        )}
      </div>
    </div>
  );
}
