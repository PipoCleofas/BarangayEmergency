
export default function AdminDashboardComponentLeft() {
    return (
      <div className="left-side">
        <div className="profile-section">
          <div className="profile-pic"></div>
          <div className="profile-name">
            <h3>Administrator</h3>
            <p>Christian Mallari</p>
          </div>
          <div>
            <ul className="nav-list">
              <li>Home</li>
              <li className="active">View Request</li>
              <li>Approval</li>
              <li>Settings</li>
            </ul>
         </div>
        </div>
      </div>
    );
  }
  