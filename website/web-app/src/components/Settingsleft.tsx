import { useNavigate } from "react-router-dom";
import { useHandleClicks } from "../hooks/useHandleClicks";
import { useLanguageContext } from '../context/LanguageProvider';

export default function SettingsLeft() {
  const navigate = useNavigate();
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();
  
  const t = translations[language]; // Get translations for current language
  
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
            onClick={() => handleNavClick(navigate, '/admindashboard')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {t.home}
          </li>
          <li
            onClick={() => handleNavClick(navigate, '/viewrequest')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {t.viewRequest}
          </li>
          <li
            onClick={() => handleNavClick(navigate, '/approval')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {t.approval}
          </li>
          <li
            className="active"
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {t.settings}
          </li>
        </ul>
      </div>
    </div>
  );
}
