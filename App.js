import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigation from './Navigation/BottomTabNavigation';
import AuthNavigationStack from './Navigation/AuthNavigationStack';
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './Redux/store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const checkLoginStatus = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking token', error);
    }
  }, []);

  LogBox.ignoreLogs([
    'Warning: Each child in a list should have a unique "key" prop.',
  ]);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await checkLoginStatus();
    };
    prepare();
  }, [checkLoginStatus]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('Username');
    await AsyncStorage.removeItem('userImage');
    setIsLoggedIn(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <StripeProvider publishableKey="pk_test_51PVUieP0nYZZJHF2BaGFTjlWUhfx3qqR9LJFj4OMxJRytWzwOES8KmrCUAvlwGAed1M1jL9ca2M6cVI4BDEtFmnn00AvOkxIkq">
          <NavigationContainer>
            {isLoggedIn ? (
              <BottomTabNavigation handleLogout={handleLogout} />
            ) : (
              <AuthNavigationStack />
            )}
          </NavigationContainer>
        </StripeProvider>
      </Provider>
      <Toast />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
