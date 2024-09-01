import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Signup' as never); 
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image style={styles.logo} source={require('../app/pictures/logo.gif')} />
      <Text>YOUR</Text>
      <Text>SAFETY</Text>
      <Text>IS</Text>
      <Text>OUR</Text>
      <Text>PRIORITY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 50,
  },
});