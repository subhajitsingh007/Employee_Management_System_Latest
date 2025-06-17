import React, { useState } from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: background 0.5s, color 0.5s;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #5e57a1;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #4c4590;
  }
`;

const DangerButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");

  const handlePasswordChange = () => {
    if (currentPassword && newPassword) {
      setMessage("✅ Password updated successfully!");
    } else {
      setMessage("⚠️ Please fill in all fields.");
    }
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSaveSettings = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <SettingsContainer style={{ background: darkMode ? "#2c3e50" : "#ffffff", color: darkMode ? "#ecf0f1" : "#000" }}>
      <Title>Settings</Title>
      <p>Customize your system preferences below.</p>

      {/* Theme Settings */}
      <Section>
        <SubTitle>Theme Settings</SubTitle>
        <Label>
          <input type="checkbox" checked={darkMode} onChange={handleThemeToggle} /> Enable Dark Mode
        </Label>
      </Section>

      {/* Language Selection */}
      <Section>
        <SubTitle>Language</SubTitle>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Spanish</option>
        </select>
      </Section>

      {/* Password Update */}
      <Section>
        <SubTitle>Change Password</SubTitle>
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={handlePasswordChange}>Update Password</Button>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </Section>

      {/* Notifications */}
      <Section>
        <SubTitle>Notifications</SubTitle>
        <Label>
          <input type="checkbox" defaultChecked /> Receive Email Notifications
        </Label>
        <Label>
          <input type="checkbox" defaultChecked /> Receive System Alerts
        </Label>
      </Section>

      {/* Account Deletion */}
      <Section>
        <SubTitle style={{ color: darkMode ? "#f1c40f" : "#e74c3c" }}>Danger Zone</SubTitle>
        <DangerButton>Delete Account</DangerButton>
      </Section>

      {/* Save Button */}
      <Button onClick={handleSaveSettings}>Save Settings</Button>
    </SettingsContainer>
  );
};

export default SettingsPage;