
export default function AdminDashboardComponentRight() {
  return (
    <div className="right-side">
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="dashboard-grid">
          <div className="dashboard-item">Police</div>
          <div className="dashboard-item">Firefighter</div>
          <div className="dashboard-item">Medical</div>
          <div className="dashboard-item">Barangay</div>
        </div>
        <div className="chart-section">
          <h3>Number of Registered Service Providers</h3>
          <div className="chart-container">
            <div className="legend">
              <div><span className="legend-color police"></span> Police 75%</div>
              <div><span className="legend-color firefighter"></span> Firefighter 25%</div>
              <div><span className="legend-color medical"></span> Medical 10%</div>
            </div>
            <div className="chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
