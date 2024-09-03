import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import useHandleClicks from '@/hooks/useHandleClicks';
import Barangay from '@/components/Barangay';
import Sitio from '@/components/Sitio';
import useDataInput from '@/hooks/useDataInput';

export default function CitizenSignup() {
  const { handleBackButtonPress, handleLoginButtonInSignupAsCitizenPress } = useHandleClicks();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handlePasswordChange, handleReEnteredPasswordChange, handleNextPress, barangaySitioError, passwordError, birthday,birthdayError, handleMnameChange, handleLnameChange, handleFnameChange, handleBirthdayChange, handleBarangayChange, handleSitioChange, nameError } = useDataInput();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CITIZEN</Text>
      <Text style={styles.subtitle}>ACCOUNT</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>LAST NAME:</Text>
        <TextInput style={styles.textInput} maxLength={15} onChangeText={(text) => handleLnameChange(text)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>FIRST NAME:</Text>
        <TextInput style={styles.textInput} maxLength={15} onChangeText={(text) => handleFnameChange(text)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>MIDDLE NAME:</Text>
        <TextInput style={styles.textInput} maxLength={15} onChangeText={(text) => handleMnameChange(text)} />
      </View>

      {nameError && <Text style={styles.errorText}>{nameError}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>PASSWORD:</Text>
        <View style={styles.inputPasswordWrapper}>
          <TextInput
            style={styles.textInput}
            maxLength={15}
            onChangeText={(text) => handlePasswordChange(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconWrapper}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>REENTER PASSWORD:</Text>
        <View style={styles.inputPasswordWrapper}>
          <TextInput
            style={styles.textInput}
            maxLength={15}
            onChangeText={(text) => handleReEnteredPasswordChange(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconWrapper}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}


      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>BIRTHDAY:</Text>
        <TextInput
          style={styles.textInput}
          maxLength={10}
          placeholder="MM/DD/YYYY"
          placeholderTextColor="#cccccc"
          keyboardType="numeric"
          value={birthday}
          onChangeText={(text) => handleBirthdayChange(text)}
        />
      </View>

      {birthdayError && <Text style={styles.errorText}>{birthdayError}</Text>}


      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>SITIO:</Text>
        <Sitio />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>BARANGAY:</Text>
        <Barangay/>
      </View>

      {barangaySitioError && <Text style={styles.errorText}>{barangaySitioError}</Text>}



      <View style={styles.columnButtons}>
        <TouchableOpacity style={styles.button1} onPress={handleBackButtonPress}>
          <SimpleLineIcons name="arrow-left" size={16} color="black" style={styles.icon} />
          <Text style={styles.buttonText1}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={handleNextPress}>
          <Text style={styles.buttonText2}>NEXT</Text>
          <SimpleLineIcons name="arrow-right" size={16} color="#FFFFFF" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  labelInput: {
    width: 100,
    fontSize: 14,
    color: 'black',
    textAlign: 'right',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#944547',
    fontSize: 16,
    borderColor: '#714423',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  inputPasswordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  columnButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button1: {
    backgroundColor: '#FFFDD0',
    width: 100,
    height: 40,
    borderColor: '#D3D3D3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText1: {
    color: 'black',
    fontSize: 16,
  },
  button2: {
    backgroundColor: '#714423',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#D3D3D3',
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText2: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 5,
  },
});