import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { COLORS } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import URL from '../api/apiRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Cart = () => {
  const [content, setContent] = useState('');
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () => {
    const authToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${URL}/message`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        setMessages(response.data.data);
        console.log('data loaded successfully');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong try again later',
          position: 'top',
        });
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error loading messages',
          position: 'top',
        });
      } else {
        console.log(error);
      }
    }
  }, []);

  const sendMessage = async () => {
    const authToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post(
        `${URL}/message`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        setContent('');
        fetchMessages();
        Toast.show({
          type: 'success',
          text1: 'Message Sent',
          position: 'top',
        });
      } else {
        console.log('Error sending message');
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
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text1}>Community</Text>
        </View>
        <View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <View style={styles.userDetails}>
                  <Image
                    source={require('../assets/img/photo.png')}
                    style={styles.userImage}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.User.name}</Text>
                    <Text style={styles.userEmail}>@{item.User.email}</Text>
                  </View>
                  <Text style={styles.timestamp}>
                    {item.formattedTimestamp}
                  </Text>
                </View>
                <View style={styles.messageContent}>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
          style={[
            styles.keyboardAvoidingView,
            { paddingBottom: insets.bottom + 42 },
            { marginBottom: Platform.OS === 'ios' ? insets.bottom + 42 : 0 },
          ]}
        >
          <View style={styles.content}></View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={content}
                onChangeText={(text) => setContent(text)}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 20 : 0,
    marginHorizontal: 20,
  },
  text1: {
    fontFamily: Platform.select({ ios: 'Helvetica', android: 'Roboto' }),
    fontSize: 23,
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
    position: 'static',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
  },
  //message style
  messageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  messageContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 16,
  },
});
