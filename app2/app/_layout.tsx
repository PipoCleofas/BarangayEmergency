import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="Welcome">
        <Stack.Screen name="MainPage" options={{headerShown: false}} />

        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" options={{headerShown: false}}/>
      </Stack>
    </ThemeProvider>
  );
}
