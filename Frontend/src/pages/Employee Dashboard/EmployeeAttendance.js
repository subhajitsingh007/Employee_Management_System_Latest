import React, { useState, useEffect } from "react";

const EmployeeAttendance = () => {
  const [status, setStatus] = useState("Not Checked In");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workingHours, setWorkingHours] = useState({
    total: 0,
    regular: 0,
    overtime: 0
  });

  const employeeId = "EMP123";
  const employeeName = "Ankita";
  const STANDARD_WORK_HOURS = 8;

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  useEffect(() => {
  const fetchTodayAttendance = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/employee/attendance/today", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.attendance) {
        const { checkIn, checkOut } = data.attendance;

        // Extract time (HH:mm) from the datetime string
        const checkInTimeStr = new Date(checkIn).toTimeString().slice(0, 5);
        setCheckInTime(checkInTimeStr);
        setIsCheckedIn(true);
        setStatus("Present");

        if (checkOut) {
          const checkOutTimeStr = new Date(checkOut).toTimeString().slice(0, 5);
          setCheckOutTime(checkOutTimeStr);
          setStatus("Checked Out");
        }
      }
    } catch (error) {
      console.error("Failed to fetch today's attendance:", error);
    }
  };

  fetchTodayAttendance();

  const timer = setInterval(() => {
    setCurrentTime(new Date());
    if (isCheckedIn && !checkOutTime) {
      calculateWorkingHours();
    }
  }, 1000);

  return () => clearInterval(timer);
}, []);


  const calculateWorkingHours = () => {
    if (!checkInTime) return;

    const checkIn = new Date(`${new Date().toDateString()} ${checkInTime}`);
    const now = checkOutTime ?
      new Date(`${new Date().toDateString()} ${checkOutTime}`) :
      new Date();

    const totalMinutes = (now - checkIn) / (1000 * 60);
    const totalHours = Math.max(0, totalMinutes / 60);

    const regularHours = Math.min(totalHours, STANDARD_WORK_HOURS);
    const overtimeHours = Math.max(0, totalHours - STANDARD_WORK_HOURS);

    setWorkingHours({
      total: totalHours.toFixed(2),
      regular: regularHours.toFixed(2),
      overtime: overtimeHours.toFixed(2)
    });
  };

 const handleCheckIn = async () => {
  if (isCheckedIn) return;
  
  const now = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  setCheckInTime(now);
  setIsCheckedIn(true);
  setStatus("Present");

  try {
   await fetch("http://localhost:8080/api/employee/attendance/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include token if required
        // You might also need Authorization header if you use tokens
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        checkIn: now
      }),
    });
  } catch (error) {
    console.error('Check-in failed:', error);
  }
};

const handleCheckOut = async () => {
    if (!isCheckedIn || checkOutTime) return;

  const now = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  setCheckOutTime(now);
  setStatus("Checked Out");

  const checkIn = new Date(`${new Date().toDateString()} ${checkInTime}`);
  const checkOut = new Date(`${new Date().toDateString()} ${now}`);
  const totalMinutes = (checkOut - checkIn) / (1000 * 60);
  const totalHours = Math.max(0, totalMinutes / 60);
  const regularHours = Math.min(totalHours, STANDARD_WORK_HOURS);
  const overtimeHours = Math.max(0, totalHours - STANDARD_WORK_HOURS);

  const attendanceData = {
    name: employeeName,
    date: new Date().toISOString().slice(0, 10),
    checkIn: checkInTime,
    checkOut: now,
  };

  try {
    await fetch("http://localhost:8080/api/employee/attendance/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
        // Include token if required
      },
      body: JSON.stringify({
        checkOut: now
      }),
    });

    if (overtimeHours > 0) {
      await sendOvertimeNotification({
        ...attendanceData,
        totalHours: totalHours.toFixed(2),
        regularHours: regularHours.toFixed(2),
        overtimeHours: overtimeHours.toFixed(2),
      });
    }
  } catch (error) {
    console.error('Check-out failed:', error);
  }
};

