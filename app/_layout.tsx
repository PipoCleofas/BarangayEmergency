import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Welcome from './Welcome';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="Welcome">
        <Stack.Screen name="Welcome" options={{headerShown: false}} />
        <Stack.Screen name="Signup" options={{headerShown: false}} />
        <Stack.Screen name="CitizenLogin" options={{headerShown: false}} />
        <Stack.Screen name="CitizenPhoto" options={{headerShown: false}} />
        <Stack.Screen name="UsernamePhoto" options={{headerShown: false}} />

        <Stack.Screen name="CitizenSignup" options={{headerShown: false}} />
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" options={{headerShown: false}}/>
      </Stack>
    </ThemeProvider>
  );
}