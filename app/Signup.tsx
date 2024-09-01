import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import {Stack } from 'expo-router';

import useHandleClicks from '@/hooks/useHandleClicks';
export default function Signup() {
 
  const {handleCitizenLoginPress,handleCitizenSignUpPress, handleProviderLoginPress, handleProviderSignUpPress} = useHandleClicks();
 
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image style={styles.logo} source={require('../app/pictures/logo.gif')} />
      <Text>YOUR</Text>
      <Text>SAFETY</Text>
      <Text>IS OUR</Text>
      <Text style={styles.priorityTextMargin}>PRIORITY</Text>

      <View style={styles.columnButtons}>
        <TouchableOpacity style={styles.button1} onPress={() => handleCitizenLoginPress()}>
          <Text style={styles.button1Text}>Citizen</Text>
          <Text style={styles.button1Text}>Login</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => handleCitizenSignUpPress()}>
          <Text style={styles.button2Text}>Citizen</Text>
          <Text style={styles.button2Text}>Sign Up</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={() => handleProviderLoginPress()}>
          <Text style={styles.button1Text}>Provider</Text>
          <Text style={styles.button1Text}>Login</Text>

        </TouchableOpacity>
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 50,
  },
  priorityTextMargin: {
    marginBottom: 70,
  },
  columnButtons: {
    flexDirection: 'row',
    marginBottom: 60,
    justifyContent: 'space-between', 
  },
  button1: {
    backgroundColor: '#FFFDD0',
    width: 100,
    height: 35,
    borderColor: '#D3D3D3',
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,

    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8, 
    shadowRadius: 3.84, 

    elevation: 5,
    marginHorizontal: 10, // Add margin between buttons
  },
  button2: {
    backgroundColor: '#714423',
    width: 100,
    height: 35,
    padding: 8,
    borderColor: '#D3D3D3',
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,

    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 10, // Add margin between buttons
  },
  button1Text: {
    alignSelf: 'center',
  },
  button2Text: {
    color: 'white',
    alignSelf: 'center',
  },
});