import React from 'react';
import { View, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import useDataInput from '@/hooks/useDataInput';
import ComboBox from './combobox-holder/ComboBox';

const sitios = [
  { label: 'Aguso', value: 'Aguso' },
  { label: 'Asturias', value: 'Asturias' },
  { label: 'Atioc', value: 'Atioc' },
];

interface BarangayProps {
  value: string | null;
  onValueChange: (value: string) => void;
  
}

const Sitio: React.FC<BarangayProps>  = ({ value, onValueChange }) => {
  

  return (
    <View style={styles.container}>
      <ComboBox data={sitios} value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    backgroundColor: '#D3D3D3',
    borderColor: '#714423',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000000',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000000',
  },
  placeholder: {
    color: '#888888',
  },
});

export default Sitio;
