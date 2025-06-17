import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/leave/all', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLeaves(res.data.leaves || []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      toast.error('Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/leave/update/${id}`, { status: status.toLowerCase() }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(`Leave ${status.toLowerCase()} successfully`);
      fetchLeaves();
    } catch (error) {
      console.error('Error updating leave status:', error);
      toast.error('Error updating leave status');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={styles.heading}>Admin Leave Dashboard</h1>

      {loading ? (
        <p style={styles.loadingText}>Loading leave requests...</p>
      ) : (
        <div style={styles.card}>
          <table style={styles.table}>
           <thead>
  <tr>
    <th style={styles.tableHeaderCell}>User</th>
    <th style={styles.tableHeaderCell}>Email</th>
    <th style={styles.tableHeaderCell}>Type</th>
    <th style={styles.tableHeaderCell}>Start</th>
    <th style={styles.tableHeaderCell}>End</th>
    <th style={styles.tableHeaderCell}>Reason</th>
    <th style={styles.tableHeaderCell}>Status</th>
    <th style={styles.tableHeaderCell}>Actions</th>
  </tr>
</thead>
<tbody>
  {leaves.length === 0 ? (
    <tr>
      <td colSpan="8" style={styles.noData}>No leave requests found</td>
    </tr>
  ) : (
    leaves.map((leave) => (
      <tr key={leave._id}>
        <td style={styles.tableCell}>{leave.user?.name}</td>
        <td style={styles.tableCell}>{leave.user?.email}</td>
        <td style={styles.tableCell}>{leave.leaveType}</td>
        <td style={styles.tableCell}>{new Date(leave.startDate).toLocaleDateString()}</td>
        <td style={styles.tableCell}>{new Date(leave.endDate).toLocaleDateString()}</td>
        <td style={styles.tableCell}>{leave.reason}</td>
        <td style={{ ...styles.tableCell, fontWeight: 'bold', color: getStatusColor(leave.status) }}>
          {leave.status}
        </td>
        <td style={styles.tableCell}>
          <button
            onClick={() => updateLeaveStatus(leave._id, 'Approved')}
            disabled={leave.status === 'Approved'}
            style={styles.approveBtn}
          >
            Approve
          </button>
          <button
            onClick={() => updateLeaveStatus(leave._id, 'Rejected')}
            disabled={leave.status === 'Rejected'}
            style={styles.rejectBtn}
          >
            Reject
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

const getStatusColor = (status) => {
  if (status === 'Approved') return 'green';
  if (status === 'Rejected') return 'red';
  return 'orange';
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  loadingText: {
    fontSize: '1.2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
    padding: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  noData: {
    textAlign: 'center',
    padding: '1rem',
    color: '#777',
  },
  approveBtn: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    marginRight: '5px',
    borderRadius: '4px',
  },
  rejectBtn: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  tableHeaderCell: {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
};
