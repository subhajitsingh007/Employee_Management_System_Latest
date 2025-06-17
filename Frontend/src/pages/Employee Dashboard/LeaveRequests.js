import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LeaveRequestPage() {
  const [form, setForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);

  const leaveTypes = [
    { value: '', label: 'Select leave type' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Casual Leave', label: 'Casual Leave' },
    { value: 'Other Leave', label: 'Other Leave' }
  ];

  function validate() {
    const newErrors = {};
    if (!form.leaveType) newErrors.leaveType = 'Please select a leave type';
    if (!form.startDate) newErrors.startDate = 'Please select the start date';
    if (!form.endDate) newErrors.endDate = 'Please select the end date';
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    if (!form.reason.trim()) newErrors.reason = 'Please provide a reason for leave';
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/leave/apply', form, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
    // Refetch leave history after new request
      fetchLeaveHistory();
    } catch (err) {
      console.error('Error submitting leave request:', err);
      alert('Failed to submit leave request');
    }
  }

  // Fetch leave history
 const fetchLeaveHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/leave/my', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log('Leave history response:', response.data);
    setLeaveHistory(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error('Error fetching leave history:', error);
  }
};
useEffect(() => {
  fetchLeaveHistory();
}, []);

//useEffect(() => {
  //console.log('leaveHistory state updated:', leaveHistory);
//}, [leaveHistory]);
const thStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  fontWeight: 'bold',
  textAlign: 'center'
};

const tdStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc'
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <>
      <style>{`
        :root {
          --color-bg: #ffffff;
          --color-text: #6b7280;
          --color-primary: #111827;
          --color-input-bg: #f9fafb;
          --color-border: #d1d5db;
          --radius: 12px;
          --shadow-card: 0 4px 12px rgba(0,0,0,0.05);
          --transition: 0.3s ease;
          --max-width: 720px;
        }
        * { box-sizing: border-box; }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-text);
        }
        main.container {
          max-width: var(--max-width);
          margin: 4rem auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        main.container::before {
          content: "";
          position: absolute;
          top: -80px;
          left: 50%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle at center, #5eead4 20%, transparent 70%);
          transform: translateX(-50%);
          opacity: 0.25;
          filter: blur(80px);
          z-index: -1;
          pointer-events: none;
        }
        .card {
          background: var(--color-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card);
          padding: 3rem 3rem 2rem;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border: 1.5px solid transparent;
          transition: border-color var(--transition);
        }
        .card:focus-within {
          border-color: var(--color-primary);
        }
        h1 {
          font-weight: 700;
          font-size: 3rem;
          margin: 0 0 1.5rem;
          color: var(--color-primary);
          text-align: center;
        }
        label {
          font-weight: 600;
          margin-bottom: 0.3rem;
          display: inline-block;
          color: var(--color-primary);
        }
        input, select, textarea {
          width: 100%;
          padding: 0.65rem 1rem;
          font-size: 1rem;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius);
          background-color: var(--color-input-bg);
          color: var(--color-primary);
          transition: border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
          font-family: inherit;
          resize: vertical;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 5px rgba(17, 24, 39, 0.3);
          background-color: #fff;
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg fill='none' stroke='%23343a40' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
          cursor: pointer;
        }
        button {
          background-color: var(--color-primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: var(--radius);
          cursor: pointer;
          transition: background-color var(--transition), transform var(--transition);
          align-self: center;
          min-width: 140px;
        }
        button:hover, button:focus {
          background-color: #374151;
          transform: scale(1.03);
        }
        .error-message {
          color: #dc2626;
          font-weight: 600;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        @media (max-width: 600px) {
          h1 { font-size: 2.25rem; }
          .card { padding: 2rem 1.5rem; }
        }
      `}</style>

     <main className="container">
        <section aria-labelledby="leave-request-heading" className="card" tabIndex={-1}>
          <h1 id="leave-request-heading">Leave Request</h1>
          <form onSubmit={handleSubmit} noValidate>

            <div>
              <label htmlFor="leaveType">Leave Type</label>
              <select
                id="leaveType"
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                aria-describedby={errors.leaveType ? 'error-leaveType' : undefined}
                aria-invalid={!!errors.leaveType}
                required
              >
                {leaveTypes.map(({ value, label }) => (
                  <option key={value} value={value} disabled={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.leaveType && <p className="error-message" id="error-leaveType">{errors.leaveType}</p>}
            </div>

            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                aria-describedby={errors.startDate ? 'error-startDate' : undefined}
                aria-invalid={!!errors.startDate}
                required
              />
              {errors.startDate && <p className="error-message" id="error-startDate">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                aria-describedby={errors.endDate ? 'error-endDate' : undefined}
                aria-invalid={!!errors.endDate}
                required
              />
              {errors.endDate && <p className="error-message" id="error-endDate">{errors.endDate}</p>}
            </div>

            <div>
              <label htmlFor="reason">Reason for Leave</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Briefly explain the reason for your leave"
                value={form.reason}
                onChange={handleChange}
                aria-describedby={errors.reason ? 'error-reason' : undefined}
                aria-invalid={!!errors.reason}
                required
                rows="4"
              />
              {errors.reason && <p className="error-message" id="error-reason">{errors.reason}</p>}
            </div>

            <button type="submit" aria-live="polite">Send Request</button>
            {submitted && (
      <p style={{ color: 'green', textAlign: 'center', fontWeight: '600' }}>
      Leave request submitted successfully!
      </p>
      )}
          </form>
        </section>
    {leaveHistory.length > 0 && (
  <section className="card" style={{ marginTop: '2rem' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Leave History</h2>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <tr>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>From</th>
            <th style={thStyle}>To</th>
            <th style={thStyle}>Reason</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((leave, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{leave.leaveType}</td>
              <td style={tdStyle}>{formatDate(leave.startDate)}</td>
              <td style={tdStyle}>{formatDate(leave.endDate)}</td>
              <td style={tdStyle}>{leave.reason}</td>
              <td style={tdStyle}>{capitalize(leave.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}

      </main>
    </>
  );
}
