import useCheckBarangay from "@/hooks/useCheckBarangay";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const sitio: any = [];


const Barangay = () => {

  const {barangay} = useCheckBarangay();
  const [selectedValues, setSelectedValues] = useState<string | null>(null);

  /*
  switch(barangay){
    case 'San Juan de Mata':
      sitio.push({label: 'Centro', value: 'Centro'})
      sitio.push({label: 'San Vicente 1', value: 'San Vicente 1'})
      sitio.push({label: 'San Vicente 2', value: 'San Vicente 2'})
      sitio.push({label: 'Paradaan', value: 'Paradaan'})
      sitio.push({label: 'Masipag 1', value: 'Masipag 1'})
      sitio.push({label: 'Masipag 2', value: 'Masipag 2'})
      sitio.push({label: 'Happy Valley 1', value: 'Happy Valley 1'})
      sitio.push({label: 'Happy Valley 2', value: 'Happy Valley 2'})
      sitio.push({label: 'Saranay', value: 'Saranay'})
      return;
    case 'Balete':
      sitio.push({label: '1st Street', value: '1st Street'})
      sitio.push({label: '2nd Street', value: '2nd Street'})
      sitio.push({label: '3rd Street', value: '3rd Street'})
      sitio.push({label: '4th Street', value: '4th Street'})
      sitio.push({label: '5th Street', value: '5th Street'})
      sitio.push({label: '6th Street', value: '6th Street'})
      sitio.push({label: '7th Street', value: '7th Street'})
      sitio.push({label: '8th Street', value: '8th Street'})
      sitio.push({label: '9th Street', value: '9th Street'})
      sitio.push({label: '10th Street', value: '10th Street'})
      sitio.push({label: '11th Street', value: '11th Street'})
      return;
    
    default:
      console.log('Barangay not recognized.');
      return;
  }
    */
  

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValues(value)}
        items={sitio}
        placeholder={{
          label: 'Select Sitio...',
          value: null,
        }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => null}
      />
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

export default Barangay;