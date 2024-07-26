import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home,
  RestaurantPage,
  DisplayRestaurant,
  Reviews,
  Checkout,
  CartPage,
} from '../Screens';

const Stack = createStackNavigator();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Restaurant" component={RestaurantPage} />
      <Stack.Screen name="displayRestaurant" component={DisplayRestaurant} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}
