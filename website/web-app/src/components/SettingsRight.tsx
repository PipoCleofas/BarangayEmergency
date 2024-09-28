import ComboBox from '../components/comboboxholder/Combobox'
import { useLanguage } from '../hooks/useLanguage';


export default function SettingsRight() {
    const {data,language,changeLanguage} = useLanguage();



    return(
        <div>
            <div >
                <ComboBox onValueChange={changeLanguage} data={data} value={language}/>
            </div>
        </div>
    );
}