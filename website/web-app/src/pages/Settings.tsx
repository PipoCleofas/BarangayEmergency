import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function Settings() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <div>
      <ul className="nav-list">
        <li>Home</li>
        <li>View Request</li>
        <li>Approval</li>
        <li className="active">Settings</li>
      </ul>
      </div>
      <AdminDashboardComponentRight />
    </div>
  );
}