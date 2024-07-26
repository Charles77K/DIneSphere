import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import HomeStackNavigation from './HomeStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';
import { Cart, Ratings } from '../Screens';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 49,
  },
};

const BottomTabNavigation = ({ handleLogout }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? COLORS.yellow : COLORS.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ratings"
        component={Ratings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'rocket' : 'rocket-outline'}
              size={24}
              color={focused ? COLORS.yellow : COLORS.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={26}
              color={focused ? COLORS.yellow : COLORS.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={focused ? COLORS.yellow : COLORS.gray}
            />
          ),
        }}
      >
        {() => <ProfileStackNavigation handleLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
