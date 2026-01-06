import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADD
import api from "../api/api";
import "./VaoDashboard.css";

export default function VaoDashboard() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();                 // ✅ ADD

  // 🔐 FRONTEND LOGIN PROTECTION
  useEffect(() => {
    const loggedIn = localStorage.getItem("vaoLoggedIn");
    if (!loggedIn) {
      navigate("/vao-login");                     // ✅ REDIRECT
    }
  }, [navigate]);

  const load = () => {
    api.get("/vao/pending").then((res) => setList(res.data));
  };

  useEffect(load, []);

  const approve = async (id) => {
    await api.post(`/vao/approve/${id}`);
    load();
  };

  const reject = async (id) => {
    await api.post(`/vao/reject/${id}`);
    load();
  };

  return (
    <div className="vao-page">
      <h2 className="vao-title">VAO Dashboard</h2>

      {list.length === 0 && (
        <p className="empty">No pending SIR applications</p>
      )}

      <div className="vao-list">
        {list.map((f) => (
          <div className="vao-card" key={f.id}>
            <div className="card-header">
              <h3>{f.electorName}</h3>
              <span className="epic">EPIC: {f.epic}</span>
            </div>

            <div className="card-body">
              <div><strong>Gender:</strong> {f.gender}</div>
              <div><strong>DOB:</strong> {f.dob}</div>
              <div><strong>Father:</strong> {f.fatherName}</div>
              <div><strong>Mother:</strong> {f.motherName}</div>
              <div><strong>Mobile:</strong> {f.mobile}</div>
              <div><strong>Email:</strong> {f.email}</div>

              <div className="full">
                <strong>Address:</strong> {f.address}
              </div>

              <div><strong>District:</strong> {f.district}</div>
              <div><strong>Taluk:</strong> {f.taluk}</div>
              <div><strong>Constituency:</strong> {f.constituency}</div>
              <div><strong>State:</strong> {f.state}</div>
              <div><strong>Pincode:</strong> {f.pincode}</div>
            </div>

            <div className="card-actions">
              <button
                className="approve-btn"
                onClick={() => approve(f.id)}
              >
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => reject(f.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
