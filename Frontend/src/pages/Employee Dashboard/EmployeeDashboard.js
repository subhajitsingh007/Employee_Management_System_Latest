import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeAttendance from "./EmployeeAttendance";
import Profile from "./EmployeeProfile";
import LeaveRequests from "./LeaveRequests";
import EmployeeOverview from "./EmployeeOverview";
const EmployeeDashboard = () => {
  const [section, setSection] = useState("overview");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderSection = () => {
    switch (section) {
      case "overview":
        return <EmployeeOverview setActiveSection={setSection} />;
      case "attendance":
        return <EmployeeAttendance />;
      case "profile":
        return <Profile />;
      case "leave":
        return <LeaveRequests />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>🧑‍💼 EMS</h2>
        {["overview", "attendance", "profile", "leave"].map((item) => (
          <a
            key={item}
            onClick={() => setSection(item)}
            style={{
              ...styles.link,
              backgroundColor: section === item ? "#334155" : "transparent",
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}

        <button onClick={handleLogout} style={styles.logoutButton}>
          🔒 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <span style={styles.headerTitle}>Employee Dashboard</span>
          <span style={styles.headerTime}>{time.toLocaleTimeString()}</span>
        </div>
        <div style={styles.content}>{renderSection()}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", // Changed back to flex for proper layout
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f1f5f9",
  },
  sidebar: {
    width: "220px",
    minWidth: "220px", // Prevent shrinking
    background: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    position: "sticky", // Changed back to sticky for better behavior
    top: 0,
    height: "100vh",
    overflowY: "auto",
    zIndex: 1000,
  },
  sidebarTitle: {
    color: "#fff",
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  link: {
    color: "#fff",
    margin: "10px 0",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px 15px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    fontSize: "16px",
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: "20px",
    padding: "12px 15px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  main: {
    flex: 1, // Take remaining space
    background: "#f1f5f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden", // Prevent horizontal scroll
  },
  header: {
    background: "#fff",
    padding: "20px 30px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  headerTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1e293b",
  },
  headerTime: {
    fontSize: "16px",
    color: "#64748b",
    fontWeight: "500",
  },
  content: {
    padding: "30px",
    flex: 1,
    overflow: "auto", // Allow scrolling if content is too long
  },
  welcomeText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: "8px",
  },
  dateText: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap", // Allow wrapping on smaller screens
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flex: "1",
    minWidth: "200px", // Minimum width for cards
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#64748b",
    margin: "0 0 12px 0",
  },
  cardValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1e293b",
    margin: 0,
  },
  announcementSection: {
    marginTop: "40px",
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },
  announcementTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: "16px",
  },
  announcementList: {
    margin: 0,
    paddingLeft: "20px",
    listStyleType: "disc",
  },
  announcementItem: {
    fontSize: "16px",
    color: "#475569",
    marginBottom: "12px",
    lineHeight: "1.5",
  },
};

export default EmployeeDashboard;