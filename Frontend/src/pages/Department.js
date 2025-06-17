import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [selectedDept, setSelectedDept] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/department/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      setDepartments(res.data.departments);
    } catch (error) {
      toast.error("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8080/api/department/update/${selectedDept}`,
          form,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            withCredentials: true,
          }
        );
        toast.success("Department updated");
      } else {
        await axios.post("http://localhost:8080/api/department/create", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        toast.success("Department created");
      }
      setForm({ name: "", description: "" });
      setEditMode(false);
      setSelectedDept(null);
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving department");
    }
  };

  const handleEdit = (dept) => {
    setForm({ name: dept.name, description: dept.description });
    setSelectedDept(dept._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/department/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      toast.success("Department deleted");
      fetchDepartments();
    } catch (err) {
      toast.error("Error deleting department");
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/department/details/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      setDetails(res.data);
    } catch (err) {
      toast.error("Failed to fetch department details");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{editMode ? "Edit Department" : "Create New Department"}</h2>
      <form onSubmit={handleCreateOrUpdate} style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Departments</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th>HRs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <button onClick={() => handleViewDetails(dept._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleViewDetails(dept._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {details && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Details for {details.department.name}</h3>
          <p><strong>Description:</strong> {details.department.description}</p>
          <p><strong>Employees:</strong></p>
          <ul>
            {details.employees.map(emp => (
              <li key={emp._id}>{emp.name} - {emp.email}</li>
            ))}
          </ul>
          <p><strong>Human Resources:</strong></p>
          <ul>
            {details.humanResources.map(hr => (
              <li key={hr._id}>{hr.name} - {hr.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Department;
