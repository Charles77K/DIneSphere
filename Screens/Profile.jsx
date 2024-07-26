import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import URL from '../api/apiRoute';
import styles from '../Styles/ProfileStyles';

const Profile = ({ navigation, handleLogout }) => {
  const [userEmail, setEmail] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');

  const getItems = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    const currentUser = await AsyncStorage.getItem('Username');
    if (!currentUser) {
      console.log('file not found');
    } else {
      setUserName(currentUser);
    }
    if (email) {
      setEmail(email);
    } else {
      return false;
    }
  };

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      Alert.alert('You need to enable permission to access the library');
  };

  const handleImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      const selectedAsset = result.assets[0];
      if (selectedAsset && selectedAsset.uri) {
        AsyncStorage.setItem('userImage', selectedAsset.uri);
        setUserImage(selectedAsset.uri);
      }
    } catch (error) {
      console.log('Error selecting image', error);
    }
  };

  const getUserImage = async () => {
    const userData = await AsyncStorage.getItem('userImage');
    if (userData) setUserImage(userData);
  };

  useEffect(() => {
    getItems();
  });

  useEffect(() => {
    requestPermission();
    getUserImage();
  }, []);

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out', [
      {
        text: 'Yes',
        onPress: async () => {
          await handleLogout();
        },
      },
      {
        text: 'No',
        onPress: () => null,
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageWrapper}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.image} />
        ) : (
          <AntDesign
            name="camerao"
            size={100}
            color="black"
            style={styles.cameraIcon}
          />
        )}
        <Pressable onPress={handleImage} style={styles.editButton}>
          <FontAwesome5
            name="camera"
            size={21}
            color="black"
            style={styles.editIcon}
          />
        </Pressable>
      </View>
      <View style={styles.changePhoto}>
        {/* {isLoading ? (
          <ActivityIndicator />
        ) : ( */}
        <>
          <Text style={styles.getText}>{userName}</Text>
          <Text style={styles.getText1}>{userEmail}</Text>
        </>
        {/* )} */}
      </View>
      {/* end of the first view */}
      <View style={styles.optionsWrapper}>
        <TouchableOpacity
          style={styles.editProfileWrapper}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.editProfile}>
            <MaterialCommunityIcons
              name="pencil-circle"
              size={35}
              color="black"
            />
            <Text style={styles.optionText}>Edit Profile</Text>
          </View>
          <MaterialIcons name="navigate-next" size={35} color="black" />
        </TouchableOpacity>
        {/* end of edit profile */}
        <Pressable
          style={styles.editProfileWrapper2}
          onPress={() => navigation.navigate('UpdatePassword')}
        >
          <View style={styles.editProfile}>
            <Ionicons
              name="key"
              size={20}
              color="white"
              style={styles.keyBtn}
            />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
          <MaterialIcons name="navigate-next" size={35} color="black" />
        </Pressable>
        {/* end of change password */}
        <Pressable style={styles.editProfileWrapper3}>
          <View style={styles.editProfile}>
            <FontAwesome5 name="exclamation-circle" size={30} color="black" />
            <Text style={styles.optionText}>User Information</Text>
          </View>
          <MaterialIcons name="navigate-next" size={35} color="black" />
        </Pressable>
        {/* end of user information */}
        <Pressable style={styles.editProfileWrapper4}>
          <View style={styles.editProfile}>
            <FontAwesome5
              name="history"
              size={16}
              color="white"
              style={styles.orderBtn}
            />
            <Text style={styles.optionText}>Order History</Text>
          </View>
          <MaterialIcons name="navigate-next" size={35} color="black" />
        </Pressable>
      </View>
      {/* end of user actions view */}
      <View style={styles.myLine}></View>
      <View style={styles.LogoutWrapper}>
        <TouchableOpacity style={styles.Logout} onPress={logout}>
          <View style={styles.logoutInner}>
            <Ionicons name="exit-outline" size={30} color="red" />
            <Text style={styles.optionText}>Logout</Text>
          </View>
          <MaterialIcons name="navigate-next" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
