import Approvalleft from '../components/Approvalleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function Approval() {
  return (
    <div className='admin-dashboard'>
      <Approvalleft />
      <AdminDashboardComponentRight />
    </div>
  );
}