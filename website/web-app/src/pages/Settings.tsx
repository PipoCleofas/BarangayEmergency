import Settingsleft from '../components/Settingsleft';
import SettingsRight from '../components/SettingsRight';
import '../../utils/Home.css';

export default function Settings() {
  return (
    <div className='admin-dashboard'>
      <Settingsleft />
      <SettingsRight />
    </div>
  );
}