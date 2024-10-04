import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from '../store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Heart, Star, ArrowLeft, MagnifyingGlass, ShoppingCart } from 'phosphor-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ApplicationProvider, TopNavigationAction } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

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

  const cThemeRed = {
    "color-primary-100": "#FFF2F2",
    "color-primary-200": "#FFD6D6",
    "color-primary-300": "#FFA3A3",
    "color-primary-400": "#FF6666",
    "color-primary-500": "#FF3333", // Primary primary
    "color-primary-600": "#DB2727",
    "color-primary-700": "#B81A1A",
    "color-primary-800": "#941010",
    "color-primary-900": "#7A0909",
    "color-primary-transparent-100": "rgba(255, 51, 51, 0.08)",
    "color-primary-transparent-200": "rgba(255, 51, 51, 0.16)",
    "color-primary-transparent-300": "rgba(255, 51, 51, 0.24)",
    "color-primary-transparent-400": "rgba(255, 51, 51, 0.32)",
    "color-primary-transparent-500": "rgba(255, 51, 51, 0.40)",
    "color-primary-transparent-600": "rgba(255, 51, 51, 0.48)",

    'text-font-family': 'Roboto_400Regular',
    'text-heading-1-font-family': 'Roboto_700Bold',
    'text-heading-2-font-family': 'Roboto_700Bold',
    'text-heading-3-font-family': 'Roboto_700Bold',

    // Override fonts for buttons or other components if needed
    'button-font-family': 'Roboto_700Bold',
  };

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...cThemeRed }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ statusBarStyle: 'dark', headerShown: false, statusBarColor: '' }} />
            <Stack.Screen name="+not-found" />
            {/* <Stack.Screen name="ads" /> */}
            <Stack.Screen name="ads/[id]" options={{
              title: 'Product Details',
              headerRight: () => <TopNavigationAction icon={<ShoppingCart />} />,
            }} />
            <Stack.Screen name="ads/category/[id]" options={{
              title: 'Products',
              headerRight: () => <TopNavigationAction icon={<MagnifyingGlass />} />,
            }} />
          </Stack>
        </ApplicationProvider>
      </ThemeProvider>
    </Provider>
  );
}
