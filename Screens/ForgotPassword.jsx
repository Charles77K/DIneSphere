import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputArea from '../components/InputArea';
import { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Ionicons } from 'react-native-vector-icons';
import { Platform } from 'react-native';
import URL from '../api/apiRoute';
import MyButton from '../components/MyButton';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // form validation
  const validateForm = () => {
    if (!email) {
      setEmailErr('Please Enter your Email');
      return false;
    } else if (email.length < 2) {
      setPasswordErr('Email should be more than 2 characters');
      return false;
    }
    // Clear any existing errors if validation passes
    setEmailErr('');
    return true; // Form is valid
  };

  const handleLogin = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(`${URL}/user/forgotPassword`, {
        email: email,
      });
      if (response.status === 200) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Email sent',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        } else {
          alert('Email Sent');
        }
        navigation.replace('Reset');
      } else {
        // Handle non-200 status codes
        console.error(`Unexpected status code`);
      }
    } catch (err) {
      // Handle network errors or other exceptions
      console.error(`Error: ${err}`);
      // Provide user feedback about the error
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Error sending email',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else {
        alert('Error sending email');
      }
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
        <Text style={styles.goBackText}>Forgot Password</Text>
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
              navigation.navigate('Reset');
            }}
            rippleColor={'blue'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
  goBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
