import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CitizenForm.css";

export default function CitizenForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    electorName: "",
    epic: "",
    gender: "",
    dob: "",
    fatherName: "",
    motherName: "",
    address: "",
    district: "",
    taluk: "",
    constituency: "",
    state: "",
    pincode: "",
    mobile: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/citizen/sir/submit", {
      ...form,
      status: "PENDING",
      submittedAt: new Date().toISOString()
    });

    localStorage.setItem("epic", form.epic);
    navigate("/status");
  };

  return (
    <div className="sir-page">
      <form className="sir-card" onSubmit={submit}>
        <h2>Citizen SIR Form</h2>

        <div className="sir-grid">
          <input name="electorName" placeholder="Elector Name" onChange={handleChange} />
          <input name="epic" placeholder="EPIC Number" onChange={handleChange} />

          <select name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
          </select>

          <input type="date" name="dob" onChange={handleChange} />

          <input name="fatherName" placeholder="Father Name" onChange={handleChange} />
          <input name="motherName" placeholder="Mother Name" onChange={handleChange} />

          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />

          <input className="full" name="address" placeholder="Address" onChange={handleChange} />

          <input name="district" placeholder="District" onChange={handleChange} />
          <input name="taluk" placeholder="Taluk" onChange={handleChange} />
          <input name="constituency" placeholder="Constituency" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
