import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  RefreshControl,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from '../Styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Carousel from './../components/Carousel';
import axios from 'axios';
import URL from '../api/apiRoute';
import HomeRestaurants from '../components/HomeRestaurants';
import { Provider, useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const [userImage, setUserImage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [userEmail, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const getUser = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const response = await axios.get(`${URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { name, email } = response.data.data.doc;
      setUserId(name);
      setEmail(email);
      AsyncStorage.setItem('Username', name);
      AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.log(error.response, error);
    }
  };

  const getImage = async () => {
    const image = await AsyncStorage.getItem('userImage');
    setUserImage(image);
  };

  useEffect(() => {
    getUser();
    getImage();
  }, []);

  const pullMe = () => {
    setRefresh(true);
    getUser();
    getImage();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['header', 'carousel', 'restaurants']}
        renderItem={({ item }) => {
          if (item === 'header') {
            return (
              <View style={styles.userContainer}>
                <View style={styles.imageWrapper}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Image
                      source={
                        userImage
                          ? { uri: userImage }
                          : require('../assets/img/photo.png')
                      }
                      style={styles.userImage}
                    />
                  </TouchableOpacity>

                  <Text style={{ fontFamily: 'medium', fontSize: 16 }}>
                    Welcome
                  </Text>
                  <Text style={{ fontFamily: 'bold', fontSize: 16 }}>
                    {userId}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CartPage')}
                >
                  <AntDesign name="shoppingcart" size={24} color="black" />
                  {cartItems.length > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartItems.length}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          } else if (item === 'carousel') {
            return <Carousel />;
          } else if (item === 'restaurants') {
            return <HomeRestaurants />;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
