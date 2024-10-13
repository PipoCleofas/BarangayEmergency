import ViewRequestleft from '../components/ViewRequestleft';
import ViewRequestRight from '../components/ViewRequestRight';
import '../../utils/Home.css';
import { useLanguageContext } from '../context/LanguageProvider';  // Import useLanguageContext

export default function ViewRequest() {
  const { translations, language } = useLanguageContext(); // Access translations and current language
  
  return (
    <div className='admin-dashboard'>
      <ViewRequestleft />
      <ViewRequestRight />
    </div>
  );
}
