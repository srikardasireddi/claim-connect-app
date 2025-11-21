import { useState, useEffect } from 'react';

function App() {
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    claimantName: '',
    policyNumber: '',
    diagnosis: '',
    amount: ''
  });

  // 🔴 LIVE Backend URL (Render)
  const API_URL = "https://claim-backend-a5e4.onrender.com/api/claims";

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
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
    <>
      <style>{`
        :root {
          --primary-color: #4f46e5;
          --primary-hover: #4338ca;
          --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --card-bg: rgba(255, 255, 255, 0.95);
          --text-dark: #1f2937;
          --text-light: #6b7280;
        }
        body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: var(--bg-gradient);
          min-height: 100vh;
          margin: 0;
          color: var(--text-dark);
        }
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        /* HEADER */
        .main-header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }
        .main-header h1 {
          font-size: 2.5rem;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .main-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        .badge {
          background: #fbbf24;
          color: #78350f;
          font-size: 0.5em;
          padding: 5px 10px;
          border-radius: 20px;
          vertical-align: middle;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        /* LAYOUT */
        .content-wrapper {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
        }
        /* CARDS */
        .card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
        }
        .form-card {
          flex: 1;
          border-top: 5px solid var(--primary-color);
        }
        .list-card {
          flex: 2;
          border-top: 5px solid #10b981;
          min-height: 400px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }
        .card-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-dark);
        }
        /* FORM ELEMENTS */
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #000000; /* Force Label Black */
          font-size: 0.9rem;
        }
        
        /* --- FORCE INPUT VISIBILITY --- */
        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #9ca3af;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
          
          /* Force Text Color to Black */
          color: #000000 !important; 
          background-color: #ffffff !important;
          -webkit-text-fill-color: #000000 !important; /* For Chrome/Safari */
          opacity: 1 !important;
        }
        
        /* Override Autofill Colors */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: #000000 !important;
        }

        input::placeholder {
          color: #6b7280 !important;
          opacity: 0.7;
        }

        input:focus {
          outline: none;
          border-color: var(--primary-color);
          background-color: #ffffff !important;
        }
        /* --------------------------- */

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s, transform 0.1s;
        }
        .submit-btn:hover {
          background: var(--primary-hover);
        }
        .submit-btn:active {
          transform: scale(0.98);
        }
        /* TABLE */
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          text-align: left;
          padding: 15px;
          background-color: #f3f4f6;
          color: var(--text-light);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        td {
          padding: 15px;
          border-bottom: 1px solid #f3f4f6;
          color: #000000; /* Force Table Text Black */
        }
        tr:last-child td {
          border-bottom: none;
        }
        tr:hover {
          background-color: #f9fafb;
        }
        .fw-bold { font-weight: 600; }
        .text-muted { color: #4b5563; font-size: 0.9rem; }
        .amount { font-family: 'Courier New', monospace; font-weight: bold; color: #000; }
        .count-badge {
          background: #e5e7eb;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-badge.pending {
          background-color: #fef3c7;
          color: #d97706;
        }
        .empty-state {
          text-align: center;
          padding: 40px;
          color: var(--text-light);
          font-size: 1.1rem;
        }
      `}</style>
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
    </>
  );
}

export default App;