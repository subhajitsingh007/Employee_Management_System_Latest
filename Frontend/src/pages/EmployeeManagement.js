import React, { useEffect, useState } from 'react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    position: '',
    department: '',
    dateOfJoining: '',
    salary: '',
  });

  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
    dateOfJoining: '',
    salary: '',
  });

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/employees', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to load employees");
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/employees/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        alert("Deleted successfully");
        fetchEmployees();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  const handlePromote = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/employees/promote/${id}`, {
        method: 'PUT',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        alert("Promoted to admin");
        fetchEmployees();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to promote");
    }
  };

  const startEdit = (emp) => {
    setEditingEmployee(emp._id);
    setEditFormData({
      name: emp.name || '',
      position: emp.position || '',
      department: emp.department || '',
      dateOfJoining: emp.dateOfJoining?.substring(0, 10) || '',
      salary: emp.salary || '',
    });
  };

  const handleEditChange = (e) => {
    setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/admin/employees/${editingEmployee}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee updated");
        setEditingEmployee(null);
        fetchEmployees();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to update employee");
    }
  };

  const handleCreateChange = (e) => {
    setNewEmployeeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/admin/employees/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newEmployeeData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee created");
        setNewEmployeeData({
          name: '',
          email: '',
          password: '',
          position: '',
          department: '',
          dateOfJoining: '',
          salary: '',
        });
        fetchEmployees();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to create employee");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f8fc', minHeight: '90vh' }}>
      <h2>Employee Records</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />

      {/* Create Employee Form */}
      <form onSubmit={handleCreateEmployee} style={{ marginTop: '20px', marginBottom: '30px' }}>
        <h3>Create New Employee</h3>
        {['name', 'email', 'password', 'position', 'department', 'salary'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newEmployeeData[field]}
            onChange={handleCreateChange}
            style={inputStyle}
            required
          />
        ))}
        <input
          name="dateOfJoining"
          type="date"
          value={newEmployeeData.dateOfJoining}
          onChange={handleCreateChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={submitBtn}>Create</button>
      </form>

      {/* Employee Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
            <thead style={{ backgroundColor: '#e0e0e0' }}>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Position</th>
                <th style={tableHeaderStyle}>Department</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) =>
                  editingEmployee === emp._id ? (
                    <tr key={emp._id}>
                      <td style={tableCellStyle}>
                        <input name="name" value={editFormData.name} onChange={handleEditChange} style={inputStyle} />
                      </td>
                      <td style={tableCellStyle}>
                        <input name="position" value={editFormData.position} onChange={handleEditChange} style={inputStyle} />
                      </td>
                      <td style={tableCellStyle}>
                        <input name="department" value={editFormData.department} onChange={handleEditChange} style={inputStyle} />
                        <input name="dateOfJoining" type="date" value={editFormData.dateOfJoining} onChange={handleEditChange} style={inputStyle} />
                        <input name="salary" type="number" value={editFormData.salary} onChange={handleEditChange} style={inputStyle} />
                      </td>
                      <td style={tableCellStyle}>
                        <button onClick={handleUpdateEmployee} style={submitBtn}>Save</button>
                        <button onClick={() => setEditingEmployee(null)} style={deleteBtn}>Cancel</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={emp._id}>
                      <td style={tableCellStyle}>{emp.name}</td>
                      <td style={tableCellStyle}>{emp.position || 'N/A'}</td>
                      <td style={tableCellStyle}>{emp.department || 'N/A'}</td>
                      <td style={tableCellStyle}>
                        <button onClick={() => startEdit(emp)} style={editBtn}>Edit</button>
                        <button onClick={() => handlePromote(emp._id)} style={actionBtn}>Promote</button>
                        <button onClick={() => handleDelete(emp._id)} style={deleteBtn}>Delete</button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles
const inputStyle = {
  padding: '8px',
  marginRight: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#333',
};

const tableCellStyle = {
  padding: '12px 15px',
};

const actionBtn = {
  marginRight: '10px',
  padding: '5px 10px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteBtn = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '5px',
};

const submitBtn = {
  padding: '5px 10px',
  backgroundColor: '#2196f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '5px',
};

const editBtn = {
  padding: '5px 10px',
  backgroundColor: '#ffc107',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '5px',
};

export default EmployeeManagement;
