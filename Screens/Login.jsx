import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import styles from '../Styles/Login.Styles';
import InputArea from '../components/InputArea';
import { COLORS } from '../constants';
import PasswordInput from '../components/PasswordInput';
import MyButton from '../components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api/apiRoute';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // user Login details
  const userDetails = {
    email: email,
    password: password,
  };
  // form validation
  const validateForm = () => {
    if (!email) {
      setEmailErr('Please Enter your Email');
      return false;
    } else if (!password) {
      setPasswordErr('Please Enter Password');
      return false;
    } else if (password.length > 15) {
      setPasswordErr('Password should not be more than 15 characters');
      return false;
    }
    // Clear any existing errors if validation passes
    setEmailErr('');
    setPasswordErr('');
    return true; // Form is valid
  };

  // 127.0.0.1  192.168.0.199:3000
  //Onlick event on sign up
  const handleLogin = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/user/login`, userDetails);
      if (response) {
        // Check if HTTP status is successful
        const responseData = response.data;
        const token = responseData.token; // Access token from response data
        const userData = responseData.data.user; // Access user details from response data
        // Access user details like name and email
        const { name, email } = userData;
        // Display user information
        Toast.show({
          type: 'success',
          text1: 'Successful',
          text2: `You logged in as : ${email}`,
          position: 'top',
        });
        console.log('User Details:', userData);
        AsyncStorage.setItem('token', token);
        setIsLoading(false);
        navigation.replace('MainScreen');
      }
    } catch (err) {
      if (err.response.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Incorrect email or password',
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to the server',
          position: 'top',
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require('./../assets/img/logo.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.txtWrapper}>
        <View style={styles.txtContainer}>
          <Text style={styles.txt1}>Welcome to Godfrey Eats</Text>
          <Text style={styles.txt2}>Login to continue</Text>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.inputWrapper} behavior="padding">
        <View style={styles.inputStyle}>
          <InputArea
            background={styles.inputBackground}
            iconStart={'envelope'}
            placeholder={'Enter your Email'}
            Changer={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {emailErr}
          </Text>
          <PasswordInput
            background={styles.inputBackground}
            iconStart={'lock'}
            iconEnd={'eye'}
            placeholder={'Enter your Password'}
            Changer={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {passwordErr}
          </Text>
        </View>
      </KeyboardAvoidingView>
      {/* Forgot Password View */}
      <View style={styles.forgotBtn}>
        <Pressable
          onPress={() => {
            navigation.navigate('Forgot');
          }}
        >
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
        </Pressable>
      </View>
      {/* button View */}
      <View style={styles.btnWrapper}>
        {isLoading && <ActivityIndicator />}
        <MyButton
          Press={styles.btnStyle}
          child={'Login'}
          childStyle={styles.txtStyle}
          onPress={() => {
            handleLogin();
          }}
          rippleColor={'blue'}
        />
      </View>
      {/* Sign up here */}
      <View style={styles.accStyles}>
        <Text style={styles.accText}>Don't have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text style={styles.accText1}>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
