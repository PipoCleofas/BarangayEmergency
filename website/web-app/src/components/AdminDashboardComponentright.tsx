export default function AdminDashboardComponentRight() {
  return (
    <div className="right-side">
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="dashboard-grid">
          <div className="dashboard-item" style={{ height: '120px', border: '10px', borderRadius: '24px' }}>Police</div>
          <div className="dashboard-item" style={{ height: '120px', border: '10px', borderRadius: '24px' }}>Firefighter</div>
          <div className="dashboard-item" style={{ height: '120px', border: '10px', borderRadius: '24px' }}>Medical</div>
          <div className="dashboard-item" style={{ height: '120px' }}>Barangay</div>
        </div>
        <div className="chart-section">
          <h3 style={{ marginBottom: '40px' }}>Number of Registered Service Providers</h3>
          <div className="chart-container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div className="legend" style={{ marginRight: '20px' }}>
              <div>
                <span className="legend-color police" style={{ display: 'inline-block', width: '30px', borderRadius: '15px', height: '18px', backgroundColor: 'blue' }}></span> 
                Police <span style={{ color: 'white', marginInline: '10px' }}>75%</span>
              </div>
              <div>
                <span className="legend-color firefighter" style={{ display: 'inline-block', width: '30px', borderRadius: '15px', height: '18px', backgroundColor: 'red' }}></span> 
                Firefighter <span style={{ color: 'white', marginInline: '10px' }}>25%</span>
              </div>
              <div>
                <span className="legend-color medical" style={{ display: 'inline-block', width: '30px', borderRadius: '15px', height: '18px', backgroundColor: 'yellow' }}></span> 
                Medical <span style={{ color: 'white', marginInline: '10px' }}>10%</span>
              </div>
            </div>
            <div className="chart" style={{ display: 'flex', justifyContent: 'center', marginInline: '50px' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}