import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function Approval() {
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <div>
      <ul className="nav-list">
        <li>Home</li>
        <li>View Request</li>
        <li className="active">Approval</li>
        <li>Settings</li>
      </ul>
      </div>
      <AdminDashboardComponentRight />
    </div>
  );
}