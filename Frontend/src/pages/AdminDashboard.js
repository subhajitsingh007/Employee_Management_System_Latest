import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EmployeeManagement from "./EmployeeManagement";
import Attendance from "./Attendance";
import Performance from "./Performance";
import Payroll from "./Payroll";
import Settings from "./SettingsPage"; // Import SettingsPage properly
import Salary from "./Salary";
import Department from "./Department";
import LeaveManagement from "./AdminLeaveManagement"; // Import LeaveManagement component
// Styled components

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #5e57a1;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex-grow: 1;
  background: #f5f6fa;
  padding: 30px;
  overflow-y: auto;
`;

const NavItem = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 10px;
  background: ${(props) => (props.active ? "#7d75d0" : "transparent")};

  &:hover {
    background-color: #7d75d0;
  }
`;

const TopBar = styled.div`
  background: #ffffff;
  padding: 15px 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const styles ={
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
  }
}
// 🚀 Renamed this styled-component


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("EmployeeManagement");
  const navigate = useNavigate()
 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "EmployeeManagement":
        return <EmployeeManagement />;
      case "LeaveManagement":
        return <LeaveManagement />;
      case "Attendance":
        return <Attendance />;
      case "Department":
        return <Department />;
      case "Performance":
        return <Performance />;
      case "Payroll":
        return <Payroll />;
      case "Salary":
        return <Salary />;
      case "Settings":
        return <Settings />; // now using the imported SettingsPage
      default:
        return <EmployeeManagement />;
    }
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <h2>EMS Dashboard</h2>
        <NavItem
          active={activeSection === "EmployeeManagement"}
          onClick={() => setActiveSection("EmployeeManagement")}
        >
          Employee Management
        </NavItem>

         <NavItem
          active={activeSection === "LeaveManagement"}
          onClick={() => setActiveSection("LeaveManagement")}
        >
          Leave Management
        </NavItem>
        
        <NavItem
          active={activeSection === "Attendance"}
          onClick={() => setActiveSection("Attendance")}
        >
          Attendance
        </NavItem>
        <NavItem
          active={activeSection === "Department"}
          onClick={() => setActiveSection("Department")}  
        >
          Department
        </NavItem>
        <NavItem
          active={activeSection === "Performance"}
          onClick={() => setActiveSection("Performance")}
        >
          Performance
        </NavItem>
        <NavItem
          active={activeSection === "Payroll"}
          onClick={() => setActiveSection("Payroll")}
        >
          Payroll
        </NavItem>
        <NavItem
          active={activeSection === "Salary"}
          onClick={() => setActiveSection("Salary")}
        >
          Salary
        </NavItem>
        <NavItem
          active={activeSection === "Settings"}
          onClick={() => setActiveSection("Settings")}
        >
          Settings
        </NavItem>
         <button onClick={handleLogout} style={styles.logoutButton}>
          🔒 Logout
        </button>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <TopBar>
          <h3>{activeSection}</h3>
          <div>Profile | Notifications</div>
        </TopBar>

        {renderSection()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
