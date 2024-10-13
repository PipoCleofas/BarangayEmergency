import SettingsLeft from '../components/Settingsleft';
import SettingsRight from '../components/SettingsRight';
import '../../utils/Home.css';
import { LanguageProvider } from '../context/LanguageProvider'; 

export default function Settings() {
  return (
    <LanguageProvider> 
      <div className="settings-container"> 
        <SettingsLeft />
        <SettingsRight />
      </div>
    </LanguageProvider>
  );
}
