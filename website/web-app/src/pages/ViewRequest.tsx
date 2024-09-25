import ViewRequestleft from '../components/ViewRequestleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';

export default function ViewRequest() {
  return (
    <div className='admin-dashboard'>
      <ViewRequestleft/>
      <AdminDashboardComponentRight />
    </div>
  );
}