import React from 'react';
import { View, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import useDataInput from '@/hooks/useDataInput';
import ComboBox from './combobox-holder/ComboBox';

const services = [
  { label: 'Fire', value: 'BFP' },
  { label: 'Police', value: 'Police' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Atioc', value: 'Atioc' },
];

interface EmergencyAssistanceRequestProps {
  value: string | null;
  onValueChange: (value: string) => void;
  
}

const Sitio: React.FC<EmergencyAssistanceRequestProps>  = ({ value, onValueChange }) => {
  

  return (
    <View style={styles.container}>
      <ComboBox data={services} value={value} onValueChange={onValueChange} />
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
