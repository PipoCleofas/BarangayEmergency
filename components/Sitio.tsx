import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import useDataInput from '@/hooks/useDataInput';

const sitios: any = [
  { label: 'Aguso', value: 'Aguso' },
];


const Barangay = () => {

  const {sitio,setSitio} = useDataInput();


  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => {
          console.log(sitio)
          setSitio(value)
        }}
        items={sitios}
        placeholder={{
          label: 'Select Sitio...',
          value: null,
        }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => null}
        value={sitio}
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