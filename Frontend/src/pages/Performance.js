import React from 'react';

function Performance() {
  return (
    <div style={{ backgroundColor: '#f7f8fc', minHeight: '100vh', padding: '2rem' }}>
      
      {/* Top Header */}
      <div style={{
        backgroundColor: 'white', 
        padding: '1rem 2rem', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ margin: 0 }}>Performance</h2>
        <div>
          <a href="#profile" style={{ marginRight: '1rem', color: '#555', textDecoration: 'none' }}>Profile</a> |
          <a href="#notifications" style={{ marginLeft: '1rem', color: '#555', textDecoration: 'none' }}>Notifications</a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        backgroundColor: 'white', 
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📊 Performance Overview</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          Monitor key employee performance indicators here.
        </p>

        {/* Cards Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          
          <div style={{
            backgroundColor: '#f0f4ff',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>🎯 Top Performer</h3>
            <p>Ankita Singh</p>
          </div>

          <div style={{
            backgroundColor: '#fff4e6',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>📈 Completion Rate</h3>
            <p>85%</p>
          </div>

          <div style={{
            backgroundColor: '#e6f7f0',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>📝 Pending Reviews</h3>
            <p>4 Reviews</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Performance;
