import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EmployeeOverview = ({ setActiveSection }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/employee/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

   const handleViewProfile = () => {
    setActiveSection("EmployeeProfile"); // This will switch to the profile section
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={styles.spinner}
      >
        🎨
      </motion.div>
      <p style={styles.loadingText}>Loading your profile...</p>
    </div>
  );

  if (!employee) return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      style={styles.errorContainer}
    >
      <p style={styles.errorText}>❌ No profile data found</p>
      <p style={styles.errorSubtext}>Please check your connection or contact support</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <div style={styles.header}>
        <h2 style={styles.title}>Employee Profile</h2>
        <p style={styles.subtitle}>Your professional details at a glance</p>
      </div>

      <div style={styles.avatarContainer}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            ...styles.avatar,
            background: `linear-gradient(135deg, ${avatarGradients[employee.department] || '#00c6ff, #0072ff'})`
          }}
        >
          {employee.name.split(' ').map(n => n[0]).join('')}
        </motion.div>
      </div>

      <div style={styles.grid}>
        <InfoCard
          label="Full Name"
          value={employee.name}
          icon="👤"
          gradient="#FFDEE9, #B5FFFC"
        />
        <InfoCard
          label="Employee ID"
          value={employee.employeeId}
          icon="🆔"
          gradient="#C9FFBF, #FFAFBD"
        />
        <InfoCard
          label="Department"
          value={employee.department}
          icon="🏢"
          gradient="#FDCBFF, #E0C3FC"
        />
        <InfoCard
          label="Role"
          value={employee.role}
          icon="💼"
          gradient="#A1FFCE, #FAFFD1"
        />
        <InfoCard
          label="Joining Date"
          value={employee.joiningDate}
          icon="📅"
          gradient="#FEE4E1, #FFD5EC"
        />
        <InfoCard
          label="Manager"
          value={employee.manager}
          icon="👔"
          gradient="#D4FC79, #96E6A1"
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        style={styles.actionButton}
         onClick={handleViewProfile}
      >
        View Complete Profile
      </motion.div>
    </motion.div>
  );
};

const InfoCard = ({ label, value, icon, gradient }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
    style={{
      ...styles.card,
      background: `linear-gradient(135deg, ${gradient})`,
      borderLeft: `5px solid ${gradient.split(',')[0].trim()}`
    }}
  >
    <div style={styles.cardHeader}>
      <span style={styles.cardIcon}>{icon}</span>
      <p style={styles.label}>{label}</p>
    </div>
    <p style={styles.value}>{value}</p>
  </motion.div>
);

// Department-based avatar color gradients
const avatarGradients = {
  "Engineering": "#4facfe, #00f2fe",
  "Design": "#f093fb, #f5576c",
  "Marketing": "#43e97b, #38f9d7",
  "HR": "#ff9a9e, #fad0c4",
  "Finance": "#a18cd1, #fbc2eb",
  "Operations": "#fbc2eb, #a6c1ee"
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "40px",
    borderRadius: "24px",
    background: "white",
    boxShadow: "0 15px 50px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "36px",
    marginBottom: "8px",
    color: "#2c3e50",
    fontWeight: "700",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subtitle: {
    fontSize: "16px",
    color: "#7f8c8d",
    fontWeight: "500"
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginBottom: "40px"
  },
  card: {
    borderRadius: "16px",
    padding: "25px",
    color: "#2c3e50",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px"
  },
  cardIcon: {
    fontSize: "24px",
    marginRight: "12px"
  },
  label: {
    fontSize: "14px",
    color: "#34495e",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0"
  },
  value: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0"
  },
  actionButton: {
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "white",
    padding: "16px 32px",
    borderRadius: "50px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,114,255,0.3)",
    maxWidth: "300px",
    margin: "0 auto",
    transition: "all 0.3s ease"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
  },
  spinner: {
    fontSize: "60px",
    marginBottom: "20px"
  },
  loadingText: {
    fontSize: "24px",
    color: "#2c3e50",
    fontWeight: "500"
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #fff5f5 0%, #ffd3d3 100%)",
    padding: "40px",
    textAlign: "center"
  },
  errorText: {
    fontSize: "28px",
    color: "#e74c3c",
    fontWeight: "600",
    marginBottom: "15px"
  },
  errorSubtext: {
    fontSize: "18px",
    color: "#7f8c8d",
    fontWeight: "500"
  }
};

export default EmployeeOverview;