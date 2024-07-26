import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../Styles/SignUp.Styles';
import InputArea from '../components/InputArea';
import PasswordInput from '../components/PasswordInput';
import MyButton from '../components/MyButton';
import axios from 'axios';
import URL from '../api/apiRoute';
import { COLORS } from '../constants';
import Toast from 'react-native-toast-message';

const SignUp = ({ navigation }) => {
  //useStates Hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordConfirmErr, setPasswordConfirmErr] = useState('');

  //userSIgn up details
  const userDetails = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };
  //form Validation
  const validateForm = () => {
    if (!name) {
      setNameErr('Please Enter your Name');
      return false;
    } else if (!email) {
      setEmailErr('Please Enter your Email');
      return false;
    } else if (!password) {
      setPasswordErr('Please Enter Password');
      return false;
    } else if (password.length > 15) {
      setPasswordErr('Password should not be more than 15 characters');
      return false;
    } else if (!passwordConfirm) {
      setPasswordConfirmErr('Please Enter Password');
      return false;
    } else if (passwordConfirm.length > 15) {
      setPasswordConfirmErr('Password should not be more than 15 characters');
      return false;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmErr('Passwords do not match');
      return false;
    }
    // Clear any existing errors if validation passes
    setNameErr('');
    setEmailErr('');
    setPasswordErr('');
    setPasswordConfirmErr('');
    return true; // Form is valid
  };
  // 127.0.0.1  192.168.0.199:3000
  //Onlick event on sign up
  const handleSignUp = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/user/signup`, userDetails);
      if (response.status === 201) {
        // Different outputs for different operating systems
        Toast.show({
          type: 'success',
          text1: 'Successful',
          text2: `Sign in successful`,
          position: 'top',
        });
        navigation.replace('Login');
      }
    } catch (err) {
      if (err.response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err.response.data.message,
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to server',
          position: 'top',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Render the Sign Up Page
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
          <Text style={styles.txt1}>Let's Get Started</Text>
          <Text style={styles.txt2}>Create a new Account</Text>
        </View>
      </View>
      {/* input areas */}
      <KeyboardAvoidingView style={styles.inputWrapper} behavior="padding">
        <View style={styles.inputStyle}>
          <InputArea
            background={styles.inputBackground}
            iconStart={'user'}
            placeholder={'Enter your Full Name'}
            Changer={(text) => {
              setName(text);
            }}
            value={name}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {nameErr}
          </Text>
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
          <PasswordInput
            background={styles.inputBackground}
            iconStart={'lock'}
            iconEnd={'eye'}
            placeholder={'Confirm Password'}
            Changer={(text) => {
              setPasswordConfirm(text);
            }}
            value={passwordConfirm}
          />
          <Text style={{ color: COLORS.red, fontFamily: 'medium' }}>
            {passwordConfirmErr}
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.btnWrapper}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MyButton
            Press={styles.btnStyle}
            child={'Sign Up'}
            childStyle={styles.txtStyle}
            onPress={() => {
              handleSignUp();
            }}
            rippleColor={'blue'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
