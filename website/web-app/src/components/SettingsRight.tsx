import ComboBox from '../components/comboboxholder/Combobox';
import { useLanguageContext } from '../context/LanguageProvider'; // Correct import path

export default function SettingsRight() {
  const { language, changeLanguage } = useLanguageContext(); // Access language context

  // Define the language options for the ComboBox
  const data = [
    { label: 'English', value: 'English' },
    { label: 'Filipino', value: 'Filipino' },
  ];

  return (
    <div>
      <h3>Choose Language</h3> {/* Optional heading for context */}
      {/* Pass changeLanguage function and the current language to ComboBox */}
      <ComboBox onValueChange={changeLanguage} data={data} value={language} />
    </div>
  );
}
