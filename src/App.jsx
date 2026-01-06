import { BrowserRouter, Routes, Route } from "react-router-dom";

import CitizenForm from "./pages/CitizenForm";
import CitizenStatus from "./pages/CitizenStatus";
import VaoDashboard from "./pages/VaoDashboard";
import VaoLogin from "./pages/VaoLogin";     // ✅ ADD
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import ThankYou from "./pages/ThankYou";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="main-content">
        <Routes>
          {/* Citizen */}
          <Route path="/" element={<CitizenForm />} />
          <Route path="/status" element={<CitizenStatus />} />

          {/* VAO */}
          <Route path="/vao-login" element={<VaoLogin />} />   {/* ✅ ADD */}
          <Route path="/vao" element={<VaoDashboard />} />

          {/* Voting */}
          <Route path="/vote" element={<Vote />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Results */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
