import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import URL from '../api/apiRoute';
import axios from 'axios';
import styles from '../Styles/DisplayRestaurantStyles';
import Preloader from '../components/Preloader';

const DisplayRestaurant = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL}/restaurant`);
      if (response.status === 200) {
        setRestaurant(response.data.data.doc);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log('Error:', err.message);
      if (err.response.data.message) {
        console.log('Error response:', err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleRestaurantPress = (id) => {
    navigation.navigate('Restaurant', { restaurantId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleRestaurantPress(item._id)}
    >
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.img }} style={styles.img} />
      </View>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <View style={styles.icon}>
            <Ionicons name="restaurant-outline" size={20} color="black" />
          </View>
          <View style={styles.resConatiner}>
            <Text style={styles.resText}>{item.name}</Text>
            <View style={styles.ratings}>
              <Entypo name="star" size={17} color="#ffd633" />
              <Text>{item.ratingsAverage}</Text>
              <Text>({item.ratingsQuantity})</Text>
            </View>
            {/* end of ratings view */}
          </View>
          {/* end of resConatiner view */}
          {/* start email and opening hours view */}
          <View style={styles.resConatiner2}>
            <Text>{[item.contact[0].email]}</Text>
            <View style={styles.openingHours}>
              <Entypo name="clock" size={15} color="black" />
              <Text>
                {item.openingHours[0].open} - {item.openingHours[0].close}
              </Text>
            </View>
            {/* end of opening Hours */}
          </View>
          {/* end of res container 2 */}
        </View>
      </View>
      {/* end of container 2 */}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginBottom: 70 }}>
      <View style={styles.goBack}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </Pressable>
        <Text style={styles.goBackText}>Restaurants</Text>
      </View>
      {isLoading ? (
        <Preloader />
      ) : (
        <FlatList
          data={restaurant}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default DisplayRestaurant;
