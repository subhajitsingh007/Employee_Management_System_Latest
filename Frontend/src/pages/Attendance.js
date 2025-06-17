import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [singleAttendance, setSingleAttendance] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttendanceRecords();
    fetchUsers();
  }, []);

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/attendance/admin/all', {
        withCredentials: true,
      });
      setAttendanceRecords(response.data.records);
    } catch (error) {
      setError('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/employees', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(response.data || []);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const fetchAttendanceByEmployee = async (id) => {
  setSelectedUser(id);
  setLoading(true);
  setError('');
  setSingleAttendance(null);

  try {
    const response = await axios.get(`http://localhost:8080/api/attendance/admin/${id}`, {
      withCredentials: true,
    });

    const data = response.data.attendance;

    // Check if array or single object
    if (Array.isArray(data)) {
      setSingleAttendance(data[0]); // Or sort by latest date and pick
    } else {
      setSingleAttendance(data);
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch attendance');
  } finally {
    setLoading(false);
  }
};

  return (
<div style={styles.page}>
  <div style={styles.navbar}>
    <h1 style={styles.heading}>Attendance Management</h1>
    <div>
      <a href="/admin/profile" style={styles.link}>Profile</a>
      <a href="/admin/notifications" style={styles.link}>Notifications</a>
    </div>
  </div>

  <div style={styles.card}>
    <h2 style={styles.tableHeading}>View Attendance By Employee</h2>
    <select onChange={(e) => fetchAttendanceByEmployee(e.target.value)} value={selectedUser}>
      <option value="">Select Employee</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>{user.name}</option>
      ))}
    </select>

    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : singleAttendance ? (
      <div>
        <h3>{singleAttendance.userId?.name || "Unknown"}</h3>
        <p>Date: {singleAttendance.date ? new Date(singleAttendance.date).toLocaleDateString() : 'N/A'}</p>
        <p>Check-In: {singleAttendance.checkIn ? new Date(singleAttendance.checkIn).toLocaleTimeString() : 'N/A'}</p>
        <p>Check-Out: {singleAttendance.checkOut ? new Date(singleAttendance.checkOut).toLocaleTimeString() : 'N/A'}</p>
      </div>
    ) : null}
  </div>

  <div style={styles.card}>
    <h2 style={styles.tableHeading}>All Employee Attendance</h2>
    {loading ? (
      <p>Loading attendance records...</p>
    ) : (
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee Name</th>
              <th style={styles.th}>Employee Email</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Check-In</th>
              <th style={styles.th}>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id} style={styles.tr}>
                <td style={styles.td}>{record.userId?.name || 'N/A'}</td>
                <td style={styles.td}>{record.userId?.email || 'N/A'}</td>
                <td style={styles.td}>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</td>
                <td style={styles.td}>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}</td>
                <td style={styles.td}>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>


);
};

const styles = {
  // ... same styles as before
  page: {
    padding: '30px',
    background: 'linear-gradient(135deg, #f3f4f6, #e0eafc)',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', marginBottom: '25px',
    transition: 'all 0.3s ease'
  },
  heading: { margin: 0, color: '#3f51b5', fontSize: '28px', fontWeight: '600' },
  link: {
    marginLeft: '20px', textDecoration: 'none', color: '#3f51b5',
    fontWeight: '500', fontSize: '18px', transition: 'color 0.3s',
  },
  card: {
    backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)', marginBottom: '40px',
    transition: 'transform 0.3s ease',
  },
  tableHeading: { color: '#3f51b5', fontSize: '22px', marginBottom: '10px' },
  table: {
    width: '100%', borderCollapse: 'collapse', marginTop: '10px',
    fontSize: '16px', backgroundColor: '#f9fafb',
    borderRadius: '10px', overflow: 'hidden',
  },
  th: {
    textAlign: 'left', padding: '14px', backgroundColor: '#e0e0e0',
    fontWeight: '600', fontSize: '16px', color: '#333'
  },
  tr: {
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  td: {
    padding: '12px', borderBottom: '1px solid #ddd',
  },
};

export default Attendance;
