import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    claimantName: '',
    policyNumber: '',
    diagnosis: '',
    amount: ''
  });

  // 1. Define the API URL (Your Live Render Backend)
  const API_URL = "https://claim-backend-a5e4.onrender.com/api/claims";

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      // Updated to use live URL
      const response = await fetch(API_URL);
      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated to use live URL
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchClaims();
        setFormData({ claimantName: '', policyNumber: '', diagnosis: '', amount: '' });
        alert("✅ Claim Submitted Successfully!");
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>🏥 ClaimConnect <span className="badge">Admin</span></h1>
        <p>Enterprise Insurance Processing Portal</p>
      </header>
      
      <div className="content-wrapper">
        {/* LEFT SIDE: FORM */}
        <div className="card form-card">
          <div className="card-header">
            <h2>📝 New Submission</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>👤 Claimant Name</label>
              <input 
                type="text" 
                name="claimantName" 
                placeholder="e.g. John Doe"
                value={formData.claimantName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>🛡️ Policy Number</label>
              <input 
                type="text" 
                name="policyNumber" 
                placeholder="e.g. POL-998877"
                value={formData.policyNumber} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>🩺 Diagnosis</label>
              <input 
                type="text" 
                name="diagnosis" 
                placeholder="e.g. Viral Fever"
                value={formData.diagnosis} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>💰 Claim Amount ($)</label>
              <input 
                type="number" 
                name="amount" 
                placeholder="0.00"
                value={formData.amount} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">🚀 Submit Claim</button>
          </form>
        </div>

        {/* RIGHT SIDE: TABLE */}
        <div className="card list-card">
          <div className="card-header">
            <h2>📊 Claim History</h2>
            <span className="count-badge">{claims.length} Records</span>
          </div>
          
          <div className="table-container">
            {claims.length === 0 ? (
              <div className="empty-state">
                <p>📭 No claims found. Submit one to get started!</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Claimant</th>
                    <th>Policy</th>
                    <th>Diagnosis</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td>#{claim.id}</td>
                      <td className="fw-bold">{claim.claimantName}</td>
                      <td className="text-muted">{claim.policyNumber}</td>
                      <td>{claim.diagnosis}</td>
                      <td className="amount">${claim.amount}</td>
                      <td>
                        <span className="status-badge pending">{claim.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;