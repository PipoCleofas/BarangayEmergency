import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import useDataInput from '@/hooks/useDataInput';

const barangaysInTarlacCity = [
  { label: 'Aguso', value: 'Aguso' },
  { label: 'Amucao', value: 'Amucao' },
  { label: 'Armenia', value: 'Armenia' },
  { label: 'Asturias', value: 'Asturias' },
  { label: 'Atioc', value: 'Atioc' },
  { label: 'Balanti', value: 'Balanti' },
  { label: 'Balingcanaway', value: 'Balingcanaway' },
  { label: 'Banaba', value: 'Banaba' },
  { label: 'Bantog', value: 'Bantog' },
  { label: 'Baras-baras', value: 'Baras-baras' },
  { label: 'Batang-batang', value: 'Batang-batang' },
  { label: 'Binauganan', value: 'Binauganan' },
  { label: 'Bora', value: 'Bora' },
  { label: 'Buenavista', value: 'Buenavista' },
  { label: 'Burot', value: 'Burot' },
  { label: 'Calingcuan', value: 'Calingcuan' },
  { label: 'Culipat', value: 'Culipat' },
  { label: 'Cut-cut 1st', value: 'Cut-cut 1st' },
  { label: 'Cut-cut 2nd', value: 'Cut-cut 2nd' },
  { label: 'Dalayap', value: 'Dalayap' },
  { label: 'Dela Paz', value: 'Dela Paz' },
  { label: 'Dolores', value: 'Dolores' },
  { label: 'Laoang', value: 'Laoang' },
  { label: 'Ligtasan', value: 'Ligtasan' },
  { label: 'Mapalacsiao', value: 'Mapalacsiao' },
  { label: 'Matatalaib', value: 'Matatalaib' },
  { label: 'Paraiso', value: 'Paraiso' },
  { label: 'Salapungan', value: 'Salapungan' },
  { label: 'San Carlos', value: 'San Carlos' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'San Isidro', value: 'San Isidro' },
  { label: 'San Jose', value: 'San Jose' },
  { label: 'San Juan de Mata', value: 'San Juan de Mata' },   
  { label: 'San Luis', value: 'San Luis' },
  { label: 'San Manuel', value: 'San Manuel' },
  { label: 'San Miguel', value: 'San Miguel' },
  { label: 'San Nicolas', value: 'San Nicolas' },
  { label: 'San Pascual', value: 'San Pascual' },
  { label: 'San Rafael', value: 'San Rafael' },
  { label: 'San Roque', value: 'San Roque' },
  { label: 'San Sebastian', value: 'San Sebastian' },
  { label: 'Santo Cristo', value: 'Santo Cristo' },
  { label: 'Santo Niño', value: 'Santo Niño' },
  { label: 'Sapang Maragul', value: 'Sapang Maragul' },
  { label: 'Sinait', value: 'Sinait' },
  { label: 'Suizo', value: 'Suizo' },
  { label: 'Tariji', value: 'Tariji' },
  { label: 'Tibag', value: 'Tibag' },
  { label: 'Tienzo', value: 'Tienzo' },
  { label: 'Villa Bacolor', value: 'Villa Bacolor' },
  { label: 'Villa Aquino', value: 'Villa Aquino' },
  { label: 'Villa Joson', value: 'Villa Joson' },
  { label: 'Villa Luz', value: 'Villa Luz' },
  { label: 'Villa San Isidro', value: 'Villa San Isidro' },
  { label: 'Villa Sol', value: 'Villa Sol' }
];

const Barangay = () => {
  const {barangay,setBarangay} = useDataInput();

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => {
          console.log(value)
          setBarangay(value)
        }}
        items={barangaysInTarlacCity}
        placeholder={{
          label: 'Select Barangay...',
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