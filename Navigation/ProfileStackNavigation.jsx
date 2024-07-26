import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../Screens';
import { EditProfile, UpdatePassword } from '../ProfileScreens';

const Stack = createStackNavigator();
const ProfileStackNavigation = ({ handleLogout }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen">
        {(props) => <Profile {...props} handleLogout={handleLogout} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigation;
