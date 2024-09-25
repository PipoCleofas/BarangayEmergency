import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function AdminDashboard() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <AdminDashboardComponentRight />
    </div>
  );
}