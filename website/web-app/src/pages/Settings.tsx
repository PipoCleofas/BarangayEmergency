import Settingsleft from '../components/Settingsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function Settings() {
  return (
    <div className='admin-dashboard'>
      <Settingsleft />
      <AdminDashboardComponentRight />
    </div>
  );
}