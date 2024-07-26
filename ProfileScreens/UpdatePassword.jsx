import {
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../Styles/UpdatePasswordStyles';
import URL from '../api/apiRoute';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import PasswordInput from '../components/PasswordInput';
import MyButton from '../components/MyButton';
import { COLORS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErr, setPasswordConfirmErr] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordErr, setCurrentPasswordErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!currentPassword) {
      setCurrentPasswordErr('Please enter your current password');
      return false;
    } else if (password.length > 15) {
      setPasswordErr('Password should not be more than 15 characters');
      return false;
    } else if (!password) {
      setPasswordErr('Please Enter Password');
      return false;
    } else if (!passwordConfirm) {
      setPasswordConfirmErr('Please Confirm your password');
      return false;
    } else if (passwordConfirm.length > 15) {
      setPasswordConfirmErr('Password should not be more than 15 characters');
      return false;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmErr('Passwords do not match');
      return false;
    }
    // Clear any existing errors if validation passes
    setPasswordErr('');
    setCurrentPasswordErr('');
    setPasswordConfirmErr('');
    return true; // Form is valid
  };

  const userDetails = {
    passwordCurrent: currentPassword,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  const handleUpdate = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    try {
      setIsLoading(true);
      const authToken = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        `${URL}/user/updatePassword`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      if (response) {
        alert('Password updated successfully');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.goBack}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </Pressable>
        <Text style={styles.goBackText}>Change Password</Text>
      </View>
      {/* end of the goback navigation */}
      <KeyboardAvoidingView style={styles.inputWrapper} behavior="padding">
        <View style={styles.inputStyle}>
          <PasswordInput
            background={styles.inputBackground}
            iconStart={'lock'}
            iconEnd={'eye'}
            placeholder={'Enter your Current password'}
            Changer={(text) => {
              setCurrentPassword(text);
            }}
            value={currentPassword}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {currentPasswordErr}
          </Text>
          <PasswordInput
            background={styles.inputBackground}
            iconStart={'lock'}
            iconEnd={'eye'}
            placeholder={'Enter your new password'}
            Changer={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {passwordErr}
          </Text>
          <PasswordInput
            background={styles.inputBackground}
            iconStart={'lock'}
            iconEnd={'eye'}
            placeholder={'Confirm your new password'}
            Changer={(text) => {
              setPasswordConfirm(text);
            }}
            value={passwordConfirm}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {passwordConfirmErr}
          </Text>
        </View>
        {/* end of the keyboard input systems */}
        <View style={styles.btnWrapper}>
          {isLoading && <ActivityIndicator />}
          <MyButton
            Press={styles.btnStyle}
            child={'Submit'}
            childStyle={styles.txtStyle}
            onPress={() => {
              handleUpdate();
            }}
            rippleColor={'blue'}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdatePassword;
