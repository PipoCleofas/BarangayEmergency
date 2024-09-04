import { Tabs, useNavigation } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useSMS from '@/hooks/useSMS';
import useLocation from '@/hooks/useLocation';
import useHandleClicks from '@/hooks/useHandleClicks';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {handleSendSMS, handleSendSMS2} = useSMS();
  const {EmergencyAssistanceRequest} = useHandleClicks();
  const navigation = useNavigation();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 20,
          height: 170,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <View style={styles.iconsRow}>        


                <MaterialCommunityIcons name={focused ? 'head' : 'head-outline'} color={color} size={32} style={styles.icon} onPress={() => navigation.navigate('Welcome' as never)} />
                <FontAwesome6 name={'people-group'} color={color} size={32} style={[styles.icon, { marginLeft: 16 }] } />
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={EmergencyAssistanceRequest}>
                  <Text style={styles.buttonText}>Emergency Assistance</Text>  
                  <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSendSMS2}>
                  <Text style={styles.buttonText}>Route Assistance</Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8, // Space between icons and buttons
  },
  icon: {
    backgroundColor: '#FFFDD0', // Light yellow color
    padding: 5,
    width: 50, // Increase padding to make the icon container larger
    borderRadius: 12, // Adjust border radius for larger size
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    color: 'black',
    elevation: 5, // For Android shadow
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#AD5765', // Light yellow color
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    shadowColor: 'transparent', // Remove shadow
  },
  buttonText: {
    color: 'white', // Text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});