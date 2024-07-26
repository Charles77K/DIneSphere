import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUp, Login, ForgotPassword, ResetPassword } from '../Screens';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();
const AuthNavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Reset" component={ResetPassword} />
      <Stack.Screen name="MainScreen" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
