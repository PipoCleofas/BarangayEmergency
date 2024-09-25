
export default function Settingsleft() {
    return (
      <div className="left-side">
        <div className="profile-section">
          <div className="profile-pic"></div>
          <div className="profile-name">
            <h3>Administrator</h3>
            <p style={{ marginBottom: '45px' }}>Christian Mallari</p>
          </div>
          <ul className="nav-list">
              <li style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}>Home</li>
              <li style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}>View Request</li>
              <li style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}>Approval</li>
              <li className="active" style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}>Settings</li>
            </ul>
        </div>
      </div>
    );
  }