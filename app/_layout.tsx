import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/search/index" options={{
          headerShown: false, title: '植物検索',
          headerStyle: { backgroundColor: '#68A98A' }, // ヘッダーの背景色
          headerTintColor: '#FFFFFF',
        }} />
        <Stack.Screen name="screens/search/detail" options={{
          headerShown: true, title: '植物詳細',
          headerStyle: { backgroundColor: '#68A98A' }, // ヘッダーの背景色
          headerTintColor: '#FFFFFF',
        }} />
        <Stack.Screen name="screens/signUp/index" options={{ headerShown: false, title: '新規登録' }} />
        <Stack.Screen name="screens/signUp/settingProfile" options={{ headerShown: false, title: 'プロフィール設定' }} />
        <Stack.Screen name="screens/tabScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/home/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/diagnoses/index" options={{ headerShown: false }} />
        <Stack.Screen name='screens/home/detail' options={{ headerShown: true, title: '植物詳細' }} />
        <Stack.Screen name="screens/diagnoses/diagnosesDetail" options={{ headerShown: true, title: "診断結果" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
