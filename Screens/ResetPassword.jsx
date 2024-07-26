import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputArea from '../components/InputArea';
import { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Platform } from 'react-native';
import MyButton from '../components/MyButton';
import PasswordInput from '../components/PasswordInput';
import URL from '../api/apiRoute';

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErr, setPasswordConfirmErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // form validation
  const validateForm = () => {
    if (!password) {
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
    setPasswordErr('');
    setPasswordConfirmErr('');
    return true; // Form is valid
  };

  const userDetails = {
    password: password,
    passwordConfirm: passwordConfirm,
  };

  const handleLogin = async () => {
    const { token } = route.params;
    console.log(token);
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `${URL}/users/resetPassword/${token}`,
        userDetails
      );
      if (response.status === 200) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Password Reset Success',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        } else {
          alert('Password reset Successfully');
        }
        navigation.replace('Login');
      } else {
        // Handle non-200 status codes
        console.error(`Unexpected status code`);
      }
    } catch (err) {
      // Handle network errors or other exceptions
      console.error(`Error: ${err.response.data}`);
      // Provide user feedback about the error
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Error reseting password',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else {
        alert('Error reseting password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.inputWrapper} behavior="padding">
        <View style={styles.inputStyle}>
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
      {/* button View */}
      <View style={styles.btnWrapper}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MyButton
            Press={styles.btnStyle}
            child={'Submit'}
            childStyle={styles.txtStyle}
            onPress={() => {
              handleLogin();
            }}
            rippleColor={'blue'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  inputBackground: {
    color: COLORS.black,
    width: '95%',
    marginTop: Platform.OS === 'android' ? 5 : 10,
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 50,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnStyle: {
    height: SIZES.xxLarge,
    width: '85%',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.yellow,
  },
  txtStyle: {
    textAlign: 'center',
    fontFamily: 'bold',
    color: COLORS.white,
  },
});
