import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function ViewRequest() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <div>
      <ul className="nav-list">
        <li>Home</li>
        <li className="active">View Request</li>
        <li>Approval</li>
        <li>Settings</li>
      </ul>
      </div>
      <AdminDashboardComponentRight />
    </div>
  );
}