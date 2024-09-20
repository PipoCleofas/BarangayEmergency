import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function AdminDashboard() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <div>
      <ul className="nav-list">
        <li className="active">Home</li>
        <li>View Request</li>
        <li>Approval</li>
        <li>Settings</li>
      </ul>
      </div>
      <AdminDashboardComponentRight />
    </div>
  );
}