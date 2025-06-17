import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Payroll() {
  const [formData, setFormData] = useState({
    userId: '',
    month: '',
    salaryPaid: '',
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [salaries, setSalaries] = useState([]);
  const [totals, setTotals] = useState({
    totalPaid: 0,
    bonuses: 0,
    deductions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalaries();
    fetchUsers();
  }, []);

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/payroll/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const data = res.data.data || [];

      const totalPaid = data.reduce((sum, r) => sum + (r.netSalary || 0), 0);
      const bonuses = data.reduce((sum, r) => sum + (r.bonus || 0), 0);
      const deductions = data.reduce((sum, r) => sum + (r.deductions || 0), 0);

      setSalaries(data);
      setTotals({ totalPaid, bonuses, deductions });
    } catch (err) {
      setError('Failed to fetch payroll data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/admin/employees', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data || []);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };
  

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8080/api/payroll/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setMessage(res.data.message || 'Payroll created successfully');
      setFormData({ userId: '', month: '', salaryPaid: '' });
      fetchSalaries(); // Refresh dashboard data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create payroll');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f8fc', minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ margin: 0 }}>Payroll</h2>
        <div>
          <a href="/admin/profile" style={{ marginRight: '1rem', color: '#555', textDecoration: 'none' }}>Profile</a> |
          <a href="/admin/notifications" style={{ marginLeft: '1rem', color: '#555', textDecoration: 'none' }}>Notifications</a>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '2rem',
      }}>
        <h2 style={{ marginBottom: '1rem' }}>💵 Payroll Overview</h2>

        {loading ? (
          <p>Loading payroll data...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <p style={{ color: '#555', marginBottom: '2rem' }}>
              Manage and track employee salaries, bonuses, and deductions.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                backgroundColor: '#e6f7f0',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3>💰 Total Salary Paid</h3>
                <p>₹ {totals.totalPaid.toLocaleString()}</p>
              </div>

              <div style={{
                backgroundColor: '#fff4e6',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3>🎁 Bonuses</h3>
                <p>₹ {totals.bonuses.toLocaleString()}</p>
              </div>

              <div style={{
                backgroundColor: '#f0f4ff',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3>📉 Deductions</h3>
                <p>₹ {totals.deductions.toLocaleString()}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Payroll Creation Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1rem' }}>➕ Create Payroll</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>User:</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Month:</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Salary Paid (₹):</label>
            <input
              type="number"
              name="salaryPaid"
              value={formData.salaryPaid}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payroll;
