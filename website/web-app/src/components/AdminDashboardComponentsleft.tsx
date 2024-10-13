import { useNavigate } from 'react-router-dom';
import { useHandleClicks } from '../hooks/useHandleClicks';
import { useLanguageContext } from '../context/LanguageProvider';  

export default function AdminDashboardComponentLeft() {
  const navigate = useNavigate();  
  const { handleNavClick } = useHandleClicks();  
  const { translations, language } = useLanguageContext(); 

  return (
    <div className='left-side'>
      <div className='profile-section'>
        <div className='profile-pic'></div>
        <div className='profile-name'>
          <h3>Administrator</h3>
          <p style={{ marginBottom: '45px' }}>Christian Mallari</p>
        </div>
        <ul className='nav-list'>
          <li           
            className='active' 
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {translations[language].home} 
          </li>
          <li 
            onClick={() => handleNavClick(navigate, '/viewrequest')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {translations[language].viewRequest}  
          </li>
          <li 
            onClick={() => handleNavClick(navigate, '/approval')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {translations[language].approval}  
          </li>

          <li 
            onClick={() => handleNavClick(navigate, '/settings')}
            style={{ marginBottom: '20px', padding: '20px', border: 'none', borderRadius: '0' }}
          >
            {translations[language].settings}  
          </li>
        </ul>
      </div>
    </div>
  );
}
