import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Salary = () => {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    month: "",
  });

  const [editingSalary, setEditingSalary] = useState(null);
  const [editForm, setEditForm] = useState({
    basicSalary: "",
    bonus: "",
    deductions: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchSalaries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/salary/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setSalaries(res.data.data);
    } catch (err) {
      console.error("Failed to fetch salaries", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/salary/create", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setForm({
        userId: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
        month: "",
      });
      await fetchSalaries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating salary record");
    }
  };

  const handleEditClick = (salary) => {
    setEditingSalary(salary._id);
    setEditForm({
      basicSalary: salary.basicSalary,
      bonus: salary.bonus,
      deductions: salary.deductions,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/salary/update/${editingSalary}`,
        {
          basicSalary: Number(editForm.basicSalary),
          bonus: Number(editForm.bonus),
          deductions: Number(editForm.deductions),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setEditingSalary(null);
      setEditForm({ basicSalary: "", bonus: "", deductions: "" });
      await fetchSalaries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating salary record");
    }
  };

  const totalPaid = salaries.reduce((acc, item) => acc + item.netSalary, 0);
  const totalBonuses = salaries.reduce((acc, item) => acc + item.bonus, 0);
  const totalDeductions = salaries.reduce((acc, item) => acc + item.deductions, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>New Salary Entry</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ display: "grid", gap: "1rem", maxWidth: "500px" }}
      >
        <div>
          <label>Employee</label>
          <select name="userId" value={form.userId} onChange={handleChange} required>
            <option value="">Select Employee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Basic Salary</label>
          <input type="number" name="basicSalary" value={form.basicSalary} onChange={handleChange} required />
        </div>
        <div>
          <label>Bonus</label>
          <input type="number" name="bonus" value={form.bonus} onChange={handleChange} required />
        </div>
        <div>
          <label>Deductions</label>
          <input type="number" name="deductions" value={form.deductions} onChange={handleChange} required />
        </div>
        <div>
          <label>Month (YYYY-MM)</label>
          <input type="month" name="month" value={form.month} onChange={handleChange} required />
        </div>
        <button type="submit">Create Salary</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Salary Summary</h2>
      <p>Total Paid: ₹{totalPaid}</p>
      <p>Total Bonuses: ₹{totalBonuses}</p>
      <p>Total Deductions: ₹{totalDeductions}</p>

      <h2 style={{ marginTop: "2rem" }}>Salary Records</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Basic</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net</th>
            <th>Month</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((s) =>
            editingSalary === s._id ? (
              <tr key={s._id}>
                <td>{s.user?.name || "unknown"}</td>
                <td>
                  <input
                    type="number"
                    name="basicSalary"
                    value={editForm.basicSalary}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="bonus"
                    value={editForm.bonus}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="deductions"
                    value={editForm.deductions}
                    onChange={handleEditChange}
                  />
                </td>
                <td>--</td>
                <td>{s.month}</td>
                <td>
                  <button onClick={handleUpdateSubmit}>Save</button>
                  <button onClick={() => setEditingSalary(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={s._id}>
                <td>{s.user?.name || "unknown"}</td>
                <td>₹{s.basicSalary}</td>
                <td>₹{s.bonus}</td>
                <td>₹{s.deductions}</td>
                <td>₹{s.netSalary}</td>
                <td>{s.month}</td>
                <td>
                  <button onClick={() => handleEditClick(s)}>Edit</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
