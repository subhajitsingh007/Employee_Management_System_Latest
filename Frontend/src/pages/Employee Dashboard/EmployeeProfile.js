import React, { useState, useEffect } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ankita Singh",
    employeeId: "EMP001",
    email: "ankita.singh@company.com",
    phone: "+91 98765 43210",
    department: "IT",
    role: "Developer",
    joiningDate: "January 15, 2023",
    manager: "Rajesh Kumar",
    address: "123 Tech Street, Bangalore, India",
    emergencyContact: "+91 87654 32109",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/employee/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name || "",
          employeeId: data.employeeId || "",
          email: data.email || "",
          phone: data.phone || "",
          department: data.department || "",
          role: data.role || "",
          joiningDate: data.joiningDate || "",
          manager: data.manager || "",
          address: data.address || "",
          emergencyContact: data.emergencyContact || "",
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Something went wrong!");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/employee/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password changed successfully!");
    setShowPasswordModal(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>{profileData.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.name}>{profileData.name}</h2>
            <p style={styles.role}>{profileData.role}</p>
          </div>
        </div>

        <div style={styles.content}>
          {/* Personal Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.infoGrid}>
              <InfoField
                label="Full Name"
                value={profileData.name}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("name", val)}
              />
              <InfoField label="Employee ID" value={profileData.employeeId} />
              <InfoField
                label="Email"
                value={profileData.email}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("email", val)}
              />
              <InfoField
                label="Phone"
                value={profileData.phone}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("phone", val)}
              />
            </div>
          </div>

          {/* Work Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Work Information</h3>
            <div style={styles.infoGrid}>
              <InfoField label="Department" value={profileData.department} />
              <InfoField label="Role" value={profileData.role} />
              <InfoField label="Joining Date" value={profileData.joiningDate} />
              <InfoField label="Manager" value={profileData.manager} />
            </div>
          </div>

          {/* Contact Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.infoGrid}>
              <InfoField
                label="Address"
                value={profileData.address}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("address", val)}
              />
              <InfoField
                label="Emergency Contact"
                value={profileData.emergencyContact}
                isEditing={isEditing}
                onChange={(val) => handleInputChange("emergencyContact", val)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {isEditing ? (
            <>
              <button onClick={handleSave} style={styles.saveButton}>
                💾 Save Changes
              </button>
              <button onClick={handleEditToggle} style={styles.cancelButton}>
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEditToggle} style={styles.editButton}>
                ✏️ Edit Profile
              </button>
              <button
                onClick={handlePasswordChange}
                style={styles.changePasswordButton}
              >
                🔒 Change Password
              </button>
            </>
          )}
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Change Password</h3>
              <form onSubmit={handlePasswordSubmit}>
                <PasswordField label="Current Password" />
                <PasswordField label="New Password" />
                <PasswordField label="Confirm New Password" />
                <div style={styles.modalButtons}>
                  <button type="submit" style={styles.saveButton}>
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const InfoField = ({ label, value, isEditing, onChange }) => (
  <div style={styles.infoItem}>
    <span style={styles.label}>{label}:</span>
    {isEditing && onChange ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
    ) : (
      <span style={styles.value}>{value}</span>
    )}
  </div>
);

const PasswordField = ({ label }) => (
  <div style={styles.inputGroup}>
    <label style={styles.inputLabel}>{label}</label>
    <input type="password" required style={styles.modalInput} />
  </div>
);

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "calc(100vh - 100px)",
    overflowY: "auto",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 30px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
  },
  avatarText: { fontSize: "28px", fontWeight: "bold", color: "#fff" },
  headerInfo: { flex: 1 },
  name: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#fff",
  },
  role: { margin: 0, fontSize: "16px", opacity: 0.9, color: "#fff" },
  content: { padding: "30px" },
  section: { marginBottom: "40px" },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "20px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "10px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "4px",
  },
  value: { fontSize: "16px", fontWeight: "500", color: "#1f2937" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  footer: {
    padding: "30px",
    background: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  editButton: {
    padding: "12px 24px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  changePasswordButton: {
    padding: "12px 24px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  saveButton: {
    padding: "12px 24px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "12px 24px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
  },
  inputGroup: { marginBottom: "16px" },
  inputLabel: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#374151",
  },
  modalInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  modalButtons: { display: "flex", justifyContent: "flex-end", gap: "12px" },
};

export default Profile;
