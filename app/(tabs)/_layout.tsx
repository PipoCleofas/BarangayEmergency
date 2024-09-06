import { Tabs, useNavigation } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useHandleClicks from '@/hooks/useHandleClicks';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {EmergencyAssistanceRequest, RouteAssistance} = useHandleClicks();
  const navigation = useNavigation();

  const { handleEmergencyAssistanceRequestPress, handleRouteAssistanceRequestPress, routeAssistanceModalVisible, emergencyAssistanceModalVisible, setemergencyAssistanceModalVisible, setrouteAssistanceModalVisible, handleEmergencyAssistanceRequestPress2 } = useHandleClicks();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
        tabBarStyle: {
          paddingBottom: 20,
          height: 170,
          display: 'none'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
            
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