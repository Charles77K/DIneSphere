import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import styles from '../Styles/EditProfile.Styles';
import { Ionicons } from '@expo/vector-icons';
import InputArea from '../components/InputArea';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../components/MyButton';
import axios from 'axios';
import URL from '../api/apiRoute';

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updatedUserDetails = {};
  //add updated user details
  if (name.trim() !== '') {
    updatedUserDetails.name = name;
  }
  if (email.trim() !== '') {
    updatedUserDetails.email = email;
  }
  if (number.trim() !== '') {
    updatedUserDetails.number = number;
  }
  if (address.trim() !== '') {
    updatedUserDetails.address = address;
  }

  const handleSubmit = async () => {
    if (Object.keys(updatedUserDetails).length === 0) {
      {
        Platform.OS === 'android'
          ? ToastAndroid.show(
              'Please fill at least one field to update',
              ToastAndroid.SHORT
            )
          : alert('Please fill at least one field to update');
      }
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const authToken = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        `${URL}/user/updateMe`,
        updatedUserDetails,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response) {
        alert('Updated');
        setName('');
        setEmail('');
        setNumber('');
        setAddress('');
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBack}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </Pressable>
        <Text style={styles.goBackText}>Edit Profile</Text>
      </View>
      {/* Keyboard View */}
      <KeyboardAvoidingView>
        <View style={styles.inputWrapper}>
          <InputArea
            background={styles.inputBackground}
            iconStart={'user'}
            placeholder={'Enter Your New Username'}
            Changer={(text) => {
              setName(text);
            }}
            value={name}
          />
          <InputArea
            background={styles.inputBackground}
            iconStart={'envelope'}
            placeholder={'Enter Your New Email'}
            Changer={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <InputArea
            background={styles.inputBackground}
            iconStart={'phone'}
            placeholder={'Enter Your Phone Number'}
            Changer={(text) => {
              setNumber(text);
            }}
            value={number}
            keyboardType={'numeric'}
          />
          <InputArea
            background={styles.inputBackground}
            iconStart={'address-book'}
            placeholder={'Enter Your Address'}
            Changer={(text) => {
              setAddress(text);
            }}
            value={address}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.btnWrapper}>
        {isLoading ? (
          <ActivityIndicator size={40} />
        ) : (
          <MyButton
            Press={styles.btnStyle}
            child={'Submit'}
            childStyle={styles.txtStyle}
            onPress={() => {
              handleSubmit();
            }}
            rippleColor={'blue'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
