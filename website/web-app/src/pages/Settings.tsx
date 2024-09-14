import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/AdminDashboard.css';

export default function Settings() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <AdminDashboardComponentRight />
    </div>
  );
}