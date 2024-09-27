import { useNavigate } from "react-router-dom";
import { useHandleClicks } from "../hooks/useHandleClicks";


export default function AdminDashboardComponentLeft() {
  const navigate = useNavigate();  
  const { handleNavClick } = useHandleClicks();  

  return (
    <div className="left-side">
      <div className="profile-section">
        <div className="profile-pic"></div>
        <div className="profile-name">
          <h3>Administrator</h3>
          <p style={{ marginBottom: '45px' }}>Christian Mallari</p>
        </div>
        <ul className="nav-list">
          <li           
            className="active" 
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
            >
              Home
            </li>
          <li 
          onClick={() => handleNavClick(navigate, '/viewrequest')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
            >
              View Request
          </li>
          <li 
              onClick={() => {
                console.log("Approval link clicked");
                handleNavClick(navigate, '/approval'); 
              }}
              style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
              >
              Approval
          </li>
          <li 
          onClick={() => handleNavClick(navigate, '/settings')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
            >
              Settings
          </li>
        </ul>
      </div>
    </div>
  );
}
