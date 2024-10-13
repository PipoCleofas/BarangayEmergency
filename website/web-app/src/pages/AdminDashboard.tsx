import AdminDashboardComponentLeft from '../components/AdminDashboardComponentsleft';
import AdminDashboardComponentRight from '../components/AdminDashboardComponentright';
import '../../utils/Home.css';
import { useLanguageContext } from '../context/LanguageProvider';  

export default function AdminDashboard() {
  const { translations, language } = useLanguageContext(); 
  
  return (
    <div className='admin-dashboard'>
      <AdminDashboardComponentLeft />
      <AdminDashboardComponentRight />
    </div>
  );
}