const sendOvertimeNotification = async (attendanceData) => {
  try {
    const overtimeData = {
      ...attendanceData,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending Approval'
    };

    const existingData = JSON.parse(sessionStorage.getItem('overtimeData') || '[]');
    const updatedData = [...existingData, overtimeData];
    sessionStorage.setItem('overtimeData', JSON.stringify(updatedData));

    await fetch("/api/employee/attendance/overtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(overtimeData),
    });

    console.log('Overtime notification sent to HR');
  } catch (error) {
    console.error('Failed to send overtime notification:', error);
  }
};
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🕒 Attendance Tracker</h2>
        <div style={styles.currentTime}>
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      <div style={styles.statusCard}>
        <p><strong>Status:</strong>
          <span style={{
            ...styles.statusBadge,
            backgroundColor:
              status === 'Present' ? '#10b981' :
                status === 'Checked Out' ? '#6b7280' : '#f59e0b'
          }}>
            {status}
          </span>
        </p>
      </div>

      <div style={styles.timeCards}>
        <div style={styles.card}>
          <h4>Check-In Time</h4>
          <p style={styles.timeValue}>{checkInTime || "--:--"}</p>
        </div>
        <div style={styles.card}>
          <h4>Check-Out Time</h4>
          <p style={styles.timeValue}>{checkOutTime || "--:--"}</p>
        </div>
      </div>

      {isCheckedIn && (
        <div style={styles.hoursSection}>
          <h3>📊 Working Hours Summary</h3>
          <div style={styles.hoursCards}>
            <div style={styles.hoursCard}>
              <h4>Total Hours</h4>
              <p style={styles.hoursValue}>{workingHours.total} hrs</p>
            </div>
            <div style={styles.hoursCard}>
              <h4>Regular Hours</h4>
              <p style={{ ...styles.hoursValue, color: '#10b981' }}>{workingHours.regular} hrs</p>
            </div>
            <div style={styles.hoursCard}>
              <h4>Overtime Hours</h4>
              <p style={{
                ...styles.hoursValue,
                color: parseFloat(workingHours.overtime) > 0 ? '#ef4444' : '#6b7280'
              }}>
                {workingHours.overtime} hrs
              </p>
            </div>
          </div>

          {parseFloat(workingHours.overtime) > 0 && (
            <div style={styles.overtimeAlert}>
              <h4>⚠️ Overtime Detected</h4>
              <p>You have worked {workingHours.overtime} hours of overtime today.</p>
              <p>This will be automatically reported to HR for approval upon check-out.</p>
            </div>
          )}
        </div>
      )}

      <div style={styles.buttonSection}>
        <div style={styles.mainButtons}>
          <button
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            style={{
              ...styles.checkIn,
              opacity: isCheckedIn ? 0.6 : 1,
              cursor: isCheckedIn ? 'not-allowed' : 'pointer'
            }}
          >
            ✅ Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={!isCheckedIn || checkOutTime}
            style={{
              ...styles.checkOut,
              opacity: (!isCheckedIn || checkOutTime) ? 0.6 : 1,
              cursor: (!isCheckedIn || checkOutTime) ? 'not-allowed' : 'pointer'
            }}
          >
            ⛔ Check Out
          </button>
        </div>
      </div>

      {checkOutTime && (
        <div style={styles.summarySection}>
          <h3>📋 Today's Summary</h3>
          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <span>Work Duration:</span>
              <span>{checkInTime} - {checkOutTime}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Total Hours:</span>
              <span>{workingHours.total} hours</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Regular Hours:</span>
              <span style={{ color: '#10b981' }}>{workingHours.regular} hours</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Overtime Hours:</span>
              <span style={{ color: '#ef4444' }}>{workingHours.overtime} hours</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "800px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #f1f5f9",
    paddingBottom: "15px",
  },
  currentTime: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#3b82f6",
    background: "#eff6ff",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  statusCard: {
    margin: "20px 0",
    padding: "15px",
    background: "#f8fafc",
    borderRadius: "10px",
    textAlign: "center",
  },
  statusBadge: {
    marginLeft: "10px",
    padding: "4px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
  },
  timeCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    margin: "20px 0",
  },
  card: {
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "10px",
    textAlign: "center",
    border: "2px solid #e2e8f0",
  },
  timeValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1e293b",
    margin: "10px 0 0 0",
  },
  hoursSection: {
    margin: "30px 0",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  hoursCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    margin: "15px 0",
  },
  hoursCard: {
    padding: "15px",
    background: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  hoursValue: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "8px 0 0 0",
  },
  overtimeAlert: {
    background: "#fef3c7",
    border: "2px solid #f59e0b",
    borderRadius: "10px",
    padding: "15px",
    marginTop: "15px",
    color: "#92400e",
  },
  buttonSection: {
    margin: "30px 0",
  },
  mainButtons: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
  },
  checkIn: {
    flex: 1,
    padding: "15px 20px",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  checkOut: {
    flex: 1,
    padding: "15px 20px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  breakButtons: {
    display: "flex",
    gap: "10px",
  },
  breakButton: {
    flex: 1,
    padding: "10px 15px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  summarySection: {
    marginTop: "30px",
    padding: "20px",
    background: "#f0fdf4",
    borderRadius: "12px",
    border: "2px solid #10b981",
  },
  summaryCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "10px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "16px",
  },
};

export default EmployeeAttendance;